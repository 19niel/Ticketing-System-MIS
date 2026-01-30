import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function EmployeeLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="employee" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header role="employee" />

        <main className="flex-1 p-6 overflow-auto">
          {/* ✅ This renders nested routes like /employee/tickets */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}