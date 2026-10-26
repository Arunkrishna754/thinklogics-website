import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAuth() {
  const { user, loading } = useAuth();
  if (loading) return <div className="splash" role="status">Checking your session</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}