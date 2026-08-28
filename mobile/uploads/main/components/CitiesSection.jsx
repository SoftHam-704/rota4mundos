import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

// card filename por país (paraguai usa "paraguay" no arquivo)
const CARD_FILE = {
    brasil:    "card_brasil.png",
    paraguai:  "card_paraguay.png",
    argentina: "card_argentina.png",
    chile:     "card_chile.png",
};

const COUNTRIES = [
    {
        id: "brasil",
        flag: "🇧🇷",
        accent: "#2A9D8F",
        accentRgb: "42,157,143",
        zone: { top: "19%", left: "13%", width: "36%", height: "36%" },
        cities: [
            { n: "01", name: "Campo Grande",   tagline: "A Capital Morena do Cerrado",             href: "/cidades/campo-grande",   image: "/cities/campo_grande.png" },
            { n: "02", name: "Sidrolândia",    tagline: "O Coração Produtivo do MS",               href: "/cidades/sidrolandia",    image: "/cities/sidrolandia.png" },
            { n: "03", name: "Jardim",          tagline: "Portal da Serra da Bodoquena",            href: "/cidades/jardim",         image: "/cities/jardim.png" },
            { n: "04", name: "Bonito",          tagline: "O Aquário Natural do Mundo",              href: "/cidades/bonito",         image: "/cities/bonito.png" },
            { n: "05", name: "Porto Murtinho",  tagline: "A Guardiã do Rio Paraguai",               href: "/cidades/porto-murtinho", image: "/cities/porto_murtinho.png" },
        ],
    },
    {
        id: "paraguai",
        flag: "🇵🇾",
        accent: "#a78bfa",
        accentRgb: "167,139,250",
        zone: { top: "19%", left: "51%", width: "36%", height: "36%" },
        cities: [
            { n: "06", name: "Carmelo Peralta",       tagline: "A Travessia Histórica",        href: "/cidades/carmelo-peralta",       image: "/cities/carmelo_peralta.png" },
            { n: "07", name: "Mariscal Estigarribia", tagline: "O Polo Logístico do Chaco",    href: "/cidades/mariscal-estigarribia", image: "/cities/mariscal_estigarribia.png" },
            { n: "08", name: "Filadelfia",            tagline: "A Alma Europeia do Chaco",     href: "/cidades/filadelfia",            image: "/cities/filadelfia.png" },
        ],
    },
    {
        id: "argentina",
        flag: "🇦🇷",
        accent: "#fb923c",
        accentRgb: "251,146,60",
        zone: { top: "55%", left: "13%", width: "36%", height: "28%" },
        cities: [
            { n: "09", name: "Tartagal", tagline: "Fronteira Cultural do Norte Argentino",  href: "/cidades/tartagal", image: "/cities/tartagal.png" },
            { n: "10", name: "Jujuy",    tagline: "A Alma Ancestral dos Andes",             href: "/cidades/jujuy",    image: "/cities/jujuy.png" },
            { n: "11", name: "Salta",    tagline: "La Linda — Capital do Folclore Andino",  href: "/cidades/salta",    image: "/cities/salta.png" },
        ],
    },
    {
        id: "chile",
        flag: "🇨🇱",
        accent: "#38bdf8",
        accentRgb: "56,189,248",
        zone: { top: "55%", left: "51%", width: "36%", height: "28%" },
        cities: [
            { n: "12", name: "Antofagasta", tagline: "Onde o Atacama Beija o Pacífico", href: "/cidades/antofagasta", image: "/cities/antofagasta.png" },
            { n: "13", name: "Iquique",     tagline: "Porto Histórico e Zona Franca",   href: "/cidades/iquique",     image: "/cities/iquique.png" },
            { n: "14", name: "Mejillones",  tagline: "O Porto Autêntico do Pacífico",   href: "/cidades/mejillones",  image: "/cities/mejillones.png" },
        ],
    },
];

