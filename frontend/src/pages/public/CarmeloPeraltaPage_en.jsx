import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import CityHero from "../../components/CityHero.jsx";
import { useInfographic } from "../../hooks/useInfographic.js";
import {
    ArrowLeft, ArrowRight, MapPin, Users, Calendar,
    Flame, Music, Fish, Trees, Camera, Clock, Phone, Mail,
    Star, ChevronRight, Mountain, Leaf, Utensils, Waves, Compass,
    Anchor, Globe,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "19th Century",
        icon: Compass,
        title: "The Chaco War and the Formation of the Territory",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "The region of Carmelo Peralta was the stage for the conflicts of the Chaco War (1932–1935), one of the largest military confrontations in South America between Paraguay and Bolivia. That period forged the Chacoan identity — resilience, overcoming adversity, and the pride of a people who defended their territory under the most extreme conditions on the continent.",
        symbol: "Memory of the Chaco War",
    },
    {
        era: "1940s",
        icon: Star,
        title: "Strengthening and Settlement of the North",
        color: "from-violet-600 to-purple-700",
        accent: "text-violet-400",
        border: "border-violet-500/30",
        body: "With the strengthening of Paraguayan presence in the Chaco after the war, the region received new population centers and military installations. Settlement was gradual, but it definitively shaped the development of northern Paraguay — driving routes, commerce, and communities along the banks of the Paraguay River.",
        symbol: "Historic Chaco Forts",
    },
    {
        era: "1955",
        icon: ArrowRight,
        title: "Creation of the District in Honor of the Captain",
        color: "from-indigo-600 to-violet-700",
        accent: "text-indigo-400",
        border: "border-indigo-500/30",
        body: "On June 12, 1955, the District of Carmelo Peralta was created, named in honor of Captain Carmelo Peralta — a Paraguayan military aviator and national hero. The name carries courage, patriotism, and the living memory of the historic occupation of the Chacoan territory.",
        symbol: "Captain Carmelo Peralta — National Hero",
    },
    {
        era: "1960 → Today",
        icon: Globe,
        title: "From Isolated Municipality to Continental Gateway",
        color: "from-teal-600 to-cyan-700",
        accent: "text-teal-400",
        border: "border-teal-500/30",
        body: "In 1960, Carmelo Peralta was elevated to the status of municipality. Since then, it has grown as a strategic center of northern Paraguay. With the construction of the Bioceanic Bridge over the Paraguay River — linking it to Porto Murtinho/MS — the city is transforming into the gateway of the South American Bioceanic Corridor.",
        symbol: "Bioceanic Bridge — Symbol of Integration",
    },
];

const attractions = [
    { name: "Bioceanic Bridge", icon: Anchor, desc: "The ultimate symbol of South American integration. The bridge over the Paraguay River connects Carmelo Peralta to Porto Murtinho/MS and opens the Bioceanic Corridor to the Pacific.", badge: "Integration" },
    { name: "Paraguay River", icon: Waves, desc: "River cruises, sport fishing, and contemplation of one of the most majestic rivers in South America. At dawn, the river reflects the golden sky of the Chaco.", badge: "Nature" },
    { name: "Paraguayan Pantanal", icon: Trees, desc: "Privileged access to one of the largest wetlands on the planet. Exuberant wildlife, rivers, and native vegetation in an almost untouched state.", badge: "Ecotourism" },
    { name: "Birdwatching", icon: Camera, desc: "Jabiru storks, macaws, herons, and migratory species in abundance. The sky over Carmelo Peralta is frequently filled with flights of colorful birds.", badge: "Wildlife" },
    { name: "Indigenous Culture", icon: Compass, desc: "Historic presence of the Ayoreo and Chamacoco peoples — ancestral cultures with deep knowledge of the rivers, wildlife, and spirituality of the Chaco.", badge: "Heritage" },
    { name: "Paraguayan Chaco", icon: Mountain, desc: "Landscapes of impressive vastness, intense daytime heat, and a starlit night sky that transforms the experience into a natural spectacle.", badge: "Adventure" },
    { name: "Sport Fishing", icon: Fish, desc: "Pacu, dorado, and surubi in the waters of the Paraguay River. A riverside tradition that anchors the cultural and economic identity of the region.", badge: "Sport" },
    { name: "Brazil-Paraguay Border", icon: Globe, desc: "A unique cultural integration experience: Portuguese, Spanish, and Guarani coexist in the streets, commerce, and hospitality of the border community.", badge: "Culture" },
];

