const StockRow = ({ stock }) => {
  const priceChange = stock.previousClose ? (stock.price - stock.previousClose).toFixed(2) : "N/A";
  const percentChange = stock.percentChange !== "N/A" ? parseFloat(stock.percentChange).toFixed(2) : "N/A";

  return (
    <tr className="border-b">
      <td className="border px-4 py-2">{stock.ticker}</td>
      <td className="border px-4 py-2">{stock.exchange}</td>
      <td className="border px-4 py-2">{stock.price ? stock.price.toFixed(2) : "N/A"}</td>

      {/* Price Change - Color based on value */}
      <td className={`border px-4 py-2 ${priceChange < 0 ? "text-red-500" : "text-green-500"}`}>
        {priceChange}
      </td>

      {/* Percent Change - Color based on value */}
      <td className={`border px-4 py-2 ${percentChange < 0 ? "text-red-500" : "text-green-500"}`}>
        {percentChange !== "N/A" ? `${percentChange}%` : "N/A"}
      </td>

      <td className="border px-4 py-2">{stock.previousClose ? stock.previousClose.toFixed(2) : "N/A"}</td>
      <td className="border px-4 py-2">
        {stock.dayRange ? stock.dayRange.Low.toFixed(2) : "N/A"}
      </td>
      <td className="border px-4 py-2">
        {stock.dayRange ? stock.dayRange.High.toFixed(2) : "N/A"}
      </td>
      <td className="border px-4 py-2">
        {stock.yearRange ? stock.yearRange.Low.toFixed(2) : "N/A"}
      </td>
      <td className="border px-4 py-2">
        {stock.yearRange ? stock.yearRange.High.toFixed(2) : "N/A"}
      </td>
    </tr>
  );
};

export default StockRow;
