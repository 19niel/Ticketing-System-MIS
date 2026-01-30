import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import LoginPage from "./pages/LoginPage";

// Admin Area
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/dashboard/Dashboard";
import AdminNotifications from "./pages/admin/notifications/Notifications";
import AdminReports from "./pages/admin/reports/Reports";
import AdminSettings from "./pages/admin/settings/Settings";
import AdminTickets from "./pages/admin/tickets/Tickets";
import AdminNewTickets from "./pages/admin/tickets_new/NewTickets"
import AdminUsers from "./pages/admin/users/Users";


// Employee Area
import EmployeeTickets from "./pages/employee/MyTickets/Tickets"
import EmployeeNewTickets from "./pages/employee/NewTickets/NewTickets"




import TechSupportDashboard from "./pages/techsupport/TechSupportDashboard";
import EmployeeLayout from "./pages/employee/EmployeeLayout.jsx";
import ProtectedRoute from "./utils/ProtectedRoute";

export default function App() {
  return (
    <>
      {/* ✅ Toaster MUST be outside Routes */}
      <Toaster richColors position="top-center" />

      <Routes>
        {/* Public */} 
        
          <Route path="/" element={<LoginPage />} />
     
      

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole={1}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="tickets" element={<AdminTickets />} />
          <Route path="new" element={<AdminNewTickets/>} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* TECH SUPPORT */}
        <Route
          path="/techsupport"
          element={
            <ProtectedRoute allowedRole={2}>
              <TechSupportDashboard />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEE */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRole={3}>
              <EmployeeLayout />
            </ProtectedRoute>
          }
        >
          <Route path="tickets" element={<EmployeeTickets />} />
          <Route path="new" element={<EmployeeNewTickets />} />


        </Route>

             

      </Routes>
    </>
  );
}
