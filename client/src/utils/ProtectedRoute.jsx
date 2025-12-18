import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const roleId = localStorage.getItem("role_id");

  // 🔍 TEST LOGS
  console.log("JWT Token:", token);
  console.log("Role ID:", roleId);

  // Temporary: allow access even if missing (for testing)
  return children;
}
