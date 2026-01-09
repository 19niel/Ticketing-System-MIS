import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function AdminLayout() {


  const firstName = localStorage.getItem("first_name");
  const lastName = localStorage.getItem("last_name");
  const role = localStorage.getItem("role");

  const username = `${firstName} ${lastName}`;
  const initials =
    firstName && lastName
      ? `${firstName[0]}${lastName[0]}`
      : "U";


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar role="admin" className="h-full" />

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
         <Header
          role={role}
          username={username}
          initials={initials}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
