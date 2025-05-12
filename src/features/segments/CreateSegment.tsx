import { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import DynamicRuleBuilder from "./DynamicRuleBuilder"; 
import type { Condition } from "./type";
import { useNavigate } from "react-router-dom";
const CreateSegment = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [name, setName] = useState("");
  const [rules, setRules] = useState<Condition[]>([]);
  const [combinator, setCombinator] = useState<"AND" | "OR">("AND");
  const [message, setMessage] = useState("");
  const [audienceSize, setAudienceSize] = useState<number | null>(null);
const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      await axios.post(
        "http://localhost:3000/segments",
        { name, rules, combinator },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Segment created successfully!");
      setName("");
      setRules([]);
      setAudienceSize(null);
       navigate("/campaign/history");
    } catch (error) {
      setMessage("❌ Error creating segment.");
      console.error(error);
    }
  };

  const handlePreview = async () => {
    try {
      const token = await getAccessTokenSilently();
      const res = await axios.post(
        "http://localhost:3000/segments/preview",
        { rules, combinator },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAudienceSize(res.data.count);
    } catch (error) {
      console.error("Error previewing audience:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Create Segment</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Segment Name"
          required
          className="w-full p-2 border rounded"
        />

        <DynamicRuleBuilder
          rules={rules}
          setRules={setRules}
          combinator={combinator}
          setCombinator={setCombinator}
        />

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handlePreview}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Preview Audience
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Create Segment
          </button>
        </div>

        {audienceSize !== null && (
          <p className="mt-4 text-lg font-medium text-gray-700">
            📊 Estimated Audience Size: {audienceSize}
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateSegment;
