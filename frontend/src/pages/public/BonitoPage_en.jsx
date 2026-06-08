import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import CityHero from "../../components/CityHero.jsx";
import { useIsMobile } from "../../hooks/useMediaQuery.js";
import { useInfographic } from "../../hooks/useInfographic.js";
import {
    MapPin, ArrowRight, ArrowLeft, Clock, Users, Droplets,
    Mountain, Fish, Leaf, Star, Camera, Compass, Waves, ZoomIn, X,
} from "lucide-react";

const pillars = [
    {
        icon: Droplets,
        title: "The Clearest Waters on the Planet",
        desc: "The limestone of the Serra da Bodoquena filters and precipitates suspended particles, creating visibility of up to 40 meters. A scientifically unique phenomenon in the world.",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10 border-cyan-500/20",
    },
    {
        icon: Leaf,
        title: "Global Ecotourism Model",
        desc: "A 1997 municipal law introduced carrying capacity limits and mandatory vouchers. Cited by the UN, WWF and National Geographic as a worldwide reference.",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
        icon: Fish,
        title: "Demystified Aquatic Wildlife",
        desc: "Decades of full protection have made golden dorados and pacus completely indifferent to human presence. A 1-meter dorado swims 20 cm from your face.",
        color: "text-amber-400",
        bg: "bg-amber-500/10 border-amber-500/20",
    },
];

const historyCycles = [
    {
        period: "18th–19th C.",
        title: "Indigenous Peoples",
        content:
            "The Kadiwéu, Guaraní and Terena peoples inhabited the Serra da Bodoquena long before the colonizers arrived. The Kadiwéu — the 'horseback Indians' of the Pantanal — were studied by Claude Lévi-Strauss in Tristes Tropiques (1955), who was fascinated by their ceramics and highly complex geometric body painting.",
        color: "border-amber-500/40 bg-amber-500/5",
        accent: "text-amber-400",
    },
    {
        period: "1880–1948",
        title: "Ranching and Settlement",
        content:
            "The Córrego Bonito stream gave the region its name: settlers from São Paulo and Minas Gerais named the place after the unusual clarity of its waters. The district was created in 1932 as part of Jardim. Independence as its own municipality came on December 11, 1948.",
        color: "border-teal-500/40 bg-teal-500/5",
        accent: "text-teal-400",
    },
    {
        period: "1986–1991",
        title: "The Rediscovery",
        content:
            "Divers from São Paulo rediscovered the Gruta do Lago Azul in 1986. Features in the magazines Mergulho and Quatro Rodas put Bonito on the national map. Rapid and uncontrolled growth threatened the very resources attracting visitors.",
        color: "border-blue-500/40 bg-blue-500/5",
        accent: "text-blue-400",
    },
    {
        period: "1997–today",
        title: "The Law That Saved Bonito",
        content:
            "Municipal Law nº 1.143/1997: carrying capacity limits, mandatory accredited guides, and a centralized voucher system (Bonito Tour). In 27 years, never repealed. Fish biomass grew by more than 300% between 1990 and 2010. The model has been copied by Fernando de Noronha, Chapada dos Veadeiros and Jalapão.",
        color: "border-emerald-500/40 bg-emerald-500/5",
        accent: "text-emerald-400",
    },
];

