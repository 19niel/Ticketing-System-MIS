import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  
    const user = null 
    return user ? <Outlet/> : <Navigate to="/"/>
  
}

export default ProtectedRoute



// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");
//   const roleId = localStorage.getItem("role_id");

//   // 🔍 TEST LOGS for getting the token and the role ID
//   // console.log("JWT Token:", token);
//   console.log("Role ID:", roleId);

//   // Temporary: allow access even if missing (for testing)  
//   return children;
// }
