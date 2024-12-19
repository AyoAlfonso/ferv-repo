import React, { useState } from 'react';
import api from '../api';

const StockAdjustment: React.FC = () => {
  const [productId, setProductId] = useState<string>('');
  const [adjustment, setAdjustment] = useState<number | ''>('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/products/${productId}/stock`, { adjustment });
      setMessage('Stock adjusted successfully!');
    } catch (error) {
        console.error('Error adjusting stock:', error);
      setMessage('Failed to adjust stock');
    }
  };

  return (
    <div>
      <h2>Adjust Stock Levels</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productId">Product ID:</label>
          <input id="productId" type="text" value={productId} onChange={e => setProductId(e.target.value)} />
        </div>
        <div>
          <label htmlFor="adjustment">Adjustment:</label>
          <input id="adjustment" type="number" value={adjustment} onChange={e => setAdjustment(Number(e.target.value))} />
        </div>
        <button type="submit">Adjust Stock</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default StockAdjustment;
