import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Building2, Landmark, ArrowRight, CheckCircle, Loader2, Globe, MapPin, Users, TrendingUp, Zap } from "lucide-react";
import { sponsorApi } from "../../api/sponsors.js";
import { useIsMobile } from "../../hooks/useMediaQuery.js";

const TYPES = [
    {
        value: "INDIVIDUAL",
        label: "Apoiador Individual",
        sublabel: "Pessoa física que acredita no projeto",
        icon: Heart,
        accent: "#2A9D8F",
        accentRgb: "42,157,143",
        glow: "rgba(42,157,143,0.18)",
        border: "rgba(42,157,143,0.4)",
    },
    {
        value: "EMPRESARIAL",
        label: "Patrocinador Empresarial",
        sublabel: "Empresa, hotel, operadora ou comércio",
        icon: Building2,
        accent: "#F4A261",
        accentRgb: "244,162,97",
        glow: "rgba(244,162,97,0.18)",
        border: "rgba(244,162,97,0.4)",
    },
    {
        value: "INSTITUCIONAL",
        label: "Parceiro Institucional",
        sublabel: "Prefeitura, câmara, secretaria ou entidade",
        icon: Landmark,
        accent: "#818cf8",
        accentRgb: "129,140,248",
        glow: "rgba(129,140,248,0.18)",
        border: "rgba(129,140,248,0.4)",
    },
];

const BENEFITS = {
    INDIVIDUAL: [
        { icon: "✦", text: "Seu nome no mural permanente de apoiadores" },
        { icon: "✦", text: "Newsletter exclusiva com bastidores editoriais" },
        { icon: "✦", text: "Acesso antecipado a guias e conteúdos premium" },
        { icon: "✦", text: "Parte da história de integração da América do Sul" },
    ],
    EMPRESARIAL: [
        { icon: "✦", text: "Presença de marca no portal de maior visibilidade da rota" },
        { icon: "✦", text: "Conteúdo editorial associado à sua empresa" },
        { icon: "✦", text: "Audiência qualificada: viajantes, investidores e gestores" },
        { icon: "✦", text: "Posicionamento antes do pico de atenção de 2026" },
        { icon: "✦", text: "Formatos personalizados: banner, artigo patrocinado, guia de cidade" },
    ],
    INSTITUCIONAL: [
        { icon: "✦", text: "Vitrine institucional para sua cidade ou entidade" },
        { icon: "✦", text: "Narrativa contemporânea sobre sua região" },
        { icon: "✦", text: "Visibilidade junto a turistas, investidores e imprensa" },
        { icon: "✦", text: "Cobertura editorial das iniciativas locais" },
        { icon: "✦", text: "Conexão com câmaras de comércio dos 4 países" },
    ],
};

const STATS = [
    { icon: Globe,     value: "4",      label: "Países conectados" },
    { icon: MapPin,    value: "13",     label: "Cidades no portal" },
    { icon: Users,     value: "3.500",  label: "Km de corredor" },
    { icon: TrendingUp,value: "2026",   label: "Janela estratégica" },
];

const OPPS = [
    { n: "01", accent: "#F4A261", title: "Janela de 2026", text: "A conclusão da rota cria um pico de atenção sem precedente. Quem entra antes captura autoridade, audiência e parceiros." },
    { n: "02", accent: "#2A9D8F", title: "Lacuna de mercado", text: "Nenhuma plataforma trata a rota sob o ângulo humano. Este portal nasce para liderar essa categoria." },
    { n: "03", accent: "#818cf8", title: "Audiência qualificada", text: "Viajantes, investidores e gestores públicos. Não é um site genérico — é o hub de quem decide sobre o corredor." },
];