export default function CitiesSection() {
    const [activeId, setActiveId]   = useState(null);
    const [hoveredId, setHoveredId] = useState(null);

    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end end"],
    });
    const imageY     = useTransform(scrollYProgress, [0, 0.75, 1], ["0%", "-14%", "-14%"]);
    const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    const country = COUNTRIES.find(c => c.id === activeId);

    return (
        <section id="cidades" style={{ background: "#080704" }}>

            {/* hint */}
            <div className="container-rota" style={{ paddingTop: "60px", paddingBottom: "20px" }}>
                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        textAlign: "center",
                        fontFamily: '"Playfair Display", serif',
                        fontSize: "11px", fontStyle: "italic",
                        letterSpacing: "0.2em", textTransform: "uppercase",
                        color: "rgba(200,146,42,0.45)",
                    }}
                >
                    Selecione um país para explorar as cidades
                </motion.p>
            </div>

            {/* sticky scroll */}
            <div ref={scrollRef} style={{ height: "220vh" }}>
                <div style={{
                    position: "sticky", top: 0,
                    height: "100vh", overflow: "hidden",
                    display: "flex", alignItems: "flex-start",
                }}>
                    <motion.div style={{ position: "relative", width: "100%", userSelect: "none", lineHeight: 0, y: imageY }}>
                        <img
                            src="/Quarto_paises.png"
                            alt="Um Corredor, Quatro Mundos"
                            style={{ width: "100%", height: "auto", display: "block" }}
                            draggable={false}
                        />

                        {COUNTRIES.map((c) => {
                            const isHovered = hoveredId === c.id;
                            return (
                                <div
                                    key={c.id}
                                    onClick={() => setActiveId(c.id)}
                                    onMouseEnter={() => setHoveredId(c.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    style={{
                                        position: "absolute",
                                        top: c.zone.top, left: c.zone.left,
                                        width: c.zone.width, height: c.zone.height,
                                        cursor: "pointer", borderRadius: "4px",
                                        background: isHovered ? "rgba(200,146,42,0.08)" : "transparent",
                                        border: isHovered ? "1px solid rgba(200,146,42,0.28)" : "1px solid transparent",
                                        transition: "background 0.3s, border-color 0.3s",
                                        display: "flex", alignItems: "flex-end", justifyContent: "center",
                                        paddingBottom: "10px",
                                    }}
                                >
                                    {isHovered && (
                                        <motion.span
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            style={{
                                                fontFamily: '"Playfair Display", serif',
                                                fontSize: "11px", fontStyle: "italic",
                                                color: "#e8c97a",
                                                background: "rgba(0,0,0,0.68)",
                                                padding: "3px 12px", borderRadius: "100px",
                                                backdropFilter: "blur(8px)",
                                                border: "1px solid rgba(200,146,42,0.2)",
                                                pointerEvents: "none",
                                            }}
                                        >
                                            {c.flag} Ver cidades →
                                        </motion.span>
                                    )}
                                </div>
                            );
                        })}

                        {/* hint de scroll */}
                        <motion.div style={{
                            position: "absolute", bottom: "20px", left: "50%", x: "-50%",
                            opacity: hintOpacity, pointerEvents: "none",
                        }}>
                            <motion.div
                                animate={{ y: [0, 7, 0] }}
                                transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
                                style={{
                                    fontFamily: '"Playfair Display", serif',
                                    fontSize: "10px", fontStyle: "italic",
                                    color: "rgba(200,146,42,0.55)",
                                    letterSpacing: "0.15em", textAlign: "center", whiteSpace: "nowrap",
                                }}
                            >
                                ↓ role para ver o livro completo
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* atalhos de bandeira */}
            <div className="container-rota" style={{ paddingBottom: "56px" }}>
                <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "20px", flexWrap: "wrap" }}>
                    {COUNTRIES.map(c => (
                        <button
                            key={c.id}
                            onClick={() => setActiveId(c.id)}
                            style={{
                                background: "none", border: "none", cursor: "pointer",
                                fontFamily: '"Playfair Display", serif',
                                fontSize: "12px", fontStyle: "italic",
                                color: "rgba(200,146,42,0.4)", transition: "color 0.2s", padding: "4px 10px",
                            }}
                            className="flag-btn"
                        >
                            {c.flag}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── MODAL PERGAMINHO ── */}
            <AnimatePresence>
                {activeId && country && (
                    <>
                        {/* backdrop com spotlight central */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            onClick={() => setActiveId(null)}
                            style={{
                                position: "fixed", inset: 0, zIndex: 50,
                                background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.92) 100%)",
                                backdropFilter: "blur(9px)",
                            }}
                        />

                        {/* scroll card — animação de desenrolar */}
                        <motion.div
                            key="modal"
                            initial={{ opacity: 0, scaleY: 0.03, y: -60 }}
                            animate={{ opacity: 1, scaleY: 1,   y: 0 }}
                            exit={{
                                opacity: 0, scaleY: 0.05, y: -40,
                                transition: { duration: 0.22, ease: "easeIn" }
                            }}
                            transition={{
                                opacity:  { duration: 0.18 },
                                scaleY:   { type: "spring", stiffness: 160, damping: 18 },
                                y:        { type: "spring", stiffness: 180, damping: 20 },
                            }}
                            style={{
                                position: "fixed",
                                top: "50%", left: "50%",
                                x: "-50%", y: "-50%",
                                zIndex: 51,
                                width: "min(580px, 90vw)",
                                aspectRatio: "4/3",
                                borderRadius: "3px",
                                overflow: "hidden",
                                transformOrigin: "top center",
                                boxShadow: "0 50px 150px rgba(0,0,0,0.95), 0 0 80px rgba(200,146,42,0.08)",
                                userSelect: "none",
                            }}
                        >
                            {/* imagem de fundo do pergaminho */}
                            <img
                                src={`/${CARD_FILE[country.id]}`}
                                alt=""
                                style={{
                                    position: "absolute", inset: 0,
                                    width: "100%", height: "100%",
                                    objectFit: "cover", objectPosition: "center",
                                }}
                                draggable={false}
                            />

                            {/* botão fechar — canto superior direito do header */}
                            <button
                                onClick={() => setActiveId(null)}
                                style={{
                                    position: "absolute", top: "9%", right: "12%",
                                    zIndex: 3, width: "26px", height: "26px",
                                    borderRadius: "50%",
                                    border: "1px solid rgba(60,30,5,0.35)",
                                    background: "rgba(60,30,5,0.15)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    cursor: "pointer", color: "rgba(60,30,5,0.55)",
                                }}
                            >
                                <X size={11} />
                            </button>

                            {/* faixas clicáveis transparentes sobre cada linha do pergaminho */}
                            <div style={{
                                position: "absolute",
                                top: "23%", bottom: "13%",
                                left: "12%", right: "6%",
                                zIndex: 2,
                                display: "flex", flexDirection: "column",
                            }}>
                                {country.cities.map((city, i) => (
                                    <motion.div
                                        key={city.name}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.28 + i * 0.07 }}
                                        style={{ flex: 1 }}
                                    >
                                        <Link
                                            to={city.href}
                                            onClick={() => setActiveId(null)}
                                            style={{
                                                display: "block",
                                                width: "100%", height: "100%",
                                                borderRadius: "6px",
                                                transition: "background 0.2s",
                                            }}
                                            className="scroll-row"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style>{`
                .flag-btn:hover { color: rgba(200,146,42,0.75) !important; }
                .scroll-row:hover { background: rgba(200,146,42,0.14) !important; cursor: pointer; }
            `}</style>
        </section>
    );
}
