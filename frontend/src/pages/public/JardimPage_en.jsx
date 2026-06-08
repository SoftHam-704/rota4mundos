import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import CityHero from "../../components/CityHero.jsx";
import { useIsMobile } from "../../hooks/useMediaQuery.js";
import { useInfographic } from "../../hooks/useInfographic.js";
import {
    ArrowLeft, ArrowRight, MapPin, Users, Calendar,
    Flame, Music, Fish, Trees, Camera, Clock, Phone, Mail,
    Star, ChevronRight, Mountain, Leaf, Utensils, Waves, Compass,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "19th Century",
        icon: Compass,
        title: "The Paraguayan War and the Retreat from Laguna",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "The region was the setting for one of the most remarkable episodes in national history: the Retreat from Laguna, during the Paraguayan War. Brazilian troops crossed this territory in a military campaign that was etched into the collective memory of Mato Grosso do Sul, consolidating the strategic importance of the lands of the Serra da Bodoquena.",
        symbol: "Cemetery of the Heroes of the Paraguayan War",
    },
    {
        era: "Origins",
        icon: Leaf,
        title: "Fazenda Jardim and the City's Name",
        color: "from-emerald-600 to-teal-700",
        accent: "text-emerald-400",
        border: "border-emerald-500/30",
        body: "The area belonged to Fazenda Jardim, which gave its name to the future settlement. Permanent occupation came with the development of farms and trade routes, driven by cattle ranching and the natural wealth of the region — crystal-clear rivers, caves and a biodiversity that still enchants visitors today.",
        symbol: "Fazenda Jardim",
    },
    {
        era: "1940s",
        icon: ArrowRight,
        title: "The CER-3 and the BR-060",
        color: "from-blue-700 to-indigo-800",
        accent: "text-blue-400",
        border: "border-blue-500/30",
        body: "The arrival of the Road Commission (CER-3) for the construction of the BR-060 was a watershed moment: it boosted the settlement, attracted new families and transformed Jardim into a regional hub. The CER-3 Museum, now a city landmark, preserves this living memory.",
        symbol: "Road Commission Museum (CER-3)",
    },
    {
        era: "1948 → 1979",
        icon: Star,
        title: "From District to Municipality",
        color: "from-teal-600 to-cyan-700",
        accent: "text-teal-400",
        border: "border-teal-500/30",
        body: "In 1948, Jardim was a district of Bela Vista. Political and administrative independence in 1979 transformed the district into an autonomous municipality, paving the way for the development of ecotourism, cattle ranching and the consolidation of Jardim as a regional hub of the Serra da Bodoquena.",
        symbol: "Jardim Central Square",
    },
];

const attractions = [
    { name: "Lagoa Misteriosa", icon: Waves, desc: "One of the deepest flooded caves in the world. Crystal-clear, deep-blue waters — an international reference for cave diving and contemplation.", badge: "Diving" },
    { name: "Rio da Prata", icon: Fish, desc: "Snorkelling in turquoise-blue waters with exceptional visibility. Fish, underwater vegetation and pristine landscapes in a natural state.", badge: "Snorkelling" },
    { name: "Buraco das Araras", icon: Camera, desc: "A vast natural sinkhole home to dozens of scarlet macaws. One of the most impressive natural landmarks of the Serra da Bodoquena.", badge: "Wildlife" },
    { name: "Serra da Bodoquena", icon: Mountain, desc: "Area of rich biodiversity with waterfalls, trails, rivers and caves. Internationally recognised for its crystal-clear waters and preserved ecosystem.", badge: "Nature" },
    { name: "Caves and Grottos", icon: Compass, desc: "Impressive rock formations ideal for exploration and contemplation. The limestone geology creates unique underground scenery.", badge: "Speleology" },
    { name: "Waterfalls and Trails", icon: Trees, desc: "Stunning scenery for those seeking adventure and contact with nature. Trails that reveal the fauna and flora of the Cerrado and Pantanal.", badge: "Adventure" },
    { name: "Natural Swimming Holes", icon: Waves, desc: "Direct contact with crystal-clear rivers, fish and native forest. Options for swimming, leisure and contemplation in a fully preserved environment.", badge: "Leisure" },
    { name: "Sport Fishing", icon: Fish, desc: "Rivers teeming with species such as pacu, pintado and dourado. Excellent for sport fishing in a natural, regulated environment.", badge: "Sport" },
];

