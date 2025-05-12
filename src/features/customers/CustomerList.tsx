import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

interface Customer {
  _id: string;
  name: string;
  email: string;
  totalSpend: number;
  visitCount: number;
  lastActiveDate: string;
}

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get("http://localhost:3000/customers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCustomers(response.data.customers || []);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, [getAccessTokenSilently]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Customer List</h2>
        <button
          onClick={() => (window.location.href = "http://localhost:5173/customers/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Customer
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Total Spend</th>
            <th className="border p-2">Visit Count</th>
            <th className="border p-2">Last Active</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td className="border p-2">{customer.name}</td>
              <td className="border p-2">{customer.email}</td>
              <td className="border p-2">₹{customer.totalSpend}</td>
              <td className="border p-2">{customer.visitCount}</td>
              <td className="border p-2">
                {new Date(customer.lastActiveDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
