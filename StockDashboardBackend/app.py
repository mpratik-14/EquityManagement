from flask import Flask, jsonify, request
import yfinance as yf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow React frontend to call Flask API

@app.route('/api/stock', methods=['GET'])
def get_stock():
    ticker = request.args.get('ticker')
    exchange = request.args.get('exchange', 'NSE')

    if not ticker:
        return jsonify({'error': 'Missing ticker parameter'}), 400

    # Ensure correct ticker format for NSE
    formatted_ticker = f"{ticker}.NS" if exchange == "NSE" else ticker

    try:
        stock = yf.Ticker(formatted_ticker)
        stock_info = stock.history(period="5d")  # Fetch last 5 days

        if stock_info.empty:
            return jsonify({'error': 'Stock data not available'}), 404

        # Get latest close price
        latest_close = stock_info['Close'].iloc[-1] if 'Close' in stock_info.columns else None
        prev_close = stock_info['Close'].iloc[-2] if len(stock_info) > 1 else None

        percent_change = (
            round(((latest_close - prev_close) / prev_close) * 100, 2)
            if latest_close and prev_close
            else "N/A"
        )

        # Get the day's high & low
        day_low = stock_info['Low'].iloc[-1] if 'Low' in stock_info.columns else None
        day_high = stock_info['High'].iloc[-1] if 'High' in stock_info.columns else None

        # Get the year's high & low
        year_low = stock_info['Low'].min() if 'Low' in stock_info.columns else None
        year_high = stock_info['High'].max() if 'High' in stock_info.columns else None

        data = {
            "Price": latest_close if latest_close else "N/A",
            "PreviousClose": prev_close if prev_close else "N/A",
            "PercentChange": percent_change,
            "DayRange": {
                "Low": day_low if day_low else "N/A",
                "High": day_high if day_high else "N/A",
            },
            "YearRange": {
                "Low": round(year_low, 2) if year_low else None,
                "High": round(year_high, 2) if year_high else None
            }
        }

        return jsonify(data)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
