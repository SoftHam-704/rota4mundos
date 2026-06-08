import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock, Users, Search } from "lucide-react";
import { apiClient } from "../../api/client.js";

const ROLE_LABEL = { ADMIN: "Admin", EDITOR: "Editor", LEITOR: "Colaborador" };
const ROLE_COLOR = { ADMIN: "#F43F5E", EDITOR: "#60a5fa", LEITOR: "#F4A261" };

export default function AdminUsersPage() {
    const [users, setUsers]     = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch]   = useState("");
    const [filter, setFilter]   = useState("pending"); // pending | all

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await apiClient.get("/users", { params: { limit: 100 } });
            setUsers(res.data?.data ?? []);
        } catch {}
        finally { setLoading(false); }
    };

    useEffect(() => { fetchUsers(); }, []);

    const toggleActive = async (id, current) => {
        try {
            await apiClient.put(`/users/${id}`, { isActive: !current });
            setUsers(us => us.map(u => u.id === id ? { ...u, isActive: !current } : u));
        } catch {}
    };

    const filtered = users.filter(u => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                            u.email.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "all" ? true : !u.isActive;
        return matchSearch && matchFilter;
    });

    const pendingCount = users.filter(u => !u.isActive).length;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-display font-bold text-white">Colaboradores</h1>
                    <p className="text-white/50 text-sm mt-1">Gerencie contas e aprovações de acesso</p>
                </div>
                {pendingCount > 0 && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/25">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-400 text-sm font-semibold">{pendingCount} aguardando aprovação</span>
                    </div>
                )}
            </div>

            {/* Filtros */}
            <div className="flex gap-3 mb-6 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou e-mail..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 outline-none focus:border-amber-500/50"
                    />
                </div>
                <div className="flex gap-2">
                    {[
                        { id: "pending", label: "Pendentes" },
                        { id: "all",     label: "Todos" },
                    ].map(f => (
                        <button
                            key={f.id}
                            onClick={() => setFilter(f.id)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                filter === f.id
                                    ? "bg-white/10 text-white border border-white/15"
                                    : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                            }`}
                        >
                            {f.label}
                            {f.id === "pending" && pendingCount > 0 && (
                                <span className="ml-2 px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs">
                                    {pendingCount}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tabela */}
            {loading ? (
                <div className="text-center py-16 text-white/30 text-sm">Carregando...</div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-16 text-white/30">
                    <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">{filter === "pending" ? "Nenhum cadastro pendente" : "Nenhum usuário encontrado"}</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {filtered.map(u => (
                        <div
                            key={u.id}
                            className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                                !u.isActive
                                    ? "bg-amber-500/5 border-amber-500/20"
                                    : "bg-white/[0.02] border-white/7"
                            }`}
                        >
                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                                style={{ background: "rgba(244,162,97,0.15)", color: "#F4A261" }}>
                                {u.name.charAt(0).toUpperCase()}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-semibold truncate">{u.name}</p>
                                <p className="text-white/40 text-xs truncate">{u.email}</p>
                            </div>

                            {/* Role */}
                            <span className="text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0"
                                style={{
                                    color: ROLE_COLOR[u.role],
                                    background: `${ROLE_COLOR[u.role]}18`,
                                    border: `1px solid ${ROLE_COLOR[u.role]}30`,
                                }}>
                                {ROLE_LABEL[u.role]}
                            </span>

                            {/* Data */}
                            <span className="text-white/30 text-xs flex-shrink-0 hidden sm:block">
                                {new Date(u.createdAt).toLocaleDateString("pt-BR")}
                            </span>

                            {/* Status + ação */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                                {u.isActive ? (
                                    <>
                                        <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                                            <CheckCircle className="w-3.5 h-3.5" /> Ativo
                                        </span>
                                        <button
                                            onClick={() => toggleActive(u.id, u.isActive)}
                                            className="px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                                        >
                                            Suspender
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <span className="flex items-center gap-1.5 text-xs text-amber-400">
                                            <Clock className="w-3.5 h-3.5" /> Pendente
                                        </span>
                                        <button
                                            onClick={() => toggleActive(u.id, u.isActive)}
                                            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all"
                                        >
                                            Aprovar
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
