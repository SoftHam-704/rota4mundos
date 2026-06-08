import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import CityHero from "../../components/CityHero.jsx";
import { useIsMobile } from "../../hooks/useMediaQuery.js";
import { useInfographic } from "../../hooks/useInfographic.js";
import {
    ArrowLeft, ArrowRight, MapPin, Users, Ruler, Calendar,
    Flame, Music, Fish, Trees, Camera, Clock, Phone, Mail,
    Star, ChevronRight, Anchor, Mountain, Leaf, Utensils,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const cycles = [
    {
        era: "1892 – early 20th c.",
        icon: Leaf,
        title: "Yerba Mate Cycle",
        color: "from-emerald-600 to-teal-700",
        accent: "text-emerald-400",
        border: "border-emerald-500/30",
        body: "In 1892, engineer Antonio Corrêa da Costa built a rustic wooden port on the Três Barras farm to ship yerba mate — a founding act that would define the destiny of the future city. The municipality grew, attracting workers and merchants, and established itself as a strategic trading post in the south of the old Mato Grosso.",
        symbol: "Little train at the central square",
    },
    {
        era: "19th – 20th c.",
        icon: Flame,
        title: "Tannin Cycle",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "The abundance of quebracho wood transformed Porto Murtinho into a hub for tannin extraction and industrialization — a raw material used in leather tanning. Florestal Brasileira S/A left indelible marks: the Florestal Brasileira Chimney, a ruin that still stands today as a monument to the industrial scale of that era.",
        symbol: "Florestal Brasileira Chimney",
    },
    {
        era: "19th – 20th c.",
        icon: Anchor,
        title: "Jerked Beef Cycle",
        color: "from-red-700 to-rose-800",
        accent: "text-red-400",
        border: "border-red-500/30",
        body: "Jerked beef completed the economic triad that built the city, integrating Porto Murtinho into broader regional supply networks. Together with yerba mate and tannin, it consolidated the municipality as a hub of labor, trade, and wealth accumulation at different moments in the history of the old unified Mato Grosso.",
        symbol: "Mansions and warehouses on Rua Dr. Corrêa",
    },
    {
        era: "Ongoing",
        icon: Anchor,
        title: "The Port and River Trade",
        color: "from-blue-700 to-indigo-800",
        accent: "text-blue-400",
        border: "border-blue-500/30",
        body: "The Paraguay River was Porto Murtinho's great liquid avenue. Through it flowed goods, news, customs, and people of different origins — Paraguayans, Uruguayans, Spaniards, and other groups who shaped the local social and architectural fabric. The port drove imports and exports and reinforced the city's cosmopolitan character.",
        symbol: "Paraguay River",
    },
];

const touroDuel = {
    bandido: {
        name: "Touro Bandido",
        color: "from-emerald-600 to-green-700",
        tag: "bg-green-500/20 text-green-300 border-green-500/30",
        desc: "Identified by the color green, the Bandido stirs fervent supporters. Its presence in the arena is associated with ritualized transgression, border folklore, and the power of the frontier.",
    },
    encantado: {
        name: "Touro Encantado",
        color: "from-yellow-600 to-amber-700",
        tag: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        desc: "Recognized by the color yellow, the Encantado evokes mystery, belief, and popular wonder. Its fans celebrate the spirituality that permeates the festival.",
    },
};

const dishes = [
    {
        name: "Grilled Pintado",
        icon: Fish,
        desc: "A regional classic that highlights the quality of fish from the Paraguay River, served with cassava, rice, and fresh salads.",
        tag: "River Fish",
    },
    {
        name: "Pintado with Bocaiúva",
        icon: Fish,
        desc: "A preparation already celebrated in the municipality's tourism materials — a perfect hook for gastronomic storytelling.",
        tag: "House Special",
    },
    {
        name: "Sopa Paraguaya",
        icon: Utensils,
        desc: "A savory corn, cheese, and onion cake — an indispensable presence at border tables. The name is misleading: it is solid and comforting.",
        tag: "Border",
    },
    {
        name: "Chipa",
        icon: Utensils,
        desc: "A baked snack made of cassava starch and cheese, enjoyed at breakfast, as a snack, and on long road trips.",
        tag: "Everyday",
    },
    {
        name: "Lambreado",
        icon: Flame,
        desc: "A rustic, well-seasoned preparation associated with the bold flavor of the countryside and wood-fire and live-coal kitchens.",
        tag: "Countryside",
    },
    {
        name: "Tereré",
        icon: Leaf,
        desc: "More than a drink — a cultural symbol. The Tereré Square transforms this everyday habit into an urban identity monument.",
        tag: "Social Ritual",
    },
];

const attractions = [
    { name: "Morro Pão de Açúcar", icon: Mountain, desc: "~550 meters above sea level, interpretive trail, and natural viewpoint over the Nabileque Pantanal and the Paraguayan Chaco.", badge: "Nature" },
    { name: "Nabileque Pantanal", icon: Trees, desc: "Floodplain landscape, abundant wildlife, and a unique vocation for contemplation, research, and sensitive tourism.", badge: "Ecosystem" },
    { name: "Castelinho", icon: Star, desc: "Architectural and sentimental icon of the city, surrounded by narratives of love, luxury, decay, and haunting.", badge: "Legend" },
    { name: "Dom Jaime A. Barrera Museum", icon: Camera, desc: "Housed in the historic Padaria Cuê (1928), a symbol of memory and urban heritage.", badge: "Heritage 2024" },
    { name: "Little Train", icon: Anchor, desc: "Symbolic monument to yerba mate, installed at the central square — synthesizing an entire economic cycle in a single object.", badge: "Memory" },
    { name: "Cine-Teatro Murtinhense", icon: Music, desc: "Former yerba mate warehouse transformed into a cultural venue on the banks of the Paraguay River.", badge: "Culture" },
    { name: "Tereré Square", icon: Leaf, desc: "Transforms Porto Murtinho's most characteristic everyday habit into an urban, identity-affirming communal space.", badge: "Experience" },
    { name: "Fecho dos Morros", icon: Anchor, desc: "Landscape tied to fishing, contemplation, and border imagination — sunset over the Paraguay River.", badge: "Contemplation" },
];

const itinerary = [
    {
        day: "Day 1",
        theme: "Arrival and Urban Memory",
        morning: "Arrival, check-in, and a leisurely walk along the Paraguay River waterfront. First contact with the human scale and rhythm of the city.",
        afternoon: "Visit the historic center: Castelinho, Padaria Cuê/Dom Jaime Museum, Little Train, central square, and Cine-Teatro Murtinhense.",
        evening: "Dinner with regional flavors and a stroll through the square to feel the local pulse. Tereré circle with residents.",
        color: "from-amber-600 to-orange-700",
        icon: Camera,
    },
    {
        day: "Day 2",
        theme: "Nature and River",
        morning: "Early departure for a boat trip, sport fishing, or contemplation of the Paraguay River and the Nabileque Pantanal.",
        afternoon: "Hike up Morro Pão de Açúcar to the natural viewpoint, with a focus on photography, wildlife observation, and sweeping landscapes.",
        evening: "Pantanal sunset and a fish-based dinner. Conversation with boat pilots, fishermen, and local guides.",
        color: "from-teal-600 to-emerald-700",
        icon: Mountain,
    },
    {
        day: "Day 3",
        theme: "Culture and Departure",
        morning: "Porto Murtinho Historical Museum, Igreja Sagrado Coração de Jesus, and a monuments tour of the historic center.",
        afternoon: "Full gastronomic experience: chipa, sopa paraguaya, and border dishes. Local handicraft shopping.",
        evening: "If there is a cultural calendar, prioritize live chamamé, Meninas Cantoras performances, or Toro Candil experiences.",
        color: "from-blue-600 to-indigo-700",
        icon: Music,
    },
];

const curiosities = [
    { text: "Known as 'the last guardian of the Paraguay River' — riverside and border identity in a single expression." },
    { text: "17,502 km² of territory for a population of ~12,859 people: a vastness rarely imagined." },
    { text: "The Little Train at the central square synthesizes an entire economic cycle (yerba mate) in a single urban monument." },
    { text: "The Castelinho carries one of the most persistent legends of love, decay, and haunting in Mato Grosso do Sul." },
    { text: "In 2024, the Padaria Cuê and the Prefeitura Cuê were officially listed as material historical heritage of the state." },
    { text: "The Toro Candil was declared intangible heritage of Mato Grosso do Sul in 2023." },
    { text: "The Tereré Square elevated a daily border ritual to the status of an official urban symbol." },
    { text: "Porto Murtinho is living a rare moment: historical past and continental logistical future sharing the same imagination." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-secondary-400 uppercase tracking-widest mb-3"
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

/* ─── page ───────────────────────────────────────────────────── */

function InfograficoSection() {
    const src = useInfographic("porto-murtinho");
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
                        <img src={src} alt="Porto Murtinho editorial infographic" className="w-full h-auto" />
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
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setOpen(false)}
                    >
                        <button className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors" onClick={() => setOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            src={src} alt="Porto Murtinho editorial infographic"
                            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default function PortoMurtinhoPageEn() {
    const isMobile = useIsMobile();
    const heroRef = useRef(null);

    return (
        <div className="min-h-screen">

            {/* ── HERO ── */}
            <CityHero
                country="Brazil"
                countryFlag="🇧🇷"
                region="Mato Grosso do Sul"
                name={{ first: "Porto", second: "Murtinho" }}
                tagline="The last Brazilian city before the crossing — where the Paraguay River separates two worlds."
                scene="ponte"
                image="/cities/porto_murtinho.jpg"
                accentColor="#F4A261"
                stats={[
                    { label: "Inhabitants (2022 Census)", value: 12859 },
                    { label: "Founded", value: 1912 },
                    { label: "Territory (km²)", value: 17502 },
                    { label: "km from Campo Grande", value: 437, suffix: " km" },
                ]}
            />

            {/* ── INFOGRAPHIC ── */}
            <InfograficoSection />

            {/* ── THE CROSSING ── */}
            <section style={{ background: "linear-gradient(135deg, #140a00 0%, #1f1000 50%, #140a00 100%)", position: "relative", overflow: "hidden", padding: "80px 0" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/cities/rio_paraguai.jpg')", backgroundSize: "cover", backgroundPosition: "center 60%", opacity: 0.13 }} />
                <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(244,162,97,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle, rgba(234,140,60,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: "80rem", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "56px", alignItems: "center" }}>
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(244,162,97,0.13)", border: "1px solid rgba(244,162,97,0.35)", borderRadius: "99px", padding: "6px 16px", marginBottom: "20px" }}>
                            <span style={{ fontSize: "18px" }}>⛵</span>
                            <span style={{ color: "#fdba74", fontWeight: 600, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>Route Landmark</span>
                        </div>
                        <h2 style={{ color: "#ffffff", fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "16px" }}>
                            The Crossing
                        </h2>
                        <p style={{ color: "#fdba74", fontSize: "1.1rem", fontWeight: 500, marginBottom: "28px" }}>
                            The Paraguay River separates two worlds — and the ferry is the gateway between them
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "36px" }}>
                            <p style={{ color: "#fed7aa", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                Porto Murtinho is where Brazil ends. Literally. On the bank of the <strong style={{ color: "#fdba74" }}>Paraguay River</strong>, the traveler boards a ferry and crosses approximately 800 meters of dark, silent water toward Carmelo Peralta, in Paraguay. It takes less than 15 minutes — but it is the border between the Brazilian Pantanal and the vast Paraguayan Chaco, between two countries, two ecosystems, two languages, and two timescales.
                            </p>
                            <p style={{ color: "#fed7aa", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                The ferry has no glamorous name. It is not a suspension bridge or a modern vessel. It is a simple craft carrying cars, motorcycles, and pedestrians under the Pantanal sun — and it is precisely that <strong style={{ color: "#fdba74" }}>absence of monumental infrastructure</strong> that makes the moment so powerful. The traveler feels, physically, that they are crossing a real border. Morro Pão de Açúcar — a rocky formation rising in solitude at the river's edge — marks the passage like an ancient sentinel.
                            </p>
                            <p style={{ color: "#fed7aa", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                For Bioceanic Route enthusiasts, the crossing at Porto Murtinho is the <strong style={{ color: "#fdba74" }}>most symbolic moment of the entire journey</strong>: this is where Brazil is left behind and the Route of Four Worlds truly begins — heading toward the Chaco, the Andes, and, finally, the Pacific. A bridge is under construction, but while it is not yet here, the ferry carries all the poetry of a living frontier.
                            </p>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                            {[
                                { icon: "🌊", label: "Paraguay River width", value: "~800 m" },
                                { icon: "⏱️", label: "Crossing duration", value: "10–15 min" },
                                { icon: "🏳️", label: "Destination", value: "Carmelo Peralta, PY" },
                                { icon: "🌉", label: "Bioceanic bridge", value: "under construction" },
                            ].map((s) => (
                                <div key={s.label} style={{ background: "rgba(244,162,97,0.08)", border: "1px solid rgba(244,162,97,0.2)", borderRadius: "12px", padding: "14px 16px" }}>
                                    <div style={{ fontSize: "20px", marginBottom: "4px" }}>{s.icon}</div>
                                    <div style={{ color: "#fdba74", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" }}>{s.label}</div>
                                    <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.05rem" }}>{s.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(244,162,97,0.25)", boxShadow: "0 24px 60px rgba(0,0,0,0.7)", position: "relative" }}>
                            <img src="/cities/rio_paraguai.jpg" alt="Morro Pão de Açúcar — Paraguay River on the Brazil-Paraguay border" style={{ width: "100%", height: "340px", objectFit: "cover", objectPosition: "center 50%", display: "block" }} />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,10,0,0.75) 0%, transparent 55%)" }} />
                            <div style={{ position: "absolute", bottom: "16px", left: "20px" }}>
                                <p style={{ color: "#fed7aa", fontSize: "0.8rem", opacity: 0.8 }}>Morro Pão de Açúcar · Paraguay River · Brazil–Paraguay Border</p>
                            </div>
                        </div>
                        <div style={{ background: "rgba(244,162,97,0.07)", border: "1px solid rgba(244,162,97,0.2)", borderRadius: "16px", padding: "24px" }}>
                            <h3 style={{ color: "#fdba74", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>How to make the crossing</h3>
                            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: 0 }}>
                                {[
                                    { icon: "🛂", text: "Valid passport required — international border crossing" },
                                    { icon: "🚗", text: "Vehicles and pedestrians board at the riverbank, downtown Porto Murtinho" },
                                    { icon: "🕐", text: "Crossing available during the day; confirm schedules in town" },
                                    { icon: "💵", text: "Crossing fee charged per person and per vehicle, in reais or guaranis" },
                                ].map((item) => (
                                    <li key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                        <span style={{ fontSize: "15px", flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
                                        <span style={{ color: "#fed7aa", fontSize: "0.88rem", lineHeight: 1.5 }}>{item.text}</span>
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
                        <SectionLabel>Who is Porto Murtinho</SectionLabel>
                        <SectionTitle>
                            Small in population.{" "}
                            <span className="text-gradient">Enormous in history.</span>
                        </SectionTitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-lg text-slate-500 leading-relaxed">
                            Porto Murtinho rises on the banks of the Paraguay River as a border city that blends Pantanal, memory, river trade, Paraguayan tradition, historic architecture, and a strong sense of cultural belonging. Today, it gains national prominence as the{" "}
                            <strong className="text-primary-700">Brazilian gateway of the Bioceanic Route.</strong>
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: Anchor, title: "Paraguay River", text: "The ecological, economic, and scenic axis of the city. Through it flowed yerba mate, tannin, jerked beef, and the soul of different cultures.", color: "from-blue-50 to-teal-50", accent: "text-teal-600", iconBg: "bg-teal-100" },
                            { icon: Camera, title: "Urban Memory", text: "Castelinho, Padaria Cuê, Little Train, and a series of mansions that read economic cycles in their walls, parapets, and old plasterwork.", color: "from-amber-50 to-orange-50", accent: "text-amber-700", iconBg: "bg-amber-100" },
                            { icon: Music, title: "Border Culture", text: "Chamamé, Toro Candil, mestizo cuisine, and popular faith weave an identity that exists only in this singular corner of South America.", color: "from-red-50 to-rose-50", accent: "text-red-700", iconBg: "bg-red-100" },
                        ].map((pillar, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className={`rounded-3xl p-8 bg-gradient-to-br ${pillar.color}`}>
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

            {/* ── HISTORICAL CYCLES ── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Cycles that built the city</SectionLabel>
                        <SectionTitle light>
                            From the Rustic Port to the{" "}
                            <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">
                                Continental Route
                            </span>
                        </SectionTitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-white/50 text-base leading-relaxed">
                            Porto Murtinho was built in layers. Each economic cycle left not only wealth, but architecture, memory, and identity — still legible today in its streets and monuments.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {cycles.map((cycle, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: 0.08 * i, duration: 0.6 }} className={`rounded-3xl border ${cycle.border} bg-white/[0.04] overflow-hidden hover:bg-white/[0.07] transition-all duration-400`}>
                                <div className={`h-2 bg-gradient-to-r ${cycle.color}`} />
                                <div className="p-7">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <span className={`text-xs font-semibold ${cycle.accent} uppercase tracking-widest`}>{cycle.era}</span>
                                            <h3 className="font-display text-xl font-bold text-white mt-1">{cycle.title}</h3>
                                        </div>
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cycle.color} flex items-center justify-center flex-shrink-0`}>
                                            <cycle.icon className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <p className="text-white/55 text-sm leading-relaxed mb-4">{cycle.body}</p>
                                    <div className="flex items-center gap-2 text-xs text-secondary-400/70">
                                        <MapPin className="w-3 h-3" />
                                        <span>Symbol: {cycle.symbol}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CASTELINHO & THE LEGEND ── */}
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <SectionLabel>Architecture and Heritage</SectionLabel>
                            <SectionTitle>
                                A city you can read{" "}
                                <span className="text-gradient">in its walls</span>
                            </SectionTitle>
                            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-500 leading-relaxed mb-8">
                                A walk through downtown Porto Murtinho is a history lesson written in parapets, windows, towers, and old plasterwork. The city preserves buildings that recall the peak of its productive cycles and were officially listed in 2024 as material historical heritage of the state.
                            </motion.p>
                            <div className="space-y-3">
                                {[
                                    { name: "The Castelinho", desc: "Architectural and sentimental icon. Romanticism, extravagance, and legend." },
                                    { name: "Padaria Cuê / Dom Jaime Museum", desc: "Building from 1928, listed in 2024. Memory of commerce and urban life." },
                                    { name: "Prefeitura Cuê", desc: "Historic seat of municipal power. Also listed in 2024." },
                                    { name: "Cine-Teatro Murtinhense", desc: "Former yerba mate warehouse on the riverbank, now a cultural stage." },
                                    { name: "Parish of Sagrado Coração de Jesus", desc: "Religious and architectural landmark of the historic center." },
                                ].map((item, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 * i }} className="flex gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-200 hover:shadow-sm transition-all">
                                        <ChevronRight className="w-4 h-4 text-secondary-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <div className="font-semibold text-primary-900 text-sm">{item.name}</div>
                                            <div className="text-slate-400 text-xs mt-0.5">{item.desc}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-3xl bg-primary-950 p-8 md:p-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl" />
                                <div className="relative z-10">
                                    <span className="text-xs font-semibold text-secondary-400 uppercase tracking-widest block mb-4">Living Legend</span>
                                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                                        The Love, the Ruin, and the Haunting of the Castelinho
                                    </h3>
                                    <div className="space-y-4 text-white/60 text-sm leading-relaxed">
                                        <p>
                                            Thomaz Herrera fell in love with Virgínia — a woman of sophisticated European lineage, accustomed to refinements that the Brazilian hinterland could hardly offer. To impress her, Herrera built at the heart of Porto Murtinho a small castle with European features: towers, ornate parapets, and an architectural romanticism unusual for the border.
                                        </p>
                                        <p>
                                            The love lasted. The fortune did not. Bankruptcy came, passion did not survive poverty, and tragedy shadowed the story's end. The Castelinho remained. And with it, the narrative that turned it into a character: the people of Porto Murtinho say the house holds the spirits of lost love.
                                        </p>
                                        <p className="text-secondary-400 font-medium italic">
                                            "In Porto Murtinho, official history coexists with oral narrative. The Castelinho is the most vivid example of that."
                                        </p>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                                        <Star className="w-4 h-4 text-secondary-400" />
                                        <span className="text-xs text-white/40">One of the most famous historic buildings in Mato Grosso do Sul</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TORO CANDIL ── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <SectionLabel>Intangible Heritage · Mato Grosso do Sul, 2023</SectionLabel>
                        <SectionTitle light>
                            Toro Candil:
                            <br />
                            <span className="bg-gradient-to-r from-orange-400 via-secondary-400 to-red-400 bg-clip-text text-transparent">
                                faith, fire, and festivity
                            </span>
                        </SectionTitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-white/55 text-base leading-relaxed">
                            Few manifestations capture Porto Murtinho's identity so well. It takes place on the eve of December 8 — a date tied to devotion to the Virgin of Caacupé, patron saint of Paraguay — and transforms the streets into a stage of community, ritual, and belonging.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {Object.values(touroDuel).map((touro, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i, duration: 0.6 }} className={`rounded-3xl overflow-hidden border ${touro.tag.split(" ")[2]}`}>
                                <div className={`h-3 bg-gradient-to-r ${touro.color}`} />
                                <div className="bg-white/[0.05] p-8">
                                    <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${touro.tag} mb-4`}>
                                        {i === 0 ? "Green · Transgression" : "Yellow · The Enchanted"}
                                    </span>
                                    <h3 className="font-display text-2xl font-bold text-white mb-3">{touro.name}</h3>
                                    <p className="text-white/55 text-sm leading-relaxed">{touro.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl bg-white/[0.04] border border-white/10 p-8">
                        <h3 className="font-display text-xl font-bold text-white mb-6">Who inhabits the festival</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { label: "Mascaritas", sub: "Street characters who embody the festive chaos and popular irreverence" },
                                { label: "Promesseiras", sub: "Devotees who carry the religious and faith dimension of the manifestation" },
                                { label: "Pelota Tata", sub: "The fireball — a spectacular element that intensifies the ritual atmosphere" },
                                { label: "Collective enactment", sub: "Music, racing, rivalry, and community dramaturgy that involve the entire city" },
                            ].map((elem, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-white/[0.06]">
                                    <div className="font-semibold text-secondary-400 text-sm mb-1">{elem.label}</div>
                                    <div className="text-white/40 text-xs leading-relaxed">{elem.sub}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── CHAMAMÉ ── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <SectionLabel>International Festival · Living Tradition</SectionLabel>
                            <SectionTitle>
                                Chamamé and the{" "}
                                <span className="text-gradient">Soul of the Border</span>
                            </SectionTitle>
                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="space-y-4 text-slate-500 leading-relaxed">
                                <p>
                                    Porto Murtinho celebrates chamamé — a rhythm with Argentine, Paraguayan, and Guaraní roots, deeply embedded in the culture of Mato Grosso do Sul. The International Chamamé Festival brings together artists from Brazil, Paraguay, and Argentina, as well as local groups that reveal the strength of community cultural formation.
                                </p>
                                <p>
                                    The{" "}
                                    <strong className="text-primary-700">Porto Murtinho Guitar Orchestra</strong> and
                                    the{" "}
                                    <strong className="text-primary-700">Meninas Cantoras</strong> are living examples of how the city does not merely live off its past: it produces culture in the present, nurturing artists who carry the municipality's name across the state and the country.
                                </p>
                            </motion.div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Polca", desc: "Paraguayan-based rhythm present in the daily musical life of the border" },
                                { label: "Guarânia", desc: "A lyrical genre that unites Brazil, Paraguay, and Argentina in one melody" },
                                { label: "Chamamé", desc: "Rhythm of Guaraní and European roots, the soul of the northwestern Plata folklore" },
                                { label: "Tereré circle", desc: "A social and affective habit that accompanies music, conversation, and celebration" },
                            ].map((m, i) => (
                                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.08 * i }} className="rounded-2xl bg-primary-950 p-5">
                                    <Music className="w-5 h-5 text-secondary-400 mb-3" />
                                    <div className="font-display font-bold text-white text-base mb-1">{m.label}</div>
                                    <div className="text-white/40 text-xs leading-relaxed">{m.desc}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── GASTRONOMY ── */}
            <section className="section-padding bg-amber-950/30 bg-slate-50">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Flavors of the Pantanal and the Border</SectionLabel>
                        <SectionTitle>
                            A cuisine of{" "}
                            <span className="text-gradient">affection and memory</span>
                        </SectionTitle>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.12 }} className="text-slate-500 leading-relaxed">
                            The table of Porto Murtinho combines river fish, meat, cassava, corn, cheese, and recipes inherited from daily life alongside Paraguay. It is a cuisine of sustenance and celebration.
                        </motion.p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {dishes.map((dish, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: 0.06 * i, duration: 0.5 }} className="card-hover p-7 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 group-hover:from-secondary-500 group-hover:to-orange-600 flex items-center justify-center transition-all duration-500">
                                        <dish.icon className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-xs font-semibold text-secondary-500 bg-secondary-50 px-2.5 py-1 rounded-full">{dish.tag}</span>
                                </div>
                                <h3 className="font-display text-lg font-bold text-primary-950 mb-2">{dish.name}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{dish.desc}</p>
                            </motion.div>
                        ))}
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
                            <SectionLabel>Pantanal and Paraguay River</SectionLabel>
                            <SectionTitle light>
                                The nature that{" "}
                                <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
                                    defines everything
                                </span>
                            </SectionTitle>
                            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-white/55 leading-relaxed mb-8">
                                Porto Murtinho belongs to the Pantanal biome and has the Paraguay River as its ecological, economic, and scenic axis. The city is integrated into the Nabileque Pantanal — a sub-region of great environmental importance, shaped by a seasonality that defines daily life, wildlife, and local culture.
                            </motion.p>
                            <div className="space-y-3">
                                {[
                                    { label: "Paraguay River", sub: "Stage for fishing, navigation, contemplation, memory, and international integration" },
                                    { label: "Nabileque Pantanal", sub: "Floodplains, abundant wildlife, and seasonality that sets the rhythm of life" },
                                    { label: "Morro Pão de Açúcar", sub: "~550 meters. Natural viewpoint over the Chaco and Pantanal. Interpretive trail" },
                                    { label: "Emblematic Wildlife", sub: "Jabiru storks, herons, macaws, caimans, capybaras, and large fish" },
                                    { label: "Sport Fishing", sub: "Jaú, pintado, pacu, and dourado. Season from Feb to Nov, respecting the spawning ban" },
                                ].map((item, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 * i }} className="flex gap-3 p-3 rounded-xl bg-white/[0.04] border border-teal-500/15">
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
                                { animal: "Jabiru", detail: "Symbolic bird of the Pantanal", emoji: "🦢" },
                                { animal: "Pintado", detail: "The largest fish in the Paraguay River", emoji: "🐟" },
                                { animal: "Caiman", detail: "Guardian of the floodplain banks", emoji: "🐊" },
                                { animal: "Macaw", detail: "Vivid color across the Pantanal fields", emoji: "🦜" },
                            ].map((creature, i) => (
                                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className="rounded-3xl bg-teal-900/30 border border-teal-500/20 p-6 text-center hover:bg-teal-900/50 transition-colors">
                                    <div className="text-4xl mb-3">{creature.emoji}</div>
                                    <div className="font-display font-bold text-white text-lg">{creature.animal}</div>
                                    <div className="text-teal-400/70 text-xs mt-1">{creature.detail}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TOURIST ATTRACTIONS ── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>What to see and do</SectionLabel>
                        <SectionTitle>
                            Places that{" "}
                            <span className="text-gradient">explain the city</span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {attractions.map((attr, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: 0.07 * i }} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:border-secondary-300 hover:shadow-md transition-all duration-300 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary-600 flex items-center justify-center transition-all duration-400">
                                        <attr.icon className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-[10px] font-bold text-secondary-600 bg-secondary-50 px-2 py-0.5 rounded-full border border-secondary-200">{attr.badge}</span>
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-secondary-500/6 rounded-full blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Suggested Itinerary</SectionLabel>
                        <SectionTitle light>
                            3 unforgettable{" "}
                            <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">
                                days
                            </span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {itinerary.map((day, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className="rounded-3xl bg-white/[0.04] border border-white/10 overflow-hidden">
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
                                        { time: "Morning", text: day.morning },
                                        { time: "Afternoon", text: day.afternoon },
                                        { time: "Evening", text: day.evening },
                                    ].map((slot, si) => (
                                        <div key={si} className="flex gap-3">
                                            <div className="flex-shrink-0">
                                                <Clock className="w-3.5 h-3.5 text-secondary-400/60 mt-0.5" />
                                            </div>
                                            <div>
                                                <span className="text-secondary-400/80 text-xs font-semibold uppercase tracking-wide">{slot.time}</span>
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
                            <span className="text-gradient">surprise</span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {curiosities.map((c, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06 * i }} className="rounded-2xl bg-gradient-to-br from-primary-50 to-slate-50 border border-primary-100 p-5 hover:shadow-md transition-shadow">
                                <Star className="w-4 h-4 text-secondary-400 mb-3" />
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
                            <span className="bg-gradient-to-r from-secondary-300 to-orange-400 bg-clip-text text-transparent">
                                information
                            </span>
                        </SectionTitle>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl bg-white/[0.05] border border-white/10 p-7">
                            <MapPin className="w-6 h-6 text-secondary-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">How to Get There</h3>
                            <div className="space-y-3 text-white/50 text-sm leading-relaxed">
                                <p><strong className="text-white/80">By car:</strong> 437–440 km from Campo Grande via BR-267. Approximately 6h30–7h of travel.</p>
                                <p><strong className="text-white/80">Border:</strong> Symbolic connection with Carmelo Peralta (Paraguay) — the next stop on the Bioceanic Route.</p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-3xl bg-white/[0.05] border border-white/10 p-7">
                            <Calendar className="w-6 h-6 text-secondary-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Best Time to Visit</h3>
                            <div className="space-y-3 text-sm">
                                <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20">
                                    <span className="text-teal-300 font-semibold text-xs block mb-1">Mar → Oct</span>
                                    <span className="text-white/50 text-xs">Stable roads, open landscapes, and nature</span>
                                </div>
                                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                    <span className="text-blue-300 font-semibold text-xs block mb-1">Feb → Nov</span>
                                    <span className="text-white/50 text-xs">Sport fishing window (spawning ban in Dec/Jan)</span>
                                </div>
                                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                    <span className="text-amber-300 font-semibold text-xs block mb-1">December 7</span>
                                    <span className="text-white/50 text-xs">Eve of the Toro Candil — not to be missed</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-3xl bg-white/[0.05] border border-white/10 p-7">
                            <Phone className="w-6 h-6 text-secondary-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Useful Contacts</h3>
                            <div className="space-y-3">
                                {[
                                    { label: "Tourism", val: "(67) 9 9694-3176", icon: Phone },
                                    { label: "Tourism Email", val: "turismo@portomurtinho.ms.gov.br", icon: Mail },
                                    { label: "Hospital", val: "(67) 3287-1469", icon: Phone },
                                    { label: "Military Police", val: "(67) 3287-1300", icon: Phone },
                                ].map((c, ci) => (
                                    <div key={ci} className="flex items-center gap-3">
                                        <c.icon className="w-3.5 h-3.5 text-secondary-400/60 flex-shrink-0" />
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
            <section className="py-20 bg-gradient-to-br from-amber-600 via-orange-600 to-secondary-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_white_0%,_transparent_70%)]" />
                <div className="container-custom relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <p className="text-white/80 text-sm uppercase tracking-widest mb-4">
                            Bioceanic Route · Brazil · Mato Grosso do Sul
                        </p>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            Porto Murtinho — where the Paraguay River meets history, culture, and nature.
                        </h2>
                        <p className="text-white/70 mb-8 max-w-lg mx-auto">
                            Keep exploring the cities that form the largest bioceanic corridor in South America.
                        </p>
                        <Link
                            to="/en/cidades"
                            className="inline-flex items-center gap-2 bg-white text-orange-700 font-bold px-8 py-4 rounded-full hover:bg-orange-50 transition-colors group"
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
