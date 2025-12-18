import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // User is not logged in
    return <Navigate to="/" replace />;
  }

  return children;
}
