import { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const AddCustomer = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    totalSpend: 0,
    visitCount: 0,
    lastActiveDate: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalSpend" || name === "visitCount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      console.log("Access Token =>", token);

      await axios.post("http://localhost:3000/customers", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setMessage("Customer added successfully!");
      setFormData({
        name: "",
        email: "",
        totalSpend: 0,
        visitCount: 0,
        lastActiveDate: "",
      });
      console.log("Form data being sent:", formData);
    } catch (error) {
      setMessage("Error adding customer");
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New Customer</h2>

        {message && (
          <div
            className={`mb-4 px-4 py-2 rounded text-center text-sm font-medium ${
              message.includes("successfully")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Spend</label>
              <input
                type="number"
                name="totalSpend"
                value={formData.totalSpend}
                onChange={handleChange}
                placeholder="0"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Visit Count</label>
              <input
                type="number"
                name="visitCount"
                value={formData.visitCount}
                onChange={handleChange}
                placeholder="0"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Active Date</label>
            <input
              type="date"
              name="lastActiveDate"
              value={formData.lastActiveDate}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Add Customer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
