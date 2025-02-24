import React from 'react'
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import { StockProvider } from "./context/StockContext";

export default function App() {
  return (
    <StockProvider>
      <div className="flex">
        <LeftPanel />
        <RightPanel />
      </div>
    </StockProvider>
  );
}