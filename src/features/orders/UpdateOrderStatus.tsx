import React, { useState } from 'react';
import axios from 'axios';

const UpdateOrderStatus = ({ orderId }: { orderId: string }) => {
  const [status, setStatus] = useState('PENDING');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/orders/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Error updating order status');
    }
  };

  return (
    <div>
      <h2>Update Order Status</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
        <button type="submit">Update Status</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateOrderStatus;
