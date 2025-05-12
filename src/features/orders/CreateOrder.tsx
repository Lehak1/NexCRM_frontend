import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CreateOrder: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [formData, setFormData] = useState({
    customerId: '',
    items: [{ productId: '', quantity: 1 }],
    totalAmount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      items: [{ ...prev.items[0], [name]: value }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();

      const response = await axios.post(
        `${API_BASE_URL}/orders`,
        {
          ...formData,
          items: [
            {
              ...formData.items[0],
              quantity: Number(formData.items[0].quantity),
            },
          ],
          totalAmount: Number(formData.totalAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('✅ Order Created:', response.data.order);
      alert('Order created successfully!');
    } catch (error) {
      console.error('❌ Error creating order:', error);
      alert('Failed to create order');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-xl mt-12">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 text-center tracking-tight">
        Create Order
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer ID</label>
          <input
            type="text"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Product ID</label>
          <input
            type="text"
            name="productId"
            value={formData.items[0].productId}
            onChange={handleItemChange}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.items[0].quantity}
            onChange={handleItemChange}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Total Amount</label>
          <input
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-200"
        >
          Create Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
