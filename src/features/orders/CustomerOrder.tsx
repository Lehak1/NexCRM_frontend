import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CustomerOrders: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [customerId, setCustomerId] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!customerId) return;

      setLoading(true);
      try {
        const token = await getAccessTokenSilently();

        const response = await axios.get(
          `${API_BASE_URL}/orders/customer/${customerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data.orders);
      } catch (err) {
        console.error('❌ Error fetching orders:', err);
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId, getAccessTokenSilently]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Customer Orders</h2>

      <div>
        <label>Customer ID:</label>
        <input
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          placeholder="Enter customer ID"
        />
      </div>

      <button onClick={() => setCustomerId(customerId)}>Fetch Orders</button>

      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h3>Orders:</h3>
        {orders.length === 0 ? (
          <p>No orders found for this customer.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order._id}>
                <strong>Order ID:</strong> {order._id} <br />
                <strong>Status:</strong> {order.status} <br />
                <strong>Total Amount:</strong> ${order.totalAmount} <br />
                <strong>Items:</strong>
                <ul>
                  {order.items.map((item: any) => (
                    <li key={item.productId}>
                      Product ID: {item.productId}, Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomerOrders;
