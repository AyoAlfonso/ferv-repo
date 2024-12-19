import React, { useState, useEffect } from 'react';
import api from '../api';

interface PurchaseOrder {
  id: string;
  productId: string;
  quantityOrdered: number;
  status: 'PENDING' | 'COMPLETED';
}

const PurchaseOrderList: React.FC = () => {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get<PurchaseOrder[]>('/purchase-orders');
        setOrders(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
          console.error('Error fetching purchase orders:', err.response.data);
        setError('Failed to fetch purchase orders');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Purchase Orders</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.productId}</td>
                <td>{order.quantityOrdered}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PurchaseOrderList;
