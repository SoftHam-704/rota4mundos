import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import CityHero from "../../components/CityHero.jsx";
import { useInfographic } from "../../hooks/useInfographic.js";
import {
    ArrowLeft, ArrowRight, MapPin, Users, Calendar,
    Flame, Music, Camera, Compass,
    Star, ChevronRight, Mountain, Leaf, Utensils, Waves, Globe,
    Heart, Feather, TreePine,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "Millennia ago",
        icon: Feather,
        title: "The Land of the Indigenous Peoples",
        color: "from-emerald-700 to-green-800",
        accent: "text-emerald-400",
        border: "border-emerald-500/30",
        body: "Long before any city existed, this land belonged to the Wichí, Guaraní, Chorote, Toba/Qom and Tapiete peoples. Each developed its own language, spirituality, crafts and a deep relationship with the Yungas forests and the Chaco plains. That heritage is not the past — it is the living present of Tartagal.",
        symbol: "Five indigenous peoples — living memory",
    },
    {
        era: "Early 20th Century",
        icon: Compass,
        title: "The Railway and the Birth of the City",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Tartagal was officially founded in the early twentieth century, when the railways of northern Argentina opened the deep interior to colonisation and trade. The city grew as a strategic hub of the NOA — a node between the Andes, the Chaco and the routes crossing towards Bolivia and Paraguay.",
        symbol: "NOA Railway — gateway to the Argentine interior",
    },
    {
        era: "1920s–1970s",
        icon: Flame,
        title: "Oil, Diversity and Growth",
        color: "from-orange-700 to-red-800",
        accent: "text-orange-400",
        border: "border-orange-500/30",
        body: "The discovery of oil transformed Tartagal into one of the most important energy centres in northern Argentina. Extraction brought infrastructure, migration from different regions and a cultural diversity that today defines the city's identity. Oil built the city — the indigenous peoples gave it its soul.",
        symbol: "Oil extraction — energy identity",
    },
    {
        era: "Today",
        icon: Globe,
        title: "Multicultural Frontier on the Bioceanic Route",
        color: "from-teal-700 to-emerald-800",
        accent: "text-teal-400",
        border: "border-teal-500/30",
        body: "Today, Tartagal is one of the most multicultural points in northern Argentina — Wichí, Guaraní, Chorote, Toba and Tapiete coexist with descendants of migrants from across Argentina. The Bioceanic Route repositions the city as an axis of continental integration, opening the NOA to the world with authenticity.",
        symbol: "Bioceanic Route — continental integration",
    },
];

const attractions = [
    { name: "Wichí Communities", icon: Feather, desc: "The Wichí communities near Tartagal preserve basketry, sacred symbolism and traditional medicine. Guided visits offer authentic contact with one of the richest indigenous cultures in northern Argentina.", badge: "Culture" },
    { name: "Yungas — Subtropical Forest", icon: TreePine, desc: "The cloud forest surrounding Tartagal is habitat for rare birds, mammals and high-biodiversity vegetation. A stunning landscape that contrasts sharply with the Chaco plains.", badge: "Nature" },
    { name: "Baritú National Park", icon: Mountain, desc: "One of the most remote parks in Argentina, on Salta's border with Bolivia. Pristine Yungas, crystal-clear rivers and extraordinary biodiversity accessible from the Tartagal region.", badge: "National Park" },
    { name: "Municipal Market", icon: Globe, desc: "Tartagal's market is a cultural mosaic: indigenous crafts, regional food, mixed languages and the raw energy of the Argentine frontier. No filters, no staging.", badge: "Authentic" },
    { name: "Indigenous Peoples' Crafts", icon: Star, desc: "Wichí baskets, Guaraní textiles, Chorote wood sculptures and pieces made with natural seeds. Each object carries cosmogony and the memory of communities that never stopped creating.", badge: "Crafts" },
    { name: "Yungas-Chaco Transition", icon: Waves, desc: "The Tartagal region offers a rare visual phenomenon: the subtropical Yungas forest gradually dissolves into the Gran Chaco. Two biomes, two worlds, one landscape.", badge: "Biome" },
    { name: "Folk Festivals and Carnival", icon: Music, desc: "Tartagal's celebrations blend chacarera, zamba and traditional indigenous music. Carnival with strong community participation — rhythms that cross cultural borders in a single space.", badge: "Festival" },
    { name: "Argentina-Bolivia Border", icon: Camera, desc: "The Pocitos-Yacuíba crossing near Tartagal is one of the liveliest border crossings in Argentina — markets, cultural encounters and the singular energy of border towns.", badge: "Border" },
];

