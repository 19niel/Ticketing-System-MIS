import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function EmployeeDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar role="employee" />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <Header
          role="employee"
          username="Employee User"
          initials="EU"
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold">Welcome to Employee Dashboard</h2>
          <p className="text-gray-600 mt-2">
            Submit tickets, track your requests, and view updates here.
          </p>
        </main>
      </div>
    </div>
  );
}