export default function ApoiePage() {
    const isMobile = useIsMobile();
    const [searchParams] = useSearchParams();
    const [type, setType]     = useState(searchParams.get("tipo") || "EMPRESARIAL");
    const [form, setForm]     = useState({ name: "", email: "", organization: "", message: "" });
    const [status, setStatus] = useState("idle");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const t = searchParams.get("tipo");
        if (t && TYPES.find(x => x.value === t)) setType(t);
    }, [searchParams]);

    const activeType = TYPES.find(t => t.value === type);

    function handleChange(e) {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.name || !form.email) return;
        setStatus("loading");
        setErrorMsg("");
        try {
            await sponsorApi.submitInterest({ ...form, type });
            setStatus("success");
            setForm({ name: "", email: "", organization: "", message: "" });
        } catch (err) {
            setStatus("error");
            setErrorMsg(err?.response?.data?.message || "Erro ao enviar. Tente novamente.");
        }
    }

    const inputStyle = {
        width: "100%", padding: "13px 16px",
        borderRadius: "12px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#fff", fontSize: "14px",
        fontFamily: "Inter, sans-serif",
        outline: "none", boxSizing: "border-box",
        transition: "border-color 0.2s, background 0.2s",
    };

    return (
        <div style={{ background: "#020d1a", minHeight: "100vh" }}>

            {/* ── HERO ── */}
            <section style={{
                background: "linear-gradient(160deg, #061B33 0%, #031020 60%, #020d1a 100%)",
                padding: "130px 0 80px", textAlign: "center",
                position: "relative", overflow: "hidden",
            }}>
                {/* glows decorativos */}
                <div style={{ position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)", width: "1000px", height: "600px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(42,157,143,0.09) 0%, transparent 65%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-120px", right: "-80px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(244,162,97,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(129,140,248,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />

                {/* linha de rota decorativa */}
                <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(244,162,97,0.08) 20%, rgba(42,157,143,0.12) 50%, rgba(244,162,97,0.08) 80%, transparent 100%)", pointerEvents: "none" }} />

                <div className="container-rota" style={{ position: "relative" }}>

                    {/* badge urgência */}
                    <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "10px", fontWeight: 700, color: "#F4A261", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", marginBottom: "28px", background: "rgba(244,162,97,0.1)", padding: "6px 18px", borderRadius: "100px", border: "1px solid rgba(244,162,97,0.22)" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F4A261", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
                            Janela de captação aberta — 2026 está chegando
                        </span>
                    </motion.div>

                    {/* bandeiras dos 4 países */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "32px" }}
                    >
                        {["🇧🇷", "🇵🇾", "🇦🇷", "🇨🇱"].map((flag, i) => (
                            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                                <span style={{ fontSize: "22px", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))" }}>{flag}</span>
                                {i < 3 && <span style={{ width: "24px", height: "1px", background: "rgba(255,255,255,0.15)", display: "inline-block" }} />}
                            </span>
                        ))}
                    </motion.div>

                    {/* H1 */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "clamp(3rem, 8.5vw, 7rem)", color: "#fff", lineHeight: 0.9, letterSpacing: "0.04em", marginBottom: "32px" }}
                    >
                        EM 2026, TODOS VÃO<br />
                        QUERER DIZER QUE<br />
                        <span style={{ color: "#2A9D8F" }}>ESTAVAM AQUI<br />DESDE O INÍCIO.</span>
                    </motion.h1>

                    {/* subtítulo com 3 linhas de impacto */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                        style={{ maxWidth: "560px", margin: "0 auto 40px" }}
                    >
                        <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, fontFamily: "Inter, sans-serif", marginBottom: "20px" }}>
                            A Rota Bioceânica conecta o Atlântico ao Pacífico atravessando <strong style={{ color: "rgba(255,255,255,0.75)" }}>Brasil, Paraguai, Argentina e Chile</strong>. O maior corredor de integração da América do Sul já tem data. Falta o seu nome nele.
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
                            {["Viajantes", "Investidores", "Prefeituras", "Empresas", "Imprensa"].map((tag, i) => (
                                <span key={i} style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "100px", padding: "3px 12px" }}>{tag}</span>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.45 }}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", flexWrap: "wrap", marginBottom: "60px" }}
                    >
                        <a
                            href="#formulario"
                            onClick={e => { e.preventDefault(); document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" }); }}
                            style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "15px 32px", borderRadius: "14px", background: "linear-gradient(135deg, #F4A261, #E9C46A)", color: "#061B33", fontSize: "13px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", textDecoration: "none", boxShadow: "0 8px 28px rgba(244,162,97,0.3)", transition: "opacity 0.2s, transform 0.2s" }}
                            onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
                        >
                            Quero fazer parte <ArrowRight size={15} />
                        </a>
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", fontFamily: "Inter, sans-serif" }}>
                            Sem compromisso financeiro nesta etapa
                        </span>
                    </motion.div>

                    {/* Stats strip */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }}
                        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0", padding: "28px 0 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}
                    >
                        {STATS.map((s, i) => (
                            <div key={i} style={{ textAlign: "center", padding: "0 36px", borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                                <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "2.6rem", color: "#F4A261", letterSpacing: "0.04em", lineHeight: 1 }}>{s.value}</div>
                                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.28)", fontFamily: "Inter, sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "4px" }}>{s.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── FORMULÁRIO — destaque principal ── */}
            <section id="formulario" style={{ padding: "0 0 100px", position: "relative", overflow: "hidden" }}>
                {/* glow dinâmico que acompanha o tipo selecionado */}
                <motion.div
                    key={type}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    style={{ position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)", width: "1000px", height: "600px", borderRadius: "50%", background: `radial-gradient(ellipse, ${activeType?.glow} 0%, transparent 65%)`, pointerEvents: "none" }}
                />

                <div className="container-rota" style={{ position: "relative" }}>

                    {/* título da seção */}
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: "center", padding: "72px 0 56px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: activeType?.accent, letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", display: "block", marginBottom: "14px", transition: "color 0.3s" }}>
                            Manifeste seu interesse
                        </span>
                        <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff", letterSpacing: "0.04em", lineHeight: 1, marginBottom: "16px" }}>
                            ESCOLHA COMO<br />
                            <motion.span key={type} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} style={{ color: activeType?.accent }}>
                                VOCÊ FAZ PARTE
                            </motion.span>
                        </h2>
                        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.35)", fontFamily: "Inter, sans-serif", maxWidth: "420px", margin: "0 auto" }}>
                            Sem compromisso financeiro nesta etapa — estamos mapeando quem acredita no projeto.
                        </p>
                    </motion.div>

                    {/* type selector — 3 cards grandes */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginBottom: "48px" }}>
                        {TYPES.map(({ value, label, sublabel, icon: Icon, accent, glow, border }) => {
                            const active = type === value;
                            return (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setType(value)}
                                    style={{
                                        display: "flex", flexDirection: "column", alignItems: "flex-start",
                                        gap: "10px", padding: "20px 22px",
                                        borderRadius: "16px", cursor: "pointer", textAlign: "left",
                                        border: `1px solid ${active ? border : "rgba(255,255,255,0.07)"}`,
                                        background: active ? glow : "rgba(255,255,255,0.02)",
                                        boxShadow: active ? `0 0 32px ${glow}` : "none",
                                        transition: "all 0.3s",
                                    }}
                                >
                                    <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: active ? `rgba(${TYPES.find(t=>t.value===value)?.accentRgb},0.2)` : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>
                                        <Icon size={17} style={{ color: active ? accent : "rgba(255,255,255,0.3)", transition: "color 0.3s" }} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "13px", fontWeight: 700, color: active ? accent : "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif", marginBottom: "3px", transition: "color 0.3s" }}>{label}</div>
                                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "Inter, sans-serif", lineHeight: 1.4 }}>{sublabel}</div>
                                    </div>
                                    {active && (
                                        <motion.div layoutId="type-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent, marginTop: "auto", alignSelf: "flex-end" }} />
                                    )}
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* grid principal — benefícios + form */}
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "24px" : "40px", alignItems: "start" }}>

                        {/* ── ESQUERDA — benefícios ── */}
                        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "20px", padding: "36px 32px", height: "100%" }}>
                                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "1.6rem", color: "#fff", letterSpacing: "0.04em", marginBottom: "6px" }}>
                                    O que você recebe
                                </h3>
                                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", fontFamily: "Inter, sans-serif", marginBottom: "28px" }}>
                                    Benefícios para {activeType?.label.toLowerCase()}
                                </p>

                                <AnimatePresence mode="wait">
                                    <motion.ul
                                        key={type}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.35 }}
                                        style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}
                                    >
                                        {BENEFITS[type].map((item, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -12 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: i * 0.06 }}
                                                style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
                                            >
                                                <span style={{ color: activeType?.accent, fontSize: "10px", marginTop: "3px", flexShrink: 0 }}>{item.icon}</span>
                                                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans-serif", lineHeight: 1.65 }}>{item.text}</span>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </AnimatePresence>

                                {/* divider + oportunidade */}
                                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "32px", paddingTop: "28px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                                        <Zap size={13} style={{ color: "#F4A261" }} />
                                        <span style={{ fontSize: "10px", fontWeight: 700, color: "#F4A261", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>Por que agora?</span>
                                    </div>
                                    <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", fontFamily: "Inter, sans-serif", lineHeight: 1.75 }}>
                                        A conclusão estrutural da rota em <strong style={{ color: "rgba(255,255,255,0.55)" }}>2026</strong> cria um pico de atenção sem precedente. Quem entra antes captura autoridade, audiência e parceiros — essa janela não volta.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* ── DIREITA — formulário ── */}
                        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
                            <motion.div
                                key={`form-${type}`}
                                animate={{ boxShadow: `0 0 60px ${activeType?.glow}, 0 0 0 1px ${activeType?.border}` }}
                                transition={{ duration: 0.5 }}
                                style={{ borderRadius: "24px", padding: "40px 36px", background: "rgba(6,27,51,0.6)", backdropFilter: "blur(24px)", border: `1px solid ${activeType?.border}` }}
                            >
                                {status === "success" ? (
                                    <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "48px 0" }}>
                                        <motion.div
                                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                                            style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(42,157,143,0.15)", border: "1px solid rgba(42,157,143,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}
                                        >
                                            <CheckCircle size={36} style={{ color: "#2A9D8F" }} />
                                        </motion.div>
                                        <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "2.2rem", color: "#fff", letterSpacing: "0.04em", marginBottom: "14px" }}>
                                            SEMENTE PLANTADA!
                                        </h3>
                                        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif", lineHeight: 1.75, maxWidth: "300px", margin: "0 auto 28px" }}>
                                            Recebemos seu interesse. Você também recebeu um e-mail de confirmação. Em breve entraremos em contato.
                                        </p>
                                        <button onClick={() => setStatus("idle")} style={{ fontSize: "12px", color: "#2A9D8F", background: "none", border: "1px solid rgba(42,157,143,0.3)", borderRadius: "8px", padding: "8px 20px", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
                                            Enviar outro interesse
                                        </button>
                                    </motion.div>
                                ) : (
                                    <>
                                        <div style={{ marginBottom: "28px" }}>
                                            <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "1.7rem", color: "#fff", letterSpacing: "0.04em", marginBottom: "6px" }}>
                                                Manifeste seu interesse
                                            </h3>
                                            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif" }}>
                                                Preenchendo como: <span style={{ color: activeType?.accent, fontWeight: 600 }}>{activeType?.label}</span>
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                                            <div>
                                                <label style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontFamily: "Inter, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "7px" }}>Nome completo *</label>
                                                <input
                                                    name="name" value={form.name} onChange={handleChange}
                                                    placeholder="Seu nome"
                                                    required style={inputStyle}
                                                    onFocus={e => { e.target.style.borderColor = activeType?.border; e.target.style.background = "rgba(255,255,255,0.06)"; }}
                                                    onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontFamily: "Inter, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "7px" }}>E-mail *</label>
                                                <input
                                                    name="email" type="email" value={form.email} onChange={handleChange}
                                                    placeholder="seu@email.com"
                                                    required style={inputStyle}
                                                    onFocus={e => { e.target.style.borderColor = activeType?.border; e.target.style.background = "rgba(255,255,255,0.06)"; }}
                                                    onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontFamily: "Inter, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "7px" }}>Empresa / Organização</label>
                                                <input
                                                    name="organization" value={form.organization} onChange={handleChange}
                                                    placeholder="Opcional"
                                                    style={inputStyle}
                                                    onFocus={e => { e.target.style.borderColor = activeType?.border; e.target.style.background = "rgba(255,255,255,0.06)"; }}
                                                    onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", fontFamily: "Inter, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "7px" }}>Como posso contribuir?</label>
                                                <textarea
                                                    name="message" value={form.message} onChange={handleChange}
                                                    placeholder="Conte um pouco sobre seu interesse (opcional)"
                                                    rows={3}
                                                    style={{ ...inputStyle, resize: "none" }}
                                                    onFocus={e => { e.target.style.borderColor = activeType?.border; e.target.style.background = "rgba(255,255,255,0.06)"; }}
                                                    onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
                                                />
                                            </div>

                                            {errorMsg && (
                                                <p style={{ fontSize: "12px", color: "#f87171", fontFamily: "Inter, sans-serif" }}>{errorMsg}</p>
                                            )}

                                            <motion.button
                                                type="submit"
                                                disabled={status === "loading"}
                                                whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                style={{
                                                    display: "flex", alignItems: "center", justifyContent: "center", gap: "9px",
                                                    padding: "15px",
                                                    borderRadius: "14px",
                                                    background: `linear-gradient(135deg, ${activeType?.accent}, ${activeType?.accent}cc)`,
                                                    border: "none", color: "#061B33",
                                                    fontSize: "13px", fontWeight: 800,
                                                    letterSpacing: "0.08em", textTransform: "uppercase",
                                                    cursor: status === "loading" ? "not-allowed" : "pointer",
                                                    fontFamily: "Inter, sans-serif",
                                                    opacity: status === "loading" ? 0.7 : 1,
                                                    marginTop: "4px",
                                                    boxShadow: `0 8px 24px ${activeType?.glow}`,
                                                    transition: "background 0.3s, box-shadow 0.3s",
                                                }}
                                            >
                                                {status === "loading"
                                                    ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} /> Enviando...</>
                                                    : <>Manifestar interesse <ArrowRight size={15} /></>
                                                }
                                            </motion.button>
                                        </form>
                                    </>
                                )}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── POR QUE AGORA — 3 cards ── */}
            <section style={{ padding: "60px 0 100px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="container-rota">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "48px" }}>
                        <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#fff", letterSpacing: "0.04em", marginBottom: "12px" }}>
                            POR QUE ENTRAR AGORA?
                        </h2>
                        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif" }}>
                            Três razões que definem quem chega primeiro
                        </p>
                    </motion.div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                        {OPPS.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                style={{ padding: "32px 28px", borderRadius: "18px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
                            >
                                <div style={{ fontSize: "11px", color: item.accent, fontFamily: "Inter, sans-serif", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "14px" }}>{item.n}</div>
                                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "1.5rem", color: "#fff", letterSpacing: "0.04em", marginBottom: "10px" }}>{item.title}</h3>
                                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.38)", lineHeight: 1.8, fontFamily: "Inter, sans-serif" }}>{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
                @media (max-width: 768px) {
                    .apoie-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}