const dishes = [
    { name: "Northern Humita", icon: Leaf, desc: "Seasoned fresh corn cooked in its husk — a pre-Columbian legacy that persists in Tartagal's kitchens. Simple, aromatic, ancestral.", tag: "Ancestral" },
    { name: "NOA Tamales", icon: Utensils, desc: "Corn dough filled with meat and Andean spices, wrapped in husks and steamed. The northern version has a deeper flavour — an unbroken tradition since the Incas.", tag: "Tradition" },
    { name: "Salteñas Empanadas", icon: Flame, desc: "The empanada of the Salta region arrived in Tartagal with its full identity: delicate pastry, knife-cut beef filling and NOA spices. A daily presence in local life.", tag: "Regional" },
    { name: "Frontier Locro", icon: Utensils, desc: "Tartagal's locro incorporates local ingredients — corn, beans, meats and spices — in a robust, dense version that warms the cold nights of the dry season.", tag: "Festive" },
    { name: "Regional Meats", icon: Flame, desc: "The rural and frontier influence brings locally sourced cuts slow-cooked over fire. Flavours of the deep Argentine interior that no urban restaurant can replicate.", tag: "Frontier" },
    { name: "Wichí Plants and Remedies", icon: Leaf, desc: "The botanical knowledge of the Wichí transforms Yungas plants into teas, infusions and traditional remedies. Part of Tartagal's spiritual gastronomy — knowledge that modern pharmacology still studies.", tag: "Traditional" },
];

const itinerary = [
    {
        day: "Day 1",
        theme: "Indigenous Culture",
        morning: "Tartagal Municipal Market — Wichí, Guaraní and Chorote crafts. Languages, aromas and colours that exist nowhere else in Argentina. The authenticity is immediate.",
        afternoon: "Guided visit to a nearby Wichí community. Basketry, traditional medicine and Andean cosmogony told by the very guardians of memory. Tartagal does not stage — it presents.",
        evening: "Dinner with humita and salteñas empanadas. Live chacarera and indigenous rhythms at a community celebration that makes no distinction between residents and visitors.",
        color: "from-emerald-600 to-teal-700",
        icon: Feather,
    },
    {
        day: "Day 2",
        theme: "Yungas and Nature",
        morning: "Sunrise departure into the Yungas — the subtropical forest around Tartagal. Rare birds, mammals and the dense vegetation that creates a humid, green microclimate impossible on the Chaco plains.",
        afternoon: "Yungas-Chaco transition: the point where the forest begins to dissolve and the horizon opens up. A unique visual phenomenon that captures the geographical singularity of Tartagal.",
        evening: "Sunset over the frontier landscape — the golden sky above the subtropical green is one of the most intense images in northern Argentina. A silence that moves you.",
        color: "from-green-600 to-emerald-700",
        icon: TreePine,
    },
    {
        day: "Day 3",
        theme: "Border and Route",
        morning: "Baritú National Park — Argentina's most remote park, with pristine yungas, rivers and exceptional biodiversity. One of the rarest visits the NOA has to offer.",
        afternoon: "Pocitos-Yacuíba border: the nearest crossing into Bolivia. Binational markets, overlapping cultures and the singular energy of frontier towns.",
        evening: "Final crafts at Tartagal's markets — Wichí basketry, Guaraní textiles. The Bioceanic Route continues, but the memory of Tartagal remains. Farewell with locro.",
        color: "from-amber-600 to-orange-700",
        icon: Globe,
    },
];

