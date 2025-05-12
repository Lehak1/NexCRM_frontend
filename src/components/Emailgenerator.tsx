// src/components/EmailGenerator.tsx
import React, { useState } from 'react';
import axios from 'axios';

const EmailGenerator: React.FC = () => {
  const [campaignObjective, setCampaignObjective] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCampaignObjective(e.target.value);
  };

  // Function to generate campaign messages
  const generateMessages = async () => {
    if (!campaignObjective) {
      setError('Please provide a campaign objective');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/generate-campaign-messages', { campaignObjective });
      setMessages(response.data.messages);
    } catch (err) {
      setError('Error generating messages');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate Campaign Messages</h2>
      <div>
        <input
          type="text"
          placeholder="Enter campaign objective"
          value={campaignObjective}
          onChange={handleInputChange}
        />
        <button onClick={generateMessages} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Messages'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {messages.length > 0 && (
        <div>
          <h3>Generated Messages</h3>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmailGenerator;