const dishes = [
    { name: "Pantanal Barbecue", icon: Flame, desc: "Meats slow-cooked over an open ground fire, a heritage of fieldwork and the droving teams that once crossed the region.", tag: "Open Fire" },
    { name: "Arroz Carreteiro", icon: Utensils, desc: "A regional tradition linked to drovers and the countryside. A simple, comforting dish that is a cornerstone of the interior's culinary identity.", tag: "Tradition" },
    { name: "Regional Fish", icon: Fish, desc: "Pacu, pintado and dourado — the star ingredients on Jardim's tables, caught in the crystal-clear rivers of the Serra da Bodoquena.", tag: "River" },
    { name: "Chipa", icon: Utensils, desc: "A baked snack of cassava starch and cheese with Paraguayan influence. Enjoyed at breakfast, as a snack or at any time of day.", tag: "Border" },
    { name: "Tereré", icon: Leaf, desc: "Much more than a drink — a symbol of togetherness, tradition and the identity of Mato Grosso do Sul, shared in circles and conversation.", tag: "Ritual" },
    { name: "Regional Cuisine", icon: Utensils, desc: "A blend of flavours from the Pantanal, the border and the interior: cassava, corn, cheese and recipes inherited from pioneer families.", tag: "Interior" },
];

const itinerary = [
    {
        day: "Day 1",
        theme: "History and Culture",
        morning: "Visit the CER-3 Museum and the historic centre. Discover the history of the BR-060 construction and Jardim's strategic role in the region.",
        afternoon: "Cemetery of the Heroes of the Paraguayan War and historic monuments. Walking tour of the city centre, local crafts and the main square.",
        evening: "Dinner with regional cuisine, tereré shared in a circle with locals. Feel the calm and welcoming rhythm of a city that lives its past with pride.",
        color: "from-amber-600 to-orange-700",
        icon: Camera,
    },
    {
        day: "Day 2",
        theme: "Nature and Adventure",
        morning: "Snorkelling at Rio da Prata — turquoise-blue crystal waters, tame fish and an otherworldly underwater landscape.",
        afternoon: "Visit Lagoa Misteriosa for diving or contemplation. Buraco das Araras: the scarlet macaws in their natural habitat will astonish any visitor.",
        evening: "Ecological trail at dusk. Sunset over the Serra da Bodoquena and a dinner based on regional fish.",
        color: "from-teal-600 to-cyan-700",
        icon: Waves,
    },
    {
        day: "Day 3",
        theme: "Flavours and Experiences",
        morning: "Sport fishing on the region's rivers or a visit to a natural swimming hole. Direct contact with the fauna and flora of the Cerrado and Pantanal.",
        afternoon: "Regional gastronomy: Pantanal barbecue, arroz carreteiro and chipa. Shopping for crafts in leather, wood and seeds.",
        evening: "Farewell with sunset over the Serra. Jardim stays with you forever — just like the clarity of its waters.",
        color: "from-emerald-600 to-green-700",
        icon: Leaf,
    },
];

const curiosities = [
    { text: "Lagoa Misteriosa is one of the deepest flooded caves in the world — its total depth has not yet been fully mapped." },
    { text: "Buraco das Araras is a natural sinkhole where dozens of scarlet macaws nest, visible to the naked eye from the rim." },
    { text: "The region was a strategic route of the Retreat from Laguna during the Paraguayan War — one of the most dramatic episodes in Brazilian history." },
    { text: "The CER-3 Museum preserves the history of the BR-060 construction, the road that transformed Jardim into a regional hub in the 20th century." },
    { text: "Jardim is part of the Serra da Bodoquena, internationally recognised as one of the largest freshwater aquifers on the planet." },
    { text: "The transparency of the region's rivers is the result of filtration through the limestone of the Serra da Bodoquena — a unique geological phenomenon." },
    { text: "Macaws, toucans, tapirs, jaguars and caimans coexist just a few kilometres from the urban centre of Jardim." },
    { text: "Strategically positioned on the Bioceanic Route, Jardim has the potential to become one of the corridor's great international ecotourism destinations." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-teal-400 uppercase tracking-widest mb-3"
        >
            {children}
        </motion.span>
    );
}

