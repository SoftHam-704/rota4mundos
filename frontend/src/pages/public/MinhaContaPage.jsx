import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { PenLine, Clock, CheckCircle, XCircle, BookOpen, Camera, FileText, MessageSquare, Plus, LogOut } from "lucide-react";
import { useAuthStore } from "../../stores/authStore.js";
import { contributionsApi } from "../../api/contributions.js";

const STATUS_CONFIG = {
    PENDENTE:    { label: "Pendente",    color: "#F4A261", bg: "rgba(244,162,97,0.1)",  border: "rgba(244,162,97,0.3)",  Icon: Clock },
    EM_REVISAO:  { label: "Em revisão",  color: "#60a5fa", bg: "rgba(96,165,250,0.1)",  border: "rgba(96,165,250,0.3)",  Icon: BookOpen },
    APROVADO:    { label: "Aprovado",    color: "#2A9D8F", bg: "rgba(42,157,143,0.1)",  border: "rgba(42,157,143,0.3)",  Icon: CheckCircle },
    PUBLICADO:   { label: "Publicado",   color: "#4ade80", bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.3)",  Icon: CheckCircle },
    REJEITADO:   { label: "Recusada",    color: "#F87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.3)", Icon: XCircle },
};

const TYPE_ICON = {
    ARTIGO:      FileText,
    FOTO:        Camera,
    CONTO:       BookOpen,
    DEPOIMENTO:  MessageSquare,
    OUTRO:       PenLine,
};

const TYPE_LABEL = {
    ARTIGO: "Artigo", FOTO: "Foto", CONTO: "Conto",
    DEPOIMENTO: "Depoimento", OUTRO: "Outro",
};

function StatusBadge({ status }) {
    const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.PENDENTE;
    const { Icon } = cfg;
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            padding: "4px 10px", borderRadius: "50px",
            fontSize: "11px", fontWeight: 600,
            fontFamily: "Inter, sans-serif",
            color: cfg.color,
            background: cfg.bg,
            border: `1px solid ${cfg.border}`,
        }}>
            <Icon size={11} /> {cfg.label}
        </span>
    );
}

