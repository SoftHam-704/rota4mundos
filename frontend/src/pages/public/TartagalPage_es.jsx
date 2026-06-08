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
        era: "Milenios antes",
        icon: Feather,
        title: "La Tierra de los Pueblos Originarios",
        color: "from-emerald-700 to-green-800",
        accent: "text-emerald-400",
        border: "border-emerald-500/30",
        body: "Mucho antes de cualquier ciudad, esta tierra pertenecía a los Wichí, Guaraní, Chorote, Toba/Qom y Tapiete. Cada pueblo desarrolló lengua, espiritualidad, artesanía y una relación profunda con los bosques de las Yungas y las llanuras del Chaco. Esa herencia no es pasado — es el presente vivo de Tartagal.",
        symbol: "Cinco pueblos originarios — memoria viva",
    },
    {
        era: "Principios del Siglo XX",
        icon: Compass,
        title: "El Ferrocarril y el Nacimiento de la Ciudad",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Tartagal surgió oficialmente a principios del siglo XX, cuando los ferrocarriles del norte argentino abrieron el interior profundo a la colonización y al comercio. La ciudad creció como punto estratégico del NOA — un nodo entre los Andes, el Chaco y las rutas que cruzaban hacia Bolivia y Paraguay.",
        symbol: "Ferrocarril NOA — portal del interior argentino",
    },
    {
        era: "1920s–1970s",
        icon: Flame,
        title: "Petróleo, Diversidad y Crecimiento",
        color: "from-orange-700 to-red-800",
        accent: "text-orange-400",
        border: "border-orange-500/30",
        body: "El descubrimiento de petróleo transformó Tartagal en uno de los centros energéticos más importantes del norte argentino. La explotación trajo infraestructura, migración de diferentes regiones y una diversidad cultural que hoy define la identidad de la ciudad. El petróleo construyó la ciudad — los pueblos originarios le dieron alma.",
        symbol: "Explotación petrolera — identidad energética",
    },
    {
        era: "Hoy",
        icon: Globe,
        title: "Frontera Multicultural en la Ruta Bioceánica",
        color: "from-teal-700 to-emerald-800",
        accent: "text-teal-400",
        border: "border-teal-500/30",
        body: "Hoy, Tartagal es uno de los puntos más multiculturales del norte argentino — Wichí, Guaraní, Chorote, Toba y Tapiete conviven con descendientes de migrantes de toda la Argentina. La Ruta Bioceánica reposiciona la ciudad como eje de integración continental, abriendo el NOA al mundo con autenticidad.",
        symbol: "Ruta Bioceánica — integración continental",
    },
];

const attractions = [
    { name: "Comunidades Wichí", icon: Feather, desc: "Las comunidades Wichí cercanas a Tartagal preservan cestería, simbología sagrada y medicina tradicional. Visitas guiadas ofrecen contacto auténtico con una de las culturas indígenas más ricas del norte argentino.", badge: "Cultura" },
    { name: "Yungas — Bosque Subtropical", icon: TreePine, desc: "El bosque húmedo de montaña que rodea Tartagal es hábitat de aves raras, mamíferos y vegetación de alta biodiversidad. Escenario impresionante que contrasta con las llanuras chaqueñas.", badge: "Naturaleza" },
    { name: "Parque Nacional Baritú", icon: Mountain, desc: "Uno de los parques más remotos de la Argentina, en las fronteras de Salta con Bolivia. Yungas intactas, ríos cristalinos y una biodiversidad extraordinaria accesible desde la región de Tartagal.", badge: "Parque Nacional" },
    { name: "Mercado Municipal", icon: Globe, desc: "El mercado de Tartagal es un mosaico cultural: artesanía indígena, comida regional, lenguas mezcladas y la energía de la frontera argentina viva. Sin filtros, sin escenificación.", badge: "Auténtico" },
    { name: "Artesanía de los Pueblos Originarios", icon: Star, desc: "Cestas Wichí, tejidos Guaraní, esculturas en madera Chorote y piezas con semillas naturales. Cada objeto lleva cosmovisión y memoria de comunidades que nunca dejaron de crear.", badge: "Artesanía" },
    { name: "Transición Yungas-Chaco", icon: Waves, desc: "La región de Tartagal ofrece un fenómeno visual raro: el bosque subtropical de las Yungas se disuelve progresivamente en el Gran Chaco. Dos biomas, dos mundos, un mismo paisaje.", badge: "Bioma" },
    { name: "Fiestas Populares y Carnaval", icon: Music, desc: "Las celebraciones de Tartagal mezclan chacarera, zamba y música indígena tradicional. Carnaval con fuerte presencia comunitaria — ritmos que cruzan fronteras culturales en un único espacio.", badge: "Fiesta" },
    { name: "Frontera Argentina-Bolivia", icon: Camera, desc: "El cruce de Pocitos-Yacuíba, cerca de Tartagal, es uno de los pasos fronterizos más vivos de la Argentina — mercados, encuentros culturales y la energía singular de las ciudades-límite.", badge: "Frontera" },
];

