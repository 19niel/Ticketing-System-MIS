import { useState } from "react";
import { Send, Paperclip } from "lucide-react";

export default function NewTicket() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    priority: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ticket submitted:", form);
    // TODO: POST to backend API
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Create New Ticket</h1>
        <p className="text-gray-500">
          Submit a new support request
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-lg shadow">
        {/* Card Header */}
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Ticket Details</h2>
          <p className="text-sm text-gray-500">
            Provide as much detail as possible to help us assist you
          </p>
        </div>

        {/* Card Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Brief description of your issue"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-white"
                required
              >
                <option value="">Select category</option>
                <option value="hardware">Hardware</option>
                <option value="software">Software</option>
                <option value="network">Network</option>
                <option value="email">Email</option>
                <option value="account">Account</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-white"
                required
              >
                <option value="">Select priority</option>
                <option value="low">Low – Can wait</option>
                <option value="medium">Medium – Normal</option>
                <option value="high">High – Urgent</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Provide detailed information about your issue..."
              className="w-full min-h-[150px] border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Attachments</label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition">
              <Paperclip className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, PDF up to 10MB
              </p>
              {/* File input can be added later */}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
              Submit Ticket
            </button>

            <button
              type="button"
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
