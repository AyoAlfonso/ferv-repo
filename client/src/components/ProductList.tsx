import React, { useState, useEffect } from 'react';
import api from '../api';
import { Product } from '../interfaces';


const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
          const response = await api.get('/product');
          console.log(response.data.data);
        setProducts(response.data.data as Product[]);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
          <h2>Products</h2>
          
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Stock Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              // Calculate total stock quantity from all warehouses
                 const totalStockQuantity = product.warehouses ? product.warehouses.reduce((total, warehouse) => total + warehouse.stockQuantity, 0) : 0;
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{totalStockQuantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
