import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, Camera, BookOpen, MessageSquare, Sparkles, CheckCircle2, ChevronDown } from "lucide-react";
import { contributionsApi } from "../../api/contributions.js";

const TYPES = [
    { value: "ARTIGO",     label: "Artigo",          icon: PenLine,      desc: "Texto jornalístico ou histórico sobre a cidade" },
    { value: "FOTO",       label: "Foto histórica",  icon: Camera,       desc: "Imagem antiga ou rara do acervo pessoal" },
    { value: "CONTO",      label: "Conto",            icon: BookOpen,     desc: "História, lenda ou memória ficcional" },
    { value: "DEPOIMENTO", label: "Depoimento",       icon: MessageSquare,desc: "Relato pessoal ou testemunho histórico" },
    { value: "OUTRO",      label: "Outro",            icon: Sparkles,     desc: "Qualquer contribuição que não se encaixe acima" },
];

const CITIES = [
    "Campo Grande", "Sidrolândia", "Jardim", "Bonito", "Porto Murtinho",
    "Carmelo Peralta", "Mariscal Estigarribia", "Filadelfia",
    "Tartagal", "Jujuy", "Salta",
    "Antofagasta", "Iquique", "Mejillones",
    "Outra cidade da rota",
];

const EMPTY = { name: "", email: "", city: "", type: "", title: "", content: "" };

