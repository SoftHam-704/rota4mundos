import { useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Ordem da rota: Atlântico → Pacífico
const cities = [
    // ── Brasil ─────────────────────────────────────────────────────────────
    {
        name: "Porto Murtinho",
        country: "Brasil 🇧🇷",
        state: "Mato Grosso do Sul",
        tagline: "A Guardiã do Rio Paraguai",
        desc: "Porta de entrada da rota pelo Brasil. Pantanal, Toro Candil e a travessia histórica do Rio Paraguai.",
        href: "/cidades/porto-murtinho",
        accent: "#F4A261",
        accentRgb: "244,162,97",
        pop: "12.859",
        image: "/cities/porto_murtinho.png",
        routeOrder: 1,
    },
    {
        name: "Campo Grande",
        country: "Brasil 🇧🇷",
        state: "Mato Grosso do Sul",
        tagline: "A Capital Morena do Cerrado",
        desc: "Hub logístico e cultural do corredor. Gastronomia plural, BIOPARQUE Pantanal e energia de capital em expansão.",
        href: "/cidades/campo-grande",
        accent: "#2A9D8F",
        accentRgb: "42,157,143",
        pop: "906.092",
        image: "/cities/campo_grande.png",
        routeOrder: 2,
    },
    {
        name: "Bonito",
        country: "Brasil 🇧🇷",
        state: "Mato Grosso do Sul",
        tagline: "O Aquário Natural do Mundo",
        desc: "Rios de visibilidade cristalina de 40m, grutas e cachoeiras. Referência global em ecoturismo sustentável.",
        href: "/cidades/bonito",
        accent: "#22d3ee",
        accentRgb: "34,211,238",
        pop: "21.368",
        image: "/cities/bonito.png",
        routeOrder: 3,
    },
    {
        name: "Jardim",
        country: "Brasil 🇧🇷",
        state: "Mato Grosso do Sul",
        tagline: "Portal da Serra da Bodoquena",
        desc: "Município-sede da Serra da Bodoquena e porta de entrada histórica para Bonito. Rica em cavernas, grutas e paisagens do Planalto da Bodoquena.",
        href: "/cidades/jardim",
        accent: "#86efac",
        accentRgb: "134,239,172",
        pop: "27.245",
        image: "/cities/jardim.png",
        routeOrder: 4,
    },
    // ── Paraguai ────────────────────────────────────────────────────────────
    {
        name: "Carmelo Peralta",
        country: "Paraguai 🇵🇾",
        state: "Alto Paraguay",
        tagline: "A Travessia Histórica",
        desc: "Fronteira com Porto Murtinho — onde a ponte binacional sobre o Rio Paraguai conecta dois oceanos. Epicentro da integração.",
        href: "/cidades/carmelo-peralta",
        accent: "#818cf8",
        accentRgb: "129,140,248",
        pop: "5.000",
        image: "/cities/carmelo_peralta.png",
        routeOrder: 5,
    },
    {
        name: "Mariscal Estigarribia",
        country: "Paraguai 🇵🇾",
        state: "Boquerón",
        tagline: "O Novo Polo Logístico do Chaco",
        desc: "Cidade em ascensão no coração do Chaco paraguaio. 65% de população indígena, 270 km de rota já pavimentada e vocação logística crescente.",
        href: "/cidades/mariscal-estigarribia",
        accent: "#a78bfa",
        accentRgb: "167,139,250",
        pop: "8.000",
        image: "/cities/mariscal_estigarribia.png",
        routeOrder: 6,
    },
    // ── Argentina ───────────────────────────────────────────────────────────
    {
        name: "San Salvador de Jujuy",
        country: "Argentina 🇦🇷",
        state: "Província de Jujuy",
        tagline: "O Portal dos Andes",
        desc: "Capital andina que espera aumento de 400% no tráfego de caminhões. Sede de fóruns internacionais do corredor e polo logístico emergente.",
        href: "/cidades",
        accent: "#60a5fa",
        accentRgb: "96,165,250",
        pop: "320.000",
        image: "/cities/jujuy.png",
        routeOrder: 7,
    },
    // ── Chile ───────────────────────────────────────────────────────────────
    {
        name: "Antofagasta",
        country: "Chile 🇨🇱",
        state: "Região de Antofagasta",
        tagline: "O Grande Porto do Pacífico",
        desc: "Principal porto do Pacífico sul-americano, 500 mil habitantes. Destino final do corredor e saída estratégica para os mercados asiáticos.",
        href: "/cidades",
        accent: "#f87171",
        accentRgb: "248,113,113",
        pop: "500.000",
        image: "/cities/antofagasta.png",
        routeOrder: 8,
    },
    {
        name: "Iquique",
        country: "Chile 🇨🇱",
        state: "Região de Tarapacá",
        tagline: "Porto Histórico e Zona Franca",
        desc: "Porto de história centenária e zona franca de referência. Integrado ao corredor como segunda grande saída chilena para o Oceano Pacífico.",
        href: "/cidades",
        accent: "#fb923c",
        accentRgb: "251,146,60",
        pop: "235.000",
        image: "/cities/iquique.png",
        routeOrder: 9,
    },
];

function CityCard({ city, index }) {
    const cardRef = useRef(null);

    function handleMouseMove(e) {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: (index % 4) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <Link
                to={city.href}
                ref={cardRef}
                onMouseMove={handleMouseMove}
                style={{
                    display: "block", textDecoration: "none",
                    position: "relative", borderRadius: "20px", overflow: "hidden",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(16px)",
                    transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                }}
                className="city-glass-card"
            >
                {/* flashlight */}
                <div style={{
                    position: "absolute", inset: 0, borderRadius: "20px",
                    background: `radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(${city.accentRgb},0.08), transparent 60%)`,
                    pointerEvents: "none", zIndex: 3,
                }} />

                {/* route order badge */}
                <div style={{
                    position: "absolute", top: "12px", right: "12px",
                    width: "26px", height: "26px", borderRadius: "50%",
                    background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
                    border: `1px solid rgba(${city.accentRgb},0.4)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 4,
                }}>
                    <span style={{ fontSize: "9px", fontWeight: 800, color: city.accent, fontFamily: "Inter, sans-serif" }}>
                        {city.routeOrder}
                    </span>
                </div>

                {/* image */}
                <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
                    <img
                        src={city.image}
                        alt={city.name}
                        style={{
                            width: "100%", height: "100%", objectFit: "cover",
                            transition: "transform 0.6s ease", display: "block",
                        }}
                        className="city-card-img"
                        loading="lazy"
                    />
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to bottom, rgba(6,27,51,0.15) 0%, rgba(6,27,51,0.72) 100%)",
                    }} />
                    <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                        background: `linear-gradient(90deg, transparent, ${city.accent}cc, transparent)`,
                        zIndex: 2,
                    }} />
                    <div style={{
                        position: "absolute", bottom: "12px", left: "14px",
                        display: "flex", alignItems: "center", gap: "5px", zIndex: 2,
                    }}>
                        <MapPin size={10} style={{ color: city.accent }} />
                        <span style={{
                            fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.7)",
                            fontFamily: "Inter, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase",
                        }}>
                            {city.country} · {city.state}
                        </span>
                    </div>
                </div>

                {/* content */}
                <div style={{ padding: "20px 22px 22px", position: "relative", zIndex: 2 }}>
                    <h3 style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: "1.75rem", color: "#fff",
                        letterSpacing: "0.05em", lineHeight: 1, marginBottom: "5px",
                    }}>
                        {city.name}
                    </h3>

                    <p style={{
                        fontSize: "11px", color: city.accent,
                        fontWeight: 600, fontFamily: "Inter, sans-serif",
                        fontStyle: "italic", marginBottom: "10px",
                    }}>
                        {city.tagline}
                    </p>

                    <p style={{
                        fontSize: "12px", color: "rgba(255,255,255,0.4)",
                        lineHeight: 1.7, fontFamily: "Inter, sans-serif", marginBottom: "16px",
                    }}>
                        {city.desc}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", fontFamily: "Inter, sans-serif" }}>
                            {city.pop} hab.
                        </span>
                        <span style={{
                            display: "inline-flex", alignItems: "center", gap: "4px",
                            fontSize: "11px", fontWeight: 700, color: city.accent,
                            fontFamily: "Inter, sans-serif", letterSpacing: "0.08em", textTransform: "uppercase",
                        }}>
                            Explorar <ArrowRight size={11} />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function CitiesSection() {
    const { t } = useTranslation();

    return (
        <section id="cidades" style={{ background: "#061B33", padding: "100px 0", position: "relative", overflow: "hidden" }}>
            <div style={{
                position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
                width: "900px", height: "500px", borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(42,157,143,0.05) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            <div className="container-rota" style={{ position: "relative" }}>
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    style={{ maxWidth: "560px", marginBottom: "56px" }}
                >
                    <span style={{
                        display: "inline-block", fontSize: "10px", fontWeight: 700,
                        color: "#F4A261", letterSpacing: "0.2em", textTransform: "uppercase",
                        fontFamily: "Inter, sans-serif", marginBottom: "14px",
                        background: "rgba(244,162,97,0.1)", padding: "4px 12px",
                        borderRadius: "100px", border: "1px solid rgba(244,162,97,0.15)",
                    }}>
                        {t('cities.routeIndicator')}
                    </span>
                    <h2 style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: "clamp(2.5rem, 6vw, 4rem)",
                        color: "#fff", lineHeight: 1,
                        letterSpacing: "0.04em", marginBottom: "16px",
                    }}>
                        {t('cities.sectionTitle')}<br />
                        <span style={{ color: "#2A9D8F" }}>{t('cities.sectionTitleHighlight')}</span>
                    </h2>
                    <p style={{
                        fontSize: "15px", color: "rgba(255,255,255,0.45)",
                        lineHeight: 1.7, fontFamily: "Inter, sans-serif",
                    }}>
                        {t('cities.sectionDescription')}
                    </p>
                </motion.div>

                {/* country strip */}
                <div style={{
                    display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap",
                }}>
                    {[
                        { flag: "🇧🇷", label: t('cities.countries.brazil'),    count: 3, color: "#2A9D8F" },
                        { flag: "🇵🇾", label: t('cities.countries.paraguay'),  count: 2, color: "#818cf8" },
                        { flag: "🇦🇷", label: t('cities.countries.argentina'), count: 1, color: "#60a5fa" },
                        { flag: "🇨🇱", label: t('cities.countries.chile'),     count: 2, color: "#f87171" },
                    ].map(({ flag, label, count, color }) => (
                        <span key={label} style={{
                            display: "inline-flex", alignItems: "center", gap: "6px",
                            fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.5)",
                            fontFamily: "Inter, sans-serif",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            padding: "5px 12px", borderRadius: "100px",
                        }}>
                            {flag} {label}
                            <span style={{ color, fontWeight: 800 }}>{count}</span>
                        </span>
                    ))}
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: "16px",
                }}>
                    {cities.map((city, i) => (
                        <CityCard key={city.name} city={city} index={i} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    style={{ textAlign: "center", marginTop: "48px" }}
                >
                    <Link to="/cidades" style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        padding: "0.875rem 2rem", background: "transparent",
                        color: "#2A9D8F", fontWeight: 700, fontSize: "0.8rem",
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        borderRadius: "0.75rem",
                        border: "1px solid rgba(42,157,143,0.35)",
                        textDecoration: "none", backdropFilter: "blur(8px)",
                        transition: "all 0.3s ease",
                    }}>
                        Ver todas as cidades da rota <ArrowRight size={14} />
                    </Link>
                </motion.div>
            </div>

            <style>{`
                .city-glass-card:hover { border-color: rgba(255,255,255,0.14) !important; transform: translateY(-5px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
                .city-glass-card:hover .city-card-img { transform: scale(1.06); }
            `}</style>
        </section>
    );
}
