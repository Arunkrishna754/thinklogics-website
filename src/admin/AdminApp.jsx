import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { ToastProvider } from "./components/Toast";
import RequireAuth from "./RequireAuth";
import AdminLayout from "./AdminLayout";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminResource from "./pages/AdminResource";
import AdminSettings from "./pages/AdminSettings";
import AdminEnrollments from "./pages/AdminEnrollments";
import NavbarSettings from "./pages/NavbarSettings";
import "./admin.css";

export default function AdminApp() {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="admin">
          <Routes>
            <Route path="login" element={<AdminLogin />} />
            <Route element={<RequireAuth />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="navbar" element={<NavbarSettings />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="enrollments" element={<AdminEnrollments />} />
                <Route path=":resource" element={<AdminResource />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}