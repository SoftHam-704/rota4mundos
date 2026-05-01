import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Building2, Flag, Route } from "lucide-react";
import { Link } from "react-router-dom";

const COUNTRIES = [
    { code: "BR", flag: "🇧🇷", name: "Brasil", color: "#22c55e", colorRgb: "34,197,94" },
    { code: "PY", flag: "🇵🇾", name: "Paraguai", color: "#2dd4bf", colorRgb: "45,212,191" },
    { code: "AR", flag: "🇦🇷", name: "Argentina", color: "#60a5fa", colorRgb: "96,165,250" },
    { code: "CL", flag: "🇨🇱", name: "Chile", color: "#f87171", colorRgb: "248,113,113" },
];

const ROUTE_STOPS = [
    { id: 1, lat: -21.37, lng: -57.88 },
    { id: 2, lat: -20.47, lng: -54.62 },
    { id: 3, lat: -21.13, lng: -56.48 },
    { id: 4, lat: -20.78, lng: -51.68 },
    { id: 5, lat: -20.54, lng: -52.88 },
    { id: 6, lat: -21.23, lng: -52.13 },
    { id: 7, lat: -20.94, lng: -54.96 },
    { id: 8, lat: -19.92, lng: -55.83 },
    { id: 9, lat: -21.47, lng: -56.05 },
    { id: 10, lat: -21.48, lng: -56.15 },
    { id: 11, lat: -21.28, lng: -52.43 },
    { id: 12, lat: -21.85, lng: -52.13 },
    { id: 13, lat: -25.55, lng: -54.58 },
    { id: 14, lat: -22.23, lng: -57.94 },
    { id: 15, lat: -22.05, lng: -60.62 },
    { id: 16, lat: -22.38, lng: -59.83 },
    { id: 17, lat: -22.35, lng: -60.03 },
    { id: 18, lat: -22.02, lng: -60.72 },
    { id: 19, lat: -23.02, lng: -63.65 },
    { id: 20, lat: -22.52, lng: -63.80 },
    { id: 21, lat: -24.20, lng: -65.30 },
    { id: 22, lat: -23.65, lng: -70.40 },
    { id: 23, lat: -23.10, lng: -70.45 },
    { id: 24, lat: -20.22, lng: -70.13 },
    { id: 25, lat: -22.05, lng: -70.20 },
    { id: 26, lat: -22.47, lng: -68.93 },
];