function SectionTitle({ children, light = false, className = "" }) {
    return (
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${light ? "text-white" : "text-primary-950"} ${className}`}
        >
            {children}
        </motion.h2>
    );
}

/* ─── infographic ────────────────────────────────────────────── */

function InfograficoSection() {
    const src = useInfographic("jardim");
    const [open, setOpen] = useState(false);
    return (
        <>
            <section className="bg-primary-950 py-16">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/40 max-w-4xl mx-auto cursor-zoom-in group"
                        onClick={() => setOpen(true)}
                    >
                        <img
                            src={src}
                            alt="Editorial infographic Jardim"
                            className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-full p-3">
                                <ZoomIn className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>
                    <p className="text-center text-white/30 text-xs mt-3">Click to enlarge</p>
                </div>
            </section>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setOpen(false)}
                    >
                        <button
                            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            src={src}
                            alt="Editorial infographic Jardim"
                            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

/* ─── page ───────────────────────────────────────────────────── */

export default function JardimPageEn() {
    const isMobile = useIsMobile();
    return (
        <div className="min-h-screen">

            {/* ── HERO ── */}
            <CityHero
                country="Brazil"
                countryFlag="🇧🇷"
                region="Mato Grosso do Sul"
                name={{ first: "Jardim", second: "" }}
                tagline="Serra da Bodoquena, emerald-blue lagoons and the natural gateway between the Cerrado and the Pantanal."
                scene="pantanal"
                image="/cities/jardim.jpg"
                accentColor="#86efac"
                stats={[
                    { label: "Inhabitants (2022 Census)", value: 27245 },
                    { label: "Founded", value: 1948 },
                    { label: "km from Bonito", value: 80, suffix: " km" },
                    { label: "km from Campo Grande", value: 220, suffix: " km" },
                ]}
            />

            {/* ── INFOGRAPHIC ── */}
            <InfograficoSection />

            {/* ── BURACO DAS ARARAS ── */}
            <section style={{ background: "linear-gradient(135deg, #0a1f0f 0%, #0d2b1a 50%, #0a1f0f 100%)", position: "relative", overflow: "hidden", padding: "80px 0" }}>
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "url('/cities/buraco_araras.jpg')",
                    backgroundSize: "cover", backgroundPosition: "center",
                    opacity: 0.12,
                }} />
                <div style={{ position: "absolute", top: "-120px", right: "-120px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(5,150,105,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: "80rem", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "56px", alignItems: "center" }}>
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.4)", borderRadius: "99px", padding: "6px 16px", marginBottom: "20px" }}>
                            <span style={{ fontSize: "18px" }}>🦜</span>
                            <span style={{ color: "#6ee7b7", fontWeight: 600, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>Natural Highlight</span>
                        </div>

                        <h2 style={{ color: "#ffffff", fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "16px" }}>
                            Buraco das Araras
                        </h2>
                        <p style={{ color: "#6ee7b7", fontSize: "1.1rem", fontWeight: 500, marginBottom: "28px" }}>
                            Brazil's largest natural sinkhole — a living abyss 14 km from Jardim
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "36px" }}>
                            <p style={{ color: "#a7f3d0", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                Carved into the Cretaceous limestone of the Serra da Bodoquena, Buraco das Araras is a <strong style={{ color: "#6ee7b7" }}>collapse sinkhole</strong> — a karst phenomenon formed over millennia by the dissolution of limestone rock by acidic underground waters. Approximately 500 metres in diameter and 100 metres deep, it is considered Brazil's largest natural sinkhole and one of the most expressive in South America.
                            </p>
                            <p style={{ color: "#a7f3d0", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                The vertical walls of the abyss have become the permanent home of dozens of <strong style={{ color: "#6ee7b7" }}>scarlet macaws (Ara chloropterus)</strong> — the majestic red-and-green macaws that gave the site its name. Every dawn transforms the sinkhole into a spectacle of colour and sound: entire flocks take flight from inside the crater, crossing golden rays of sunlight as the echo of their calls reverberates off the stone walls. Alongside the macaws, yellow-headed vultures, parakeets and various raptor species also inhabit the reserve.
                            </p>
                            <p style={{ color: "#a7f3d0", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                Buraco das Araras is a <strong style={{ color: "#6ee7b7" }}>private ecological reserve</strong> with responsible visitor facilities: a rim trail, a viewing platform and trained local guides. The experience of gazing into this green abyss — where macaws circle like red flames against the dark depths — is considered by many visitors the most unforgettable moment of the entire Bioceanic Route.
                            </p>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                            {[
                                { icon: "⭕", label: "Diameter", value: "~500 m" },
                                { icon: "⬇️", label: "Depth", value: "~100 m" },
                                { icon: "🦜", label: "Resident macaws", value: "dozens" },
                                { icon: "📍", label: "Distance from Jardim", value: "14 km" },
                            ].map((s) => (
                                <div key={s.label} style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "12px", padding: "14px 16px" }}>
                                    <div style={{ fontSize: "20px", marginBottom: "4px" }}>{s.icon}</div>
                                    <div style={{ color: "#6ee7b7", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" }}>{s.label}</div>
                                    <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.1rem" }}>{s.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(16,185,129,0.3)", boxShadow: "0 24px 60px rgba(0,0,0,0.6)", position: "relative" }}>
                            <img
                                src="/cities/buraco_araras.jpg"
                                alt="Buraco das Araras — limestone sinkhole with scarlet macaws"
                                style={{ width: "100%", height: "340px", objectFit: "cover", display: "block" }}
                            />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,31,15,0.7) 0%, transparent 50%)" }} />
                            <div style={{ position: "absolute", bottom: "16px", left: "20px", right: "20px" }}>
                                <p style={{ color: "#d1fae5", fontSize: "0.8rem", opacity: 0.8 }}>Serra da Bodoquena · Jardim, MS · Brazil</p>
                            </div>
                        </div>

                        <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "16px", padding: "24px" }}>
                            <h3 style={{ color: "#6ee7b7", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>How to visit</h3>
                            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: 0 }}>
                                {[
                                    { icon: "🕐", text: "Dawn and late afternoon — best time to watch the macaws in flight" },
                                    { icon: "🚗", text: "14 km from Jardim town centre via MS-178; accessible by car" },
                                    { icon: "🎟️", text: "Private reserve with admission ticket and local guide included" },
                                    { icon: "📷", text: "Viewing platform with observation deck; cameras permitted" },
                                ].map((item) => (
                                    <li key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                        <span style={{ fontSize: "16px", flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
                                        <span style={{ color: "#a7f3d0", fontSize: "0.88rem", lineHeight: 1.5 }}>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── EXECUTIVE SUMMARY ── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Who is Jardim</SectionLabel>
                        <SectionTitle>
                            Where history meets{" "}
                            <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                crystal-clear nature
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Jardim is the gateway to the Serra da Bodoquena — a territory of incomparably transparent
                            rivers, mysterious caves and exuberant biodiversity. But the city goes beyond nature: it
                            carries chapters of the Paraguayan War, the memory of the CER-3 and an{" "}
                            <strong className="text-primary-700">authentic Pantanal identity</strong> expressed
                            in its gastronomy, crafts and the warmth of its people.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Waves,
                                title: "Crystal-Clear Waters",
                                text: "Lagoa Misteriosa, Rio da Prata and swimming holes with visibility that reveals another world. The limestone geology of the Bodoquena creates a phenomenon unique on the planet.",
                                color: "from-cyan-50 to-teal-50",
                                accent: "text-teal-600",
                                iconBg: "bg-teal-100",
                            },
                            {
                                icon: Camera,
                                title: "Wild Fauna",
                                text: "Macaws, toucans, jaguars, tapirs and caimans just a few kilometres from the town centre. Buraco das Araras is one of the most impressive natural spectacles in Brazil.",
                                color: "from-emerald-50 to-green-50",
                                accent: "text-emerald-700",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: Compass,
                                title: "Memory and History",
                                text: "Cemetery of the Heroes, CER-3 Museum and traces of the Retreat from Laguna. Jardim is one of the guardians of the historical memory of Mato Grosso do Sul.",
                                color: "from-amber-50 to-orange-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                        ].map((pillar, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className={`rounded-3xl p-8 bg-gradient-to-br ${pillar.color}`}
                            >
                                <div className={`w-12 h-12 rounded-2xl ${pillar.iconBg} flex items-center justify-center mb-5`}>
                                    <pillar.icon className={`w-6 h-6 ${pillar.accent}`} />
                                </div>
                                <h3 className={`font-display text-xl font-bold ${pillar.accent} mb-3`}>{pillar.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{pillar.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HISTORY ── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Roots that tell a heroic story</SectionLabel>
                        <SectionTitle light>
                            From the Paraguayan War to the{" "}
                            <span className="bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
                                Continental Route
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Jardim was built in layers of history, courage and nature. Each era left legible marks
                            in its monuments, museums and in the oral memory of the people of Mato Grosso do Sul.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {historia.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: 0.08 * i, duration: 0.6 }}
                                className={`rounded-3xl border ${item.border} bg-white/[0.04] overflow-hidden hover:bg-white/[0.07] transition-all duration-400`}
                            >
                                <div className={`h-2 bg-gradient-to-r ${item.color}`} />
                                <div className="p-7">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <span className={`text-xs font-semibold ${item.accent} uppercase tracking-widest`}>
                                                {item.era}
                                            </span>
                                            <h3 className="font-display text-xl font-bold text-white mt-1">{item.title}</h3>
                                        </div>
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                                            <item.icon className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <p className="text-white/55 text-sm leading-relaxed mb-4">{item.body}</p>
                                    <div className="flex items-center gap-2 text-xs text-teal-400/70">
                                        <MapPin className="w-3 h-3" />
                                        <span>Landmark: {item.symbol}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── LAGOA MISTERIOSA ── */}
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <SectionLabel>Natural and Historical Heritage</SectionLabel>
                            <SectionTitle>
                                A city that holds{" "}
                                <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                    history and mystery
                                </span>
                            </SectionTitle>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-slate-500 leading-relaxed mb-8"
                            >
                                Jardim preserves both the natural records of the Serra da Bodoquena and the
                                historical memory of the region's settlement. From the Cemetery of the Heroes
                                to the CER-3 Museum, the city transforms heritage into a living cultural experience.
                            </motion.p>
                            <div className="space-y-3">
                                {[
                                    { name: "Cemetery of the Heroes", desc: "Landmark of the Paraguayan War. Military and historical memory of 19th-century bravery." },
                                    { name: "CER-3 Museum", desc: "Collection of the Road Commission. History of the BR-060 and regional transformation." },
                                    { name: "Historic Centre", desc: "Central square, church and buildings that preserve the memory of pioneer families." },
                                    { name: "Regional Crafts", desc: "Leather, wood, bone and fibres: unique pieces that tell the Pantanal identity of Jardim." },
                                    { name: "Retreat from Laguna Route", desc: "Historic trail connecting Jardim to the most remarkable episode of the Paraguayan War in this territory." },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.06 * i }}
                                        className="flex gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-200 hover:shadow-sm transition-all"
                                    >
                                        <ChevronRight className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <div className="font-semibold text-primary-900 text-sm">{item.name}</div>
                                            <div className="text-slate-400 text-xs mt-0.5">{item.desc}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="rounded-3xl bg-primary-950 p-8 md:p-10 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
                                <div className="relative z-10">
                                    <span className="text-xs font-semibold text-teal-400 uppercase tracking-widest block mb-4">
                                        Natural Wonder
                                    </span>
                                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                                        Lagoa Misteriosa — a depth that defies knowledge
                                    </h3>
                                    <div className="space-y-4 text-white/60 text-sm leading-relaxed">
                                        <p>
                                            Lagoa Misteriosa is one of the deepest flooded caves in the world.
                                            Its crystal-clear waters reveal impossible shades of blue —
                                            from the shallow turquoise to the deep navy of the depths not yet
                                            fully mapped. Divers from around the world travel to Jardim to
                                            face this unique challenge.
                                        </p>
                                        <p>
                                            The limestone geology of the Serra da Bodoquena created this
                                            singular phenomenon: water that filters and purifies until it
                                            achieves a transparency that seems unreal. On the surface, the
                                            reflection of the sky and native forest completes one of the
                                            most photogenic scenes in Brazil.
                                        </p>
                                        <p className="text-teal-400 font-medium italic">
                                            "There are places that defy language. Lagoa Misteriosa is one of them."
                                        </p>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                                        <Waves className="w-4 h-4 text-teal-400" />
                                        <span className="text-xs text-white/40">International reference for cave diving</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── NATURE ── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <SectionLabel>Serra da Bodoquena</SectionLabel>
                            <SectionTitle light>
                                A paradise of{" "}
                                <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
                                    crystal-clear waters
                                </span>
                            </SectionTitle>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-white/55 leading-relaxed mb-8"
                            >
                                Jardim is part of the Serra da Bodoquena region, internationally recognised for
                                the quality of its waters and the diversity of its ecosystems. Cerrado, Atlantic
                                Forest and Pantanal vegetation converge in a territory that harbours rare species
                                and world-class natural experiences.
                            </motion.p>
                            <div className="space-y-3">
                                {[
                                    { label: "Lagoa Misteriosa", sub: "Flooded cave among the deepest in the world. International reference for technical diving" },
                                    { label: "Rio da Prata", sub: "Snorkelling in turquoise-blue waters. Fish, vegetation and preserved underwater scenery" },
                                    { label: "Buraco das Araras", sub: "Natural sinkhole with scarlet macaws. Extraordinary wildlife spectacle in untouched habitat" },
                                    { label: "Caves and Grottos", sub: "Millenary limestone formations. Speleology and contemplation in unique underground scenery" },
                                    { label: "Sport Fishing", sub: "Pacu, pintado and dourado in preserved rivers. Regulated and sustainable season" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -15 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.06 * i }}
                                        className="flex gap-3 p-3 rounded-xl bg-white/[0.04] border border-teal-500/15"
                                    >
                                        <Trees className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-teal-300 font-semibold text-sm">{item.label}</span>
                                            <span className="text-white/40 text-xs ml-2">— {item.sub}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { animal: "Macaw", detail: "Symbol of Buraco das Araras", emoji: "🦜" },
                                { animal: "Dourado", detail: "King of the Bodoquena rivers", emoji: "🐟" },
                                { animal: "Jaguar", detail: "Apex predator of the Cerrado and Pantanal", emoji: "🐆" },
                                { animal: "Toucan", detail: "Vivid colour in the native forest", emoji: "🦉" },
                            ].map((creature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i }}
                                    className="rounded-3xl bg-teal-900/30 border border-teal-500/20 p-6 text-center hover:bg-teal-900/50 transition-colors"
                                >
                                    <div className="text-4xl mb-3">{creature.emoji}</div>
                                    <div className="font-display font-bold text-white text-lg">{creature.animal}</div>
                                    <div className="text-teal-400/70 text-xs mt-1">{creature.detail}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CULTURE ── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <SectionLabel>Traditions that are part of our people</SectionLabel>
                            <SectionTitle>
                                Pantanal Identity{" "}
                                <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                    alive and welcoming
                                </span>
                            </SectionTitle>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="space-y-4 text-slate-500 leading-relaxed"
                            >
                                <p>
                                    Jardim carries the customs, legends and traditional knowledge of the Mato Grosso
                                    do Sul Pantanal. Simplicity, hospitality and rural life form the social fabric
                                    of a city whose people are welcoming, unpretentious and proud of their history
                                    and their land.
                                </p>
                                <p>
                                    <strong className="text-primary-700">Chamamé</strong>, Paraguayan polka and
                                    roots sertanejo music liven up festivals and gatherings. The accordion and
                                    viola are ever-present — as is tereré shared in a circle, which transforms
                                    any conversation into a ritual of belonging.
                                </p>
                            </motion.div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Pantanal Identity", desc: "Customs, legends and traditional knowledge of the Mato Grosso do Sul Pantanal" },
                                { label: "Crafts", desc: "Leather, wood, bone and fibres — unique pieces that tell stories across generations" },
                                { label: "Music and Dance", desc: "Chamamé, Paraguayan polka and regional music that animate festivals and celebrations" },
                                { label: "Festivals and Traditions", desc: "Religious festivals, horse parades, rodeos and events that strengthen local culture" },
                            ].map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.08 * i }}
                                    className="rounded-2xl bg-primary-950 p-5"
                                >
                                    <Music className="w-5 h-5 text-teal-400 mb-3" />
                                    <div className="font-display font-bold text-white text-base mb-1">{m.label}</div>
                                    <div className="text-white/40 text-xs leading-relaxed">{m.desc}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── GASTRONOMY ── */}
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Flavours of the Pantanal and the Serra</SectionLabel>
                        <SectionTitle>
                            Cooking rooted in{" "}
                            <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                tradition and warmth
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.12 }}
                            className="text-slate-500 leading-relaxed"
                        >
                            Jardim's table combines river fish, Pantanal meat, cassava and recipes inherited
                            from daily life along the Paraguayan border. A cuisine of sustenance, celebration
                            and heartfelt memory.
                        </motion.p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {dishes.map((dish, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: 0.06 * i, duration: 0.5 }}
                                className="card-hover p-7 group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-100 group-hover:from-teal-500 group-hover:to-cyan-600 flex items-center justify-center transition-all duration-500">
                                        <dish.icon className="w-5 h-5 text-teal-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
                                        {dish.tag}
                                    </span>
                                </div>
                                <h3 className="font-display text-lg font-bold text-primary-950 mb-2">{dish.name}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{dish.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TOURIST ATTRACTIONS ── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>What to see and do</SectionLabel>
                        <SectionTitle>
                            Highlights that{" "}
                            <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                define Jardim
                            </span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {attractions.map((attr, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: 0.07 * i }}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:border-teal-300 hover:shadow-md transition-all duration-300 group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-teal-50 group-hover:bg-teal-600 flex items-center justify-center transition-all duration-400">
                                        <attr.icon className="w-5 h-5 text-teal-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                                        {attr.badge}
                                    </span>
                                </div>
                                <h3 className="font-display font-bold text-primary-950 text-sm mb-2">{attr.name}</h3>
                                <p className="text-slate-400 text-xs leading-relaxed">{attr.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ITINERARY ── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-teal-500/6 rounded-full blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Suggested Itinerary</SectionLabel>
                        <SectionTitle light>
                            3 unforgettable{" "}
                            <span className="bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
                                days
                            </span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {itinerary.map((day, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className="rounded-3xl bg-white/[0.04] border border-white/10 overflow-hidden"
                            >
                                <div className={`p-5 bg-gradient-to-r ${day.color}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                                            <day.icon className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-white/70 text-xs uppercase tracking-widest">{day.day}</div>
                                            <div className="text-white font-bold text-sm">{day.theme}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    {[
                                        { time: "Morning",   text: day.morning },
                                        { time: "Afternoon", text: day.afternoon },
                                        { time: "Evening",   text: day.evening },
                                    ].map((slot, si) => (
                                        <div key={si} className="flex gap-3">
                                            <Clock className="w-3.5 h-3.5 text-teal-400/60 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <span className="text-teal-400/80 text-xs font-semibold uppercase tracking-wide">
                                                    {slot.time}
                                                </span>
                                                <p className="text-white/50 text-xs leading-relaxed mt-0.5">{slot.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── DID YOU KNOW ── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <SectionLabel>Did you know?</SectionLabel>
                        <SectionTitle>
                            Facts that{" "}
                            <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                                surprise
                            </span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {curiosities.map((c, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.06 * i }}
                                className="rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 p-5 hover:shadow-md transition-shadow"
                            >
                                <Star className="w-4 h-4 text-teal-500 mb-3" />
                                <p className="text-primary-800 text-sm leading-relaxed">{c.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PRACTICAL INFORMATION ── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <SectionLabel>Plan your visit</SectionLabel>
                        <SectionTitle light>
                            Practical{" "}
                            <span className="bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
                                information
                            </span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-3xl bg-white/[0.05] border border-white/10 p-7"
                        >
                            <MapPin className="w-6 h-6 text-teal-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">How to Get There</h3>
                            <div className="space-y-3 text-white/50 text-sm leading-relaxed">
                                <p>
                                    <strong className="text-white/80">From Campo Grande:</strong> ~220 km via BR-060
                                    and MS-178. Approximately 3 hours by road.
                                </p>
                                <p>
                                    <strong className="text-white/80">From Bonito:</strong> ~80 km via MS-178.
                                    About 1 hour through the Serra da Bodoquena.
                                </p>
                                <p>
                                    <strong className="text-white/80">On the Bioceanic Route:</strong> Positioned
                                    between Campo Grande and Porto Murtinho — a natural stop on the continental corridor.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="rounded-3xl bg-white/[0.05] border border-white/10 p-7"
                        >
                            <Calendar className="w-6 h-6 text-teal-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Best Time to Visit</h3>
                            <div className="space-y-3 text-sm">
                                <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20">
                                    <span className="text-teal-300 font-semibold text-xs block mb-1">Apr → Oct</span>
                                    <span className="text-white/50 text-xs">Dry season — best visibility in rivers and lagoons</span>
                                </div>
                                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                    <span className="text-blue-300 font-semibold text-xs block mb-1">Jun → Sep</span>
                                    <span className="text-white/50 text-xs">Mild temperatures, ideal for trails and outdoor activities</span>
                                </div>
                                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                    <span className="text-amber-300 font-semibold text-xs block mb-1">Year round</span>
                                    <span className="text-white/50 text-xs">Lagoa Misteriosa and Buraco das Araras can be visited at any time of year</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="rounded-3xl bg-white/[0.05] border border-white/10 p-7"
                        >
                            <Phone className="w-6 h-6 text-teal-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Useful Information</h3>
                            <div className="space-y-3">
                                {[
                                    { label: "City Hall", val: "jardim.ms.gov.br", icon: MapPin },
                                    { label: "Distance from Bonito", val: "~80 km", icon: MapPin },
                                    { label: "Distance from Campo Grande", val: "~220 km", icon: MapPin },
                                    { label: "Tourist voucher", val: "Required for Lagoa Misteriosa", icon: Camera },
                                ].map((c, ci) => (
                                    <div key={ci} className="flex items-center gap-3">
                                        <c.icon className="w-3.5 h-3.5 text-teal-400/60 flex-shrink-0" />
                                        <div>
                                            <span className="text-white/30 text-xs">{c.label}: </span>
                                            <span className="text-white/70 text-xs font-medium">{c.val}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section className="py-20 bg-gradient-to-br from-teal-600 via-cyan-600 to-emerald-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_white_0%,_transparent_70%)]" />
                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-white/80 text-sm uppercase tracking-widest mb-4">
                            Bioceanic Route · Brazil · Mato Grosso do Sul
                        </p>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            Jardim — where history meets nature, and adventure begins in crystal-clear waters.
                        </h2>
                        <p className="text-white/70 mb-8 max-w-lg mx-auto">
                            Keep exploring the cities that make up the greatest bioceanic corridor in South America.
                        </p>
                        <Link
                            to="/en/cidades"
                            className="inline-flex items-center gap-2 bg-white text-teal-700 font-bold px-8 py-4 rounded-full hover:bg-teal-50 transition-colors group"
                        >
                            See all cities
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