export default function ColaborePage() {
    const [form, setForm]       = useState(EMPTY);
    const [loading, setLoading] = useState(false);
    const [sent, setSent]       = useState(false);
    const [error, setError]     = useState("");

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.type) { setError("Selecione o tipo de contribuição."); return; }
        setError("");
        setLoading(true);
        try {
            await contributionsApi.submit(form);
            setSent(true);
        } catch (err) {
            setError(err.response?.data?.message || "Erro ao enviar. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: "#080704", paddingTop: "72px" }}>

            {/* ── Hero ── */}
            <div style={{
                position: "relative",
                padding: "clamp(56px,10vw,96px) 0 clamp(40px,7vw,72px)",
                overflow: "hidden",
                background: "linear-gradient(180deg, #061B33 0%, #080704 100%)",
            }}>
                <div style={{
                    position: "absolute", inset: 0,
                    background: "radial-gradient(ellipse at 50% 0%, rgba(200,146,42,0.12) 0%, transparent 65%)",
                    pointerEvents: "none",
                }} />

                <div className="container-rota" style={{ textAlign: "center", position: "relative", zIndex: 1, padding: "0 1rem" }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <p style={{
                            fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em",
                            color: "#C8922A", textTransform: "uppercase",
                            fontFamily: "Inter, sans-serif", marginBottom: "16px",
                        }}>
                            Colabore com a Rota 4 Mundos
                        </p>
                        <h1 style={{
                            fontFamily: '"Bebas Neue", sans-serif',
                            fontSize: "clamp(2.6rem, 8vw, 5rem)",
                            color: "#F5EDD6", letterSpacing: "0.04em",
                            lineHeight: 0.95, margin: "0 0 20px",
                        }}>
                            Você conhece esta história<br />
                            <span style={{ color: "#C8922A" }}>melhor do que ninguém</span>
                        </h1>
                        <p style={{
                            fontFamily: '"Lora", Georgia, serif',
                            fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
                            fontStyle: "italic", color: "rgba(245,237,214,0.6)",
                            lineHeight: 1.75, maxWidth: "560px", margin: "0 auto",
                        }}>
                            Jornalistas, historiadores, fotógrafos, contadores de história —
                            a Rota 4 Mundos quer sua voz. Envie artigos, fotos históricas,
                            contos ou depoimentos e faça parte do maior portal do Corredor Bioceânico.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ── Formulário ── */}
            <div className="container-rota" style={{ padding: "clamp(40px,8vw,72px) 1rem", maxWidth: "720px" }}>
                <AnimatePresence mode="wait">
                    {sent ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                textAlign: "center", padding: "64px 32px",
                                background: "rgba(200,146,42,0.07)",
                                border: "1px solid rgba(200,146,42,0.25)",
                                borderRadius: "24px",
                            }}
                        >
                            <CheckCircle2 size={52} style={{ color: "#C8922A", margin: "0 auto 20px" }} />
                            <h2 style={{
                                fontFamily: '"Bebas Neue", sans-serif',
                                fontSize: "2rem", color: "#F5EDD6",
                                letterSpacing: "0.05em", marginBottom: "12px",
                            }}>
                                Contribuição recebida!
                            </h2>
                            <p style={{
                                fontFamily: '"Lora", Georgia, serif',
                                fontStyle: "italic", color: "rgba(245,237,214,0.6)",
                                fontSize: "15px", lineHeight: 1.7, maxWidth: "400px", margin: "0 auto",
                            }}>
                                Nossa equipe vai revisar seu envio e entrar em contato pelo e-mail informado.
                                Obrigado por preservar esta história.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            onSubmit={handleSubmit}
                            style={{ display: "flex", flexDirection: "column", gap: "28px" }}
                        >
                            {/* Tipo */}
                            <div>
                                <label style={labelStyle}>Tipo de contribuição *</label>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "10px", marginTop: "10px" }}>
                                    {TYPES.map(t => {
                                        const Icon = t.icon;
                                        const active = form.type === t.value;
                                        return (
                                            <button
                                                key={t.value}
                                                type="button"
                                                onClick={() => set("type", t.value)}
                                                style={{
                                                    display: "flex", flexDirection: "column",
                                                    alignItems: "flex-start", gap: "6px",
                                                    padding: "14px 16px", borderRadius: "14px",
                                                    border: active ? "1.5px solid rgba(200,146,42,0.7)" : "1px solid rgba(245,237,214,0.1)",
                                                    background: active ? "rgba(200,146,42,0.1)" : "rgba(245,237,214,0.03)",
                                                    cursor: "pointer", textAlign: "left",
                                                    transition: "all 0.18s",
                                                }}
                                            >
                                                <Icon size={18} style={{ color: active ? "#C8922A" : "rgba(245,237,214,0.4)" }} />
                                                <span style={{ fontSize: "13px", fontWeight: 700, color: active ? "#F5EDD6" : "rgba(245,237,214,0.6)", fontFamily: "Inter, sans-serif" }}>{t.label}</span>
                                                <span style={{ fontSize: "11px", color: "rgba(245,237,214,0.35)", fontFamily: "Inter, sans-serif", lineHeight: 1.4 }}>{t.desc}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Nome + Email */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                <div>
                                    <label style={labelStyle}>Seu nome *</label>
                                    <input required value={form.name} onChange={e => set("name", e.target.value)} placeholder="Como deseja ser creditado" style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>E-mail *</label>
                                    <input required type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="Para retornarmos o contato" style={inputStyle} />
                                </div>
                            </div>

                            {/* Cidade */}
                            <div>
                                <label style={labelStyle}>Cidade da contribuição *</label>
                                <div style={{ position: "relative" }}>
                                    <select required value={form.city} onChange={e => set("city", e.target.value)} style={{ ...inputStyle, appearance: "none", paddingRight: "36px" }}>
                                        <option value="">Selecione a cidade</option>
                                        {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    <ChevronDown size={16} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(245,237,214,0.4)", pointerEvents: "none" }} />
                                </div>
                            </div>

                            {/* Título */}
                            <div>
                                <label style={labelStyle}>Título *</label>
                                <input required value={form.title} onChange={e => set("title", e.target.value)} placeholder="Dê um título à sua contribuição" style={inputStyle} />
                            </div>

                            {/* Conteúdo */}
                            <div>
                                <label style={labelStyle}>Conteúdo *</label>
                                <textarea
                                    required rows={8}
                                    value={form.content}
                                    onChange={e => set("content", e.target.value)}
                                    placeholder="Escreva aqui o texto, descreva a foto ou conte sua história..."
                                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.65 }}
                                />
                                <p style={{ fontSize: "11px", color: "rgba(245,237,214,0.25)", fontFamily: "Inter, sans-serif", marginTop: "6px" }}>
                                    {form.content.length} caracteres · Fotos e arquivos podem ser enviados após o contato inicial
                                </p>
                            </div>

                            {error && (
                                <p style={{ fontSize: "13px", color: "#F87171", fontFamily: "Inter, sans-serif" }}>{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    padding: "15px 36px", borderRadius: "50px",
                                    background: loading ? "rgba(200,146,42,0.4)" : "linear-gradient(135deg, #C8922A, #E9C46A)",
                                    border: "none", cursor: loading ? "default" : "pointer",
                                    fontFamily: '"Bebas Neue", sans-serif',
                                    fontSize: "17px", letterSpacing: "0.1em",
                                    color: "#080704", alignSelf: "flex-start",
                                    boxShadow: loading ? "none" : "0 4px 24px rgba(200,146,42,0.35)",
                                    transition: "all 0.2s",
                                }}
                            >
                                {loading ? "Enviando..." : "Enviar Contribuição →"}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

const labelStyle = {
    display: "block",
    fontSize: "11px", fontWeight: 700,
    letterSpacing: "0.14em", textTransform: "uppercase",
    color: "rgba(245,237,214,0.5)",
    fontFamily: "Inter, sans-serif",
    marginBottom: "8px",
};

const inputStyle = {
    width: "100%", boxSizing: "border-box",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid rgba(245,237,214,0.12)",
    background: "rgba(245,237,214,0.05)",
    color: "#F5EDD6",
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
};
