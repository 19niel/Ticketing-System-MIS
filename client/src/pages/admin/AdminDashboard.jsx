import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar role="admin" />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <Header role="admin" username="Admin User" initials="AD" />

        {/* Main Content */}  
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold">Welcome to Admin Dashboard</h2>
          {/* You can add stats, cards, tables, etc. here */}
        </main>
      </div>
    </div>
  );
}
