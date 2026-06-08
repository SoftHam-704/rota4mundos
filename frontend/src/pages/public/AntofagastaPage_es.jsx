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
    Anchor, Gem, Eye,
} from "lucide-react";

/* ─── data ──────────────────────────────────────────────────── */

const historia = [
    {
        era: "Siglo XIX",
        icon: Gem,
        title: "El Oro Blanco del Desierto",
        color: "from-amber-700 to-yellow-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Antofagasta nació del salitre — el fertilizante que alimentó los campos europeos y asiáticos durante décadas. En el siglo XIX, el 'oro blanco del desierto' transformó una orilla árida en el mayor puerto exportador del Pacífico Sur. Ingenieros británicos, mineros bolivianos y trabajadores chilenos construyeron la ciudad que el desierto no debería permitir.",
        symbol: "Salitre — el oro blanco que construyó Antofagasta",
    },
    {
        era: "1879–1884",
        icon: Anchor,
        title: "La Guerra del Pacífico",
        color: "from-sky-700 to-blue-800",
        accent: "text-sky-400",
        border: "border-sky-500/30",
        body: "La Guerra del Pacífico fue uno de los conflictos más decisivos de la historia sudamericana. Chile, Perú y Bolivia disputaron el dominio del desierto de Atacama y sus recursos. Antofagasta estaba en el centro del conflicto — territorio boliviano que se convirtió en chileno tras la victoria. La memoria de la guerra moldeó identidades nacionales que persisten hasta hoy.",
        symbol: "Guerra del Pacífico — el conflicto que rediseñó el continente",
    },
    {
        era: "Siglo XX",
        icon: Gem,
        title: "Cobre, Modernidad y Ciencia",
        color: "from-orange-700 to-amber-800",
        accent: "text-orange-400",
        border: "border-orange-500/30",
        body: "Cuando el salitre cedió ante el fertilizante sintético, el cobre asumió el trono. Antofagasta se convirtió en capital mundial del cobre — mineral esencial para la electrificación del planeta. Universidades, centros de investigación e innovación tecnológica transformaron la ciudad minera en una metrópoli del conocimiento. El Atacama también reveló sus cielos: los mejores observatorios astronómicos del mundo surgieron en la región.",
        symbol: "Cobre — el metal del siglo XX y del futuro",
    },
    {
        era: "Hoy",
        icon: Globe,
        title: "Portal Bioceánico del Pacífico",
        color: "from-blue-700 to-sky-800",
        accent: "text-blue-400",
        border: "border-blue-500/30",
        body: "Hoy, Antofagasta es la puerta de salida de la Ruta Bioceánica — donde el cruce continental que comienza en el Pantanal brasileño finalmente alcanza el Pacífico. Puerto activo, segunda ciudad más poblada del norte chileno, polo universitario y destino de observación astronómica de clase mundial. El Atlántico llegó al Pacífico — y Antofagasta es el fin y el comienzo de todo.",
        symbol: "Ruta Bioceánica — el Pacífico recibe al continente",
    },
];

const attractions = [
    { name: "La Portada", icon: Waves, desc: "El monumento natural más famoso de Chile. Arco rocoso de 43m esculpido por el mar a lo largo de millones de años — al atardecer, los acantilados dorados reflejan en el Pacífico azul profundo. Una de las imágenes más cinematográficas de América del Sur.", badge: "Ícono" },
    { name: "Puerto de Antofagasta", icon: Anchor, desc: "El segundo mayor puerto del norte chileno y uno de los más activos del Pacífico Sur. Grúas, barcos cargueros y la escala humana del mar — el punto donde la Ruta Bioceánica toca el océano.", badge: "Puerto" },
    { name: "Ruinas de Huanchaca", icon: Mountain, desc: "Refinería de plata boliviana del siglo XIX, preservada en el corazón de la ciudad. Hoy es monumento histórico y centro cultural — memoria en piedra de cuando Antofagasta era aún territorio boliviano.", badge: "Historia" },
    { name: "Valle de la Luna", icon: Camera, desc: "A 100km de Antofagasta, el Valle de la Luna ofrece uno de los paisajes más extraterrestres de la Tierra. Dunas, formaciones de sal y cráteres que parecen de otro planeta — el Atacama en su forma más radical.", badge: "Atacama" },
    { name: "Observatorio Paranal (ESO)", icon: Eye, desc: "El Observatorio Europeo del Sur, en el desierto a 130km de Antofagasta, alberga el VLT — uno de los mayores telescopios del mundo. El cielo del Atacama es el más limpio del planeta para astronomía.", badge: "Ciencia" },
    { name: "Playa El Balneario", icon: Waves, desc: "La principal playa urbana de Antofagasta — donde los residentes nadan y pescan en el Pacífico con el Atacama de fondo. El cotidiano de la ciudad costera más extrema del mundo.", badge: "Mar" },
    { name: "Museo Regional de Antofagasta", icon: Star, desc: "Acervo de la era salitrera, de la Guerra del Pacífico y de las culturas precolombinas del desierto. La memoria de Antofagasta contada con profundidad y sin romanticismo.", badge: "Museo" },
    { name: "Salar de Atacama", icon: Gem, desc: "El mayor salar de Chile y uno de los más grandes del mundo — hábitat de los flamencos rosados que habitan las lagunas de litio. A 250km de Antofagasta, una de las vistas más surrealistas del Pacífico sudamericano.", badge: "Naturaleza" },
];

