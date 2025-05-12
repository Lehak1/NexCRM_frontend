import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import ProtectedRoute from "./auth/ProtectedRoute";
import Navbar from "./components/Navbar";

// Feature pages
import Login from "./features/auth/Login";
import CustomerList from "./features/customers/CustomerList";
import AddCustomer from "./features/customers/AddCustomer";
import OrderList from "./features/orders/CreateOrder";
import AddOrder from "./features/orders/CustomerOrder";
import CreateSegment from "./features/segments/CreateSegment";
import PreviewAudience from "./features/segments/PreviewAudience";
import NewCampaign from "./features/campaigns/NewCampaign";
import CampaignHistory from "./features/campaigns/CampaignHistory";
import Profile from "./features/users/Profile";
import Dashboard from "./features/dashboard/dashboard";

const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;  // Show a loading screen while authentication is in progress
  }

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
         <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CustomerList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/new"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AddCustomer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OrderList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/new"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AddOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/segments/new"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreateSegment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/segments/preview"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PreviewAudience />
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaigns/new"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <NewCampaign />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/campaign/history"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CampaignHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
