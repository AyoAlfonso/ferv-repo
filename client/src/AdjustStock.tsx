import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from './interfaces';

const AdjustStock = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [adjustQuantity, setAdjustQuantity] = useState(0);

  useEffect(() => {
    // Fetch products with their stock levels
    axios.get('/api/products-with-stock').then(response => {
      setProducts(response.data);
    });
  }, []);

  const handleStockAdjustment = async () => {
    try {
      await axios.put(`/api/product-orders/${selectedProduct}/adjust-stock`, {
        warehouseId: selectedWarehouse,
        quantity: adjustQuantity,
      });
      alert('Stock adjusted successfully!');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(`Error adjusting stock: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <h1>Adjust Stock Levels</h1>

      <div>
        <label>Product:</label>
        <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
          <option value="">Select a product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Warehouse:</label>
        <select value={selectedWarehouse} onChange={e => setSelectedWarehouse(e.target.value)}>
          <option value="">Select a warehouse</option>
          {selectedProduct &&
            products
              .find(product => product.id === selectedProduct)
              ?.warehouses.map(warehouse: => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name} (Stock: {warehouse.stockQuantity})
                </option>
              ))}
        </select>
      </div>

      <div>
        <label>Quantity Adjustment:</label>
        <input type="number" value={adjustQuantity} onChange={e => setAdjustQuantity(Number(e.target.value))} />
      </div>

      <button onClick={handleStockAdjustment} disabled={!selectedProduct || !selectedWarehouse || !adjustQuantity}>
        Adjust Stock
      </button>
    </div>
  );
};

export default AdjustStock;