const dishes = [
    { name: "Centolla del Pacífico", icon: Waves, desc: "El cangrejo gigante de las aguas profundas del Pacífico Sur — de carne jugosa y sabor único. En Antofagasta, la centolla llega directamente del mar y se prepara el mismo día. Símbolo de la gastronomía costera.", tag: "Ícono" },
    { name: "Ceviche Chileno", icon: Leaf, desc: "Mariscos frescos marinados con limón, cilantro y ají. La versión chilena es más suave que la peruana — sabor limpio y nítido del Pacífico sin interferir con la calidad del pescado.", tag: "Costero" },
    { name: "Congrio a la Plancha", icon: Flame, desc: "El pez más tradicional de la culinaria chilena, preparado en Antofagasta con la máxima frescura del Pacífico. Carne firme, sabor delicado — imposible de replicar tierra adentro.", tag: "Tradicional" },
    { name: "Empanadas de Mariscos", icon: Utensils, desc: "La empanada chilena rellena con mariscos frescos del Pacífico. Almejas, mejillones y camarones en una masa horneada con técnica artesanal. El snack costero más popular del norte chileno.", tag: "Popular" },
    { name: "Chupe de Mariscos", icon: Utensils, desc: "Guiso espeso de mariscos con leche, queso y especias. Herencia culinaria andino-costera que calienta en las noches en que el viento del Pacífico sopla libre por el desierto.", tag: "Confort" },
    { name: "Vinos del Norte Chileno", icon: Flame, desc: "Los vinos del Valle del Elqui y otros productores del norte chileno llegan a las mesas de Antofagasta. La mineralogía del suelo árido imprime un carácter único — vinos que el océano y el desierto construyen juntos.", tag: "Terroir" },
];

const itinerary = [
    {
        day: "Día 1",
        theme: "Ciudad y Puerto",
        morning: "Centro histórico de Antofagasta — Plaza Colón, Estación Ferroviaria (patrimonio de la era salitrera) y las Ruinas de Huanchaca. La ciudad que el salitre y el cobre construyeron.",
        afternoon: "Puerto de Antofagasta — donde la Ruta Bioceánica toca el Pacífico. Barcos, grúas, la escala del comercio continental. El océano que le dio sentido a todo el cruce.",
        evening: "Atardecer sobre el Pacífico con mariscos en el malecón. Centolla, ceviche y el mar azul profundo con el Atacama dorado de fondo. Antofagasta emociona por su grandiosidad.",
        color: "from-sky-600 to-blue-700",
        icon: Anchor,
    },
    {
        day: "Día 2",
        theme: "La Portada y Playas",
        morning: "La Portada al amanecer — el arco natural de 43m bañado por la luz del Pacífico. Los acantilados dorados, los pelícanos en vuelo y el ruido del mar contra la roca. Imposible no fotografiar.",
        afternoon: "Playas del litoral norte — El Balneario y Hornitos. El Pacífico a temperatura amena, con el desierto árido como telón de fondo. La dualidad que define Antofagasta.",
        evening: "Cena de congrio y chupe de mariscos con vino chileno. El sonido del océano, el silencio del Atacama a lo lejos, las estrellas comenzando a aparecer.",
        color: "from-blue-600 to-sky-700",
        icon: Waves,
    },
    {
        day: "Día 3",
        theme: "Atacama y Astronomía",
        morning: "Valle de la Luna — paisaje extraterrestre a 100km de la ciudad. Dunas, formaciones de sal cristalizado y un silencio mineral que no existe en ninguna otra parte del planeta.",
        afternoon: "Salar de Atacama — flamencos rosados en las lagunas de litio. Blanco infinito, altura y el azul imposible del cielo atacameño. La otra cara de Antofagasta.",
        evening: "Observación astronómica nocturna en el desierto. El cielo más limpio del planeta exhibe la Vía Láctea completa. El mismo desierto que guarda minerales guarda estrellas — Antofagasta cierra el cruce con el cosmos.",
        color: "from-indigo-600 to-blue-700",
        icon: Eye,
    },
];