export default function MinhaContaPage() {
    const { user, logout, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) { navigate("/"); return; }
        contributionsApi.minhas()
            .then(res => setContributions(res.data?.data ?? []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [isAuthenticated]);

    const handleLogout = () => { logout(); navigate("/"); };

    const stats = {
        total:     contributions.length,
        publicado: contributions.filter(c => c.status === "PUBLICADO").length,
        revisao:   contributions.filter(c => ["PENDENTE","EM_REVISAO","APROVADO"].includes(c.status)).length,
    };

    return (
        <div style={{ minHeight: "100vh", background: "#020d1a", paddingTop: "80px" }}>

            {/* Header */}
            <div style={{
                background: "linear-gradient(180deg, rgba(6,27,51,0.9) 0%, transparent 100%)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                paddingBottom: "32px",
            }}>
                <div className="container-rota" style={{ paddingTop: "40px" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                            <div style={{
                                width: "52px", height: "52px", borderRadius: "14px",
                                background: "linear-gradient(135deg, rgba(244,162,97,0.25), rgba(233,196,106,0.1))",
                                border: "1px solid rgba(244,162,97,0.3)",
                                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                            }}>
                                <PenLine size={22} style={{ color: "#F4A261" }} />
                            </div>
                            <div>
                                <h1 style={{
                                    fontFamily: '"Bebas Neue", sans-serif',
                                    fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
                                    color: "#fff", letterSpacing: "0.04em",
                                    margin: 0, lineHeight: 1,
                                }}>
                                    Olá, {user?.name?.split(" ")[0]}
                                </h1>
                                <p style={{
                                    fontSize: "13px", color: "rgba(255,255,255,0.4)",
                                    fontFamily: "Inter, sans-serif", margin: "4px 0 0",
                                }}>
                                    {user?.email} · Colaborador
                                </p>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "8px" }}>
                            <Link to="/colabore" style={{
                                display: "inline-flex", alignItems: "center", gap: "7px",
                                padding: "10px 20px", borderRadius: "10px",
                                background: "linear-gradient(135deg, #F4A261, #E9C46A)",
                                color: "#061B33", fontSize: "13px", fontWeight: 700,
                                fontFamily: "Inter, sans-serif", textDecoration: "none",
                            }}>
                                <Plus size={14} /> Nova colaboração
                            </Link>
                            <button onClick={handleLogout} style={{
                                display: "inline-flex", alignItems: "center", gap: "7px",
                                padding: "10px 16px", borderRadius: "10px",
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "rgba(255,255,255,0.5)", fontSize: "13px",
                                fontFamily: "Inter, sans-serif", cursor: "pointer",
                            }}>
                                <LogOut size={14} /> Sair
                            </button>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        style={{ display: "flex", gap: "12px", marginTop: "28px", flexWrap: "wrap" }}
                    >
                        {[
                            { label: "Enviadas",   value: stats.total,     color: "#F4A261" },
                            { label: "Publicadas", value: stats.publicado,  color: "#4ade80" },
                            { label: "Em revisão", value: stats.revisao,    color: "#60a5fa" },
                        ].map(s => (
                            <div key={s.label} style={{
                                padding: "14px 20px", borderRadius: "12px",
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                minWidth: "100px",
                            }}>
                                <div style={{
                                    fontFamily: '"Bebas Neue", sans-serif',
                                    fontSize: "1.8rem", color: s.color,
                                    lineHeight: 1, letterSpacing: "0.04em",
                                }}>
                                    {s.value}
                                </div>
                                <div style={{
                                    fontSize: "11px", color: "rgba(255,255,255,0.35)",
                                    fontFamily: "Inter, sans-serif", marginTop: "2px",
                                    letterSpacing: "0.05em",
                                }}>
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Lista de colaborações */}
            <div className="container-rota" style={{ paddingTop: "32px", paddingBottom: "60px" }}>
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                >
                    <h2 style={{
                        fontFamily: "Inter, sans-serif", fontSize: "13px",
                        fontWeight: 700, color: "rgba(255,255,255,0.35)",
                        letterSpacing: "0.15em", textTransform: "uppercase",
                        margin: "0 0 16px",
                    }}>
                        Minhas colaborações
                    </h2>

                    {loading ? (
                        <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif", fontSize: "13px" }}>
                            Carregando...
                        </div>
                    ) : contributions.length === 0 ? (
                        <div style={{
                            textAlign: "center", padding: "60px 24px",
                            borderRadius: "16px",
                            background: "rgba(255,255,255,0.02)",
                            border: "1px dashed rgba(255,255,255,0.08)",
                        }}>
                            <PenLine size={32} style={{ color: "rgba(255,255,255,0.15)", marginBottom: "12px" }} />
                            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.35)", fontFamily: "Inter, sans-serif", margin: "0 0 20px" }}>
                                Você ainda não enviou nenhuma colaboração
                            </p>
                            <Link to="/colabore" style={{
                                display: "inline-flex", alignItems: "center", gap: "7px",
                                padding: "10px 22px", borderRadius: "10px",
                                background: "linear-gradient(135deg, #F4A261, #E9C46A)",
                                color: "#061B33", fontSize: "13px", fontWeight: 700,
                                fontFamily: "Inter, sans-serif", textDecoration: "none",
                            }}>
                                <Plus size={14} /> Enviar primeira colaboração
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {contributions.map((c, i) => {
                                const TypeIcon = TYPE_ICON[c.type] ?? PenLine;
                                return (
                                    <motion.div
                                        key={c.id}
                                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                        style={{
                                            padding: "16px 20px",
                                            borderRadius: "12px",
                                            background: "rgba(255,255,255,0.03)",
                                            border: "1px solid rgba(255,255,255,0.07)",
                                            display: "flex", alignItems: "center",
                                            gap: "16px", flexWrap: "wrap",
                                        }}
                                    >
                                        <div style={{
                                            width: "36px", height: "36px", borderRadius: "9px", flexShrink: 0,
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                        }}>
                                            <TypeIcon size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
                                        </div>

                                        <div style={{ flex: 1, minWidth: "180px" }}>
                                            <p style={{
                                                fontSize: "14px", fontWeight: 600,
                                                color: "#fff", fontFamily: "Inter, sans-serif",
                                                margin: 0, lineHeight: 1.3,
                                            }}>
                                                {c.title}
                                            </p>
                                            <p style={{
                                                fontSize: "11px", color: "rgba(255,255,255,0.35)",
                                                fontFamily: "Inter, sans-serif", margin: "3px 0 0",
                                            }}>
                                                {TYPE_LABEL[c.type]} · {c.city} · {new Date(c.createdAt).toLocaleDateString("pt-BR")}
                                            </p>
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                                            <StatusBadge status={c.status} />
                                            {c.notes && (
                                                <span style={{
                                                    fontSize: "11px", color: "rgba(255,255,255,0.3)",
                                                    fontFamily: "Inter, sans-serif",
                                                    fontStyle: "italic", maxWidth: "200px",
                                                }}>
                                                    "{c.notes}"
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
