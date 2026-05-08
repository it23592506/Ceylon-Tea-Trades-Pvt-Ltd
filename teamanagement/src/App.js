import React from "react";
import Suppliers from "./components/Suppliers";
import Inventory from "./components/Inventory";

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tea Supplier & Inventory Management</h1>
      <Suppliers />
      <Inventory />
    </div>
  );
}

export default App;