const dishes = [
    { name: "Sopa Paraguaya", icon: Utensils, desc: "A traditional dish made with corn, cheese, and rich flavor. One of the emblems of Paraguayan cuisine, present on every table in Carmelo Peralta.", tag: "Tradition" },
    { name: "Chipa", icon: Utensils, desc: "Typical Paraguayan cheese bread, present in every household and celebration. Enjoyed hot, straight from the clay oven, alongside tereré.", tag: "Everyday" },
    { name: "Pantanal Fish", icon: Fish, desc: "Freshwater fish prepared with regional seasonings. Pacu, dorado, and surubi arrive fresh directly from the Paraguay River.", tag: "River" },
    { name: "Chacoan Meats", icon: Flame, desc: "Slowly prepared, preserving the intense flavors of the Chaco. A heritage of extensive ranching and the culture of the horsemen of northern Paraguay.", tag: "Chaco" },
    { name: "Tereré", icon: Leaf, desc: "Far more than a drink — it represents togetherness, friendship, and Paraguayan cultural identity. Shared in circles, it expresses the warmth of Chacoan hospitality.", tag: "Ritual" },
    { name: "Border Cuisine", icon: Utensils, desc: "A rich blend of Paraguayan and Brazilian flavors: cassava, corn, cheese, and riverside recipes that cross borders without losing authenticity.", tag: "Fusion" },
];

const itinerary = [
    {
        day: "Day 1",
        theme: "Border & Integration",
        morning: "Contemplation of the Bioceanic Bridge — the greatest symbol of South American integration. Walk along the banks of the Paraguay River and take photographs at dawn.",
        afternoon: "Stroll through the historic center, Central Square, and monuments. Visit the Chaco War Museum and connect with the Chacoan identity.",
        evening: "Local cuisine: sopa paraguaya, chipa, and tereré. Sunset over the Paraguay River — one of the most cinematic spectacles in South America.",
        color: "from-violet-600 to-purple-700",
        icon: Anchor,
    },
    {
        day: "Day 2",
        theme: "Nature & Adventure",
        morning: "River cruise along the Paraguay River — wildlife spotting, caimans, capybaras, and jabiru storks. Nature photography at dawn, when the silence of the water is absolute.",
        afternoon: "Excursion into the Paraguayan Pantanal: native vegetation, migratory birds, and preserved landscapes. Visit riverside communities and connect with local culture.",
        evening: "Stargazing in the Chaco — with no light pollution, it is one of the most impressive night skies in South America. Dinner with Paraguayan river fish.",
        color: "from-teal-600 to-cyan-700",
        icon: Waves,
    },
    {
        day: "Day 3",
        theme: "Culture & Flavors",
        morning: "Indigenous culture: visit to Ayoreo or Chamacoco communities. Craftwork in leather, wood, fibers, and native arts with ancestral Chacoan traditions.",
        afternoon: "Chacoan cuisine: slow-cooked meats, sopa paraguaya, and handmade chipa. Shopping at local markets and crossing to Porto Murtinho/MS — a unique integration experience.",
        evening: "Farewell on the banks of the Paraguay River. Carmelo Peralta stays with you — gateway between two oceans and guardian of the continental future.",
        color: "from-amber-600 to-orange-700",
        icon: Globe,
    },
];

