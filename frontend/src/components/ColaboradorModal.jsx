import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight, PenLine, Newspaper, CheckCircle, Clock } from "lucide-react";
import { useAuthStore } from "../stores/authStore.js";
import { useNavigate } from "react-router-dom";

const OVERLAY = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
    transition: { duration: 0.2 },
};

const CARD = {
    initial: { opacity: 0, y: 32, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit:    { opacity: 0, y: 20, scale: 0.97 },
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
};

function Input({ icon: Icon, type = "text", placeholder, value, onChange, right }) {
    return (
        <div style={{ position: "relative" }}>
            <Icon size={15} style={{
                position: "absolute", left: "14px", top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(255,255,255,0.3)", pointerEvents: "none",
            }} />
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{
                    width: "100%", boxSizing: "border-box",
                    padding: "12px 14px 12px 40px",
                    paddingRight: right ? "44px" : "14px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff", fontSize: "13px",
                    fontFamily: "Inter, sans-serif",
                    outline: "none",
                    transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(244,162,97,0.5)"}
                onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
            {right}
        </div>
    );
}

export default function ColaboradorModal({ onClose }) {
    const [tab, setTab]           = useState("login");
    const [showPass, setShowPass] = useState(false);
    const [error, setError]       = useState("");
    const [loading, setLoading]   = useState(false);
    const [registered, setRegistered] = useState(false);

    const [loginForm, setLoginForm]       = useState({ email: "", password: "" });
    const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "" });

    const { login, register } = useAuthStore();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); setLoading(true);
        const res = await login(loginForm);
        setLoading(false);
        if (!res.success) { setError(res.error); return; }
        onClose();
        const role = useAuthStore.getState().user?.role;
        navigate(role === "ADMIN" || role === "EDITOR" ? "/admin" : "/minha-conta");
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        if (registerForm.password.length < 8) {
            setError("A senha deve ter ao menos 8 caracteres."); return;
        }
        setLoading(true);
        const res = await register(registerForm);
        setLoading(false);
        if (!res.success) { setError(res.error); return; }
        setRegistered(true);
    };

    const eyeBtn = (
        <button
            type="button"
            onClick={() => setShowPass(v => !v)}
            style={{
                position: "absolute", right: "12px", top: "50%",
                transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.3)", padding: "2px",
            }}
        >
            {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
    );

    return (
        <AnimatePresence>
            <motion.div
                {...OVERLAY}
                onClick={onClose}
                style={{
                    position: "fixed", inset: 0, zIndex: 200,
                    background: "rgba(2,13,26,0.85)",
                    backdropFilter: "blur(12px)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "20px",
                }}
            >
                <motion.div
                    {...CARD}
                    onClick={e => e.stopPropagation()}
                    style={{
                        width: "100%", maxWidth: "420px",
                        background: "linear-gradient(160deg, rgba(6,27,51,0.98), rgba(2,13,26,0.99))",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "20px",
                        boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(244,162,97,0.06)",
                        overflow: "hidden",
                    }}
                >
                    {/* Tela de sucesso pós-cadastro */}
                    {registered && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            style={{ padding: "40px 28px", textAlign: "center" }}
                        >
                            <div style={{
                                width: "56px", height: "56px", borderRadius: "16px", margin: "0 auto 16px",
                                background: "linear-gradient(135deg, rgba(42,157,143,0.25), rgba(42,157,143,0.1))",
                                border: "1px solid rgba(42,157,143,0.4)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <Clock size={26} style={{ color: "#2A9D8F" }} />
                            </div>
                            <h3 style={{
                                fontFamily: '"Bebas Neue", sans-serif',
                                fontSize: "1.5rem", color: "#fff",
                                letterSpacing: "0.05em", margin: "0 0 8px",
                            }}>
                                Cadastro enviado!
                            </h3>
                            <p style={{
                                fontSize: "13px", color: "rgba(255,255,255,0.5)",
                                fontFamily: "Inter, sans-serif", lineHeight: 1.6,
                                margin: "0 0 24px", maxWidth: "280px", marginLeft: "auto", marginRight: "auto",
                            }}>
                                Sua conta está sendo analisada. Você receberá acesso assim que o administrador aprovar seu cadastro.
                            </p>
                            <button
                                onClick={onClose}
                                style={{
                                    padding: "11px 28px", borderRadius: "10px",
                                    background: "linear-gradient(135deg, #F4A261, #E9C46A)",
                                    border: "none", cursor: "pointer",
                                    color: "#061B33", fontSize: "13px", fontWeight: 700,
                                    fontFamily: "Inter, sans-serif",
                                }}
                            >
                                Entendido
                            </button>
                        </motion.div>
                    )}

                    {/* Formulários — ocultos após cadastro bem-sucedido */}
                    {!registered && <><div style={{
                        padding: "24px 24px 0",
                        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
                    }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                                <div style={{
                                    width: "32px", height: "32px", borderRadius: "9px",
                                    background: "linear-gradient(135deg, rgba(244,162,97,0.25), rgba(233,196,106,0.1))",
                                    border: "1px solid rgba(244,162,97,0.3)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <PenLine size={15} style={{ color: "#F4A261" }} />
                                </div>
                                <span style={{
                                    fontSize: "16px", fontWeight: 700,
                                    color: "#fff", fontFamily: "Inter, sans-serif",
                                }}>
                                    Área do Colaborador
                                </span>
                            </div>
                            <p style={{
                                fontSize: "12px", color: "rgba(255,255,255,0.4)",
                                fontFamily: "Inter, sans-serif", margin: 0,
                            }}>
                                Envie histórias, matérias e conteúdo sobre a Rota
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "8px", width: "32px", height: "32px",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                cursor: "pointer", color: "rgba(255,255,255,0.5)", flexShrink: 0,
                            }}
                        >
                            <X size={15} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div style={{ padding: "20px 24px 0" }}>
                        <div style={{
                            display: "flex", gap: "4px",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            borderRadius: "10px", padding: "4px",
                        }}>
                            {[
                                { id: "login",    label: "Entrar" },
                                { id: "register", label: "Criar conta" },
                            ].map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => { setTab(t.id); setError(""); }}
                                    style={{
                                        flex: 1, padding: "8px",
                                        borderRadius: "7px",
                                        border: "none", cursor: "pointer",
                                        fontFamily: "Inter, sans-serif",
                                        fontSize: "13px", fontWeight: tab === t.id ? 700 : 500,
                                        background: tab === t.id
                                            ? "linear-gradient(135deg, rgba(244,162,97,0.2), rgba(233,196,106,0.1))"
                                            : "transparent",
                                        color: tab === t.id ? "#F4A261" : "rgba(255,255,255,0.4)",
                                        border: tab === t.id ? "1px solid rgba(244,162,97,0.25)" : "1px solid transparent",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Forms */}
                    <div style={{ padding: "20px 24px 24px" }}>
                        <AnimatePresence mode="wait">
                            {tab === "login" ? (
                                <motion.form
                                    key="login"
                                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.18 }}
                                    onSubmit={handleLogin}
                                    style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                                >
                                    <Input
                                        icon={Mail} type="email" placeholder="Seu e-mail"
                                        value={loginForm.email}
                                        onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                                    />
                                    <Input
                                        icon={Lock} type={showPass ? "text" : "password"} placeholder="Senha"
                                        value={loginForm.password}
                                        onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                                        right={eyeBtn}
                                    />

                                    {error && (
                                        <p style={{ fontSize: "12px", color: "#F87171", fontFamily: "Inter, sans-serif", margin: 0 }}>
                                            {error}
                                        </p>
                                    )}

                                    <button
                                        type="submit" disabled={loading}
                                        style={{
                                            marginTop: "4px",
                                            padding: "13px",
                                            borderRadius: "10px",
                                            background: "linear-gradient(135deg, #F4A261, #E9C46A)",
                                            border: "none", cursor: loading ? "default" : "pointer",
                                            color: "#061B33", fontSize: "13px", fontWeight: 700,
                                            fontFamily: "Inter, sans-serif",
                                            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                                            opacity: loading ? 0.7 : 1,
                                            transition: "opacity 0.2s",
                                        }}
                                    >
                                        {loading ? "Entrando..." : <><ArrowRight size={14} /> Entrar</>}
                                    </button>
                                </motion.form>
                            ) : (
                                <motion.form
                                    key="register"
                                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.18 }}
                                    onSubmit={handleRegister}
                                    style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                                >
                                    <Input
                                        icon={User} placeholder="Seu nome completo"
                                        value={registerForm.name}
                                        onChange={e => setRegisterForm(f => ({ ...f, name: e.target.value }))}
                                    />
                                    <Input
                                        icon={Mail} type="email" placeholder="Seu e-mail"
                                        value={registerForm.email}
                                        onChange={e => setRegisterForm(f => ({ ...f, email: e.target.value }))}
                                    />
                                    <Input
                                        icon={Lock} type={showPass ? "text" : "password"} placeholder="Senha (mín. 8 caracteres)"
                                        value={registerForm.password}
                                        onChange={e => setRegisterForm(f => ({ ...f, password: e.target.value }))}
                                        right={eyeBtn}
                                    />

                                    {error && (
                                        <p style={{ fontSize: "12px", color: "#F87171", fontFamily: "Inter, sans-serif", margin: 0 }}>
                                            {error}
                                        </p>
                                    )}

                                    <button
                                        type="submit" disabled={loading}
                                        style={{
                                            marginTop: "4px",
                                            padding: "13px",
                                            borderRadius: "10px",
                                            background: "linear-gradient(135deg, #F4A261, #E9C46A)",
                                            border: "none", cursor: loading ? "default" : "pointer",
                                            color: "#061B33", fontSize: "13px", fontWeight: 700,
                                            fontFamily: "Inter, sans-serif",
                                            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                                            opacity: loading ? 0.7 : 1,
                                            transition: "opacity 0.2s",
                                        }}
                                    >
                                        {loading ? "Criando conta..." : <><PenLine size={14} /> Criar conta de colaborador</>}
                                    </button>

                                    <p style={{
                                        fontSize: "11px", color: "rgba(255,255,255,0.3)",
                                        fontFamily: "Inter, sans-serif", textAlign: "center", margin: 0,
                                    }}>
                                        Ao criar uma conta você poderá enviar e acompanhar suas colaborações
                                    </p>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        {/* Divider + info */}
                        <div style={{
                            marginTop: "20px", paddingTop: "16px",
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                            display: "flex", alignItems: "center", gap: "10px",
                        }}>
                            <div style={{
                                width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <Newspaper size={14} style={{ color: "rgba(255,255,255,0.3)" }} />
                            </div>
                            <p style={{
                                fontSize: "11px", color: "rgba(255,255,255,0.3)",
                                fontFamily: "Inter, sans-serif", margin: 0, lineHeight: 1.5,
                            }}>
                                Colabore com artigos, contos, fotos e depoimentos sobre a Rota Bioceânica
                            </p>
                        </div>
                    </div>
                    </>}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
