import { useState } from "react";
import { Send, Paperclip } from "lucide-react";
import { toast } from "sonner"; // Assuming you use sonner for notifications

export default function NewTicket() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    subject: "",
    category_id: "",
    priority_id: "",
    description: "",
  });

  // Update form values
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Disable the button immediately
    setIsSubmitting(true);

    // Get current user from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData?.employee_id) {
      toast.error("User session invalid. Please login again.");
      setIsSubmitting(false);
      return;
    }

    const employeeId = userData.employee_id;

    const ticketNumber = `TKT-${String(Math.floor(Math.random() * 9999999) + 1).padStart(7, "0")}`;

    const ticketPayload = {
      ticket_id: null,
      ticket_number: ticketNumber,
      subject: form.subject,
      description: form.description,
      created_at: new Date().toISOString(),
      created_by: `${employeeId}`,
      assigned_to: null,
      status: "open",
      priority: Number(form.priority_id),
      category: Number(form.category_id),
    };

    console.log("📝 New Ticket Payload:", ticketPayload);
    

    // Set a timeout for toast and to re-enable the button after 1.5 seconds
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Ticket submitted successfully!");

        setForm({
        subject: "",
        category_id: "",
        priority_id: "",
        description: "",
      });
    }, 1000);


  
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Create New Ticket</h1>
        <p className="text-gray-500">Submit a new support request</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Ticket Details</h2>
          <p className="text-sm text-gray-500">
            Provide as much detail as possible to help us assist you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Subject */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Subject</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
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
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-white"
                required
              >
                <option value="">Select category</option>
                <option value="1">Hardware</option>
                <option value="2">Software</option>
                <option value="3">Network</option>
                <option value="4">Email</option>
                <option value="5">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Priority</label>
              <select
                name="priority_id"
                value={form.priority_id}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-white"
                required
              >
                <option value="">Select priority</option>
                <option value="1">Low – Can wait</option>
                <option value="2">Medium – Normal</option>
                <option value="3">High – Urgent</option>
                <option value="4">Critical – ASAP</option>
                <option value="5">Emergency – Urgent</option>
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
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded transition-all ${
                isSubmitting 
                  ? "bg-gray-400 cursor-not-allowed text-white" 
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Submitting..." : "Submit Ticket"}
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}