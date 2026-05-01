import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Building2, Landmark, ArrowRight, CheckCircle, Loader2, Globe } from "lucide-react";
import { sponsorApi } from "../../api/sponsors.js";

const TYPES = [
    { value: "INDIVIDUAL",    label: "Apoiador Individual",    icon: Heart,     accent: "#2A9D8F" },
    { value: "EMPRESARIAL",   label: "Patrocinador Empresarial", icon: Building2, accent: "#F4A261" },
    { value: "INSTITUCIONAL", label: "Parceiro Institucional", icon: Landmark,  accent: "#818cf8" },
];

const STATS = [
    { value: "4",      label: "Países" },
    { value: "3.500",  label: "Km de corredor" },
    { value: "30+",    label: "Cidades" },
    { value: "2026",   label: "Janela estratégica" },
];

const BENEFITS = {
    INDIVIDUAL: [
        "Seu nome no mural de apoiadores",
        "Newsletter exclusiva com bastidores editoriais",
        "Acesso antecipado a guias e conteúdos premium",
        "Parte da história de integração da América do Sul",
    ],
    EMPRESARIAL: [
        "Presença de marca no portal de maior visibilidade da rota",
        "Conteúdo editorial associado à sua empresa",
        "Acesso à audiência qualificada: viajantes, investidores e gestores",
        "Posicionamento antes do pico de atenção de 2026",
        "Formatos personalizados: banner, artigo patrocinado, guia de cidade",
    ],
    INSTITUCIONAL: [
        "Vitrine institucional para sua cidade ou entidade",
        "Narrativa contemporânea sobre sua região",
        "Visibilidade junto a turistas, investidores e imprensa",
        "Cobertura editorial das iniciativas locais",
        "Conexão com câmaras de comércio dos 4 países",
    ],
};

function StatBar() {
    return (
        <div style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center",
            gap: "0", margin: "48px 0 0",
        }}>
            {STATS.map((s, i) => (
                <div key={i} style={{
                    textAlign: "center", padding: "0 40px",
                    borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}>
                    <div style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: "2.8rem", color: "#F4A261",
                        letterSpacing: "0.04em", lineHeight: 1,
                    }}>
                        {s.value}
                    </div>
                    <div style={{
                        fontSize: "10px", color: "rgba(255,255,255,0.35)",
                        fontFamily: "Inter, sans-serif",
                        letterSpacing: "0.15em", textTransform: "uppercase",
                        marginTop: "4px",
                    }}>
                        {s.label}
                    </div>
                </div>
            ))}
        </div>
    );
}

function TypeSelector({ selected, onChange }) {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "28px" }}>
            {TYPES.map(({ value, label, icon: Icon, accent }) => {
                const active = selected === value;
                return (
                    <button
                        key={value}
                        type="button"
                        onClick={() => onChange(value)}
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            padding: "10px 18px", borderRadius: "100px",
                            border: `1px solid ${active ? accent : "rgba(255,255,255,0.1)"}`,
                            background: active ? `rgba(${value === "INDIVIDUAL" ? "42,157,143" : value === "EMPRESARIAL" ? "244,162,97" : "129,140,248"},0.12)` : "rgba(255,255,255,0.03)",
                            color: active ? accent : "rgba(255,255,255,0.45)",
                            fontSize: "12px", fontWeight: 600,
                            fontFamily: "Inter, sans-serif",
                            letterSpacing: "0.04em",
                            cursor: "pointer",
                            transition: "all 0.25s",
                        }}
                    >
                        <Icon size={13} />
                        {label}
                    </button>
                );
            })}
        </div>
    );
}

function BenefitsList({ type }) {
    const items = BENEFITS[type] || BENEFITS.EMPRESARIAL;
    const accent = TYPES.find(t => t.value === type)?.accent || "#F4A261";

    return (
        <motion.ul
            key={type}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}
        >
            {items.map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <CheckCircle size={15} style={{ color: accent, flexShrink: 0, marginTop: "1px" }} />
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
                        {item}
                    </span>
                </li>
            ))}
        </motion.ul>
    );
}

