import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import PurchaseOrderList from './components/PurchaseOrderList';
import StockAdjustment from './components/StockAdjustment';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Inventory Management System</h1>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/orders" element={<PurchaseOrderList />} />
          <Route path="/adjust-stock" element={<StockAdjustment />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
