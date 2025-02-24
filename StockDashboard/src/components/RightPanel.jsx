import { useContext, useEffect } from "react";
import { StockContext } from "../context/StockContext";
import StockRow from "./StockRow";

const RightPanel = () => {
  const { selectedStocks } = useContext(StockContext);

  useEffect(() => {
    console.log("Selected Stocks:", selectedStocks);  // 🔍 Debugging Log
  }, [selectedStocks]);

  return (
    <div className="w-3/4 h-screen p-6 bg-white shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Stock Details</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Ticker</th>
              <th className="border px-4 py-2">Exchange</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Price Change</th>  {/* New Column */}
              <th className="border px-4 py-2">% Change</th>
              <th className="border px-4 py-2">Previous Close</th>
              <th className="border px-4 py-2">Day Low</th>
              <th className="border px-4 py-2">Day High</th>
              <th className="border px-4 py-2">Year Low</th>
              <th className="border px-4 py-2">Year High</th>
            </tr>
          </thead>

          <tbody>
            {selectedStocks.length > 0 ? (
              selectedStocks.map((stock, index) => <StockRow key={index} stock={stock} />)
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No stocks selected
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RightPanel;
