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
    Wheat, Tractor, Globe,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "Indigenous Peoples",
        icon: Compass,
        title: "The Terena People and the Red Earth",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Long before colonization, the territory that is now Sidrolândia was inhabited by the Terena people — an indigenous nation that maintains a living and active presence in the region to this day. The Terena cultivate centuries-old traditions of craftsmanship, spirituality, and agriculture that withstood the test of time and became an essential part of the municipality's cultural identity.",
        symbol: "Terena Indigenous Village — living memory",
    },
    {
        era: "19th Century",
        icon: Leaf,
        title: "The Settlement and the Sidrolândia Farm",
        color: "from-emerald-600 to-teal-700",
        accent: "text-emerald-400",
        border: "border-emerald-500/30",
        body: "The origin of the name comes from the Sidrolândia Farm, which gave the settlement its first identity. Permanent occupation came through cattle ranching and the families who migrated to work the fertile lands of Mato Grosso do Sul — red soil, generous cerrado, and abundant rivers.",
        symbol: "Sidrolândia Farm — origin of the municipality",
    },
    {
        era: "20th Century",
        icon: Wheat,
        title: "The Agribusiness Revolution",
        color: "from-yellow-600 to-amber-700",
        accent: "text-yellow-400",
        border: "border-yellow-500/30",
        body: "The most radical transformation of Sidrolândia came with agricultural modernization. Soy, corn, cattle, and poultry farming turned the city into one of the largest productive hubs in Mato Grosso do Sul. Cooperatives, grain silos, and agro-industries were established, making the municipality an economic reference in the MS productive belt.",
        symbol: "Cooperatives and silos — symbols of the new agro",
    },
    {
        era: "21st Century",
        icon: Globe,
        title: "The Bioceanic Route and the New Horizon",
        color: "from-blue-700 to-indigo-800",
        accent: "text-blue-400",
        border: "border-blue-500/30",
        body: "With the consolidation of the Bioceanic Route, Sidrolândia gained a new strategic role: a logistical connection point between Campo Grande and the border. Its privileged position in the export corridor projects it as an axis of the new South American agro — where production meets continental integration.",
        symbol: "Bioceanic Corridor — the future starts here",
    },
];

const attractions = [
    { name: "Terena Villages", icon: Users, desc: "Active indigenous communities that preserve craftsmanship, language, rituals, and traditional agriculture. A unique window into 10,000 years of South American history.", badge: "Culture" },
    { name: "Cerrado Landscape", icon: Trees, desc: "The authentic cerrado of MS — veredas, buriti palms, red-banked rivers and sunsets that paint the horizon in copper and gold.", badge: "Nature" },
    { name: "Traditional Festivals", icon: Music, desc: "Rodeos, horseback rides, harvest festivals, and cultural celebrations blending indigenous, sertaneja, and pantaneira traditions.", badge: "Events" },
    { name: "Fishing on Regional Rivers", icon: Fish, desc: "Cerrado rivers with pacu, pintado, and dourado fish. A preserved environment for sport fishing and communing with nature.", badge: "Sport" },
    { name: "Cooperatives and Silos", icon: Tractor, desc: "The agro route: visit grain silos, cooperatives, and discover the production chain that makes Sidrolândia one of the economically strongest cities in MS.", badge: "Agro" },
    { name: "Terena Handicrafts", icon: Star, desc: "Unique pieces in straw, ceramics, wood, and natural fibers. Each object carries centuries of technique and symbolism from the Terena people.", badge: "Crafts" },
    { name: "Trails and Rivers", icon: Compass, desc: "Trails through cerrado, wetlands, and gallery forests. Landscapes revealing the transition between productive land and the wild.", badge: "Adventure" },
    { name: "Rural Gastronomy", icon: Utensils, desc: "Authentic farm cooking: ground-fire barbecue, arroz carreteiro, regional sobá, and tereré shared in a circle — the identity of the MS interior.", badge: "Gastronomy" },
];

