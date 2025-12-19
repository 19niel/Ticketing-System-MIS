import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const roleId = parseInt(localStorage.getItem("role_id"), 10);
  const location = useLocation();

  if (!token) {
    // Not logged in, redirect to login
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Check if user's role is allowed
  if (allowedRoles && !allowedRoles.includes(roleId)) {
    // Role not allowed, redirect to their dashboard
    switch (roleId) {
      case 1:
        return <Navigate to="/admin" replace />;
      case 2:
        return <Navigate to="/techsupport" replace />;
      case 3:
        return <Navigate to="/employee" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
}
