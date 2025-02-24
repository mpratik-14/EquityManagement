import { createContext, useContext, useState } from "react";

export const StockContext = createContext(); // ✅ Ensure it's exported

export const useStock = () => useContext(StockContext);

export const StockProvider = ({ children }) => {
    const [selectedStocks, setSelectedStocks] = useState([]);

    const fetchStockData = async (ticker, exchange) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/stock?ticker=${ticker}&exchange=${exchange}`);
            const data = await response.json();
            if (data.error) return null;

            return {
                ticker,
                exchange,
                price: data.Price ?? "N/A",
                percentChange: data.PercentChange ?? "N/A",
                previousClose: data.PreviousClose ?? "N/A",
                dayRange: data.DayRange ?? { Low: "N/A", High: "N/A" },
                yearRange: data.YearRange ?? { Low: "N/A", High: "N/A" },
            };
        } catch (error) {
            console.error("Failed to fetch stock data:", error);
            return null;
        }
    };

    const addStock = async (ticker, exchange) => {
        if (!selectedStocks.some(stock => stock.ticker === ticker)) {
            const stockData = await fetchStockData(ticker, exchange);
            if (stockData) {
                setSelectedStocks(prevStocks => [...prevStocks, stockData]);
            }
        }
    };

    const removeStock = (ticker) => {
        setSelectedStocks(prevStocks => prevStocks.filter(stock => stock.ticker !== ticker));
    };

    return (
        <StockContext.Provider value={{ selectedStocks, addStock, removeStock }}>
            {children}
        </StockContext.Provider>
    );
};
