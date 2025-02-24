import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchStockData = async ({ queryKey }) => {
  const [, ticker, exchange] = queryKey;
  const { data } = await axios.get(
    `http://127.0.0.1:5000/stock?ticker=${ticker}&exchange=${exchange}`
  );
  return data;
};

export default function StockPrice() {
  const [ticker, setTicker] = useState("INFY");
  const [exchange, setExchange] = useState("NSE");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["stock", ticker, exchange],
    queryFn: fetchStockData,
    refetchInterval: 1000, // Refresh every second
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <h1 className="text-4xl font-extrabold text-blue-400 mb-6">📊 Stock Dashboard</h1>

      {/* Input Fields */}
      <div className="flex space-x-4 bg-gray-800 p-4 rounded-lg shadow-lg">
        <input
          type="text"
          className="p-3 text-lg rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          placeholder="Symbol (e.g. INFY)"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <input
          type="text"
          className="p-3 text-lg rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          placeholder="Exchange (e.g. NSE)"
          value={exchange}
          onChange={(e) => setExchange(e.target.value)}
        />
      </div>

      {/* Status Messages */}
      {isLoading && <p className="mt-4 text-lg text-yellow-300">Fetching latest stock data...</p>}
      {isError && <p className="mt-4 text-lg text-red-500">Error fetching stock data</p>}

      {/* Stock Data Card */}
      {data && !data.error ? (
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg mt-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-blue-400">📌 {ticker.toUpperCase()}</h2>
          <div className="mt-4 space-y-3">
            <p className="text-xl"><span className="font-semibold text-green-400">💰 Price:</span> ₹{data.Price}</p>
            <p className="text-lg"><span className="font-semibold text-red-400">📉 Previous Close:</span> ₹{data.PreviousClose}</p>
            <p className="text-lg"><span className="font-semibold text-yellow-400">📊 Day Range:</span> ₹{data.DayRange.Low} - ₹{data.DayRange.High}</p>
            <p className="text-lg"><span className="font-semibold text-purple-400">📆 Year Range:</span> ₹{data.YearRange.Low} - ₹{data.YearRange.High}</p>
          </div>
        </div>
      ) : (
        data?.error && <p className="text-red-400 text-lg mt-4">{data.error}</p>
      )}
    </div>
  );
}
