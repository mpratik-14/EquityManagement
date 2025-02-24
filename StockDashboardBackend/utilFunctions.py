import re
from bs4 import BeautifulSoup
from flask import json
import requests
import yfinance as yf

def js_to_json(js_text):
    """Convert JavaScript-like object notation to valid JSON."""
    js_text = re.sub(r'([{,])\s*([a-zA-Z0-9_]+)\s*:', r'\1"\2":', js_text)  # Add quotes around keys
    js_text = re.sub(r':\s*\'(.*?)\'', r': "\1"', js_text)  # Convert single quotes to double quotes
    return js_text

def fetch_stock_data(ticker):
    """Fetch stock data from Yahoo Finance."""
    try:
        stock = yf.Ticker(ticker)
        data = stock.history(period="1d")

        if data.empty:
            return {'error': 'Stock data not available'}, 404

        stock_info = stock.info
        stock_data = {
            "Price": data["Close"].iloc[-1],
            "PriceChange": data["Close"].iloc[-1] - data["Open"].iloc[-1],
            "PercentChange": ((data["Close"].iloc[-1] - data["Open"].iloc[-1]) / data["Open"].iloc[-1]) * 100,
            "PreviousClose": stock_info.get("previousClose"),
            "DayRange": {
                "Low": stock_info.get("dayLow"),
                "High": stock_info.get("dayHigh")
            },
            "YearRange": {
                "Low": stock_info.get("fiftyTwoWeekLow"),
                "High": stock_info.get("fiftyTwoWeekHigh")
            },
            "MarketCap": stock_info.get("marketCap"),
            "AvgVolume": stock_info.get("averageVolume"),
            "PE_Ratio": stock_info.get("trailingPE"),
            "DividendYield": stock_info.get("dividendYield")
        }

        return stock_data

    except Exception as e:
        return {'error': str(e)}, 500