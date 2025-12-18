import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TechSupportDashboard from "./pages/techsupport/TechSupportDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";

export default function App() {
  return (
    <Routes>
      {/* Login Page - Public Route */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Tech Support Dashboard */}
      <Route
        path="/techsupport"
        element={
          <ProtectedRoute>
            <TechSupportDashboard />
          </ProtectedRoute>
        }
      />

      {/* Employee Dashboard */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
