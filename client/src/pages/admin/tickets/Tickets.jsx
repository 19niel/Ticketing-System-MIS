import { useState, useEffect } from "react";
import { Search, Eye } from "lucide-react";
import ViewTicket from "./forms/ViewTicket";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Fetch tickets from backend
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/tickets");
        const data = await res.json();

        // Map IDs to readable names if backend returns raw IDs
        const mapped = data.map((t) => ({
          ...t,
          category: t.category_name || t.category_id,
          status: t.status_name || t.status_id,
          priority: t.priority_name || t.priority_id,
          conversations: t.conversations || [], // default empty array
        }));

        setTickets(mapped);
      } catch (err) {
        console.error("Failed to fetch tickets", err);
      }
    };

    fetchTickets();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
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
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-700";
      case "in progress":
      case "in-progress":
        return "bg-yellow-100 text-yellow-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      case "closed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    const searchText = search.toLowerCase();
    const matchesSearch =
      ticket.ticket_number.toLowerCase().includes(searchText) ||
      ticket.subject.toLowerCase().includes(searchText) ||
      ticket.description.toLowerCase().includes(searchText) ||
      ticket.created_by?.toLowerCase().includes(searchText) ||
      ticket.assigned_to?.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "all" || ticket.status?.toLowerCase() === statusFilter;

    const matchesPriority =
      priorityFilter === "all" || ticket.priority?.toLowerCase() === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">All Tickets</h1>
        <p className="text-sm text-gray-500">Manage and monitor all support tickets</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border rounded"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

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
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <div key={ticket.ticket_id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-mono text-gray-500">{ticket.ticket_number}</span>
                  <h3 className="text-lg font-semibold">{ticket.subject}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}
                  >
                    {ticket.priority}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}
                  >
                    {ticket.status}
                  </span>
                </div>

                <p className="text-gray-600">{ticket.description}</p>

                <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                  <span>Created by: {ticket.created_by}</span>
                  <span>Category: {ticket.category}</span>
                  {ticket.assigned_to && <span>Assigned to: {ticket.assigned_to}</span>}
                </div>
              </div>

              {/* View Button */}
              <button
                onClick={() => setSelectedTicket(ticket)}
                className="flex items-center gap-2 border px-3 py-2 rounded hover:bg-gray-100"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
            </div>
          </div>
        ))}

        {filteredTickets.length === 0 && (
          <div className="text-center py-10 text-gray-500">No tickets found</div>
        )}
      </div>

      {/* Modal */}
      {selectedTicket && (
        <ViewTicket
          ticket={selectedTicket}
          userRole="employee" // update dynamically if you store role in context/localStorage
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
}
