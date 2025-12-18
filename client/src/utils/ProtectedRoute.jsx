import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = Number(localStorage.getItem("role"));

  // Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Role-based access (optional)
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // Allowed → show the page
  return <Outlet />;
}
