import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    // User is logged in, redirect to dashboard
    const role_id = parseInt(localStorage.getItem("role_id"), 10);

    switch (role_id) {
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
