import React, { useState, useEffect } from 'react';
import api from '../api';

interface PurchaseOrder {
  id: string;
  productId: string;
  quantityOrdered: number;
  status: 'PENDING' | 'COMPLETED';
  createdAt: string;
  warehouse: {
    id: string;
    name: string;
    streetAddress?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    capacity: number;
  };
  supplier: {
    id: string;
    name: string;
    contactPhone?: string;
    contactEmail?: string;
    streetAddress?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
}

const PurchaseOrderList: React.FC = () => {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    productId: '',
    supplierId: '',
    warehouseId: '',
    quantityOrdered: '',
    orderDate: '',
    expectedArrivalDate: '',
  });


   const fetchOrders = async () => {
     try {
       const response = await api.get('/purchase-order');
       setOrders(response.data.data as PurchaseOrder[]);
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } catch (err: any) {
       console.error('Error fetching purchase orders:', err.response.data);
       setError('Failed to fetch purchase orders');
     }
   };
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateOrder = async () => {
    try {
        await api.post('/purchase-order', {
          productId: formData.productId.trim(),
          supplierId: formData.supplierId.trim(),
          warehouseId: formData.warehouseId.trim(),
          quantityOrdered: Number(formData.quantityOrdered.trim()),
          orderDate: formData.orderDate.trim(),
          expectedArrivalDate: formData.expectedArrivalDate?.trim() || null,
        });
      alert('Purchase order created successfully!');
      setShowForm(false);
        await fetchOrders(); 
      setFormData({
        productId: '',
        supplierId: '',
        warehouseId: '',
        quantityOrdered: '',
        orderDate: '',
        expectedArrivalDate: '',
      });
     
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error creating purchase order:', err.response.data);
      alert('Failed to create purchase order.');
    }
  };

  return (
    <div>
      <h2>Purchase Orders</h2>
      <button onClick={() => setShowForm(!showForm)}>{showForm ? 'Close Form' : 'Add Purchase Order'}</button>

      {showForm && (
        <div style={{ marginTop: '20px' }}>
          <h3>Create Purchase Order</h3>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleCreateOrder();
            }}
          >
            <div>
              <label>Product ID:</label>
              <input type="text" name="productId" value={formData.productId} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Supplier ID:</label>
              <input type="text" name="supplierId" value={formData.supplierId} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Warehouse ID:</label>
              <input type="text" name="warehouseId" value={formData.warehouseId} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Quantity Ordered:</label>
              <input type="number" name="quantityOrdered" value={formData.quantityOrdered} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Order Date:</label>
              <input type="date" name="orderDate" value={formData.orderDate} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Expected Arrival Date:</label>
              <input type="date" name="expectedArrivalDate" value={formData.expectedArrivalDate} onChange={handleInputChange} />
            </div>
            <button type="submit">Create Order</button>
          </form>
        </div>
      )}

      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
          <thead>
            <tr>
              <th style={headerCellStyle}>#</th>
              <th style={headerCellStyle}>Product</th>
              <th style={headerCellStyle}>Quantity</th>
              <th style={headerCellStyle}>Status</th>
              <th style={headerCellStyle}>Warehouse Name</th>
              <th style={headerCellStyle}>Warehouse ID</th>
              <th style={headerCellStyle}>Supplier Name</th>
              <th style={headerCellStyle}>Supplier ID</th>
              <th style={headerCellStyle}>Supplier Phone</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={cellStyle}>{index + 1}</td>
                <td style={cellStyle}>{order.productId}</td>
                <td style={cellStyle}>{order.quantityOrdered}</td>
                <td style={cellStyle}>{order.status}</td>
                <td style={cellStyle}>{order.warehouse.name}</td>
                <td style={cellStyle}>{order.warehouse.id}</td>
                <td style={cellStyle}>{order.supplier.name}</td>
                <td style={cellStyle}>{order.supplier.id}</td>
                <td style={cellStyle}>{order.supplier.contactPhone}</td>
                <td style={cellStyle}>{order.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const headerCellStyle = {
  padding: '10px',
  textAlign: 'left' as const,
  backgroundColor: '#e0e0e0',
  borderBottom: '2px solid #ccc',
};

const cellStyle = {
  padding: '10px',
  textAlign: 'center' as const,
  border: '1px solid #ccc',
};


export default PurchaseOrderList;