const dishes = [
    { name: "Pantanal Barbecue", icon: Flame, desc: "Meats cooked over a ground fire, simple seasoning, and slow embers. A legacy of the drovers and field life that defines the palate of Sidrolândia.", tag: "Ground Fire" },
    { name: "Arroz Carreteiro", icon: Utensils, desc: "A sustaining dish of the cattle drives and the field. Rice with dried meat, cassava, and regional seasonings — a flavor that comforts and belongs.", tag: "Tradition" },
    { name: "Regional Sobá", icon: Utensils, desc: "The Japanese influence that reached the MS interior and found local flavors. A dish of identity and togetherness at the heart of the state.", tag: "Fusion" },
    { name: "Tereré in a Circle", icon: Leaf, desc: "Much more than a drink — it is ceremony. Cold yerba mate shared in a circle as a symbol of friendship, hospitality, and belonging.", tag: "Ritual" },
    { name: "Cerrado Fish", icon: Fish, desc: "Pacu, pintado, and genuine pintado from regional rivers. Fried, grilled, or in broth — dishes that come straight from the water to the table.", tag: "River" },
    { name: "Farm Cooking", icon: Flame, desc: "Cassava, corn, beans, cheese, and recipes inherited from pioneer families. A cuisine that tells the story of those who made the cerrado productive.", tag: "Roots" },
];

const itinerary = [
    {
        day: "Day 1",
        theme: "Culture & People",
        morning: "Visit to the Terena villages — craftsmanship, oral memory, and traditional architecture. Understand how the Terena people keep their identity alive amid the advance of modern agribusiness.",
        afternoon: "Historic center, local museum, and colonial memory sites. Conversations with community leaders about the challenges and achievements of the indigenous people.",
        evening: "Dinner with farm cooking, tereré in a circle, and live sertaneja music. Feel the unhurried, hospitable rhythm of the productive MS interior.",
        color: "from-amber-600 to-orange-700",
        icon: Users,
    },
    {
        day: "Day 2",
        theme: "Agro & Nature",
        morning: "The agro route: visit cooperatives, silos, and rural properties. Understand how soy, corn, and cattle transformed Sidrolândia into an economic powerhouse of MS.",
        afternoon: "Trail through the cerrado, regional river, and gallery forest. Sport fishing or contemplating the landscape that transitions between the productive and the wild.",
        evening: "Cinematic sunset over the fields — one of the most beautiful in the bioceanic corridor. Sky shifting from gold to copper over the endless cerrado.",
        color: "from-green-600 to-teal-700",
        icon: Tractor,
    },
    {
        day: "Day 3",
        theme: "Route & Borders",
        morning: "Journey along BR-060 toward Jardim: the highway connecting Campo Grande to the south of the state. Understand Sidrolândia's strategic position in the bioceanic corridor.",
        afternoon: "Shopping for Terena handicrafts and regional products. Visit to the local producers' fair and street gastronomy.",
        evening: "Farewell with pantanal barbecue over a ground fire. Sidrolândia stays with you — like the flavor of the cerrado and the memory of a people who never forgot their roots.",
        color: "from-blue-600 to-indigo-700",
        icon: Globe,
    },
];

