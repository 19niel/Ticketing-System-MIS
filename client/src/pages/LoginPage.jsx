import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // ✅ Save auth data
      localStorage.setItem("token", data.token);
      localStorage.setItem("role_id", data.user.role_id);

      // ✅ Save user info for Header.jsx
      localStorage.setItem(
        "user",
        JSON.stringify({
          fullName: `${data.user.first_name} ${data.user.last_name}`,
          role:
            data.user.role_id === 1
              ? "admin"
              : data.user.role_id === 2
              ? "techsupport"
              : "employee",
        })
      );

      // ✅ Role-based navigation
      switch (data.user.role_id) {
        case 1:
          navigate("/admin", { replace: true });
          break;
        case 2:
          navigate("/techsupport", { replace: true });
          break;
        case 3:
          navigate("/employee", { replace: true });
          break;
        default:
          alert("Unknown role");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          UBIX Help Desk
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700 transition">
            Sign In
          </button>
        </form>

        <h3 className="text-xs text-gray-400 mt-6 text-right">
          Powered by U-BIX Corporation MIS Department
        </h3>
      </div>
    </div>
  );
}
