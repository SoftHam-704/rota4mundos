import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore.js";
import {
    LayoutDashboard,
    Building2,
    FileText,
    Mail,
    Settings,
    LogOut,
    Globe,
    ChevronRight,
} from "lucide-react";

const menuItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/cidades", label: "Cidades", icon: Building2 },
    { to: "/admin/artigos", label: "Artigos", icon: FileText },
    { to: "/admin/newsletter", label: "Newsletter", icon: Mail },
];

export default function AdminSidebar() {
    const { user, logout } = useAuthStore();
    const location = useLocation();

    const isActive = (path) => {
        if (path === "/admin") return location.pathname === "/admin";
        return location.pathname.startsWith(path);
    };

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-primary-950 text-white z-40 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <span className="font-display font-bold text-lg">Admin</span>
                        <span className="block text-xs text-white/50">Rota Bioceânica</span>
                    </div>
                </Link>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive(item.to)
                                ? "bg-white/10 text-white"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                        {isActive(item.to) && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </Link>
                ))}
            </nav>

            {/* User */}
            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-400 to-orange-400 flex items-center justify-center font-bold text-primary-900">
                        {user?.name?.charAt(0) || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user?.name}</p>
                        <p className="text-xs text-white/50 capitalize">{user?.role?.toLowerCase()}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                    <LogOut className="w-4 h-4" />
                    Sair
                </button>
                <Link
                    to="/"
                    className="mt-2 w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                    <Globe className="w-4 h-4" />
                    Ver site
                </Link>
            </div>
        </aside>
    );
}