const attractions = [
    {
        name: "Rio da Prata",
        badge: "⭐ The Best",
        badgeColor: "bg-cyan-500/20 text-cyan-300",
        desc: "Underground spring emerges at 22°C with 40-meter visibility. A 2.5 km float through golden dorados, pacus and piraputangas swimming fearlessly around you. The most impressive freshwater aquarium in the world.",
        highlight: "Visibility 40m · Constant temperature 22°C",
        emoji: "🏊",
    },
    {
        name: "Gruta do Lago Azul",
        badge: "🦴 Fossils",
        badgeColor: "bg-indigo-500/20 text-indigo-300",
        desc: "A 250m-deep cavern with a sapphire-colored lake. In January–February, sunbeams enter through the roof creating a cobalt-blue column of light. At the bottom lie fossils of mastodons and giant sloths extinct for 12,000 years.",
        highlight: "Natural Heritage · Pleistocene Megafauna",
        emoji: "💎",
    },
    {
        name: "Abismo Anhumas",
        badge: "🎽 Extreme Adventure",
        badgeColor: "bg-rose-500/20 text-rose-300",
        desc: "A 72-meter rappel into a submerged cavern. Stalagmites 10m tall formed in open air during the ice ages, now fully visible underwater. Visibility of 50–60m — among the highest in the world in an underground environment.",
        highlight: "8–10 people/day · Advance booking mandatory",
        emoji: "🕳️",
    },
    {
        name: "Buraco das Araras",
        badge: "🦜 Birdwatching",
        badgeColor: "bg-red-500/20 text-red-300",
        desc: "A sinkhole 500m in diameter and 100m deep — one of the largest in South America. Inside lives a colony of 100–150 scarlet macaws. Blue-and-yellow macaws, falcons and owls complete the spectacle. Top 5 macaw-watching spot in Mato Grosso do Sul.",
        highlight: "500m diameter · 100–150 scarlet macaws",
        emoji: "🌋",
    },
    {
        name: "Rio Sucuri",
        badge: "🌿 Most Crystal-Clear",
        badgeColor: "bg-emerald-500/20 text-emerald-300",
        desc: "Considered the clearest river in the world by scientific publications. Rises from a limestone spring at a constant 22°C. Underwater macrophyte gardens and a very gentle current — passive floating through an aquarium-like scene.",
        highlight: "Limestone spring · Underwater gardens",
        emoji: "💚",
    },
    {
        name: "Boca da Onça",
        badge: "💧 Tallest in MS",
        badgeColor: "bg-blue-500/20 text-blue-300",
        desc: "The tallest waterfall in Mato Grosso do Sul, with a total drop of 156 meters across multiple cascades. A 9km trek through the Serra da Bodoquena passing 7 smaller waterfalls. The rock at the base is shaped like a jaguar's head.",
        highlight: "156m total drop · 9km trail",
        emoji: "⛰️",
    },
    {
        name: "Lagoa Misteriosa",
        badge: "🔵 220m Deep",
        badgeColor: "bg-violet-500/20 text-violet-300",
        desc: "One of the deepest aquatic sinkholes in the world: an estimated 220m. The diveable section reaches 90m. Color shifts from turquoise to emerald depending on the time of day. Deep-zone dives require trimix and advanced technical certification.",
        highlight: "220m depth · Turquoise-to-emerald color",
        emoji: "🌊",
    },
    {
        name: "Aquário Natural",
        badge: "👨‍👩‍👧 For Everyone",
        badgeColor: "bg-sky-500/20 text-sky-300",
        desc: "A natural spring within a visitor facility. Fish completely tamed after decades of protection — they swim around visitors without any fear. Ideal for children, elderly visitors, and a first encounter with Bonito's waters.",
        highlight: "Family-friendly · Very tame fish",
        emoji: "🐟",
    },
];

const foodItems = [
    { name: "Salt-Crusted Pacu", badge: "Icon", badgeColor: "bg-amber-500/20 text-amber-300", desc: "Whole fish encrusted in coarse salt and slow-grilled over embers for 2–3 hours. The crust seals in moisture. Served with rustic rice, banana farofa and biquinho pepper vinaigrette.", emoji: "🔥" },
    { name: "Pintado with Passion Fruit Sauce", badge: "Classic", badgeColor: "bg-yellow-500/20 text-yellow-300", desc: "Giant catfish with white, boneless flesh. The passion fruit sauce is a trademark of Bonito's restaurants. In the wild it can reach 1 meter and 30kg.", emoji: "🍋" },
    { name: "Grilled Dorado", badge: "Sporting", badgeColor: "bg-orange-500/20 text-orange-300", desc: "The tiger of the rivers. Firm, slightly rosy flesh. More prized as a sport fish than at the table, but a delicacy on Bonito menus.", emoji: "🐠" },
    { name: "Fried Piraputanga", badge: "Regional", badgeColor: "bg-pink-500/20 text-pink-300", desc: "A golden-and-pink-scaled fish common in the Rio da Prata. Fried whole to order — crispy outside and juicy inside.", emoji: "🍳" },
    { name: "Bocaiúva Ice Cream", badge: "Cerrado", badgeColor: "bg-emerald-500/20 text-emerald-300", desc: "The bocaiúva is the emblematic palm of the Cerrado. Its fruit tastes somewhere between green coconut and ripe fig — exotic and unlike anything else. Also made into liqueur, candy and flour.", emoji: "🌴" },
    { name: "Tererê with Chipa", badge: "Border", badgeColor: "bg-teal-500/20 text-teal-300", desc: "Iced yerba mate (the coffee of Mato Grosso do Sul) paired with Paraguayan chipa, a cheese bread made with cassava flour and cheese baked in a clay oven.", emoji: "🧉" },
];