const curiosities = [
    { text: "Carmelo Peralta takes its name from Captain Carmelo Peralta, a Paraguayan military aviator considered a national hero — a symbol of courage and the settlement of the Chaco." },
    { text: "The Bioceanic Bridge over the Paraguay River connects Carmelo Peralta to Porto Murtinho/MS, inaugurating the logistics corridor between the Atlantic and the Pacific." },
    { text: "The city is known as 'La Puerta del Pantanal' — a privileged entry point to one of the largest wetlands on the planet." },
    { text: "The Paraguayan Chaco records some of the highest temperatures in South America — and also some of the most vast and preserved landscapes on the continent." },
    { text: "The Ayoreo and Chamacoco peoples have inhabited the region for centuries, with ancestral knowledge of the rivers, wildlife, and natural cycles of the Chaco and Pantanal." },
    { text: "Created as a district in 1955 and a municipality in 1960, Carmelo Peralta is one of the youngest cities in Paraguay — but with one of the densest histories in the Chaco." },
    { text: "The border between Carmelo Peralta and Porto Murtinho is one of the richest points of cultural confluence in South America: Guarani, Portuguese, and Spanish coexist in the streets." },
    { text: "With the full operation of the Bioceanic Corridor, Carmelo Peralta is set to become one of the most strategic logistics hubs between Brazil, Paraguay, Argentina, and Chile." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3"
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
    const [open, setOpen] = useState(false);
    const src = useInfographic("carmelo-peralta");
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
                            alt="Editorial infographic Carmelo Peralta"
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
                            alt="Editorial infographic Carmelo Peralta"
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

export default function CarmeloPeraltaPageEn() {
    return (
        <div className="min-h-screen">

            {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Paraguay"
                countryFlag="🇵🇾"
                region="Alto Paraguay Department"
                name={{ first: "Carmelo", second: "Peralta" }}
                tagline="First Paraguayan city — on the other side of the bioceanic bridge, the Chaco begins here."
                scene="chaco"
                image="/cities/carmelo_peralta.jpg"
                accentColor="#818cf8"
                stats={[
                    { label: "Inhabitants (2022 Census)", value: 18926 },
                    { label: "Founded", value: 1955 },
                    { label: "Km from Asunción", value: 670, suffix: " km" },
                    { label: "Km to Mariscal Estigarribia", value: 270, suffix: " km" },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Who is Carmelo Peralta</SectionLabel>
                        <SectionTitle>
                            Where the Chaco meets{" "}
                            <span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
                                the continental future
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Carmelo Peralta is far more than a border city. Located on the banks of the Paraguay
                            River, at the transition between the Pantanal and the Chaco, it represents continental
                            integration, connection between peoples, and{" "}
                            <strong className="text-primary-700">the starting point of the Bioceanic Corridor toward the Pacific</strong>.
                            With the Bioceanic Bridge, this small city in northern Paraguay has become one of the most
                            strategic points in South America.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Anchor,
                                title: "Bioceanic Gateway",
                                text: "The Bioceanic Bridge connects Carmelo Peralta to Porto Murtinho/MS, making it the first Paraguayan node of the logistics corridor linking the Atlantic to the Pacific.",
                                color: "from-violet-50 to-indigo-50",
                                accent: "text-violet-600",
                                iconBg: "bg-violet-100",
                            },
                            {
                                icon: Trees,
                                title: "Preserved Pantanal",
                                text: "Privileged access to the Paraguayan Pantanal — one of the largest wetlands on the planet, with exuberant wildlife and landscapes of nature still almost untouched.",
                                color: "from-emerald-50 to-teal-50",
                                accent: "text-emerald-700",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: Globe,
                                title: "Border Culture",
                                text: "Portuguese, Spanish, and Guarani coexist in the streets. The influence of the Ayoreo and Chamacoco peoples, Chacoan hospitality, and riverside cuisine form a unique identity.",
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

            {/* ── HISTÓRIA ─────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Roots of courage and resilience</SectionLabel>
                        <SectionTitle light>
                            From the Chaco War to the{" "}
                            <span className="bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
                                Continental Gateway
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Carmelo Peralta was built in layers of resistance, patriotism, and strategy.
                            From the war that defined borders to the bridge that connects oceans — each period left
                            visible marks on the identity of the Chacoan people.
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

            {/* ── PONTE BIOCEÂNICA SPOTLIGHT ───────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-indigo-900/20" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl overflow-hidden border border-violet-500/20"
                            style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(6,27,51,0.95) 60%, rgba(99,102,241,0.08) 100%)" }}
                        >
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-violet-500/20 flex items-center justify-center">
                                        <Anchor className="w-5 h-5 text-violet-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">
                                        Historic Landmark
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    The Bioceanic Bridge
                                    <br />
                                    <span className="bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
                                        and the future of the route
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    The Bioceanic Bridge over the Paraguay River — linking Carmelo Peralta to Porto Murtinho/MS —
                                    is the most powerful symbol of South American integration. It is part of the Bioceanic
                                    Corridor that will connect Brazil, Paraguay, Argentina, and Chile, creating a
                                    direct route between the Atlantic Ocean and the Pacific Ocean.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Bridge length", val: "~1.7 km", sub: "Over the Paraguay River" },
                                        { label: "Route start", val: "PY-15", sub: "Paraguayan bioceanic route" },
                                        { label: "Destination", val: "Pacific", sub: "Via Argentina and Chile" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 rounded-2xl p-5 border border-violet-500/10">
                                            <div className="text-2xl font-bold text-violet-300 font-display mb-1">{stat.val}</div>
                                            <div className="text-white/70 text-sm font-semibold">{stat.label}</div>
                                            <div className="text-white/30 text-xs mt-1">{stat.sub}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── NATUREZA ─────────────────────────────────────── */}
            <section className="section-padding bg-white relative overflow-hidden">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <SectionLabel>Preserved Nature</SectionLabel>
                            <SectionTitle>
                                Between the Pantanal and{" "}
                                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                                    the Wild Chaco
                                </span>
                            </SectionTitle>
                            <p className="text-slate-500 text-base leading-relaxed mb-6">
                                Carmelo Peralta is positioned exactly at the transition between two of the most
                                fascinating ecosystems on the planet. The Paraguayan Pantanal offers flooded areas,
                                exuberant wildlife, and rivers of rare beauty. The Chaco impresses with its vastness,
                                its starlit sky, and the resilience of a nature that defies any extreme.
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Jabiru Storks", icon: "🦢" },
                                    { label: "Macaws", icon: "🦜" },
                                    { label: "Jaguar", icon: "🐆" },
                                    { label: "Caimans", icon: "🐊" },
                                    { label: "Capybara", icon: "🦫" },
                                    { label: "Dorado", icon: "🐟" },
                                ].map((a, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3">
                                        <span className="text-2xl">{a.icon}</span>
                                        <span className="text-slate-700 font-semibold text-sm">{a.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="relative"
                        >
                            <div className="rounded-3xl overflow-hidden bg-primary-950 p-8 border border-white/10">
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { title: "Paraguayan Pantanal", desc: "One of the largest wetlands on the planet, with wildlife and flora in their raw state.", color: "from-emerald-900/60 to-teal-900/60", accent: "text-emerald-400" },
                                        { title: "Paraguay River", desc: "Vital axis of the region — fishing, cruises, and contemplation of the Chaco's greatest river.", color: "from-blue-900/60 to-cyan-900/60", accent: "text-blue-400" },
                                        { title: "Paraguayan Chaco", desc: "Infinite horizons, intense heat, and a starlit night — a landscape that sets you free.", color: "from-amber-900/50 to-orange-900/50", accent: "text-amber-400" },
                                        { title: "Exuberant Wildlife", desc: "Macaws, jabiru storks, caimans, jaguars, and bird species that enchant every visitor.", color: "from-violet-900/50 to-purple-900/50", accent: "text-violet-400" },
                                    ].map((card, i) => (
                                        <div key={i} className={`rounded-2xl bg-gradient-to-br ${card.color} p-5 border border-white/8`}>
                                            <h4 className={`font-bold text-sm ${card.accent} mb-2`}>{card.title}</h4>
                                            <p className="text-white/40 text-xs leading-relaxed">{card.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CULTURA ──────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-violet-500/5 blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>A Meeting of Peoples and Traditions</SectionLabel>
                        <SectionTitle light>
                            Border{" "}
                            <span className="bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
                                culture
                            </span>{" "}
                            and authenticity
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Globe,
                                title: "Chacoan Identity",
                                text: "Chacoan culture is present in music, dances, the Guarani language, and the traditions of the people.",
                                accent: "text-violet-400",
                                iconBg: "bg-violet-500/15",
                                border: "border-violet-500/20",
                            },
                            {
                                icon: Star,
                                title: "Indigenous Influence",
                                text: "Land of the Ayoreo and Guarani peoples, whose customs and ancestral knowledge remain alive.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Waves,
                                title: "Riverside Life",
                                text: "The Paraguay River shapes the way of life, fishing, commerce, and everyday celebrations.",
                                accent: "text-blue-400",
                                iconBg: "bg-blue-500/15",
                                border: "border-blue-500/20",
                            },
                            {
                                icon: Music,
                                title: "Hospitality",
                                text: "Carmelo Peralta welcomes visitors with simplicity, joy, and a smile that represents the heart of the Chaco.",
                                accent: "text-emerald-400",
                                iconBg: "bg-emerald-500/15",
                                border: "border-emerald-500/20",
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
                        <SectionLabel>Flavors That Tell Stories</SectionLabel>
                        <SectionTitle>
                            Cuisine of{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                Paraguay and the Pantanal
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
                                    <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center">
                                        <dish.icon className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <span className="text-xs font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
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

            {/* ── PONTOS TURÍSTICOS ────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-80 h-80 bg-violet-500/6 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/6 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Destinations & Experiences</SectionLabel>
                        <SectionTitle light>
                            What to do in{" "}
                            <span className="bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
                                Carmelo Peralta
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
                                className="rounded-3xl bg-white/[0.04] border border-white/8 p-6 hover:bg-white/[0.08] hover:border-violet-500/25 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-violet-500/15 flex items-center justify-center">
                                        <a.icon className="w-5 h-5 text-violet-400" />
                                    </div>
                                    <span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full">
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
                            3 unforgettable{" "}
                            <span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-violet-500/5 blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <SectionLabel>Did You Know?</SectionLabel>
                        <SectionTitle light>
                            Facts about{" "}
                            <span className="bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
                                Carmelo Peralta
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
                                <div className="w-7 h-7 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Star className="w-3.5 h-3.5 text-violet-400" />
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
                                title: "How to Get There",
                                items: [
                                    "Cross via the Bioceanic Bridge from Porto Murtinho/MS (Brazil)",
                                    "Access via Route PY-15 from Asunción (~670 km)",
                                    "Nearest airport: Asunción (flights to Campo Grande/MS)",
                                ],
                                accent: "text-violet-600",
                                iconBg: "bg-violet-100",
                            },
                            {
                                icon: Calendar,
                                title: "Best Time to Visit",
                                items: [
                                    "April to September: milder climate, ideal for the Chaco",
                                    "July and August: pleasant temperatures for excursions and wildlife watching",
                                    "Avoid December–February: extreme heat and heavy rains in the Chaco",
                                ],
                                accent: "text-emerald-600",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: Phone,
                                title: "Useful Information",
                                items: [
                                    "Currency: Paraguayan Guarani (Brazilian Real accepted at the border)",
                                    "Documents: ID or passport required for border crossing",
                                    "Time zone: UTC-4 (same as Campo Grande outside daylight saving time)",
                                ],
                                accent: "text-amber-600",
                                iconBg: "bg-amber-100",
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
                    style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-violet-400/15 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/12 rounded-full blur-[90px]" />
                </div>
                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-4xl mb-4 block">🇵🇾</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            Carmelo Peralta is waiting for you
                        </h2>
                        <p className="text-violet-200/70 text-lg max-w-xl mx-auto mb-10">
                            The gateway to the Paraguayan Pantanal and the South American Bioceanic Corridor.
                            A city that connects continents, cultures, and futures.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/en/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-700 font-bold rounded-2xl hover:bg-violet-50 transition-colors text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                See all cities
                            </Link>
                            <Link
                                to="/en/"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
                            >
                                Explore the Route <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
