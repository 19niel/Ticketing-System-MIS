import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/me", {
          credentials: "include", // send cookie
        });

        if (!res.ok) {
          setUserRole(null);
        } else {
          const data = await res.json();
          setUserRole(data.user.role_id);
        }
      } catch (err) {
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return null; // or a spinner

  if (!userRole) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (allowedRole && allowedRole !== userRole) {
    switch (userRole) {
      case 1:
        return <Navigate to="/admin" replace />;
      case 2:
        return <Navigate to="/techsupport" replace />;
      case 3:
        return <Navigate to="/employee" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
}