const curiosities = [
    { emoji: "🦷", fact: "The pacu has molar teeth identical to human teeth, used for cracking seeds. They have caused confusion in forensic analyses." },
    { emoji: "🦁", fact: "A 1-meter dorado swims 20cm from your face without fleeing — the result of decades undisturbed. In unprotected rivers they are aggressive predators." },
    { emoji: "🦕", fact: "Inside Abismo Anhumas, 10m-tall stalagmites formed in the dry air of the ice ages are now completely submerged — prehistoric sculptures underwater." },
    { emoji: "💀", fact: "Mastodons and giant sloths extinct for 12,000 years lie at the bottom of the Gruta do Lago Azul. Water levels were 80m lower during the last glaciation." },
    { emoji: "📊", fact: "Bonito has ~23,000 residents and receives ~250,000 tourists per year. A ratio of 10 tourists per inhabitant — rare in Brazil's interior." },
    { emoji: "🌡️", fact: "Rivers fed by limestone springs maintain exactly 22°C year-round — the temperature of the Earth at constant depth. Swimming in them is swimming through geological time." },
    { emoji: "🔒", fact: "The Carrying Capacity Law is 27 years old and has never been repealed — surviving governments of opposing parties. There is total societal consensus in Bonito." },
    { emoji: "🌍", fact: "UNEP (UN), WWF and National Geographic cite Bonito among the top 10 global examples of managed ecotourism." },
];

const practicalInfo = [
    {
        icon: MapPin,
        title: "Getting There",
        items: [
            "Fly to Campo Grande (CGR) + 297km by road",
            "Airport–Bonito transfer: R$ 150–200/person",
            "Bus Campo Grande–Bonito: R$ 80–110 (5h)",
            "No regular direct flights",
        ],
    },
    {
        icon: Clock,
        title: "Best Time to Visit",
        items: [
            "May to October: dry and cooler (ideal)",
            "July: dry winter, clearest waters",
            "Dec–Mar: rainy season, rivers slightly murky",
            "Peak season: book well in advance",
        ],
    },
    {
        icon: Users,
        title: "Accommodation",
        items: [
            "Zagaia Eco-Resort: R$ 700–1,500/night",
            "Mid-range pousadas: R$ 400–700/night",
            "Budget pousadas: R$ 150–300/night",
            "All-inclusive ranch hotels: R$ 600–1,200",
        ],
    },
];

