    import { useState } from "react";
    import { Search, UserPlus, Edit, Trash2 } from "lucide-react";

    export default function Users() {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    // TEMP DATA (replace with API later)
    const users = [
        {
        id: 1,
        name: "Nathaniel Talag",
        email: "admin@ubix.com.ph",
        role: "Admin",
        status: "Active",
        initials: "NT",
        },
        {
        id: 2,
        name: "Tech Support",
        email: "techsupport@ubix.com.ph",
        role: "Tech Support",
        status: "Active",
        initials: "TS",
        },
        {
        id: 3,
        name: "Akahon Ting",
        email: "accounting@ubix.com.ph",
        role: "Employee",
        status: "Inactive",
        initials: "AT",
        },
    ];

    const getRoleColor = (role) => {
        switch (role) {
        case "Admin":
            return "bg-red-100 text-red-700";
        case "Tech Support":
            return "bg-blue-100 text-blue-700";
        case "Employee":
            return "bg-gray-100 text-gray-700";
        default:
            return "bg-gray-100";
        }
    };

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

        const matchesRole =
        roleFilter === "all" || user.role === roleFilter;

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
        <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow ">
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
            <option value="Admin">Admin</option>
            <option value="Tech Support">Tech Support</option>
            <option value="Employee">Employee</option>
            </select>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full border-collapse">
            <thead className="bg-gray-50 text-left text-sm text-gray-500">
                <tr>
                <th className="px-6 py-3">User</th>
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
                    <td className="px-6 py-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center">
                        {user.initials}
                    </div>
                    <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">
                        {user.email}
                        </p>
                    </div>
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
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                    >
                        {user.status}
                    </span>
                    </td>

                    <td className="px-6 py-4 text-right space-x-2">
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
                    colSpan="4"
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
