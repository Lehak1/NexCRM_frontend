import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PreviewAudience = () => {
  const [audienceSize, setAudienceSize] = useState<number | null>(null);

  const handlePreview = async () => {
    try {
      const rules = [
        { field: "totalSpend", operator: "$gt", value: 5000 },
        { field: "visitCount", operator: "$gte", value: 2 },
      ];
      const combinator = "OR";

      const response = await fetch(`${API_BASE_URL}/segments/preview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rules, combinator }),
      });

      const data = await response.json();
      setAudienceSize(data.count); // because backend sends { count: ... }
    } catch (error) {
      console.error("Error previewing audience:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Preview Audience</h2>
      <button onClick={handlePreview} className="px-4 py-2 bg-blue-500 text-white rounded">
        Preview
      </button>
      {audienceSize !== null && (
        <p className="mt-4">📊 Estimated Audience Size: {audienceSize}</p>
      )}
    </div>
  );
};

export default PreviewAudience;