function InfograficoSection() {
    const [open, setOpen] = useState(false);
    const src = useInfographic("bonito");
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
                            alt="Bonito editorial infographic"
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
                            alt="Bonito editorial infographic"
                            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default function BonitoPageEn() {
    const isMobile = useIsMobile();
    const heroRef = useRef(null);
    useInView(heroRef, { once: true });

    return (
        <main className="bg-primary-950 text-white">

            {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Brazil"
                countryFlag="🇧🇷"
                region="Mato Grosso do Sul"
                name={{ first: "Bonito", second: "" }}
                tagline="Crystal-clear rivers with 40-meter visibility — where a 1997 law protects what tourism could have destroyed."
                scene="rio-cristalino"
                image="/cities/bonito.jpg"
                accentColor="#22d3ee"
                stats={[
                    { label: "Meters of visibility", value: 40, suffix: " m" },
                    { label: "Km from Campo Grande", value: 297, suffix: " km" },
                    { label: "Km from Porto Murtinho", value: 140, suffix: " km" },
                    { label: "Years of preserved law", value: 27 },
                ]}
            />

            {/* ── INFOGRAPHIC ──────────────────────────────────────────────── */}
            <InfograficoSection />

            {/* ── ABISMO ANHUMAS ───────────────────────────────────────────── */}
            <section style={{ background: "linear-gradient(135deg, #020d14 0%, #031824 50%, #020d14 100%)", position: "relative", overflow: "hidden", padding: "80px 0" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/cities/abismo_anhumas.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", opacity: 0.1 }} />
                <div style={{ position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-60px", right: "-60px", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: "80rem", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "56px", alignItems: "center" }}>
                    {/* ── LEFT ── */}
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(34,211,238,0.12)", border: "1px solid rgba(34,211,238,0.35)", borderRadius: "99px", padding: "6px 16px", marginBottom: "20px" }}>
                            <span style={{ fontSize: "18px" }}>🕳️</span>
                            <span style={{ color: "#67e8f9", fontWeight: 600, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>Natural Highlight</span>
                        </div>
                        <h2 style={{ color: "#ffffff", fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "16px" }}>
                            Abismo Anhumas
                        </h2>
                        <p style={{ color: "#67e8f9", fontSize: "1.1rem", fontWeight: 500, marginBottom: "28px" }}>
                            72 meters of rappel in the dark — and an underground lake that exists nowhere else on Earth
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "36px" }}>
                            <p style={{ color: "#a5f3fc", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                Abismo Anhumas is a karst sinkhole 72 meters deep, formed by the collapse of an underground cavern thousands of years ago. The descent is made by rappel, in near-total darkness, until your feet touch a <strong style={{ color: "#67e8f9" }}>floating raft</strong> in the middle of an underground lake — a scene that looks more like an alien planet than the interior of Mato Grosso do Sul.
                            </p>
                            <p style={{ color: "#a5f3fc", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                The underground lake maintains a constant temperature of <strong style={{ color: "#67e8f9" }}>17°C</strong> and visibility of up to 40 meters — the same transparency as Bonito's surface waters, but here underground, lit only by torches and the shaft of natural light filtering down through the opening above. Stalactites up to 10 meters tall emerge from the water. Piraputangas and dorados swim calmly around the raft, indifferent to human presence.
                            </p>
                            <p style={{ color: "#a5f3fc", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                The experience is considered one of the most exclusive in Brazilian ecotourism: <strong style={{ color: "#67e8f9" }}>only 8 to 10 people per day</strong> are allowed access, with mandatory advance booking — sometimes months in advance. The limit exists to protect the cavern's fragile ecosystem and ensure that every visitor truly lives a once-in-a-lifetime moment.
                            </p>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                            {[
                                { icon: "⬇️", label: "Rappel depth", value: "72 m" },
                                { icon: "🌡️", label: "Lake temperature", value: "17°C" },
                                { icon: "👁️", label: "Underwater visibility", value: "40 m" },
                                { icon: "🎟️", label: "Spots per day", value: "8–10 people" },
                            ].map((s) => (
                                <div key={s.label} style={{ background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: "12px", padding: "14px 16px" }}>
                                    <div style={{ fontSize: "20px", marginBottom: "4px" }}>{s.icon}</div>
                                    <div style={{ color: "#67e8f9", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "2px" }}>{s.label}</div>
                                    <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.05rem" }}>{s.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── RIGHT ── */}
                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(34,211,238,0.25)", boxShadow: "0 24px 60px rgba(0,0,0,0.7)", position: "relative" }}>
                            <img src="/cities/abismo_anhumas.jpg" alt="Interior of Abismo Anhumas — underground lake with stalactites" style={{ width: "100%", height: "340px", objectFit: "cover", objectPosition: "center 30%", display: "block" }} />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,13,20,0.75) 0%, transparent 55%)" }} />
                            <div style={{ position: "absolute", bottom: "16px", left: "20px" }}>
                                <p style={{ color: "#cffafe", fontSize: "0.8rem", opacity: 0.8 }}>Bonito · Mato Grosso do Sul · Brazil</p>
                            </div>
                        </div>
                        <div style={{ background: "rgba(34,211,238,0.07)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: "16px", padding: "24px" }}>
                            <h3 style={{ color: "#67e8f9", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>How to visit</h3>
                            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: 0 }}>
                                {[
                                    { icon: "📅", text: "Advance booking mandatory — spots sell out fast" },
                                    { icon: "💪", text: "Good physical condition required — technical rappel with specialist guides" },
                                    { icon: "🤿", text: "Float in the underground lake included after the rappel" },
                                    { icon: "📷", text: "Waterproof camera recommended; flash harms the ecosystem" },
                                ].map((item) => (
                                    <li key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                        <span style={{ fontSize: "15px", flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
                                        <span style={{ color: "#a5f3fc", fontSize: "0.88rem", lineHeight: 1.5 }}>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── IDENTITY ───────────────────────────────────────────────── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto mb-14"
                    >
                        <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest block mb-4">
                            What makes Bonito unique
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            Three reasons to believe
                        </h2>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {pillars.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`rounded-2xl border p-7 ${p.bg}`}
                            >
                                <p.icon className={`w-8 h-8 ${p.color} mb-4`} />
                                <h3 className="font-display text-lg font-bold text-white mb-2">{p.title}</h3>
                                <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GEOLOGY: WHY THE WATERS ARE CRYSTAL CLEAR ──────────────── */}
            <section className="section-padding bg-gradient-to-b from-primary-950 to-cyan-950/20">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-14"
                        >
                            <span className="text-sm font-semibold text-teal-400 uppercase tracking-widest block mb-4">
                                The science of blue
                            </span>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                                600 Million Years of Filtration
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-8 md:p-12 mb-8"
                        >
                            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                                The <strong className="text-white">Serra da Bodoquena</strong> is a Precambrian limestone formation —
                                600 to 900 million years of sediment from corals, algae and shells of a prehistoric sea.
                                When slightly acidic rainwater seeps through these rocks, it dissolves calcium carbonate and
                                carries it in solution.
                            </p>
                            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                                As it emerges at the springs, excess CO₂ is released into the air. Without the gas, calcium
                                precipitates again as <strong className="text-cyan-300">solid calcite</strong> — which removes every suspended
                                particle from the water. The result: <strong className="text-white">visibility of up to 40 meters</strong>.
                            </p>
                            <p className="text-white/70 text-base md:text-lg leading-relaxed">
                                The blue color is physical: pure water absorbs red and yellow, reflecting blue — an effect
                                amplified by the <strong className="text-cyan-300">white calcite riverbed</strong> acting as a mirror.
                                In the caverns, where there is no turbidity at all, the blue reaches cobalt and sapphire.
                            </p>
                        </motion.div>

                        {/* Guarani Aquifer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-6 flex gap-4 items-start"
                        >
                            <Droplets className="w-8 h-8 text-teal-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-white mb-1">Guarani Aquifer — The Reserve Beneath Your Feet</h3>
                                <p className="text-white/55 text-sm leading-relaxed">
                                    Bonito sits atop a recharge zone of the <strong className="text-white">Guarani Aquifer System</strong>,
                                    the world's largest transboundary aquifer: 37,000 km³ of fresh water extending across
                                    Brazil, Argentina, Paraguay and Uruguay. The Serra da Bodoquena is one of the sponges
                                    that feeds this reserve. Preserving Bonito's native forest means preserving water for
                                    45 million people.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── HISTORY ─────────────────────────────────────────────────── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <span className="text-sm font-semibold text-amber-400 uppercase tracking-widest block mb-4">
                            Roots and memory
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                            From Limestone to Law
                        </h2>
                    </motion.div>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {historyCycles.map((c, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`rounded-2xl border ${c.color} p-6`}
                            >
                                <span className={`text-xs font-bold uppercase tracking-widest ${c.accent} block mb-2`}>
                                    {c.period}
                                </span>
                                <h3 className="font-display text-xl font-bold text-white mb-3">{c.title}</h3>
                                <p className="text-white/55 text-sm leading-relaxed">{c.content}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ATTRACTIONS ────────────────────────────────────────────── */}
            <section className="section-padding bg-gradient-to-b from-primary-950 to-cyan-950/15">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest block mb-4">
                            What to do
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            Attractions Worth the Journey
                        </h2>
                        <p className="text-white/50 text-base max-w-xl mx-auto">
                            Each attraction has a legally controlled daily quota. When it's full, it's full. Book in advance.
                        </p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 gap-5">
                        {attractions.map((a, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                className="rounded-2xl border border-white/8 bg-white/[0.04] p-6 hover:bg-white/[0.07] transition-colors"
                            >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{a.emoji}</span>
                                        <h3 className="font-display text-lg font-bold text-white">{a.name}</h3>
                                    </div>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${a.badgeColor} border-current/20 whitespace-nowrap flex-shrink-0`}>
                                        {a.badge}
                                    </span>
                                </div>
                                <p className="text-white/55 text-sm leading-relaxed mb-3">{a.desc}</p>
                                <div className="flex items-center gap-1.5 text-[11px] text-cyan-400/70 font-medium">
                                    <MapPin className="w-3 h-3 flex-shrink-0" />
                                    <span>{a.highlight}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BONITO TOUR SYSTEM ──────────────────────────────────────── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-3xl border border-emerald-500/25 bg-emerald-500/5 p-8 md:p-12"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <Star className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">Unique System in Brazil</span>
                                <h2 className="font-display text-2xl md:text-3xl font-bold text-white">Bonito Tour — The Law Nobody Breaks</h2>
                            </div>
                        </div>
                        <div className="space-y-4 text-white/65 text-sm md:text-base leading-relaxed">
                            <p>
                                Since 1997, <strong className="text-white">no tourist enters any paid attraction without a voucher from an accredited agency</strong>.
                                There are no tickets at the gate. No negotiation. If the daily quota is full, you don't get in — full stop.
                            </p>
                            <p>
                                Each attraction has a <strong className="text-emerald-300">carrying capacity</strong> defined by technical studies
                                (bioacoustics for caverns, hydrodynamics for rivers, animal behavior for Buraco das Araras).
                                Abismo Anhumas has a quota of just <strong className="text-white">8 to 10 people per day</strong>.
                            </p>
                            <p>
                                The results are measurable: <strong className="text-white">fish biomass grew by more than 300%</strong> between
                                1990 and 2010. Fernando de Noronha, Chapada dos Veadeiros and Jalapão have copied parts of
                                the model — but none has achieved Bonito's level of integration.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── GASTRONOMY ──────────────────────────────────────────────── */}
            <section className="section-padding bg-gradient-to-b from-primary-950 to-amber-950/10">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <span className="text-sm font-semibold text-amber-400 uppercase tracking-widest block mb-4">
                            At the table
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            Pacu and the Flavors of the River
                        </h2>
                        <p className="text-white/50 text-base max-w-xl mx-auto">
                            Pacu cannot be caught in the tourist rivers — all fish are protected.
                            Those served at restaurants come from licensed fish farms.
                        </p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {foodItems.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="rounded-2xl border border-white/8 bg-white/[0.04] p-6 hover:bg-white/[0.07] transition-colors"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-2xl">{f.emoji}</span>
                                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${f.badgeColor}`}>
                                        {f.badge}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-white text-sm mb-2">{f.name}</h3>
                                <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4-DAY ITINERARY ───────────────────────────────────────────── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-sm font-semibold text-teal-400 uppercase tracking-widest block mb-4">
                            Suggested itinerary
                        </span>
                        <h2 className="font-display text-4xl font-bold text-white">4 Days in Bonito</h2>
                    </motion.div>
                    <div className="space-y-5">
                        {[
                            {
                                day: "Day 1",
                                title: "Arrival and Crystal Waters",
                                items: ["Morning: Rio da Prata (2.5km float — book in advance)", "Afternoon: Aquário Natural to ease into the environment", "Evening: Salt-crusted pacu at Cantinho do Peixe"],
                                color: "border-cyan-500/30 bg-cyan-500/5",
                                num: "text-cyan-400",
                            },
                            {
                                day: "Day 2",
                                title: "Caves and Sinkholes",
                                items: ["Morning: Gruta do Lago Azul (Jan–Feb: unique light beam)", "Afternoon: Lagoa Misteriosa (optional: certified dive)", "Evening: Tererê and chipa in the historic center"],
                                color: "border-indigo-500/30 bg-indigo-500/5",
                                num: "text-indigo-400",
                            },
                            {
                                day: "Day 3",
                                title: "Adventure in the Serra",
                                items: ["Morning: Boca da Onça (9km trek, 7 waterfalls)", "Afternoon: Buraco das Araras (scarlet macaw watching)", "Evening: Pintado with passion fruit sauce"],
                                color: "border-emerald-500/30 bg-emerald-500/5",
                                num: "text-emerald-400",
                            },
                            {
                                day: "Day 4",
                                title: "Rio Sucuri and Departure",
                                items: ["Morning: Rio Sucuri (the clearest river in the world)", "Lunch: Bocaiúva ice cream + Kadiwéu crafts", "Afternoon: Head to Porto Murtinho (140km) or Campo Grande"],
                                color: "border-teal-500/30 bg-teal-500/5",
                                num: "text-teal-400",
                            },
                        ].map((d, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`rounded-2xl border ${d.color} p-6 flex gap-5`}
                            >
                                <div className="flex-shrink-0">
                                    <span className={`font-display text-3xl font-bold ${d.num}`}>{i + 1}</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xs font-bold text-white/30 uppercase">{d.day}</span>
                                        <span className="font-semibold text-white text-base">{d.title}</span>
                                    </div>
                                    <ul className="space-y-1">
                                        {d.items.map((item, j) => (
                                            <li key={j} className="text-white/55 text-sm flex gap-2">
                                                <span className="text-white/20 mt-1">›</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FUN FACTS ─────────────────────────────────────────────── */}
            <section className="section-padding bg-gradient-to-b from-primary-950 to-cyan-950/10">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest block mb-4">
                            Facts that impress
                        </span>
                        <h2 className="font-display text-4xl font-bold text-white">Bonito Curiosities</h2>
                    </motion.div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {curiosities.map((c, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                className="rounded-2xl border border-white/8 bg-white/[0.04] p-5 hover:bg-white/[0.07] transition-colors"
                            >
                                <span className="text-2xl block mb-3">{c.emoji}</span>
                                <p className="text-white/60 text-xs leading-relaxed">{c.fact}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PRACTICAL INFO ─────────────────────────────────────────── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="text-sm font-semibold text-white/40 uppercase tracking-widest block mb-4">
                            Planning
                        </span>
                        <h2 className="font-display text-4xl font-bold text-white">Practical Information</h2>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {practicalInfo.map((info, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="rounded-2xl border border-white/8 bg-white/[0.04] p-6"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <info.icon className="w-5 h-5 text-cyan-400" />
                                    <h3 className="font-semibold text-white">{info.title}</h3>
                                </div>
                                <ul className="space-y-2">
                                    {info.items.map((item, j) => (
                                        <li key={j} className="text-white/50 text-xs leading-relaxed flex gap-2">
                                            <span className="text-cyan-500/50 mt-0.5">›</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ────────────────────────────────────────────────── */}
            <section className="section-padding bg-gradient-to-b from-primary-950 to-cyan-950/20">
                <div className="container-custom text-center max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Camera className="w-10 h-10 text-cyan-400 mx-auto mb-6" />
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            Bonito is 140 km from Porto Murtinho
                        </h2>
                        <p className="text-white/55 leading-relaxed mb-8">
                            The Bioceanic Route passes almost right by Bonito's door. A two-to-four-day visit to this
                            city transforms any continental crossing into a complete experience — nature, culture,
                            gastronomy and one of the most respected environmental laws on the planet.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/en/cidades/porto-murtinho"
                                className="btn-secondary inline-flex items-center gap-2 group"
                            >
                                Next stop: Porto Murtinho
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/en/cidades"
                                className="btn-outline border-white/20 text-white/70 hover:bg-white/5 inline-flex items-center gap-2"
                            >
                                <Compass className="w-4 h-4" />
                                See all cities
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </main>
    );
}