const curiosities = [
    { text: "Antofagasta es la ciudad con mayor contraste altimétrico del mundo en relación a la costa — el Atacama sube de 0 a 4.000m en menos de 200km, creando microclimas extremos que jamás se tocan." },
    { text: "La Portada, el arco natural símbolo de Antofagasta, tiene 43 metros de altura y se formó a lo largo de 20 millones de años por la erosión del mar — es uno de los monumentos naturales más fotografiados de Chile." },
    { text: "El desierto de Atacama es el más seco de la Tierra — algunas estaciones meteorológicas del altiplano nunca han registrado lluvia. Los cielos son tan limpios que el ESO (European Southern Observatory) instaló sus mayores telescopios allí." },
    { text: "La Guerra del Pacífico (1879–1884) hizo que Bolivia perdiera su acceso al mar. Antofagasta era territorio boliviano — hoy es chilena. Bolivia aún reivindica una salida al Pacífico." },
    { text: "Antofagasta es la segunda ciudad más rica de Chile por renta per cápita — gracias al cobre. La región produce aproximadamente el 10% del cobre mundial, haciéndola estratégica para la electrificación global." },
    { text: "El Observatorio Paranal del ESO, a 130km de Antofagasta, alberga el VLT (Very Large Telescope) — con 4 telescopios de 8,2m cada uno, capaces de ver objetos 4 mil millones de veces más débiles que el ojo humano." },
    { text: "El litoral de Antofagasta está habitado por lobos marinos, pelícanos, flamencos y pingüinos de Humboldt — especies adaptadas a la Corriente de Humboldt que trae aguas frías del Pacífico a la costa chilena." },
    { text: "En Antofagasta existen edificios y estructuras de la era salitrera del siglo XIX aún en uso — la Estación de Tren, construida por los británicos en 1872, es la más antigua en funcionamiento de Chile." },
];

/* ─── helpers ────────────────────────────────────────────────── */

