import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Tickets", value: "1,247" },
    { label: "Active Users", value: "348" },
    { label: "Avg Response Time", value: "2.4h" },
    { label: "Resolution Rate", value: "94%" },
  ];

  const recentTickets = [
    { id: "TKT-1247", subject: "Email server issue", status: "Open" },
    { id: "TKT-1246", subject: "Password reset", status: "In Progress" },
    { id: "TKT-1245", subject: "Software install", status: "Resolved" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar role="admin" />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header role="admin" username="Admin User" initials="AD" />

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow"
              >
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Tickets */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Tickets</h3>
              <button
                onClick={() => navigate("/admin/tickets")}
                className="text-sm text-blue-600 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {recentTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex justify-between items-center p-4 border rounded"
                >
                  <div>
                    <p className="font-medium">{ticket.subject}</p>
                    <p className="text-xs text-gray-500">{ticket.id}</p>
                  </div>
                  <span className="text-sm font-semibold">
                    {ticket.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
