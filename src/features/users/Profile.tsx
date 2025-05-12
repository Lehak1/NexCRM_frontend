import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.sub) return;

      try {
        const response = await fetch(`/api/user`, {
          headers: {
            Authorization: `Bearer ${user.sub}`,
          },
        });

        const data = await response.json();
        setUserData(data.user || null);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user?.sub]);

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please log in to view profile.</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      {userData && <p><strong>Auth0 ID:</strong> {userData.auth0Id}</p>}
    </div>
  );
};

export default Profile;
