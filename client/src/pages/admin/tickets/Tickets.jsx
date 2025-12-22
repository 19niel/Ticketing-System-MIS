import { useState } from "react";
import { Search, Filter, Eye } from "lucide-react";

export default function Tickets() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // TEMP DATA (replace with API later)
  const tickets = [
    {
      id: "TKT-1247",
      title: "Email server issue",
      description: "Unable to send or receive emails.",
      status: "open",
      priority: "high",
      createdBy: "Nathaniel Talag",
      category: "IT Support",
      assignedTo: "Tech Support",
    },
    {
      id: "TKT-1246",
      title: "Password reset",
      description: "User forgot their password.",
      status: "in-progress",
      priority: "medium",
      createdBy: "Akahon Ting",
      category: "Account",
      assignedTo: "Tech Support",
    },
    {
      id: "TKT-1245",
      title: "Software installation",
      description: "Request for licensed software installation.",
      status: "resolved",
      priority: "low",
      createdBy: "Employee User",
      category: "Software",
      assignedTo: null,
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-700";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(search.toLowerCase()) ||
      ticket.description.toLowerCase().includes(search.toLowerCase()) ||
      ticket.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === "all" || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">All Tickets</h1>
        <p className="text-sm text-gray-500">
          Manage and monitor all support tickets
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <button className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-gray-100">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-mono text-gray-500">
                    {ticket.id}
                  </span>
                  <h3 className="text-lg font-semibold">
                    {ticket.title}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getPriorityColor(
                      ticket.priority
                    )}`}
                  >
                    {ticket.priority}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(
                      ticket.status
                    )}`}
                  >
                    {ticket.status}
                  </span>
                </div>

                <p className="text-gray-600">
                  {ticket.description}
                </p>

                <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                  <span>Created by: {ticket.createdBy}</span>
                  <span>Category: {ticket.category}</span>
                  {ticket.assignedTo && (
                    <span>Assigned to: {ticket.assignedTo}</span>
                  )}
                </div>
              </div>

              <button className="flex items-center gap-2 border px-3 py-2 rounded hover:bg-gray-100">
                <Eye className="w-4 h-4" />
                View
              </button>
            </div>
          </div>
        ))}

        {filteredTickets.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No tickets found
          </div>
        )}
      </div>
    </div>
  );
}
