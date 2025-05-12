import React, { useEffect, useState } from 'react';

import {
  Users,
  Target,
  Send,
  BarChart3,
  Calendar,
 
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Dashboard: React.FC = () => {

  const [stats, setStats] = useState([
    {
      id: 1,
      name: 'Total Customers',
      value: '—',
      icon: <Users className="h-6 w-6" />,
      change: 0,
      trend: 'up',
    },
    {
      id: 2,
      name: 'Active Segments',
      value: '—',
      icon: <Target className="h-6 w-6" />,
      change: 0,
      trend: 'up',
    },
    {
      id: 3,
      name: 'Campaigns Sent',
      value: '—',
      icon: <Send className="h-6 w-6" />,
      change: 0,
      trend: 'up',
    },
    {
      id: 4,
      name: 'Delivery Rate',
      value: '—',
      icon: <BarChart3 className="h-6 w-6" />,
      change: 0,
      trend: 'down',
    }
  ]);

  const [recentCampaigns, setRecentCampaigns] = useState<any[]>([]);

  const [campaignObjective, setCampaignObjective] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStats([
      {
        id: 1,
        name: 'Total Customers',
        value: '1,500',
        icon: <Users className="h-6 w-6" />,
        change: 10.5,
        trend: 'up',
      },
      {
        id: 2,
        name: 'Active Segments',
        value: '6',
        icon: <Target className="h-6 w-6" />,
        change: 2,
        trend: 'up',
      },
      {
        id: 3,
        name: 'Campaigns Sent',
        value: '30',
        icon: <Send className="h-6 w-6" />,
        change: 5,
        trend: 'up',
      },
      {
        id: 4,
        name: 'Delivery Rate',
        value: '92.4%',
        icon: <BarChart3 className="h-6 w-6" />,
        change: -1.3,
        trend: 'down',
      }
    ]);

    setRecentCampaigns([
      {
        id: 'a1',
        name: 'Re-Engagement Campaign',
        date: 'May 8, 2025',
        audienceSize: 400,
        delivered: 368,
        status: 'completed'
      },
      {
        id: 'a2',
        name: 'Product Launch Teaser',
        date: 'May 4, 2025',
        audienceSize: 600,
        delivered: 480,
        status: 'in progress'
      },
    ]);
  }, []);

  const handleGenerateMessages = async () => {
    if (!campaignObjective) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/generateai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ objective: campaignObjective }),
      });

      if (!res.ok) throw new Error('API call failed');

      const data = await res.json();
      if (data?.messages?.length) {
        setMessages(data.messages);
      } else {
        throw new Error('Invalid response');
      }
    } catch (err) {
      setMessages([
        `Looks like engagement is low – let's turn things around with a campaign tailored to "${campaignObjective}".`,
        `Your customers with ${campaignObjective} are just one nudge away from reactivation. Let's reach out.`,
        `Targeting "${campaignObjective}" could be the key to boosting loyalty – try offering exclusive deals.`,
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
        <div className="flex items-center space-x-2 text-sm bg-white rounded-md border border-gray-200 px-3 py-1">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span>Last 30 days</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <motion.div key={stat.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="p-3 rounded-md bg-gray-100 text-primary-600">{stat.icon}</div>
                <div className="ml-5 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                        <span className="ml-1">{Math.abs(stat.change)}%</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Campaign Message Generator */}
      <motion.div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-5">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Generate Campaign Messages</h3>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter campaign objective"
              className="border rounded-md p-2 w-full"
              value={campaignObjective}
              onChange={(e) => setCampaignObjective(e.target.value)}
            />
            <button
              className="mt-3 inline-flex items-center px-4 py-2 border border-blue-600 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-100"
              onClick={handleGenerateMessages}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Messages'}
            </button>
          </div>

          {messages.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-600">Generated Messages:</h4>
              <ul className="mt-2 space-y-2">
                {messages.map((message, index) => (
                  <li key={index} className="text-sm text-gray-900">
                    {message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