const dishes = [
    { name: "Humita Norteña", icon: Leaf, desc: "Maíz fresco condimentado, asado en chala — herencia precolombina que persiste en las cocinas de Tartagal. Simple, aromático, ancestral.", tag: "Ancestral" },
    { name: "Tamales del NOA", icon: Utensils, desc: "Masa de maíz con carne y especias andinas, envuelta en chala y cocida al vapor. La versión norteña tiene sabor más profundo — tradición ininterrumpida desde los Incas.", tag: "Tradición" },
    { name: "Empanadas Salteñas", icon: Flame, desc: "La empanada de la región de Salta llegó a Tartagal con toda su identidad: masa delicada, relleno de carne a cuchillo y especias del NOA. Presencia diaria en la vida local.", tag: "Regional" },
    { name: "Locro de Frontera", icon: Utensils, desc: "El locro de Tartagal incorpora ingredientes locales — maíz, porotos, carnes y especias — en una versión robusta y densa que calienta en las noches frías de la estación seca.", tag: "Festividad" },
    { name: "Carnes Regionales", icon: Flame, desc: "La influencia rural y fronteriza trae a la mesa cortes locales preparados a fuego lento. Sabores del interior profundo argentino que ningún restaurante urbano puede replicar.", tag: "Frontera" },
    { name: "Plantas y Remedios Wichí", icon: Leaf, desc: "El conocimiento botánico de los Wichí transforma plantas de las Yungas en tés, infusiones y remedios tradicionales. Parte de la gastronomía espiritual de Tartagal — saberes que la farmacia moderna aún estudia.", tag: "Tradicional" },
];

const itinerary = [
    {
        day: "Día 1",
        theme: "Cultura Indígena",
        morning: "Mercado Municipal de Tartagal — artesanía Wichí, Guaraní y Chorote. Lenguas, aromas y colores que no existen en ninguna otra ciudad argentina. La autenticidad es inmediata.",
        afternoon: "Visita guiada a una comunidad Wichí cercana. Cestería, medicina tradicional y cosmovisión andina contada por los propios guardianes de la memoria. Tartagal no escenifica — presenta.",
        evening: "Cena con humita y empanadas salteñas. Música en vivo de chacarera y ritmos indígenas en una celebración comunitaria que no separa residentes de visitantes.",
        color: "from-emerald-600 to-teal-700",
        icon: Feather,
    },
    {
        day: "Día 2",
        theme: "Yungas y Naturaleza",
        morning: "Salida al amanecer hacia las Yungas — el bosque subtropical alrededor de Tartagal. Aves raras, mamíferos y la vegetación densa que crea un microclima húmedo y verde imposible en las llanuras del Chaco.",
        afternoon: "Transición Yungas-Chaco: el punto donde el bosque empieza a disolverse y el horizonte se abre. Fenómeno visual único que resume la singularidad geográfica de Tartagal.",
        evening: "Atardecer sobre el paisaje de frontera — el cielo dorado sobre el verde subtropical es una de las imágenes más intensas del norte argentino. Silencio que emociona.",
        color: "from-green-600 to-emerald-700",
        icon: TreePine,
    },
    {
        day: "Día 3",
        theme: "Frontera y Ruta",
        morning: "Parque Nacional Baritú — el parque más remoto de la Argentina con yungas intactas, ríos y biodiversidad excepcional. Una de las visitas más raras que el NOA ofrece.",
        afternoon: "Frontera Pocitos-Yacuíba: el paso hacia Bolivia más cercano. Mercados binacionales, culturas que se superponen y la energía singular de las ciudades de frontera.",
        evening: "Artesanía final en los mercados de Tartagal — cestería Wichí, tejidos Guaraní. La Ruta Bioceánica continúa, pero la memoria de Tartagal permanece. Despedida con locro.",
        color: "from-amber-600 to-orange-700",
        icon: Globe,
    },
];