const curiosities = [
    { text: "The Terena people are one of the most organized indigenous nations in Brazil — with their own school, a living language, and traditional agricultural production still active today." },
    { text: "Sidrolândia is one of the largest producers of corn and soy in Mato Grosso do Sul, integrating the productive belt that supplies the bioceanic export corridor." },
    { text: "The sunset in Sidrolândia is considered by residents and visitors to be one of the most cinematic in MS — the cerrado amplifies tones of copper, gold, and crimson on the horizon." },
    { text: "The city is strategically positioned between Campo Grande and the Serra da Bodoquena, making it a natural stop on the largest bioceanic corridor in South America." },
    { text: "Sidrolândia's cooperatives export to more than 20 countries — grains that leave via the Paraguay River toward the Pacific Ocean along the new bioceanic route." },
    { text: "The word Sidrolândia comes from the Sidrolândia Farm, which existed at the site before the municipality was founded — a name carrying the memory of the land and those who worked it." },
    { text: "The tradition of horseback rides and rodeos draws thousands of visitors annually — festivals blending indigenous, sertaneja, and pantaneira heritage in a single regional identity event." },
    { text: "Sidrolândia is surrounded by three biomes: Cerrado, Pantanal, and the transition to the Atlantic Forest — an ecological diversity rarely found in a single municipality." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-amber-500 uppercase tracking-widest mb-3"
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
    const src = useInfographic("sidrolandia");
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
                            alt="Editorial infographic Sidrolândia"
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
                            alt="Editorial infographic Sidrolândia"
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

export default function SidrolandiaPageEn() {
    const isMobile = useIsMobile();
    return (
        <div className="min-h-screen">

            {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Brazil"
                countryFlag="🇧🇷"
                region="Mato Grosso do Sul"
                name={{ first: "Sidrolândia", second: "" }}
                tagline="Where agribusiness meets the Terena people, the cerrado, and the logistics that moves a continent."
                scene="pantanal"
                image="/cities/sidrolandia.jpg"
                accentColor="#C8922A"
                stats={[
                    { label: "Inhabitants (est. 2022)", value: 51000, suffix: " inh." },
                    { label: "Km from Campo Grande",    value: 70,    suffix: " km" },
                    { label: "Km from Jardim",          value: 160,   suffix: " km" },
                    { label: "Soy production (t/year)", value: 120000, suffix: " t" },
                ]}
            />

            {/* ── INFOGRAPHIC ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── TERENA PEOPLE — highlight ───────────────────── */}
            <section style={{ background: "linear-gradient(135deg, #1a0f02 0%, #2d1a05 50%, #1a0f02 100%)", position: "relative", overflow: "hidden", padding: "80px 0" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/cities/sidrolandia.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08 }} />
                <div style={{ position: "absolute", top: "-120px", right: "-120px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,146,42,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(74,124,89,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: "80rem", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "56px", alignItems: "center" }}>
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(200,146,42,0.15)", border: "1px solid rgba(200,146,42,0.4)", borderRadius: "99px", padding: "6px 16px", marginBottom: "20px" }}>
                            <span style={{ fontSize: "18px" }}>🪶</span>
                            <span style={{ color: "#e8c97a", fontWeight: 600, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>Cultural Highlight</span>
                        </div>

                        <h2 style={{ color: "#ffffff", fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "16px" }}>
                            The Terena People
                        </h2>
                        <p style={{ color: "#e8c97a", fontSize: "1.1rem", fontWeight: 500, marginBottom: "28px" }}>
                            An indigenous nation that resists, creates, and celebrates — at the heart of MS's most productive agribusiness
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "36px" }}>
                            <p style={{ color: "#f5e6c8", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                The <strong style={{ color: "#e8c97a" }}>Terena</strong> are one of the most organized and resilient indigenous nations in Brazil. Present for centuries in the territory that now forms Sidrolândia, they keep alive a richly layered culture: their own language, sophisticated craftsmanship, deep spirituality, and agricultural techniques that coexist with modern agribusiness without losing identity.
                            </p>
                            <p style={{ color: "#f5e6c8", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                The <strong style={{ color: "#e8c97a" }}>Terena villages</strong> are spaces of living memory — where children learn the ancestral language, elders teach handicrafts, and healing and celebration rituals are practiced as acts of resistance and affirmation. For visitors, it is an experience of genuine human connection that no museum can replicate.
                            </p>
                            <p style={{ color: "#f5e6c8", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                The <strong style={{ color: "#e8c97a" }}>coexistence between the Terena people and agribusiness</strong> is one of the most singular aspects of Sidrolândia — and one of the most relevant topics for understanding the future relationship between production, identity, and territory in Mato Grosso do Sul.
                            </p>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                            {[
                                { icon: "🪶", label: "Nation", value: "Terena" },
                                { icon: "🗣️", label: "Living language", value: "Terena (Arawak)" },
                                { icon: "🏘️", label: "Villages", value: "multiple active" },
                                { icon: "🌾", label: "Agriculture", value: "traditional & modern" },
                            ].map((s) => (
                                <div key={s.label} style={{ background: "rgba(200,146,42,0.1)", border: "1px solid rgba(200,146,42,0.25)", borderRadius: "12px", padding: "14px 16px" }}>
                                    <div style={{ fontSize: "20px", marginBottom: "4px" }}>{s.icon}</div>
                                    <div style={{ color: "#e8c97a", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" }}>{s.label}</div>
                                    <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.0rem" }}>{s.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(200,146,42,0.3)", boxShadow: "0 24px 60px rgba(0,0,0,0.6)", position: "relative" }}>
                            <img
                                src="/cities/sidrolandia.jpg"
                                alt="Sidrolândia — cerrado and Terena tradition"
                                style={{ width: "100%", height: "340px", objectFit: "cover", display: "block" }}
                                onError={e => { e.target.style.background = "linear-gradient(135deg, #2d1a05, #4a7c59)"; e.target.style.display = "none"; }}
                            />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,15,2,0.75) 0%, transparent 50%)" }} />
                            <div style={{ position: "absolute", bottom: "16px", left: "20px", right: "20px" }}>
                                <p style={{ color: "#f5e6c8", fontSize: "0.8rem", opacity: 0.8 }}>Cerrado of MS · Sidrolândia · Brazil</p>
                            </div>
                        </div>

                        <div style={{ background: "rgba(200,146,42,0.08)", border: "1px solid rgba(200,146,42,0.25)", borderRadius: "16px", padding: "24px" }}>
                            <h3 style={{ color: "#e8c97a", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>How to visit the villages</h3>
                            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: 0 }}>
                                {[
                                    { icon: "🕐", text: "Guided visits with prior scheduling through community leaders" },
                                    { icon: "🚗", text: "Villages spread around the municipality — access via dirt road" },
                                    { icon: "🪶", text: "Respect local traditions: no photography without permission, appropriate dress code" },
                                    { icon: "🛒", text: "Handicrafts available for purchase directly in the villages — income for the families" },
                                ].map((item) => (
                                    <li key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                        <span style={{ fontSize: "16px", flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
                                        <span style={{ color: "#f5e6c8", fontSize: "0.88rem", lineHeight: 1.5 }}>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── EXECUTIVE SUMMARY ────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Who is Sidrolândia</SectionLabel>
                        <SectionTitle>
                            Where agribusiness meets{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                the indigenous soul
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Sidrolândia is a fascinating paradox: one of the most productive cities in Mato Grosso do Sul,
                            with silos, cooperatives, and exports reaching the other side of the continent — and at the
                            same time, home to an indigenous people that keeps alive a culture of{" "}
                            <strong className="text-primary-700">millennia among the soybean fields</strong>. It is the
                            productive heart of MS, beating between the future and ancestral memory.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Wheat,
                                title: "Agro-Industrial Hub",
                                text: "Soy, corn, cattle, and poultry at export scale. Cooperatives and silos integrated into the bioceanic corridor — production supplying four countries.",
                                color: "from-amber-50 to-orange-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Users,
                                title: "Terena People",
                                text: "Arawak-speaking indigenous nation with an active presence, living craftsmanship, and practiced spirituality. One of the most organized indigenous cultures of central Brazil.",
                                color: "from-emerald-50 to-teal-50",
                                accent: "text-emerald-700",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: Globe,
                                title: "Bioceanic Logistics Node",
                                text: "Positioned between Campo Grande and the border, Sidrolândia is an axis of the export corridor connecting MS agribusiness to Pacific markets via Porto Murtinho.",
                                color: "from-blue-50 to-indigo-50",
                                accent: "text-blue-700",
                                iconBg: "bg-blue-100",
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

            {/* ── HISTORY ──────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Roots that shape a unique identity</SectionLabel>
                        <SectionTitle light>
                            From the ancestral village to the{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                bioceanic corridor
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Sidrolândia was built in layers — indigenous, colonial, agricultural, and logistical.
                            Each period left marks that coexist and create tension in the landscape, culture, and
                            identity of the most productive municipality in the Brazilian bioceanic corridor.
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
                                    <div className="flex items-center gap-2 text-xs text-amber-400/70">
                                        <MapPin className="w-3 h-3" />
                                        <span>Symbol: {item.symbol}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── AGRO & NATURE ────────────────────────────────── */}
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <SectionLabel>The productive belt of MS</SectionLabel>
                            <SectionTitle>
                                Land that{" "}
                                <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                    feeds continents
                                </span>
                            </SectionTitle>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-slate-500 leading-relaxed mb-8"
                            >
                                Sidrolândia is part of the most dynamic productive belt in Mato Grosso do Sul.
                                Soy, corn, cattle, and poultry farming form a production chain that feeds
                                markets in Brazil and abroad — and that now finds in the bioceanic corridor
                                a direct export route all the way to the Pacific.
                            </motion.p>
                            <div className="space-y-3">
                                {[
                                    { name: "Soy and Corn", desc: "Industrial-scale planting with cutting-edge technology. One of the highest per-capita productions in MS." },
                                    { name: "Cattle and Poultry", desc: "Bovine herds, poultry farms, and meatpacking plants that drive the regional cold chain." },
                                    { name: "Cooperatives", desc: "Strong cooperative model — associativism that guarantees scale, price, and access to foreign markets." },
                                    { name: "Silos and Warehouses", desc: "Storage infrastructure that positions Sidrolândia as a logistical hub of the corridor." },
                                    { name: "Agro-Industry", desc: "Local processing that adds value to production — grain processors, dairies, and feed manufacturers." },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.06 * i }}
                                        className="flex gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-200 hover:shadow-sm transition-all"
                                    >
                                        <ChevronRight className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
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
                                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
                                <div className="relative z-10">
                                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block mb-4">
                                        Nature and Biodiversity
                                    </span>
                                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                                        The cerrado that endures between the fields of production
                                    </h3>
                                    <div className="space-y-4 text-white/60 text-sm leading-relaxed">
                                        <p>
                                            Between the soybean crops and pastures, the genuine cerrado of Mato Grosso
                                            do Sul preserves pockets of untouched nature: veredas, buriti palms, gallery
                                            forests, and red-banked rivers where wildlife still roams.
                                        </p>
                                        <p>
                                            Sidrolândia's position at the meeting point of three biomes — Cerrado, Pantanal,
                                            and the transition to the Atlantic Forest — creates an ecological diversity
                                            rarely found in a single Brazilian municipality.
                                        </p>
                                        <p className="text-amber-400 font-medium italic">
                                            "The sunset over Sidrolândia's fields is cinematic — the cerrado amplifies every shade of copper and gold on the horizon."
                                        </p>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                                        <Trees className="w-4 h-4 text-amber-400" />
                                        <span className="text-xs text-white/40">Three biomes in transition — singular biodiversity</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CULTURE ──────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <SectionLabel>Identity that survives through time</SectionLabel>
                            <SectionTitle light>
                                Rural tradition and{" "}
                                <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                    indigenous memory
                                </span>
                            </SectionTitle>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-white/55 leading-relaxed mb-8"
                            >
                                Sidrolândia experiences a singular encounter of cultures: the Terena indigenous tradition
                                and the sertaneja, pantaneira, and southern culture brought by settlers.
                                Horseback rides, rodeos, harvest festivals, and ancestral rituals coexist in the
                                cultural calendar of a city that never forgets where it came from.
                            </motion.p>
                            <div className="space-y-3">
                                {[
                                    { label: "Terena Culture", sub: "Language, craftsmanship, spirituality, and traditional agriculture — a living legacy of centuries" },
                                    { label: "Horseback Rides and Rodeos", sub: "Festivals drawing thousands — legacy of the drovers and cattle ranching of the cerrado" },
                                    { label: "Roots Sertaneja Music", sub: "Guitar, accordion, and chamamé — the soundtrack of MS's productive interior" },
                                    { label: "Regional Handicrafts", sub: "Straw, ceramics, leather, and fibers — millennia-old Terena and rural techniques in every piece" },
                                    { label: "Harvest Festivals", sub: "Harvest celebrations blending gratitude, identity, and community" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -15 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.06 * i }}
                                        className="flex gap-3 p-3 rounded-xl bg-white/[0.04] border border-amber-500/15"
                                    >
                                        <Star className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="text-amber-300 font-semibold text-sm">{item.label}</span>
                                            <span className="text-white/40 text-xs ml-2">— {item.sub}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { animal: "Maned Wolf", detail: "Symbol of the preserved cerrado", emoji: "🐺" },
                                { animal: "Macaws", detail: "Bird of the cerrado and Terena tradition", emoji: "🦜" },
                                { animal: "Capybara", detail: "Queen of the cerrado rivers", emoji: "🦫" },
                                { animal: "Dourado", detail: "King of the regional rivers", emoji: "🐟" },
                            ].map((creature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i }}
                                    className="rounded-3xl bg-amber-900/20 border border-amber-500/20 p-6 text-center hover:bg-amber-900/35 transition-colors"
                                >
                                    <div className="text-4xl mb-3">{creature.emoji}</div>
                                    <div className="font-display font-bold text-white text-lg">{creature.animal}</div>
                                    <div className="text-amber-400/70 text-xs mt-1">{creature.detail}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── GASTRONOMY ───────────────────────────────────── */}
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Flavors of the cerrado and the farm</SectionLabel>
                        <SectionTitle>
                            Cooking of{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                embers and affection
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.12 }}
                            className="text-slate-500 leading-relaxed"
                        >
                            Sidrolândia's table is a map of the MS interior's identity: meat over a ground fire,
                            river fish, sobá that came from Japan, and tereré that is pure Pantanal. A cuisine that
                            sustains those who work and celebrates those who arrive.
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
                                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 group-hover:from-amber-500 group-hover:to-orange-600 flex items-center justify-center transition-all duration-500">
                                        <dish.icon className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
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

            {/* ── TOURIST ATTRACTIONS ──────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>What to see and do</SectionLabel>
                        <SectionTitle>
                            Experiences that{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                define Sidrolândia
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
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:border-amber-300 hover:shadow-md transition-all duration-300 group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 group-hover:bg-amber-600 flex items-center justify-center transition-all duration-400">
                                        <attr.icon className="w-5 h-5 text-amber-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
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

            {/* ── ITINERARY ────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/6 rounded-full blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Suggested Itinerary</SectionLabel>
                        <SectionTitle light>
                            3 days{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                at the heart of MS
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
                                            <Clock className="w-3.5 h-3.5 text-amber-400/60 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <span className="text-amber-400/80 text-xs font-semibold uppercase tracking-wide">
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

            {/* ── DID YOU KNOW ─────────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <SectionLabel>Did you know?</SectionLabel>
                        <SectionTitle>
                            Facts that{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
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
                                className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-5 hover:shadow-md transition-shadow"
                            >
                                <Star className="w-4 h-4 text-amber-500 mb-3" />
                                <p className="text-primary-800 text-sm leading-relaxed">{c.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PRACTICAL INFORMATION ────────────────────────── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <SectionLabel>Plan your visit</SectionLabel>
                        <SectionTitle light>
                            Practical{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
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
                            <MapPin className="w-6 h-6 text-amber-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">How to Get There</h3>
                            <div className="space-y-3 text-white/50 text-sm leading-relaxed">
                                <p>
                                    <strong className="text-white/80">From Campo Grande:</strong> ~70 km via BR-060.
                                    Approximately 1h of travel.
                                </p>
                                <p>
                                    <strong className="text-white/80">To Jardim:</strong> ~160 km via BR-060
                                    and MS-178. Around 2h30 of travel.
                                </p>
                                <p>
                                    <strong className="text-white/80">On the Bioceanic Route:</strong> Second
                                    official stop in Brazil — between Campo Grande and Jardim.
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
                            <Calendar className="w-6 h-6 text-amber-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Best Time to Visit</h3>
                            <div className="space-y-3 text-sm">
                                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                    <span className="text-amber-300 font-semibold text-xs block mb-1">Apr → Sep</span>
                                    <span className="text-white/50 text-xs">Dry season — best for festivals, horseback rides, and cerrado trails</span>
                                </div>
                                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                                    <span className="text-green-300 font-semibold text-xs block mb-1">May → Jun</span>
                                    <span className="text-white/50 text-xs">Soy harvest — period of greatest activity and traditional festivals</span>
                                </div>
                                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                    <span className="text-blue-300 font-semibold text-xs block mb-1">Year-round</span>
                                    <span className="text-white/50 text-xs">Terena villages welcome visitors with prior scheduling at any time of year</span>
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
                            <Phone className="w-6 h-6 text-amber-400 mb-4" />
                            <h3 className="font-display text-lg font-bold text-white mb-3">Useful Information</h3>
                            <div className="space-y-3">
                                {[
                                    { label: "Distance from Campo Grande", val: "~70 km", icon: MapPin },
                                    { label: "Distance from Jardim", val: "~160 km", icon: MapPin },
                                    { label: "Village access", val: "Scheduling required", icon: Users },
                                    { label: "Infrastructure", val: "Hotels, restaurants & gas station", icon: Camera },
                                ].map((c, ci) => (
                                    <div key={ci} className="flex items-center gap-3">
                                        <c.icon className="w-3.5 h-3.5 text-amber-400/60 flex-shrink-0" />
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

            {/* ── FINAL CTA ────────────────────────────────────── */}
            <section className="py-20 bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-600 relative overflow-hidden">
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
                            Sidrolândia — where the red earth feeds continents and Terena memory stands the test of time.
                        </h2>
                        <p className="text-white/70 mb-8 max-w-lg mx-auto">
                            Keep exploring the cities that form the largest bioceanic corridor in South America.
                        </p>
                        <Link
                            to="/en/cidades"
                            className="inline-flex items-center gap-2 bg-white text-amber-700 font-bold px-8 py-4 rounded-full hover:bg-amber-50 transition-colors group"
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
