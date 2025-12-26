import { useState, useEffect } from "react";
import { Search, UserPlus, Edit, Trash2 } from "lucide-react";

export default function Users() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [users, setUsers] = useState([]);

  // ✅ Fetch users ONCE
  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700";
      case "tech_support":
        return "bg-blue-100 text-blue-700";
      case "employee":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusBadge = (isActive) =>
    isActive
      ? "bg-green-100 text-green-700"
      : "bg-gray-200 text-gray-600";

  // ✅ Filtering logic
  const filteredUsers = users.filter((user) => {
  const searchTerm = search.toLowerCase();

  const searchableText = [
    user.employee_id,
    user.name,
    user.email,
    user.position,
    user.department,
    user.role,
    user.is_active ? "active" : "inactive",
  ]
    .join(" ")
    .toLowerCase();

  const matchesSearch = searchableText.includes(searchTerm);
  const matchesRole = roleFilter === "all" || user.role === roleFilter;

  return matchesSearch && matchesRole;
});

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-sm text-gray-500">
            Manage user accounts and permissions
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="tech_support">Tech Support</option>
          <option value="employee">Employee</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 text-left text-sm text-gray-500">
            <tr>
              <th className="px-6 py-3">Employee ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Position</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-mono">
                  {user.employee_id}
                </td>

                <td className="px-6 py-4 font-medium">
                  {user.name}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  {user.position}
                </td>

                <td className="px-6 py-4">
                  {user.department}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                      user.is_active
                    )}`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4 text-right space-x-1">
                  <button className="p-2 border rounded hover:bg-gray-100">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 border rounded hover:bg-gray-100 text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-8 text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
