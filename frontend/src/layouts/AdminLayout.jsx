import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore.js";
import AdminSidebar from "../components/admin/AdminSidebar.jsx";

export default function AdminLayout() {
    const { isAuthenticated, user, isLoading } = useAuthStore();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
            </div>
        );
    }

    if (!isAuthenticated || (user?.role !== "ADMIN" && user?.role !== "EDITOR")) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen flex bg-slate-50">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
