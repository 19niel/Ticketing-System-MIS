import { useState } from "react";
import { X, Send, Clock, CalendarClock, User, UserCog, Tag } from "lucide-react";
import { STATUS_MAP, PRIORITY_MAP, CATEGORY_MAP, STATUS_COLOR, PRIORITY_COLOR } from "../mapping"

export default function ViewTicket({ ticket, onClose, userRole }) {
  const [newMessage, setNewMessage] = useState("");
  const [ticketStatus, setTicketStatus] = useState(ticket.status);
  const [conversations, setConversations] = useState(ticket.conversations || []);
  const [editingStatus, setEditingStatus] = useState(false); // tracks if user is changing status

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const formatTimestamp = (timestamp) =>
    new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: "You",
      senderRole: userRole,
      message: newMessage,
      timestamp: new Date(),
      isInternal: false,
    };
    setConversations([...conversations, newMsg]);
    setNewMessage("");
  };

  const handleStatusChange = (e) => {
    setTicketStatus(e.target.value);
  };

  const handleStatusButtonClick = async () => {
    if (editingStatus) {
      // Save status to backend
      try {
        const res = await fetch(`http://localhost:3000/api/tickets/${ticket.ticket_id}/status`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: ticketStatus }),
        });

        if (!res.ok) throw new Error("Failed to update status");

        const updatedTicket = await res.json();
        setTicketStatus(updatedTicket.status);
        alert(`Ticket status updated to ${STATUS_MAP[updatedTicket.status] || updatedTicket.status}`);
      } catch (err) {
        console.error(err);
        alert("Failed to update ticket status");
      }
    }

    // Toggle edit mode
    setEditingStatus(!editingStatus);
  };

  const canChangeStatus = userRole === "admin" || userRole === "employee";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-sm text-gray-500">{ticket.ticket_number}</span>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold capitalize ${PRIORITY_COLOR[ticket.priority?.toLowerCase()]}`}
              >
                {PRIORITY_MAP[ticket.priority?.toLowerCase()] || ticket.priority}
              </span>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold capitalize ${STATUS_COLOR[ticketStatus?.toLowerCase()]}`}
              >
                {STATUS_MAP[ticketStatus?.toLowerCase()] || ticketStatus}
              </span>
            </div>
            <h2 className="text-2xl font-bold">{ticket.subject}</h2>
            <h3 className="text-l">{ticket.description}</h3>
            <div className="flex items-center gap-6 text-sm text-gray-500 flex-wrap">
              <span className="flex items-center gap-2"><User className="h-4 w-4" /> {ticket.created_by}</span>
              <span className="flex items-center gap-2"><UserCog className="h-4 w-4" /> {ticket.assigned_to || "No Assigned Yet"}</span>
              <span className="flex items-center gap-2"><Tag className="h-4 w-4" /> {CATEGORY_MAP[ticket.category?.toLowerCase()] || ticket.category}</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {formatTimestamp(ticket.created_at)}</span>
              <span className="flex items-center gap-2"><CalendarClock className="h-4 w-4" /> {ticket.close_at ? formatTimestamp(ticket.close_at) : "Not Closed Yet"}</span>
            </div>

            {/* Status Edit Section */}
              {canChangeStatus && (
                <div className="pt-2 flex items-center gap-2">
                  <select
                    value={ticketStatus}
                    onChange={handleStatusChange}
                    disabled={!editingStatus}
                    className={`
                      px-2 py-1 text-sm rounded
                      ${editingStatus
                        ? "border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300 cursor-pointer"
                        : "border-none bg-transparent appearance-none cursor-default pointer-events-none"
                      }
                    `}
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="on-hold">On Hold</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                    <option value="failed">Failed</option>
                  </select>

                  <button
                    onClick={handleStatusButtonClick}
                    className={`px-3 py-1 rounded text-white text-sm
                      ${editingStatus
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                      }
                    `}
                  >
                    {editingStatus ? "Save Status" : "Change Status"}
                  </button>
                </div>
              )}
          </div>

          <button className="p-2 hover:bg-gray-100 rounded" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Conversation Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {conversations.length === 0 ? (
            <div className="text-center text-gray-400 py-8">No messages yet</div>
          ) : (
            conversations.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.isInternal ? "bg-yellow-50 px-4 py-2 rounded" : ""}`}>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                  {getInitials(msg.sender)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">{msg.sender}</span>
                    <span className="text-gray-400">{msg.senderRole}</span>
                    <span className="text-gray-400 text-xs">{formatTimestamp(msg.timestamp)}</span>
                  </div>
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        <div className="p-6 border-t flex gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
            onClick={handleSendMessage}
          >
            <Send className="h-4 w-4" /> Send
          </button>
        </div>
      </div>
    </div>
  );
}