export default function ApoiePage() {
    const [searchParams] = useSearchParams();
    const [type, setType]           = useState(searchParams.get("tipo") || "EMPRESARIAL");
    const [form, setForm]           = useState({ name: "", email: "", organization: "", message: "" });
    const [status, setStatus]       = useState("idle"); // idle | loading | success | error
    const [errorMsg, setErrorMsg]   = useState("");

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
        width: "100%", padding: "12px 16px",
        borderRadius: "12px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#fff", fontSize: "13px",
        fontFamily: "Inter, sans-serif",
        outline: "none", boxSizing: "border-box",
        transition: "border-color 0.2s",
    };

    return (
        <div style={{ background: "#020d1a", minHeight: "100vh" }}>

            {/* ── HERO ── */}
            <section style={{
                background: "linear-gradient(to bottom, #061B33, #020d1a)",
                padding: "120px 0 80px", textAlign: "center",
                position: "relative", overflow: "hidden",
            }}>
                <div style={{
                    position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
                    width: "800px", height: "400px", borderRadius: "50%",
                    background: "radial-gradient(ellipse, rgba(42,157,143,0.07) 0%, transparent 70%)",
                    pointerEvents: "none",
                }} />

                <div className="container-rota" style={{ position: "relative" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.8 }}
                    >
                        <span style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            fontSize: "10px", fontWeight: 700, color: "#F4A261",
                            letterSpacing: "0.2em", textTransform: "uppercase",
                            fontFamily: "Inter, sans-serif", marginBottom: "20px",
                            background: "rgba(244,162,97,0.1)", padding: "4px 14px",
                            borderRadius: "100px", border: "1px solid rgba(244,162,97,0.15)",
                        }}>
                            <Globe size={11} /> Apoie o projeto
                        </span>

                        <h1 style={{
                            fontFamily: '"Bebas Neue", sans-serif',
                            fontSize: "clamp(2.8rem, 8vw, 6rem)",
                            color: "#fff", lineHeight: 0.95,
                            letterSpacing: "0.04em", marginBottom: "24px",
                        }}>
                            A ROTA É FEITA<br />DE ASFALTO.<br />
                            <span style={{ color: "#2A9D8F" }}>ESTE PORTAL É<br />FEITO DE PESSOAS.</span>
                        </h1>

                        <p style={{
                            fontSize: "16px", color: "rgba(255,255,255,0.5)",
                            lineHeight: 1.8, fontFamily: "Inter, sans-serif",
                            maxWidth: "560px", margin: "0 auto",
                        }}>
                            Quatro países. Dois oceanos. Um corredor que vai mudar o comércio da América do Sul.
                            Você pode fazer parte disso — antes que todos queiram.
                        </p>

                        <StatBar />
                    </motion.div>
                </div>
            </section>

            {/* ── OPORTUNIDADE ── */}
            <section style={{ padding: "80px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="container-rota">
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "24px",
                    }}>
                        {[
                            {
                                n: "01",
                                title: "Janela de 2026",
                                text: "A conclusão estrutural da rota cria um pico de atenção sem precedente. Quem entra antes captura autoridade, audiência e parceiros. Essa janela não volta.",
                                accent: "#F4A261",
                            },
                            {
                                n: "02",
                                title: "Lacuna real de mercado",
                                text: "Nenhuma plataforma digital trata a rota sob o ângulo humano — cidades, turismo, pessoas, oportunidades. Este portal nasce para liderar essa categoria.",
                                accent: "#2A9D8F",
                            },
                            {
                                n: "03",
                                title: "Audiência qualificada",
                                text: "Viajantes, investidores, gestores públicos, empreendedores locais e imprensa regional. Não é um site genérico — é o hub de quem decide sobre o corredor.",
                                accent: "#818cf8",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                style={{
                                    padding: "28px 24px",
                                    borderRadius: "16px",
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    backdropFilter: "blur(12px)",
                                }}
                            >
                                <div style={{
                                    fontSize: "11px", color: item.accent,
                                    fontFamily: "Inter, sans-serif", fontWeight: 700,
                                    letterSpacing: "0.1em", marginBottom: "12px",
                                }}>
                                    {item.n}
                                </div>
                                <h3 style={{
                                    fontFamily: '"Bebas Neue", sans-serif',
                                    fontSize: "1.5rem", color: "#fff",
                                    letterSpacing: "0.04em", marginBottom: "10px",
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    fontSize: "13px", color: "rgba(255,255,255,0.4)",
                                    lineHeight: 1.75, fontFamily: "Inter, sans-serif",
                                }}>
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FORMULÁRIO ── */}
            <section style={{ padding: "80px 0 120px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="container-rota">
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "64px", alignItems: "start",
                    }}>

                        {/* left — benefits */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <span style={{
                                fontSize: "10px", fontWeight: 700, color: "#F4A261",
                                letterSpacing: "0.2em", textTransform: "uppercase",
                                fontFamily: "Inter, sans-serif", marginBottom: "16px",
                                display: "block",
                            }}>
                                O que você recebe
                            </span>
                            <h2 style={{
                                fontFamily: '"Bebas Neue", sans-serif',
                                fontSize: "clamp(2rem, 4vw, 3rem)",
                                color: "#fff", lineHeight: 1,
                                letterSpacing: "0.04em", marginBottom: "32px",
                            }}>
                                SELECIONE SEU<br />
                                <span style={{ color: activeType?.accent }}>PERFIL</span>
                            </h2>

                            <TypeSelector selected={type} onChange={setType} />
                            <BenefitsList type={type} />

                            <p style={{
                                fontSize: "11px", color: "rgba(255,255,255,0.2)",
                                fontFamily: "Inter, sans-serif", marginTop: "28px",
                                lineHeight: 1.6, fontStyle: "italic",
                            }}>
                                * Nenhum compromisso financeiro nesta etapa. Estamos apenas
                                mapeando quem acredita no projeto.
                            </p>
                        </motion.div>

                        {/* right — form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            <div style={{
                                borderRadius: "24px", padding: "40px 36px",
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                backdropFilter: "blur(20px)",
                            }}>
                                {status === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{ textAlign: "center", padding: "40px 0" }}
                                    >
                                        <CheckCircle size={48} style={{ color: "#2A9D8F", margin: "0 auto 20px", display: "block" }} />
                                        <h3 style={{
                                            fontFamily: '"Bebas Neue", sans-serif',
                                            fontSize: "2rem", color: "#fff",
                                            letterSpacing: "0.04em", marginBottom: "12px",
                                        }}>
                                            SEMENTE PLANTADA!
                                        </h3>
                                        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}>
                                            Recebemos seu interesse. Em breve entraremos em contato para conversar sobre as possibilidades.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                        <div>
                                            <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                                                Nome *
                                            </label>
                                            <input
                                                name="name" value={form.name} onChange={handleChange}
                                                placeholder="Seu nome completo"
                                                required style={inputStyle}
                                                onFocus={e => e.target.style.borderColor = "rgba(42,157,143,0.5)"}
                                                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                                            />
                                        </div>

                                        <div>
                                            <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                                                E-mail *
                                            </label>
                                            <input
                                                name="email" type="email" value={form.email} onChange={handleChange}
                                                placeholder="seu@email.com"
                                                required style={inputStyle}
                                                onFocus={e => e.target.style.borderColor = "rgba(42,157,143,0.5)"}
                                                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                                            />
                                        </div>

                                        <div>
                                            <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                                                Empresa / Organização / Cargo
                                            </label>
                                            <input
                                                name="organization" value={form.organization} onChange={handleChange}
                                                placeholder="Opcional"
                                                style={inputStyle}
                                                onFocus={e => e.target.style.borderColor = "rgba(42,157,143,0.5)"}
                                                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                                            />
                                        </div>

                                        <div>
                                            <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                                                Como posso ajudar?
                                            </label>
                                            <textarea
                                                name="message" value={form.message} onChange={handleChange}
                                                placeholder="Conte um pouco sobre seu interesse (opcional)"
                                                rows={4}
                                                style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
                                                onFocus={e => e.target.style.borderColor = "rgba(42,157,143,0.5)"}
                                                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                                            />
                                        </div>

                                        {errorMsg && (
                                            <p style={{ fontSize: "12px", color: "#f87171", fontFamily: "Inter, sans-serif" }}>
                                                {errorMsg}
                                            </p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === "loading"}
                                            style={{
                                                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                                                padding: "14px",
                                                borderRadius: "12px",
                                                background: "linear-gradient(135deg, #F4A261, #E9C46A)",
                                                border: "none", color: "#061B33",
                                                fontSize: "13px", fontWeight: 800,
                                                letterSpacing: "0.08em", textTransform: "uppercase",
                                                cursor: status === "loading" ? "not-allowed" : "pointer",
                                                fontFamily: "Inter, sans-serif",
                                                opacity: status === "loading" ? 0.7 : 1,
                                                transition: "opacity 0.2s, transform 0.2s",
                                            }}
                                        >
                                            {status === "loading"
                                                ? <><Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> Enviando...</>
                                                : <> Manifestar interesse <ArrowRight size={14} /></>
                                            }
                                        </button>

                                        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", fontFamily: "Inter, sans-serif", textAlign: "center", lineHeight: 1.6 }}>
                                            Sem compromisso. Nenhum valor é cobrado nesta etapa.
                                        </p>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
