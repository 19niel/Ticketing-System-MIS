import { useState } from "react";
import { X, Send, Clock, User, Tag } from "lucide-react";

export default function ViewTicket({ ticket, onClose, userRole }) {
  const [newMessage, setNewMessage] = useState("");
  const [ticketStatus, setTicketStatus] = useState(ticket.status);
  const [conversations, setConversations] = useState(ticket.conversations || []);

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
      case "in-progress":
        return "bg-yellow-100 text-yellow-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      case "closed":
        return "bg-gray-100 text-gray-700";
      case "failed":
        return "bg-red-100 text-red-700";
      case "on-hold":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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
    if (newMessage.trim()) {
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
    }
  };

  const handleStatusChange = (e) => {
    setTicketStatus(e.target.value);
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
              <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${getStatusColor(ticketStatus)}`}>
                {ticketStatus}
              </span>
            </div>
            <h2 className="text-2xl font-bold">{ticket.subject}</h2>
            <div className="flex items-center gap-6 text-sm text-gray-500 flex-wrap">
              <span className="flex items-center gap-2"><User className="h-4 w-4" /> {ticket.created_by}</span>
              <span className="flex items-center gap-2"><Tag className="h-4 w-4" /> {ticket.category}</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {formatTimestamp(ticket.created_at)}</span>
            </div>
            {canChangeStatus && (
              <div className="pt-2">
                <select
                  value={ticketStatus}
                  onChange={handleStatusChange}
                  className="border rounded px-2 py-1"
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="on-hold">On Hold</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            )}
          </div>
          <button
            className="p-2 hover:bg-gray-100 rounded"
            onClick={onClose}
          >
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
