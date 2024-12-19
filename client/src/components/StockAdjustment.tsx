import React, { useState } from 'react';
import api from '../api';
import './StockAdjustment.css'; // Optional: Create a separate CSS file for styling

const StockAdjustment: React.FC = () => {
  const [productId, setProductId] = useState<string>('');
  const [adjustment, setAdjustment] = useState<number | ''>('');
  const [warehouseId, setWarehouseId] = useState<string>('');

  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.put(`/product/${productId}/sell`, { warehouseId: warehouseId.trim(), quantityOrdered: adjustment });
       
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error adjusting stock:', error);
      setMessage('Failed to adjust stock');
    }
  };

  return (
    <div className="stock-adjustment-container">
      <h2>Sell Stock / Adjust Stock Levels</h2>
      <form className="stock-adjustment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productId">Product ID:</label>
          <input id="productId" type="text" value={productId} onChange={e => setProductId(e.target.value.trim())} required />
        </div>

        <div className="form-group">
          <label htmlFor="warehouseId">Warehouse ID:</label>
          <input id="warehouseId" type="text" value={warehouseId} onChange={e => setWarehouseId(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="adjustment">Adjustment (Quantity Sold):</label>
          <input id="adjustment" type="number" value={adjustment} onChange={e => setAdjustment(Number(e.target.value))} required />
        </div>

        <button type="submit" className="submit-button">
          Sell Stock
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default StockAdjustment;
