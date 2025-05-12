import { useState } from "react";

const NewCampaign = () => {
  const [message, setMessage] = useState("");
  const [segmentId, setSegmentId] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleCreateCampaign = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/campaign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ segmentId, message }),
      });

      // You don't need the 'data' variable if it's not being used
      if (response.ok) {
        alert("Campaign created successfully!");
      } else {
        alert("Failed to create campaign");
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create New Campaign</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Segment ID"
          value={segmentId}
          onChange={(e) => setSegmentId(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Enter campaign message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <button onClick={handleCreateCampaign} className="px-4 py-2 bg-green-600 text-white rounded">
        Create Campaign
      </button>
    </div>
  );
};

export default NewCampaign;
