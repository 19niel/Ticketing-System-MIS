import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function TechSupportDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar role="tech_support" />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <Header
          role="tech_support"
          username="Tech Support"
          initials="TS"
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold">Welcome to Tech Support Dashboard</h2>
          <p className="text-gray-600 mt-2">
            Manage assigned tickets and resolve user issues here.
          </p>
        </main>
      </div>
    </div>
  );
}