function SectionLabel({ children }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold text-sky-400 uppercase tracking-widest mb-3"
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
    const src = useInfographic("antofagasta");
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
                            alt="Infografía editorial Antofagasta"
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
                            alt="Infografía editorial Antofagasta"
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

export default function AntofagastaPageEs() {
    return (
        <div className="min-h-screen">

            {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Chile"
                countryFlag="🇨🇱"
                region="Región de Antofagasta"
                name={{ first: "Antofagasta", second: "" }}
                tagline="Donde el Atacama besa el Pacífico — capital del cobre, de los observatorios y de la mayor vista continental del océano."
                scene="pacifico"
                image="/cities/antofagasta.jpg"
                accentColor="#38bdf8"
                stats={[
                    { label: "Habitantes", value: 500000 },
                    { label: "Fundación", value: 1866 },
                    { label: "Altitud VLT Paranal (m)", value: 2635, suffix: " m" },
                    { label: "Km de Santiago", value: 1360, suffix: " km" },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Quién es Antofagasta</SectionLabel>
                        <SectionTitle>
                            La ciudad entre{" "}
                            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                                dos infinitos
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Antofagasta no es solo un puerto — es una dualidad imposible. Por un lado, el
                            desierto más seco de la Tierra con sus minerales, sus observatorios y su silencio
                            mineral. Por el otro, el Pacífico con mariscos, acantilados dorados y la sensación
                            de fin del cruce.{" "}
                            <strong className="text-primary-700">Es donde la Ruta Bioceánica finalmente
                            alcanza el océano</strong> — y donde el Atlántico y el Pacífico se encuentran
                            a través de un continente entero.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Anchor,
                                title: "Portal del Pacífico",
                                text: "El puerto de Antofagasta es donde la Ruta Bioceánica toca el océano. Cargueros, exportación de cobre y la llegada de mercancías del Atlántico — el punto donde el corredor continental se encuentra con el comercio global.",
                                color: "from-sky-50 to-blue-50",
                                accent: "text-sky-700",
                                iconBg: "bg-sky-100",
                            },
                            {
                                icon: Gem,
                                title: "Capital del Cobre",
                                text: "Antofagasta es el centro de la mayor región productora de cobre del mundo. El metal que electrifica el planeta se extrae aquí — y la riqueza mineral transformó una orilla árida en una metrópoli del conocimiento y la tecnología.",
                                color: "from-amber-50 to-orange-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Eye,
                                title: "Atacama y Cosmos",
                                text: "El desierto más seco de la Tierra crea el cielo más limpio del planeta. Observatorios internacionales capturan estrellas a miles de millones de años luz. La Portada y el Valle de la Luna completan el escenario — naturaleza imposible en cada dirección.",
                                color: "from-indigo-50 to-blue-50",
                                accent: "text-indigo-700",
                                iconBg: "bg-indigo-100",
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Salitre, Guerra y Futuro</SectionLabel>
                        <SectionTitle light>
                            De oro blanco a{" "}
                            <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
                                portal del cosmos
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Antofagasta fue construida por el desierto, disputada en guerras y reinventada por
                            el cobre. Cada período dejó marcas visibles en piedra, puerto e identidad.
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

            {/* ── LA PORTADA SPOTLIGHT ─────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-900/18 via-transparent to-blue-900/15" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="rounded-3xl overflow-hidden border border-sky-500/20"
                            style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.10) 0%, rgba(6,27,51,0.95) 60%, rgba(251,191,36,0.06) 100%)" }}
                        >
                            <div className="p-10 md:p-14">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-sky-500/20 flex items-center justify-center">
                                        <Waves className="w-5 h-5 text-sky-400" />
                                    </div>
                                    <span className="text-xs font-semibold text-sky-400 uppercase tracking-widest">
                                        Monumento Natural de Chile
                                    </span>
                                </div>
                                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                    La Portada
                                    <br />
                                    <span className="bg-gradient-to-r from-sky-300 to-amber-300 bg-clip-text text-transparent">
                                        El arco que el Pacífico esculpió en 20 millones de años
                                    </span>
                                </h3>
                                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-2xl">
                                    Al norte de Antofagasta, el mar esculpió una de las formaciones rocosas más
                                    impresionantes de América del Sur. La Portada es un arco natural de 43 metros
                                    de altura — declarado Monumento Natural en 1990 — donde el Atacama amarillento
                                    contrasta con el azul profundo del Pacífico. Al atardecer, los colores del desierto
                                    y del océano se encuentran en un espectáculo que no necesita leyenda.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: "Altura de la formación", val: "43 m", sub: "Arco esculpido por el mar" },
                                        { label: "Monumento Natural", val: "1990", sub: "Protección del Estado chileno" },
                                        { label: "Formación geológica", val: "20 M a.", sub: "Años de erosión oceánica" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 rounded-2xl p-5 border border-sky-500/10">
                                            <div className="text-2xl font-bold text-sky-300 font-display mb-1">{stat.val}</div>
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

            {/* ── DUALIDADE ATACAMA + PACÍFICO ─────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-sky-500/5 blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Entre Dos Mundos</SectionLabel>
                        <SectionTitle light>
                            Desierto, océano,{" "}
                            <span className="bg-gradient-to-r from-sky-300 to-amber-300 bg-clip-text text-transparent">
                                minería y cosmos
                            </span>
                        </SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Mountain,
                                title: "Desierto de Atacama",
                                text: "El más seco de la Tierra — algunas estaciones nunca han registrado lluvia. Salares de litio, volcanes inactivos, Valle de la Luna y el silencio mineral que transforma cualquier viaje en una experiencia meditativa.",
                                accent: "text-amber-400",
                                iconBg: "bg-amber-500/15",
                                border: "border-amber-500/20",
                            },
                            {
                                icon: Waves,
                                title: "Océano Pacífico",
                                text: "La Corriente de Humboldt trae aguas frías del polo — pelícanos, lobos marinos, pingüinos de Humboldt y mariscos extraordinarios en una costa árida que no debería ser fértil.",
                                accent: "text-sky-400",
                                iconBg: "bg-sky-500/15",
                                border: "border-sky-500/20",
                            },
                            {
                                icon: Gem,
                                title: "Capital del Cobre",
                                text: "La región produce ~10% del cobre mundial — metal esencial para la electrificación global. Minas gigantescas, innovación tecnológica y universidades moldearon una metrópoli moderna en un desierto radical.",
                                accent: "text-orange-400",
                                iconBg: "bg-orange-500/15",
                                border: "border-orange-500/20",
                            },
                            {
                                icon: Eye,
                                title: "Observatorios ESO",
                                text: "El cielo más limpio del planeta. El Observatorio Paranal alberga el VLT — cuatro telescopios de 8,2m. De noche, el Atacama no es solo desierto: es una ventana al cosmos.",
                                accent: "text-blue-400",
                                iconBg: "bg-blue-500/15",
                                border: "border-blue-500/20",
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
                        <SectionLabel>Frutos del Pacífico</SectionLabel>
                        <SectionTitle>
                            Gastronomía{" "}
                            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                                del fin del cruce
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
                                    <div className="w-10 h-10 rounded-2xl bg-sky-100 flex items-center justify-center">
                                        <dish.icon className="w-5 h-5 text-sky-600" />
                                    </div>
                                    <span className="text-xs font-bold text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
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

            {/* ── ATRAÇÕES ─────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-80 h-80 bg-sky-500/6 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/6 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Destinos y Experiencias</SectionLabel>
                        <SectionTitle light>
                            Qué hacer en{" "}
                            <span className="bg-gradient-to-r from-sky-300 to-amber-300 bg-clip-text text-transparent">
                                Antofagasta
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
                                className="rounded-3xl bg-white/[0.04] border border-white/8 p-6 hover:bg-white/[0.08] hover:border-sky-500/25 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-2xl bg-sky-500/15 flex items-center justify-center">
                                        <a.icon className="w-5 h-5 text-sky-400" />
                                    </div>
                                    <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full">
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
                            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                                Antofagasta y el Atacama
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-sky-500/5 blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <SectionLabel>¿Sabías que?</SectionLabel>
                        <SectionTitle light>
                            Curiosidades sobre{" "}
                            <span className="bg-gradient-to-r from-sky-300 to-amber-300 bg-clip-text text-transparent">
                                Antofagasta
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
                                <div className="w-7 h-7 rounded-xl bg-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Star className="w-3.5 h-3.5 text-sky-400" />
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
                                    "Aeropuerto Internacional Andrés Sabella Gálvez — vuelos desde Santiago, Lima, Buenos Aires",
                                    "Bus desde Santiago (~17h) o Iquique (~4h) — terminal central",
                                    "Ruta 1 y Ruta 5 Norte — conexión con todo el norte de Chile",
                                ],
                                accent: "text-sky-700",
                                iconBg: "bg-sky-100",
                            },
                            {
                                icon: Calendar,
                                title: "Mejor Época",
                                items: [
                                    "Todo el año — Antofagasta tiene clima estable con menos de 10mm de lluvia anual",
                                    "Invierno (junio-agosto): temperaturas amenas, cielos perfectos para astronomía",
                                    "Verano (diciembre-febrero): mar más cálido, ideal para playas y buceo",
                                ],
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Globe,
                                title: "Información Útil",
                                items: [
                                    "Moneda: Peso chileno — cambio favorable para viajeros con dólar/real/euro",
                                    "Altitud: ciudad al nivel del mar — sin problemas de aclimatación",
                                    "Idioma: español chileno — acento distinto del argentino y boliviano",
                                ],
                                accent: "text-blue-700",
                                iconBg: "bg-blue-100",
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
                    style={{ background: "linear-gradient(135deg, #082f49 0%, #0c4a6e 35%, #075985 65%, #0369a1 100%)" }}
                />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/12 rounded-full blur-[90px]" />
                </div>
                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-4xl mb-4 block">🇨🇱</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            El Pacífico te espera
                        </h2>
                        <p className="text-sky-200/70 text-lg max-w-xl mx-auto mb-10">
                            Donde el desierto más seco de la Tierra encuentra el océano más profundo. La llegada definitiva
                            de la Ruta Bioceánica — donde el Atlántico y el Pacífico se saludan a través de un continente.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/es/cidades"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-900 font-bold rounded-2xl hover:bg-sky-50 transition-colors text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Ver todas las ciudades
                            </Link>
                            <Link
                                to="/es/cidades/tartagal"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
                            >
                                Explorar Tartagal <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
