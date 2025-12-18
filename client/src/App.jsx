import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TechSupportDashboard from "./pages/techsupport/TechSupportDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import ProtectedRoute from "./utils/ProtectedRoute";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />



      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/techsupport" element={<TechSupportDashboard />} />
      <Route path="/employee" element={<EmployeeDashboard />} />


      <Route path="" element={<ProtectedRoute/>}>
        
      </Route>  

    </Routes>
  );
}

export default App;
