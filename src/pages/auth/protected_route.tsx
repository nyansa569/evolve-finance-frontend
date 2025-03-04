import { Navigate, Outlet } from "react-router-dom";

// ProtectedRoute component that checks if the user is authenticated
const ProtectedRoute = () => {
  // Check if the user is authenticated (you can check for a token or any other method)
  const isAuthenticated = sessionStorage.getItem("token") !== null;

  if (!isAuthenticated) {
    // If not authenticated, redirect to the signin page
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};