const curiosities = [
    { text: "Tartagal is home to five actively present indigenous peoples: Wichí, Guaraní, Chorote, Toba/Qom and Tapiete — one of the largest indigenous mosaics in northern Argentina." },
    { text: "The Yungas surrounding Tartagal are habitat for the yaguareté (jaguar), puma and tapir. The region's biodiversity is equivalent to internationally recognised national parks." },
    { text: "Tartagal's Wichí basketry is internationally acclaimed — the baskets use fibres from the chaguar palm and techniques passed down through generations that no book could fully describe." },
    { text: "Tartagal is one of the few cities in northern Argentina where Guaraní is still spoken in daily life — not as a historical curiosity, but as a living language of communication." },
    { text: "The oil extraction that developed Tartagal in the first half of the twentieth century brought migrants from across Argentina and created a city with a unique cultural identity — the most plural NOA." },
    { text: "Baritú National Park, accessible from the Tartagal region, is the only Argentine national park with no road access from within the country — entry is only possible via rivers or through Bolivia." },
    { text: "The transition between the Yungas and the Gran Chaco in the Tartagal region is studied as a unique ecological phenomenon — two of South America's most important biomes meet within a few kilometres of each other." },
    { text: "During carnival, Tartagal unites Argentine chacarera with Wichí and Guaraní rhythms in the same space. It is arguably the most multicultural carnival in northern Argentina." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3"
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

/* ─── infográfico ────────────────────────────────────────────── */

function InfograficoSection() {
    const src = useInfographic("tartagal");
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
                            alt="Editorial infographic Tartagal"
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
                            alt="Editorial infographic Tartagal"
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

export default function TartagalPageEn() {
    return (
        <div className="min-h-screen">

            {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Argentina"
                countryFlag="🇦🇷"
                region="Salta - NOA"
                name={{ first: "Tartagal", second: "" }}
                tagline="Five indigenous peoples, Yungas forest and the most vibrant multicultural carnival in northern Argentina."
                scene="andes"
                image="/cities/tartagal.jpg"
                accentColor="#10b981"
                stats={[
                    { label: "Inhabitants", value: 70000 },
                    { label: "Active Indigenous Peoples", value: 5 },
                    { label: "Km from Salta", value: 340, suffix: " km" },
                    { label: "Km from Jujuy", value: 290, suffix: " km" },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>What is Tartagal</SectionLabel>
                        <SectionTitle>
                            The Argentina no{" "}
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                guidebook ever showed
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Tartagal has no postcard. It has life. It has markets where five languages intersect,
                            subtropical forests sheltering jaguars, and indigenous communities that never stopped
                            existing.{" "}
                            <strong className="text-primary-700">It is the most human and authentic chapter
                            of the bioceanic crossing</strong> — where the route meets multicultural,
                            deeply Latin American Argentina.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Feather,
                                title: "5 Indigenous Peoples",
                                text: "Wichí, Guaraní, Chorote, Toba/Qom and Tapiete actively coexist in Tartagal. Crafts, language, traditional medicine and cosmovision — a living heritage that defines the city's identity.",
                                color: "from-emerald-50 to-green-50",
                                accent: "text-emerald-700",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: TreePine,
                                title: "Yungas and Chaco",
                                text: "The subtropical Yungas forest and the Gran Chaco plains meet in Tartagal — two of South America's richest biomes in a unique ecological transition phenomenon.",
                                color: "from-teal-50 to-emerald-50",
                                accent: "text-teal-700",
                                iconBg: "bg-teal-100",
                            },
                            {
                                icon: Globe,
                                title: "Living Frontier",
                                text: "Close to the borders with Bolivia and Paraguay, Tartagal is a real node of continental integration. On the Bioceanic Route, it represents the most authentic NOA — no staging, no showcase tourism.",
                                color: "from-green-50 to-teal-50",
                                accent: "text-green-700",
                                iconBg: "bg-green-100",
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

            {/* ── HISTÓRIA ─────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>From Forest to Frontier</SectionLabel>
                        <SectionTitle light>
                            From indigenous land to{" "}
                            <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
                                multicultural hub of the NOA
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Tartagal was built in layers — ancestral forest, colonial railway, oil
                            and today bioceanic integration. Each period left visible marks on the city's daily life.
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
                                            <h3 className="text-white font-bold text-lg mt-1 leading-tight">{item.title}</h3>
                                        </div>
                                        <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 ml-4`}>
                                            <item.icon className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <p className="text-white/50 text-sm leading-relaxed mb-4">{item.body}</p>
                                    <div className={`inline-flex items-center gap-2 text-xs ${item.accent} font-semibold`}>
                                        <ChevronRight className="w-3 h-3" />
                                        {item.symbol}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── POVOS ORIGINÁRIOS SPOTLIGHT ──────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/18 via-transparent to-teal-900/15" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl overflow-hidden border border-emerald-500/20"
                            style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.10) 0%, rgba(6,27,51,0.95) 60%, rgba(5,150,105,0.08) 100%)" }}
                        >
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                                        <Feather className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                                        Living Memory
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    Five Indigenous Peoples
                                    <br />
                                    <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
                                        The multicultural soul of Tartagal
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    No city in northern Argentina concentrates so much active indigenous diversity.
                                    Each people maintains its own language, spirituality, crafts and traditional
                                    medicine. This is not an identity preserved in a museum — it is the daily life
                                    of communities that chose to exist on their own terms.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                                    {[
                                        { povo: "Wichí", desc: "Basketry and botanical medicine", color: "border-emerald-500/30" },
                                        { povo: "Guaraní", desc: "Language and ancestral textiles", color: "border-teal-500/30" },
                                        { povo: "Chorote", desc: "Wood sculptures", color: "border-green-500/30" },
                                        { povo: "Toba/Qom", desc: "Music and spirituality", color: "border-emerald-500/25" },
                                        { povo: "Tapiete", desc: "Art with natural seeds", color: "border-teal-500/25" },
                                    ].map((p, i) => (
                                        <div key={i} className={`bg-white/5 rounded-2xl p-4 border ${p.color} text-center`}>
                                            <div className="text-emerald-300 font-bold text-sm mb-1">{p.povo}</div>
                                            <div className="text-white/40 text-xs leading-snug">{p.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── NATUREZA E CULTURA ───────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Forest, Frontier and Identity</SectionLabel>
                        <SectionTitle light>
                            Yungas, Chaco{" "}
                            <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
                                and multicultural identity
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: TreePine,
                                title: "Yungas",
                                text: "The subtropical mountain forest around Tartagal is home to jaguar, puma and tapir. Biodiversity comparable to national parks — no entrance gate, no admission fee.",
                                accent: "text-emerald-400",
                                iconBg: "bg-emerald-500/15",
                                border: "border-emerald-500/20",
                            },
                            {
                                icon: Waves,
                                title: "Gran Chaco",
                                text: "The Chaco plain begins where the Yungas end. Intense heat, endemic birds and an open landscape that contrasts dramatically with the dense forest — two worlds separated by a few kilometres.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Music,
                                title: "Frontier Music",
                                text: "Chacarera, zamba and Wichí/Guaraní rhythms in the same space. Tartagal's festivals blend Argentine repertoire with indigenous percussion — the most multicultural carnival in the NOA.",
                                accent: "text-teal-400",
                                iconBg: "bg-teal-500/15",
                                border: "border-teal-500/20",
                            },
                            {
                                icon: Heart,
                                title: "Living Crafts",
                                text: "Wichí basketry with chaguar palm fibre, Guaraní textiles, Chorote sculptures in native wood. Each piece is cosmogony — not a tourist product. Buying one means participating in a people's memory.",
                                accent: "text-green-400",
                                iconBg: "bg-green-500/15",
                                border: "border-green-500/20",
                            },
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className={`rounded-3xl border ${card.border} bg-white/[0.04] p-7 hover:bg-white/[0.07] transition-all duration-300`}
                            >
                                <div className={`w-11 h-11 rounded-2xl ${card.iconBg} flex items-center justify-center mb-5`}>
                                    <card.icon className={`w-5 h-5 ${card.accent}`} />
                                </div>
                                <h3 className={`font-bold text-base ${card.accent} mb-3`}>{card.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{card.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GASTRONOMIA ──────────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-2xl mx-auto text-center mb-14">
                        <SectionLabel>Authentic Flavours of the NOA</SectionLabel>
                        <SectionTitle>
                            Cuisine of{" "}
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                frontier and forest
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {dishes.map((dish, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: 0.07 * i }}
                                className="bg-slate-50 rounded-3xl p-7 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center">
                                        <dish.icon className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                                        {dish.tag}
                                    </span>
                                </div>
                                <h3 className="font-bold text-primary-950 text-base mb-2">{dish.name}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{dish.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PONTOS DE INTERESSE ──────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/6 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500/6 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Experiences and Destinations</SectionLabel>
                        <SectionTitle light>
                            What to do in{" "}
                            <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
                                Tartagal
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {attractions.map((a, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: 0.07 * i }}
                                className="rounded-3xl bg-white/[0.04] border border-white/8 p-6 hover:bg-white/[0.08] hover:border-emerald-500/25 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 flex items-center justify-center">
                                        <a.icon className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                                        {a.badge}
                                    </span>
                                </div>
                                <h3 className="font-bold text-white text-sm mb-2">{a.name}</h3>
                                <p className="text-white/35 text-xs leading-relaxed">{a.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ROTEIRO ──────────────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Suggested Itinerary</SectionLabel>
                        <SectionTitle>
                            3 days in{" "}
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Tartagal and the frontier
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
                                transition={{ delay: 0.12 * i }}
                                className="rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className={`bg-gradient-to-r ${day.color} p-6 text-white`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold uppercase tracking-widest opacity-70">{day.day}</span>
                                        <day.icon className="w-5 h-5 opacity-70" />
                                    </div>
                                    <h3 className="font-display text-2xl font-bold">{day.theme}</h3>
                                </div>
                                <div className="p-6 space-y-4 bg-slate-50">
                                    {[
                                        { label: "Morning", text: day.morning },
                                        { label: "Afternoon", text: day.afternoon },
                                        { label: "Evening", text: day.evening },
                                    ].map((period) => (
                                        <div key={period.label}>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{period.label}</span>
                                            <p className="text-slate-600 text-sm leading-relaxed mt-1">{period.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CURIOSIDADES ─────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-emerald-500/5 blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <SectionLabel>Did You Know?</SectionLabel>
                        <SectionTitle light>
                            Facts about{" "}
                            <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
                                Tartagal
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        {curiosities.map((c, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-30px" }}
                                transition={{ delay: 0.06 * i }}
                                className="flex items-start gap-4 bg-white/[0.04] rounded-2xl p-5 border border-white/8"
                            >
                                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Star className="w-3.5 h-3.5 text-emerald-400" />
                                </div>
                                <p className="text-white/55 text-sm leading-relaxed">{c.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INFORMAÇÕES PRÁTICAS ─────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-2xl mx-auto text-center mb-12">
                        <SectionLabel>Plan Your Visit</SectionLabel>
                        <SectionTitle>Practical Information</SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                icon: MapPin,
                                title: "Getting There",
                                items: [
                                    "Tartagal Airport (regional flights) or connection via Salta (~3h bus along Ruta 34)",
                                    "Bus from Salta (3h) or Jujuy (4h) — Tartagal central bus terminal",
                                    "Ruta Nacional 34 — direct connection to Salta and the Bolivian border",
                                ],
                                accent: "text-emerald-700",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: Calendar,
                                title: "Best Time to Visit",
                                items: [
                                    "May to October: dry season — moderate heat, accessible forests and clear rivers",
                                    "February/March: multicultural Carnival — the cultural mix is at its most visible",
                                    "Avoid November–April: heavy summer rains can close Yungas roads",
                                ],
                                accent: "text-teal-700",
                                iconBg: "bg-teal-100",
                            },
                            {
                                icon: Globe,
                                title: "Useful Information",
                                items: [
                                    "Currency: Argentine peso — favourable exchange rate for travellers with USD/BRL",
                                    "Altitude: 450m — hot subtropical climate, different from Salta and Jujuy",
                                    "Language: Spanish with Guaraní — 'Aguyje' means thank you in Guaraní",
                                ],
                                accent: "text-green-700",
                                iconBg: "bg-green-100",
                            },
                        ].map((block, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className="rounded-3xl bg-slate-50 p-7"
                            >
                                <div className={`w-11 h-11 rounded-2xl ${block.iconBg} flex items-center justify-center mb-5`}>
                                    <block.icon className={`w-5 h-5 ${block.accent}`} />
                                </div>
                                <h3 className={`font-bold text-base ${block.accent} mb-4`}>{block.title}</h3>
                                <ul className="space-y-2.5">
                                    {block.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-2.5 text-slate-600 text-sm">
                                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────── */}
            <section className="section-padding relative overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, #052e16 0%, #14532d 35%, #166534 65%, #15803d 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/15 rounded-full blur-[90px]" />
                </div>
                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-4xl mb-4 block">🇦🇷</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            Tartagal is waiting for you
                        </h2>
                        <p className="text-emerald-200/70 text-lg max-w-xl mx-auto mb-10">
                            Multicultural, deeply human Argentina. Where five indigenous peoples
                            continue writing the daily history of the most authentic land on the Bioceanic Route.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/en/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-900 font-bold rounded-2xl hover:bg-emerald-50 transition-colors text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                See all cities
                            </Link>
                            <Link
                                to="/en/cidades/jujuy"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
                            >
                                Explore Jujuy <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
