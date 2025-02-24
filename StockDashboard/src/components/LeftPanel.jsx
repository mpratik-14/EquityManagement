import React, { useState } from 'react'
import { useStock } from '../context/StockContext'

export default function LeftPanel() {

    const {addStock}  = useStock();
    const [ticker, setTicker] = useState("");
    const [exchange, setExchange] = useState("NSE");

    const handleAddStock = () => {
        if(ticker.trim()){
            addStock(ticker.toUpperCase(), exchange);
            setTicker(""); //clear input after adding
        }
    };

    return (
        <div className="w-1/4 h-screen bg-gray-900 p-6 text-white flex flex-col">
          <h2 className="text-xl font-bold mb-4">📌 Select Stocks</h2>
          
          <input
            type="text"
            placeholder="Enter Symbol (e.g. INFY)"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="p-2 mb-2 rounded bg-gray-700 text-white w-full"
          />
    
          <select
            value={exchange}
            onChange={(e) => setExchange(e.target.value)}
            className="p-2 mb-4 rounded bg-gray-700 text-white"
          >
            <option value="NSE">NSE</option>
            <option value="BSE">BSE</option>
          </select>
    
          <button
            onClick={handleAddStock}
            className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            ➕ Add Stock
          </button>
        </div>
      );
}