const curiosities = [
    { text: "Tartagal concentra cinco pueblos originarios en presencia activa: Wichí, Guaraní, Chorote, Toba/Qom y Tapiete — uno de los mayores mosaicos indígenas del norte argentino." },
    { text: "Las Yungas que rodean Tartagal son hábitat del yaguareté (jaguar), del puma y del tapir. La biodiversidad de la región es equivalente a la de parques nacionales reconocidos internacionalmente." },
    { text: "La artesanía Wichí de Tartagal es reconocida internacionalmente — las cestas utilizan fibras de la palma chaguar y técnicas transmitidas por generaciones que ningún libro podría describir completamente." },
    { text: "Tartagal es una de las pocas ciudades del norte argentino donde el guaraní aún se habla en el cotidiano — no como curiosidad histórica, sino como lengua viva de comunicación." },
    { text: "La explotación petrolera que desarrolló Tartagal en la primera mitad del siglo XX trajo migrantes de toda la Argentina y creó una ciudad con identidad cultural única — el NOA más plural." },
    { text: "El Parque Nacional Baritú, accesible desde la región de Tartagal, es el único parque nacional argentino que no tiene acceso por camino interno — solo entrando por los ríos o por Bolivia." },
    { text: "La transición entre las Yungas y el Gran Chaco en la región de Tartagal es estudiada como fenómeno ecológico único — dos de los biomas más importantes de América del Sur se encuentran en un espacio de pocos kilómetros." },
    { text: "Durante el carnaval, Tartagal une chacarera argentina con ritmos Wichí y Guaraní en un mismo espacio. Es probablemente el carnaval más multicultural del norte de la Argentina." },
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
                            alt="Infografía editorial Tartagal"
                            className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-full p-3">
                                <ZoomIn className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>
                    <p className="text-center text-white/30 text-xs mt-3">Haz clic para ampliar</p>
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
                            alt="Infografía editorial Tartagal"
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

export default function TartagalPageEs() {
    return (
        <div className="min-h-screen">

            {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Argentina"
                countryFlag="🇦🇷"
                region="Salta - NOA"
                name={{ first: "Tartagal", second: "" }}
                tagline="Cinco pueblos originarios, bosque de las Yungas y el carnaval multicultural más vivo del norte argentino."
                scene="andes"
                image="/cities/tartagal.jpg"
                accentColor="#10b981"
                stats={[
                    { label: "Habitantes", value: 70000 },
                    { label: "Pueblos Originarios Activos", value: 5 },
                    { label: "Km de Salta", value: 340, suffix: " km" },
                    { label: "Km de Jujuy", value: 290, suffix: " km" },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Quién es Tartagal</SectionLabel>
                        <SectionTitle>
                            La Argentina que{" "}
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                ninguna guía mostró
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Tartagal no tiene postal. Tiene vida. Tiene mercados donde cinco lenguas se cruzan,
                            bosques subtropicales que albergan jaguares, y comunidades indígenas que nunca dejaron
                            de existir.{" "}
                            <strong className="text-primary-700">Es el capítulo más humano y auténtico
                            del cruce bioceánico</strong> — donde la ruta encuentra la Argentina
                            multicultural y profundamente latinoamericana.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Feather,
                                title: "5 Pueblos Originarios",
                                text: "Wichí, Guaraní, Chorote, Toba/Qom y Tapiete conviven activamente en Tartagal. Artesanía, lengua, medicina tradicional y cosmovisión — herencia viva que define la identidad de la ciudad.",
                                color: "from-emerald-50 to-green-50",
                                accent: "text-emerald-700",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: TreePine,
                                title: "Yungas y Chaco",
                                text: "El bosque subtropical de las Yungas y las llanuras del Gran Chaco se encuentran en Tartagal — dos de los biomas más ricos de América del Sur en un fenómeno de transición ecológica único.",
                                color: "from-teal-50 to-emerald-50",
                                accent: "text-teal-700",
                                iconBg: "bg-teal-100",
                            },
                            {
                                icon: Globe,
                                title: "Frontera Viva",
                                text: "Cercana a las fronteras con Bolivia y Paraguay, Tartagal es un nodo real de la integración continental. En la Ruta Bioceánica, representa el NOA más auténtico — sin escenificación, sin turismo de vitrina.",
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
                        <SectionLabel>Del Bosque a la Frontera</SectionLabel>
                        <SectionTitle light>
                            De tierra indígena a{" "}
                            <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
                                polo multicultural del NOA
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Tartagal fue construida en capas — bosque ancestral, ferrocarril colonial, petróleo
                            y hoy integración bioceánica. Cada período dejó marcas visibles en el cotidiano de la ciudad.
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
                                        Memoria Viva
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    Cinco Pueblos Originarios
                                    <br />
                                    <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
                                        El alma multicultural de Tartagal
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    Ninguna ciudad del norte argentino concentra tanta diversidad indígena activa.
                                    Cada pueblo mantiene lengua propia, espiritualidad, artesanía y medicina
                                    tradicional. Esa no es una identidad preservada en un museo — es la vida cotidiana
                                    de comunidades que eligieron existir en sus propios términos.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                                    {[
                                        { povo: "Wichí", desc: "Cestería y medicina botánica", color: "border-emerald-500/30" },
                                        { povo: "Guaraní", desc: "Lengua y tejidos ancestrales", color: "border-teal-500/30" },
                                        { povo: "Chorote", desc: "Esculturas en madera", color: "border-green-500/30" },
                                        { povo: "Toba/Qom", desc: "Música y espiritualidad", color: "border-emerald-500/25" },
                                        { povo: "Tapiete", desc: "Arte con semillas naturales", color: "border-teal-500/25" },
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
                        <SectionLabel>Bosque, Frontera e Identidad</SectionLabel>
                        <SectionTitle light>
                            Yungas, Chaco{" "}
                            <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
                                y cultura multicultural
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: TreePine,
                                title: "Yungas",
                                text: "El bosque subtropical de montaña alrededor de Tartagal alberga jaguar, puma y tapir. Biodiversidad comparable a parques nacionales — sin portón de entrada ni entradas.",
                                accent: "text-emerald-400",
                                iconBg: "bg-emerald-500/15",
                                border: "border-emerald-500/20",
                            },
                            {
                                icon: Waves,
                                title: "Gran Chaco",
                                text: "La llanura chaqueña empieza donde las Yungas terminan. Calor intenso, aves endémicas y un paisaje abierto que contrasta dramáticamente con el bosque denso — dos mundos separados por pocos kilómetros.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Music,
                                title: "Música de Frontera",
                                text: "Chacarera, zamba y ritmos Wichí/Guaraní en un mismo espacio. Las fiestas de Tartagal mezclan repertorio argentino con percusión indígena — el carnaval más multicultural del NOA.",
                                accent: "text-teal-400",
                                iconBg: "bg-teal-500/15",
                                border: "border-teal-500/20",
                            },
                            {
                                icon: Heart,
                                title: "Artesanía Viva",
                                text: "Cestería Wichí con fibra de chaguar, tejidos Guaraní, esculturas Chorote en madera nativa. Cada pieza es cosmovisión — no producto turístico. Adquirirlas es participar de la memoria de un pueblo.",
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
                        <SectionLabel>Sabores Auténticos del NOA</SectionLabel>
                        <SectionTitle>
                            Gastronomía de{" "}
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                frontera y bosque
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
                        <SectionLabel>Experiencias y Destinos</SectionLabel>
                        <SectionTitle light>
                            Qué hacer en{" "}
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
                        <SectionLabel>Itinerario Sugerido</SectionLabel>
                        <SectionTitle>
                            3 días en{" "}
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Tartagal y la frontera
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
                                        { label: "Mañana", text: day.morning },
                                        { label: "Tarde", text: day.afternoon },
                                        { label: "Noche", text: day.evening },
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
                        <SectionLabel>¿Sabías que?</SectionLabel>
                        <SectionTitle light>
                            Curiosidades sobre{" "}
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
                        <SectionLabel>Planifica tu Visita</SectionLabel>
                        <SectionTitle>Información Práctica</SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                icon: MapPin,
                                title: "Cómo Llegar",
                                items: [
                                    "Aeropuerto de Tartagal (vuelos regionales) o conexión vía Salta (~3h de bus por Ruta 34)",
                                    "Bus desde Salta (3h) o Jujuy (4h) — terminal central de Tartagal",
                                    "Ruta Nacional 34 — conexión directa con Salta y con la frontera boliviana",
                                ],
                                accent: "text-emerald-700",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: Calendar,
                                title: "Mejor Época",
                                items: [
                                    "Mayo a octubre: estación seca — calor moderado, bosques accesibles y ríos limpios",
                                    "Febrero/marzo: Carnaval multicultural — la mezcla de culturas es más visible",
                                    "Evitar noviembre–abril: lluvias intensas del verano pueden cerrar caminos de las Yungas",
                                ],
                                accent: "text-teal-700",
                                iconBg: "bg-teal-100",
                            },
                            {
                                icon: Globe,
                                title: "Información Útil",
                                items: [
                                    "Moneda: Peso argentino — cambio favorable para viajeros con dólar/real",
                                    "Altitud: 450m — clima cálido y subtropical, diferente de Salta y Jujuy",
                                    "Idioma: español con guaraní — 'Aguyje' es gracias en guaraní",
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
                            Tartagal te espera
                        </h2>
                        <p className="text-emerald-200/70 text-lg max-w-xl mx-auto mb-10">
                            La Argentina multicultural y profundamente humana. Donde cinco pueblos originarios
                            siguen escribiendo la historia cotidiana de la tierra más auténtica de la Ruta Bioceánica.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/es/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-900 font-bold rounded-2xl hover:bg-emerald-50 transition-colors text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Ver todas las ciudades
                            </Link>
                            <Link
                                to="/es/cidades/jujuy"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
                            >
                                Explorar Jujuy <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
