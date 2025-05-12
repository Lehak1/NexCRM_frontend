import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const CampaignHistory = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFailedOnly, setShowFailedOnly] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get("http://localhost:3000/campaigns/campaign/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setCampaigns(data);
        setFilteredCampaigns(data);
      } catch (err) {
        console.error("Error fetching campaign history:", err);
        setError("Failed to fetch campaign history.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [getAccessTokenSilently]);

  const toggleFailedOnly = () => {
    setShowFailedOnly((prev) => !prev);
    if (!showFailedOnly) {
      setFilteredCampaigns(campaigns.filter((c) => c.failed > 0));
    } else {
      setFilteredCampaigns(campaigns);
    }
  };

  if (loading) return <div className="text-center mt-10 text-lg">Loading campaign history...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">📊 Campaign History</h2>
        <Button onClick={toggleFailedOnly} variant="outline">
          {showFailedOnly ? "Show All" : "Show Only Failed"}
        </Button>
      </div>

      <div className="space-y-5">
        {filteredCampaigns.length === 0 ? (
          <p className="text-gray-500">No campaigns found.</p>
        ) : (
          filteredCampaigns.map((campaign) => {
            const { _id, name, total, sent, failed, createdAt } = campaign;
            const successRate = total > 0 ? (sent / total) * 100 : 0;

            return (
              <Card key={_id} className="border shadow-sm hover:shadow-md transition">
                <CardHeader className="pb-2 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <CardTitle className="text-lg font-semibold">{name}</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {new Date(createdAt).toLocaleString()}
                  </span>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
                    <div><strong>Audience:</strong> {total}</div>
                    <div><strong>Sent:</strong> {sent}</div>
                    <div><strong>Failed:</strong> {failed}</div>
                  </div>

                  <div>
                    <Progress value={successRate} className="h-3" />
                    <div className="text-xs text-muted-foreground mt-1">
                      Delivery success: <span className="font-medium">{successRate.toFixed(1)}%</span>
                    </div>
                  </div>

                  {failed > 0 && (
                    <Badge variant="destructive" className="text-xs w-fit">
                      ⚠ Some messages failed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CampaignHistory;