function RouteMapPreview({ city, size = 100 }) {
    const stop = ROUTE_STOPS.find(s => s.id === city.routeOrder);
    const country = COUNTRIES.find(c => c.code === city.country);
    if (!stop || !country) return null;

    const bounds = { minLat: -26, maxLat: -20, minLng: -71, maxLng: -51 };
    const x = ((stop.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * size;
    const y = ((stop.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * size;
    const routePoints = ROUTE_STOPS.map(s => {
        const rx = ((s.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * size;
        const ry = ((s.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * size;
        return `${rx},${ry}`;
    }).join(" ");

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ opacity: 0.4 }}>
            <polygon points={routePoints} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            <circle cx={x} cy={y} r="3" fill={country.color} opacity="0.9" />
            <circle cx={x} cy={y} r="6" fill={country.color} opacity="0.2" />
        </svg>
    );
}

const ALL_CITIES = [
    { name: "Porto Murtinho", country: "BR", state: "Mato Grosso do Sul", population: "12.859", tag: "Porta de entrada", desc: "Fronteira histórica com o Paraguai. Pantanal, Toro Candil e a travessia do Rio Paraguai.", href: "/cidades/porto- murtinho", accent: "#F4A261", accentRgb: "244,162,97", image: "/cities/porto_ murtinho. png", routeOrder: 1 },
    { name: "Campo Grande", country: "BR", state: "Mato Grosso do Sul", population: "906.092", tag: "Hub Central", desc: "Capital da rota, hub logístico e cultural. BIOPARQUE Pantanal e gastronomia plural.", href: "/cidades/ campo- grande", accent: "#2A9D8F", accentRgb: "42,157,143", image: "/cities/campo_ grande. png", routeOrder: 2 },
    { name: "Bonito", country: "BR", state: "Mato Grosso do Sul", population: "21.368", tag: "Aquário Natural", desc: "Rios cristalinos de 40m de visibilidade, grutas e cachoeiras. Referência em ecoturismo.", href: "/cidades/bonito", accent: "#22d3ee", accentRgb: "34,211,238", image: "/cities/bonito.png", routeOrder: 3 },
    { name: "Carmelo Peralta", country: "PY", state: "Alto Paraguay", population: "5.000", tag: "Ponte Binacional", desc: "Fronteira com Porto Murtinho. Onde a ponte binacional conecta dois oceanos.", href: "/cidades", accent: "#818cf8", accentRgb: "129,140,248", image: "/cities/ carmelo_ peralta. png", routeOrder: 14 },
    { name: "Mariscal Estigarribia", country: "PY", state: "Boquerón", population: "8.000", tag: "Novo Polo", desc: "Coração do Chaco. 65% indígena, 270 km pavimentados, vocação logística.", href: "/cidades", accent: "#a78bfa", accentRgb: "167,139,250", image: "/cities/ mariscal_ estigarribia. png", routeOrder: 15 },
    { name: "Loma Plata", country: "PY", state: "Boquerón", population: "6.000", tag: "270km Asfaltados", desc: "Trecho de 270 km já pavimentado no coração do Chaco.", href: "/cidades", accent: "#818cf8", accentRgb: "129,140,248", image: "", routeOrder: 16 },
    { name: "Filadelfia", country: "PY", state: "Boquerón", population: "9.000", tag: "Chaco Central", desc: "Centro administrativo da região Chaco paraguaia.", href: "/cidades", accent: "#818cf8", accentRgb: "129,140,248", image: "", routeOrder: 17 },
    { name: "Pozo Hondo", country: "PY", state: "Boquerón", population: "3.500", tag: "Fronteira AR", desc: "Fronteira com Misiones, porta de entrada para a Argentina.", href: "/cidades", accent: "#818cf8", accentRgb: "129,140,248", image: "", routeOrder: 18 },
    { name: "Misión La Paz", country: "AR", state: "Salta", population: "12.000", tag: "Fronteira PY", desc: "Departamento de Salta que faz fronteira com o Paraguai.", href: "/cidades", accent: "#60a5fa", accentRgb: "96,165,250", image: "", routeOrder: 19 },
    { name: "Tartagal", country: "AR", state: "Salta", population: "55.000", tag: "Norte Salta", desc: "Cidade no norte de Salta, centro econômico da região.", href: "/cidades", accent: "#60a5fa", accentRgb: "96,165,250", image: "", routeOrder: 20 },
    { name: "San Salvador de Jujuy", country: "AR", state: "Jujuy", population: "320.000", tag: "Portal dos Andes", desc: "Capital andina. Expectativa de +400% no tráfego de caminhões.", href: "/cidades", accent: "#60a5fa", accentRgb: "96,165,250", image: "/cities/jujuy.png", routeOrder: 21 },
    { name: "Antofagasta", country: "CL", state: "Antofagasta", population: "500.000", tag: "Porto do Pacífico", desc: "Principal porto do Pacífico sul- americano. Destino final do corredor.", href: "/cidades", accent: "#f87171", accentRgb: "248,113,113", image: "/cities/antofagasta.png", routeOrder: 22 },
    { name: "Mejillones", country: "CL", state: "Antofagasta", population: "12.000", tag: "Complexo Portuário", desc: "Complexo portuário estratégico integrado ao corredor.", href: "/cidades", accent: "#f87171", accentRgb: "248,113,113", image: "", routeOrder: 23 },
    { name: "Iquique", country: "CL", state: "Tarapacá", population: "235.000", tag: "Zona Franca", desc: "Porto histórico centenário e zona franca de referência.", href: "/cidades", accent: "#fb923c", accentRgb: "251,146,60", image: "/cities/iquique.png", routeOrder: 24 },
    { name: "Tocopilla", country: "CL", state: "Antofagasta", population: "25.000", tag: "Energia", desc: "Porto integrado ao corredor, com usina termoelétrica.", href: "/cidades", accent: "#f87171", accentRgb: "248,113,113", image: "", routeOrder: 25 },
    { name: "Calama", country: "CL", state: "Antofagasta", population: "165.000", tag: "Deserto do Atacama", desc: "Cidade do interior chileno conectada ao corredor.", href: "/cidades", accent: "#f87171", accentRgb: "248,113,113", image: "", routeOrder: 26 },
    { name: "Três Lagoas", country: "BR", state: "Mato Grosso do Sul", population: "123.000", tag: "Portal do Leste", desc: "Porto fluvial estratégica na margem esquerda do Rio Paraná.", href: "/cidades", accent: "#22c55e", accentRgb: "34,197,94", image: "", routeOrder: 4 },
    { name: "Água Clara", country: "BR", state: "Mato Grosso do Sul", population: "25.000", tag: "Represa de Três Lagoas", desc: "Cidade banhada pela Represa de Três Lagoas, com potencial turístico.", href: "/cidades", accent: "#22c55e", accentRgb: "34,197,94", image: "", routeOrder: 5 },
    { name: "Ribas do Rio Pardo", country: "BR", state: "Mato Grosso do Sul", population: "25.000", tag: "Estruturante", desc: "Município estratégico na rota entre Campo Grande e Três Lagoas.", href: "/cidades", accent: "#22c55e", accentRgb: "34,197,94", image: "", routeOrder: 6 },
    { name: "Sidrolândia", country: "BR", state: "Mato Grosso do Sul", population: "60.000", tag: "Corrredora", desc: "Terceira maior cidade do- MS, polo agrícola em expansão.", href: "/cidades", accent: "#22c55e", accentRgb: "34,197,94", image: "", routeOrder: 7 },
    { name: "Nioaque", country: "BR", state: "Mato Grosso do Sul", population: "22.000", tag: "Frontal", desc: "Cidade histórica na estrada que liga ao Pantanal.", href: "/cidades", accent: "#22c55e", accentRgb: "34,197,94", image: "", routeOrder: 8 },
    { name: "Guia Lopes da Laguna", country: "BR", state: "Mato Grosso do Sul", population: "10.000", tag: "Pantaneira", desc: "Porta de entrada do Pantanal sul-mato- grossense.", href: "/cidades", accent: "#22c55e", accentRgb: "34,197,94", image: "", routeOrder: 9 },
    { name: "Jardim", country: "BR", state: "Mato Grosso do Sul", population: "26.000", tag: "Bonito Region", desc: "Cidade da região de Bonito, com cavernas e belezas naturais.", href: "/cidades", accent: "#22c55e", accentRgb: "34,197,94", image: "", routeOrder: 10 },
    { name: "Bataguassu", country: "BR", state: "Mato Grosso do Sul", population: "23.000", tag: "Hidrelétrica", desc: "Cidade cortada pelo Rio Paraná, com usina hidrelétrica.", href: "/cidades", accent: "#22c55e", accentRgb: "34,197,94", image: "", routeOrder: 11 },
    { name: "Nova Alvorada do Sul", country: "BR", state: "Mato Grosso do Sul", population: "18.000", tag: "Agrícola", desc: "PoloSucroalcooleiro no norte do- MS.", href: "/cidades", accent: "#22c55e", accentRgb: "34,197,94", image: "", routeOrder: 12 },
    { name: "Foz do Iguaçu", country: "BR", state: "Paraná", population: "257.000", tag: "Marco Zero", desc: "Fronteira tri- nacional. Cataratas, turismo e comércio internacional.", href: "/cidades", accent: "#22c55e", accentRgb: "34,197,94", image: "", routeOrder: 13 },
];

function CityCard({ city, index }) {
    const cardRef = useRef(null);
    const country = COUNTRIES.find(c => c.code === city.country);
    const hasImage = city.image && city.image.length > 0;

    function handleMouse(e) {
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
                onMouseMove={handleMouse}
                style={{
                    display: "block", textDecoration: "none",
                    position: "relative", borderRadius: "20px", overflow: "hidden",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(16px)",
                    transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                }}
                className="city-card- hover"
            >
                <div style={{
                    position: "absolute", inset: 0, borderRadius: "20px",
                    background: `radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(${city.accentRgb},0.08), transparent 60%)`,
                    pointerEvents: "none", zIndex: 3,
                }} />

                <div style={{ position: "relative", height: "140px", overflow: "hidden" }}>
                    {hasImage ? (
                        <img src={city.image} alt={city.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", display: "block" }} className="city- card-img" loading="lazy" />
                    ) : (
                        <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, #0A1628 0%, ${city.accent}15 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                            <RouteMapPreview city={city} size={120} />
                            <div style={{ position: "absolute", top: "8px", left: "8px" }}>
                                <span style={{ fontSize: "20px" }}>{country?.flag}</span>
                            </div>
                            <div style={{ position: "absolute", bottom: "8px", right: "8px", display: "flex", alignItems: "center", gap: "3px" }}>
                                <MapPin size={9} style={{ color: country?.color }} />
                                <span style={{ fontSize: "7px", fontWeight: 600, color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans- serif" }}>ROTA BIOCEÂNICA</span>
                            </div>
                        </div>
                    )}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(6,27,51,0.1) 0%, rgba(6,27,51,0.8) 100%)" }} />
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear- gradient(90deg, transparent, ${city.accent}cc, transparent)`, zIndex: 2 }} />
                    <div style={{ position: "absolute", top: "10px", right: "10px", width: "24px", height: "24px", borderRadius: "50%", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", border: `1px solid rgba(${city.accentRgb},0.4)`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}>
                        <span style={{ fontSize: "8px", fontWeight: 800, color: city.accent, fontFamily: "Inter, sans- serif" }}>{city.routeOrder}</span>
                    </div>
                    <div style={{ position: "absolute", bottom: "10px", left: "12px", display: "flex", alignItems: "center", gap: "4px", zIndex: 2 }}>
                        <MapPin size={9} style={{ color: city.accent }} />
                        <span style={{ fontSize: "8px", fontWeight: 600, color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans- serif", letterSpacing: "0.05em" }}>{city.state}</span>
                    </div>
                </div>

                <div style={{ padding: "16px 18px 18px", position: "relative", zIndex: 2 }}>
                    <span style={{ fontSize: "9px", fontWeight: 700, color: city.accent, fontFamily: "Inter, sans- serif", fontStyle: "italic", letterSpacing: "0.05em" }}>{city.tag}</span>
                    <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "1.5rem", color: "#fff", letterSpacing: "0.05em", lineHeight: 1, marginBottom: "6px", marginTop: "2px" }}>{city.name}</h3>
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, fontFamily: "Inter, sans- serif", marginBottom: "12px" }}>{city.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space- between" }}>
                        {city.population && (
                            <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", fontFamily: "Inter, sans- serif" }}>{city.population} hab.</span>
                        )}
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "3px", fontSize: "10px", fontWeight: 700, color: city.accent, fontFamily: "Inter, sans- serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                            Explorar <ArrowRight size={10} />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function CitiesPage() {
    const [activeCountry, setActiveCountry] = useState("ALL");
    const heroRef = useRef(null);

    const filteredCities = activeCountry === "ALL"
        ? ALL_CITIES
        : ALL_CITIES.filter(c => c.country === activeCountry);

    const stats = { total: ALL_CITIES.length, countries: COUNTRIES.length, km: "~3.500 km" };

    return (
        <div className="min- h- screen bg- [#061B33]">
            <section ref={heroRef} className="relative pt-28 pb-16 overflow-hidden" style={{ background: "linear-gradient(180deg, #0A1628 0%, #061B33 100%)" }}>
                <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: "800px", height: "400px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(42,157,143,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: "40%", right: "5%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(244,162,97,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div className="container- rota relative">
                    <motion.div initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8 }} className="max- w-3xl">
                        <span style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, color: "#F4A261", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "Inter, sans- serif", marginBottom: "16px", background: "rgba(244,162,97,0.1)", padding: "5px 14px", borderRadius: "100px", border: "1px solid rgba(244,162,97,0.15)" }}>
                            Rota Bioceânica · 4 Países · 3.500km
                        </span>
                        <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "clamp(3rem, 8vw, 6rem)", color: "#fff", lineHeight: 1, letterSpacing: "0.04em", marginBottom: "20px" }}>
                            Cidades que Contam<br /><span style={{ color: "#2A9D8F" }}>Histórias</span>
                        </h1>
                        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontFamily: "Inter, sans- serif", maxWidth: "560px" }}>
                            De Porto Murtinho a Antofagasta, explore as {stats.total} cidades que formam o maior corredor bioceânico das Américas. Histórias, culturas e destinos esperando serem descobertos.
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} style={{ display: "flex", gap: "48px", marginTop: "48px", flexWrap: "wrap" }}>
                        {[{ icon: Building2, value: stats.total, label: "cidades" }, { icon: Flag, value: stats.countries, label: "países" }, { icon: Route, value: stats.km, label: "extensão" }].map(({ icon: Icon, value, label }) => (
                            <div key={label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Icon size={20} style={{ color: "#2A9D8F" }} />
                                </div>
                                <div>
                                    <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: "1.75rem", color: "#fff", lineHeight: 1 }}>{value}</div>
                                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans- serif", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="sticky top-[72px] z-40 backdrop- blur-xl border-b border-white/5" style={{ background: "rgba(6,27,51,0.9)" }}>
                <div className="container- rota">
                    <div style={{ display: "flex", gap: "8px", padding: "16px 0", flexWrap: "wrap" }}>
                        <button onClick={() => setActiveCountry("ALL")} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans- serif", padding: "8px 16px", borderRadius: "100px", border: "1px solid", transition: "all 0.3s", ...(activeCountry === "ALL" ? { background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", color: "#fff" } : { background: "transparent", borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }) }}>
                            Todas ({ALL_CITIES.length})
                        </button>
                        {COUNTRIES.map(({ code, flag, name, color }) => {
                            const count = ALL_CITIES.filter(c => c.country === code).length;
                            return (
                                <button key={code} onClick={() => setActiveCountry(code)} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans- serif", padding: "8px 16px", borderRadius: "100px", border: "1px solid", transition: "all 0.3s", ...(activeCountry === code ? { background: `${color}18`, borderColor: `${color}50`, color: "#fff" } : { background: "transparent", borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }) }}>
                                    {flag} {name} ({count})
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container- rota">
                    <motion.div layout className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
                        {filteredCities.map((city, i) => (
                            <CityCard key={`${city.name}-${city.routeOrder}`} city={city} index={i} />
                        ))}
                    </motion.div>
                </div>
            </section>

            <style>{`
                .city-card- hover: hover { border- color: rgba(255,255,255,0.14) ! important; transform: translateY(-5px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
                .city-card- hover: hover .city- card-img { transform: scale(1.06); }
            `}</style>
        </div>
    );
}