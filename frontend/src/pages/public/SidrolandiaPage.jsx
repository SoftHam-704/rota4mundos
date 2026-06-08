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
        era: "Povos Originários",
        icon: Compass,
        title: "O Povo Terena e a Terra Vermelha",
        color: "from-amber-700 to-orange-800",
        accent: "text-amber-400",
        border: "border-amber-500/30",
        body: "Muito antes da colonização, o território que hoje é Sidrolândia era habitado pelo povo Terena — nação indígena que mantém até hoje uma presença viva e ativa na região. Os Terena cultivam tradições seculares de artesanato, espiritualidade e agricultura que resistiram ao tempo e se tornaram parte essencial da identidade cultural do município.",
        symbol: "Aldeia Indígena Terena — memória viva",
    },
    {
        era: "Século XIX",
        icon: Leaf,
        title: "A Ocupação e a Fazenda Sidrolândia",
        color: "from-emerald-600 to-teal-700",
        accent: "text-emerald-400",
        border: "border-emerald-500/30",
        body: "A origem do nome vem da Fazenda Sidrolândia, que deu ao lugarejo seu primeiro traço de identidade. A ocupação definitiva se deu pela atividade pecuária e pelas famílias que migraram para explorar as terras férteis do Mato Grosso do Sul — solo vermelho, cerrado generoso e rios abundantes.",
        symbol: "Fazenda Sidrolândia — origem do município",
    },
    {
        era: "Século XX",
        icon: Wheat,
        title: "A Revolução do Agronegócio",
        color: "from-yellow-600 to-amber-700",
        accent: "text-yellow-400",
        border: "border-yellow-500/30",
        body: "A transformação mais radical de Sidrolândia aconteceu com a modernização agrícola. Soja, milho, pecuária e avicultura converteram a cidade num dos maiores polos produtivos do Mato Grosso do Sul. Cooperativas, silos e agroindústrias se instalaram, tornando o município referência econômica no cinturão produtivo do MS.",
        symbol: "Cooperativas e silos — símbolos do novo agro",
    },
    {
        era: "Século XXI",
        icon: Globe,
        title: "A Rota Bioceânica e o Novo Horizonte",
        color: "from-blue-700 to-indigo-800",
        accent: "text-blue-400",
        border: "border-blue-500/30",
        body: "Com a consolidação da Rota Bioceânica, Sidrolândia ganhou um novo papel estratégico: ponto de articulação logística entre Campo Grande e a fronteira. Sua posição privilegiada no corredor de exportação a projeta como eixo do novo agro sul-americano — onde a produção encontra a integração continental.",
        symbol: "Corredor Bioceânico — o futuro começa aqui",
    },
];

const attractions = [
    { name: "Aldeias Terena", icon: Users, desc: "Comunidades indígenas ativas que preservam artesanato, língua, rituais e agricultura tradicional. Uma janela única para 10.000 anos de história sul-americana.", badge: "Cultura" },
    { name: "Paisagem do Cerrado", icon: Trees, desc: "O cerrado genuíno do MS — veredas, buritis, rios de margem vermelha e pôr do sol que tinge o horizonte de cobre e ouro.", badge: "Natureza" },
    { name: "Festas Tradicionais", icon: Music, desc: "Rodeios, cavalgadas, festas de colheita e celebrações culturais que misturam tradição indígena, sertaneja e pantaneira.", badge: "Eventos" },
    { name: "Pesca nos Rios Regionais", icon: Fish, desc: "Rios do cerrado com pacu, pintado e dourado. Ambiente preservado para a pesca esportiva e contemplação da natureza.", badge: "Esporte" },
    { name: "Cooperativas e Silos", icon: Tractor, desc: "Rota do agro: visite silos, cooperativas e conheça a cadeia produtiva que faz Sidrolândia ser uma das cidades economicamente mais fortes do MS.", badge: "Agro" },
    { name: "Artesanato Terena", icon: Star, desc: "Peças únicas em palha, cerâmica, madeira e fibras naturais. Cada objeto carrega séculos de técnica e simbologia do povo Terena.", badge: "Artesanato" },
    { name: "Trilhas e Rios", icon: Compass, desc: "Trilhas pelo cerrado, banhados e mata de galeria. Paisagens que revelam a transição entre o produtivo e o selvagem.", badge: "Aventura" },
    { name: "Gastronomia Rural", icon: Utensils, desc: "Cozinha de fazenda autêntica: churrasco no fogo de chão, arroz carreteiro, sobá regional e tereré em roda — identidade do interior do MS.", badge: "Gastronomia" },
];

const dishes = [
    { name: "Churrasco Pantaneiro", icon: Flame, desc: "Carnes no fogo de chão, tempero simples e brasa lenta. Herança dos tropeiros e da vida no campo que define o paladar de Sidrolândia.", tag: "Fogo de Chão" },
    { name: "Arroz Carreteiro", icon: Utensils, desc: "Prato de sustento das comitivas e do campo. Arroz com carne seca, mandioca e temperos regionais — sabor que reconforta e pertence.", tag: "Tradição" },
    { name: "Sobá Regional", icon: Utensils, desc: "A influência japonesa que chegou ao interior do MS e encontrou os sabores locais. Prato de identidade e convivência no coração do estado.", tag: "Fusão" },
    { name: "Tereré em Roda", icon: Leaf, desc: "Muito mais que bebida — é cerimônia. Chimarrão frio com erva-mate, partilhado em roda como símbolo de amizade, hospitalidade e pertencimento.", tag: "Ritual" },
    { name: "Peixes do Cerrado", icon: Fish, desc: "Pacu, pintado e pintado-verdadeiro dos rios regionais. Fritos, assados ou no caldo — pratos que chegam direto da água para a mesa.", tag: "Rio" },
    { name: "Culinária de Fazenda", icon: Flame, desc: "Mandioca, milho, feijão, queijo e receitas herdadas das famílias pioneiras. Uma cozinha que conta a história de quem fez o cerrado produtivo.", tag: "Raiz" },
];

const itinerary = [
    {
        day: "Dia 1",
        theme: "Cultura e Povo",
        morning: "Visita às aldeias Terena — artesanato, memória oral e arquitetura tradicional. Entender como o povo Terena mantém viva a identidade em meio ao avanço do agro moderno.",
        afternoon: "Centro histórico, museu local e pontos de memória da colonização. Conversa com lideranças comunitárias sobre os desafios e conquistas do povo indígena.",
        evening: "Jantar com culinária de fazenda, tereré em roda e música sertaneja ao vivo. Sentir o ritmo pausado e hospitaleiro do interior produtivo do MS.",
        color: "from-amber-600 to-orange-700",
        icon: Users,
    },
    {
        day: "Dia 2",
        theme: "Agro e Natureza",
        morning: "Rota do agro: visita a cooperativas, silos e propriedades rurais. Compreender como a soja, o milho e a pecuária transformaram Sidrolândia numa potência econômica do MS.",
        afternoon: "Trilha pelo cerrado, rio regional e mata de galeria. Pesca esportiva ou contemplação da paisagem que transita entre o produtivo e o selvagem.",
        evening: "Pôr do sol cinematográfico sobre os campos — um dos mais belos do corredor bioceânico. Céu que vai do dourado ao cobre sobre o cerrado infinito.",
        color: "from-green-600 to-teal-700",
        icon: Tractor,
    },
    {
        day: "Dia 3",
        theme: "Rota e Fronteiras",
        morning: "Percurso pela BR-060 em direção a Jardim: a estrada que conecta Campo Grande ao sul do estado. Entender a posição estratégica de Sidrolândia no corredor bioceânico.",
        afternoon: "Compras de artesanato Terena e produtos regionais. Visita à feira de produtores locais e gastronomia de rua.",
        evening: "Despedida com churrasco pantaneiro no fogo de chão. Sidrolândia fica — assim como o sabor do cerrado e a memória de um povo que nunca esqueceu suas raízes.",
        color: "from-blue-600 to-indigo-700",
        icon: Globe,
    },
];

const curiosities = [
    { text: "O povo Terena é uma das nações indígenas mais organizadas do Brasil — com escola própria, língua viva e produção agrícola tradicional ativa até hoje." },
    { text: "Sidrolândia é um dos maiores produtores de milho e soja do Mato Grosso do Sul, integrando o cinturão produtivo que abastece o corredor de exportação bioceânico." },
    { text: "O pôr do sol em Sidrolândia é considerado por moradores e visitantes um dos mais cinematográficos do MS — o cerrado amplifica os tons de cobre, ouro e carmim no horizonte." },
    { text: "A cidade está posicionada estrategicamente entre Campo Grande e a Serra da Bodoquena, tornando-se parada natural no maior corredor bioceânico da América do Sul." },
    { text: "As cooperativas de Sidrolândia exportam para mais de 20 países — grãos que saem pelo Rio Paraguai em direção ao oceano Pacífico pela nova rota bioceânica." },
    { text: "A palavra Sidrolândia vem da Fazenda Sidrolândia, que existia no local antes da fundação do município — um nome que carrega a memória da terra e de quem a trabalhou." },
    { text: "A tradição das cavalgadas e rodeios reúne anualmente milhares de visitantes — festas que misturam herança indígena, sertaneja e pantaneira num único evento de identidade regional." },
    { text: "Sidrolândia é cercada por três biomas: Cerrado, Pantanal e a transição para a Mata Atlântica — uma diversidade ecológica raramente encontrada em apenas um município." },
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

/* ─── infográfico ────────────────────────────────────────────── */

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
                            alt="Infográfico editorial Sidrolândia"
                            className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-full p-3">
                                <ZoomIn className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>
                    <p className="text-center text-white/30 text-xs mt-3">Clique para ampliar</p>
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
                            alt="Infográfico editorial Sidrolândia"
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

export default function SidrolandiaPage() {
    const isMobile = useIsMobile();
    return (
        <div className="min-h-screen">

            {/* ── HERO ───────────────────────────────────────── */}
            <CityHero
                country="Brasil"
                countryFlag="🇧🇷"
                region="Mato Grosso do Sul"
                name={{ first: "Sidrolândia", second: "" }}
                tagline="Onde o agronegócio encontra o povo Terena, o cerrado e a logística que move um continente."
                scene="pantanal"
                image="/cities/sidrolandia.jpg"
                accentColor="#C8922A"
                stats={[
                    { label: "Habitantes (est. 2022)", value: 51000, suffix: " hab." },
                    { label: "Km de Campo Grande",     value: 70,    suffix: " km" },
                    { label: "Km de Jardim",           value: 160,   suffix: " km" },
                    { label: "Produção de soja (t/ano)", value: 120000, suffix: " t" },
                ]}
            />

            {/* ── INFOGRÁFICO ──────────────────────────────────── */}
            <InfograficoSection />

            {/* ── POVO TERENA — destaque ───────────────────────── */}
            <section style={{ background: "linear-gradient(135deg, #1a0f02 0%, #2d1a05 50%, #1a0f02 100%)", position: "relative", overflow: "hidden", padding: "80px 0" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/cities/sidrolandia.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08 }} />
                <div style={{ position: "absolute", top: "-120px", right: "-120px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,146,42,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(74,124,89,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ position: "relative", zIndex: 2, maxWidth: "80rem", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "32px" : "56px", alignItems: "center" }}>
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(200,146,42,0.15)", border: "1px solid rgba(200,146,42,0.4)", borderRadius: "99px", padding: "6px 16px", marginBottom: "20px" }}>
                            <span style={{ fontSize: "18px" }}>🪶</span>
                            <span style={{ color: "#e8c97a", fontWeight: 600, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>Destaque Cultural</span>
                        </div>

                        <h2 style={{ color: "#ffffff", fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "16px" }}>
                            O Povo Terena
                        </h2>
                        <p style={{ color: "#e8c97a", fontSize: "1.1rem", fontWeight: 500, marginBottom: "28px" }}>
                            Uma nação indígena que resiste, cria e celebra — no coração do agro mais produtivo do MS
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "36px" }}>
                            <p style={{ color: "#f5e6c8", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                Os <strong style={{ color: "#e8c97a" }}>Terena</strong> são uma das nações indígenas mais organizadas e resilientes do Brasil. Presentes há séculos no território que hoje forma Sidrolândia, eles mantêm viva uma cultura riquíssima: língua própria, artesanato sofisticado, espiritualidade profunda e técnicas de agricultura que convivem com o agronegócio moderno sem perder a identidade.
                            </p>
                            <p style={{ color: "#f5e6c8", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                As <strong style={{ color: "#e8c97a" }}>aldeias Terena</strong> são espaços de memória viva — onde as crianças aprendem a língua ancestral, os mais velhos ensinam o artesanato e os rituais de cura e celebração são praticados como forma de resistência e afirmação. Para o visitante, é uma experiência de contato humano genuíno que nenhum museu pode reproduzir.
                            </p>
                            <p style={{ color: "#f5e6c8", lineHeight: 1.75, fontSize: "0.97rem" }}>
                                A <strong style={{ color: "#e8c97a" }}>convivência entre o povo Terena e o agronegócio</strong> é um dos aspectos mais singulares de Sidrolândia — e um dos temas mais relevantes para entender o futuro da relação entre produção, identidade e território no Mato Grosso do Sul.
                            </p>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                            {[
                                { icon: "🪶", label: "Nação", value: "Terena" },
                                { icon: "🗣️", label: "Língua viva", value: "Terena (aruak)" },
                                { icon: "🏘️", label: "Aldeias", value: "múltiplas ativas" },
                                { icon: "🌾", label: "Agricultura", value: "tradicional e moderna" },
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
                                alt="Sidrolândia — cerrado e tradição Terena"
                                style={{ width: "100%", height: "340px", objectFit: "cover", display: "block" }}
                                onError={e => { e.target.style.background = "linear-gradient(135deg, #2d1a05, #4a7c59)"; e.target.style.display = "none"; }}
                            />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,15,2,0.75) 0%, transparent 50%)" }} />
                            <div style={{ position: "absolute", bottom: "16px", left: "20px", right: "20px" }}>
                                <p style={{ color: "#f5e6c8", fontSize: "0.8rem", opacity: 0.8 }}>Cerrado do MS · Sidrolândia · Brasil</p>
                            </div>
                        </div>

                        <div style={{ background: "rgba(200,146,42,0.08)", border: "1px solid rgba(200,146,42,0.25)", borderRadius: "16px", padding: "24px" }}>
                            <h3 style={{ color: "#e8c97a", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>Como conhecer as aldeias</h3>
                            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0, margin: 0 }}>
                                {[
                                    { icon: "🕐", text: "Visitas guiadas com agendamento prévio junto às lideranças comunitárias" },
                                    { icon: "🚗", text: "Aldeias distribuídas no entorno do município — acesso por estrada de terra" },
                                    { icon: "🪶", text: "Respeito às tradições locais: sem fotografar sem permissão, dress code adequado" },
                                    { icon: "🛒", text: "Artesanato disponível para compra diretamente nas aldeias — renda para as famílias" },
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

            {/* ── RESUMO EXECUTIVO ─────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <SectionLabel>Quem é Sidrolândia</SectionLabel>
                        <SectionTitle>
                            Onde o agro encontra{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                a alma indígena
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-lg text-slate-500 leading-relaxed"
                        >
                            Sidrolândia é um paradoxo fascinante: uma das cidades mais produtivas do Mato Grosso do Sul,
                            com silos, cooperativas e exportações que chegam ao outro lado do continente — e ao mesmo
                            tempo, lar de um povo indígena que mantém viva uma cultura de{" "}
                            <strong className="text-primary-700">milênios entre os campos de soja</strong>. É o coração
                            produtivo do MS, pulsando entre o futuro e a memória ancestral.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Wheat,
                                title: "Polo Agroindustrial",
                                text: "Soja, milho, pecuária e avicultura em escala de exportação. Cooperativas e silos que integram o corredor bioceânico — produção que abastece quatro países.",
                                color: "from-amber-50 to-orange-50",
                                accent: "text-amber-700",
                                iconBg: "bg-amber-100",
                            },
                            {
                                icon: Users,
                                title: "Povo Terena",
                                text: "Nação indígena de língua aruak com presença ativa, artesanato vivo e espiritualidade praticada. Uma das culturas indígenas mais organizadas do Brasil central.",
                                color: "from-emerald-50 to-teal-50",
                                accent: "text-emerald-700",
                                iconBg: "bg-emerald-100",
                            },
                            {
                                icon: Globe,
                                title: "Nó Logístico Bioceânico",
                                text: "Posicionada entre Campo Grande e a fronteira, Sidrolândia é eixo do corredor de exportação que conecta o agro do MS aos mercados do Pacífico via Porto Murtinho.",
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

            {/* ── HISTÓRIA ─────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/8 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Raízes que moldam uma identidade única</SectionLabel>
                        <SectionTitle light>
                            Da aldeia ancestral ao{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                corredor bioceânico
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            Sidrolândia foi construída em camadas — indígena, colonial, agrícola e logística.
                            Cada período deixou marcas que convivem e se tensionam na paisagem, na cultura e
                            na identidade do município mais produtivo do corredor bioceânico brasileiro.
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
                                        <span>Símbolo: {item.symbol}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── AGRO & NATUREZA ──────────────────────────────── */}
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <SectionLabel>O cinturão produtivo do MS</SectionLabel>
                            <SectionTitle>
                                Terra que{" "}
                                <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                    alimenta continentes
                                </span>
                            </SectionTitle>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-slate-500 leading-relaxed mb-8"
                            >
                                Sidrolândia integra o cinturão produtivo mais dinâmico do Mato Grosso do Sul.
                                Soja, milho, pecuária e avicultura formam uma cadeia de produção que alimenta
                                mercados no Brasil e no exterior — e que agora encontra no corredor bioceânico
                                uma via de exportação direta até o Pacífico.
                            </motion.p>
                            <div className="space-y-3">
                                {[
                                    { name: "Soja e Milho", desc: "Plantio em escala industrial com tecnologia de ponta. Uma das maiores produções per capita do MS." },
                                    { name: "Pecuária e Avicultura", desc: "Rebanhos bovinos, granjas e frigoríficos que movimentam a cadeia do frio regional." },
                                    { name: "Cooperativas", desc: "Modelo cooperativista forte — associativismo que garante escala, preço e acesso a mercado externo." },
                                    { name: "Silos e Armazéns", desc: "Infraestrutura de armazenamento que posiciona Sidrolândia como polo logístico do corredor." },
                                    { name: "Agroindústria", desc: "Processamento local que agrega valor à produção — beneficiadoras, laticínios e produção de ração." },
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
                                        Natureza e Biodiversidade
                                    </span>
                                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                                        O cerrado que resiste entre os campos de produção
                                    </h3>
                                    <div className="space-y-4 text-white/60 text-sm leading-relaxed">
                                        <p>
                                            Entre as lavouras de soja e os pastos, o cerrado genuíno do Mato Grosso
                                            do Sul mantém bolsões de natureza intocada: veredas, buritis, matas de
                                            galeria e rios de margem vermelha onde a fauna ainda se aventura.
                                        </p>
                                        <p>
                                            A posição de Sidrolândia no encontro de três biomas — Cerrado, Pantanal
                                            e a transição para a Mata Atlântica — cria uma diversidade ecológica
                                            raramente encontrada em apenas um município brasileiro.
                                        </p>
                                        <p className="text-amber-400 font-medium italic">
                                            "O pôr do sol sobre os campos de Sidrolândia é cinematográfico — o cerrado amplifica cada tom de cobre e dourado no horizonte."
                                        </p>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                                        <Trees className="w-4 h-4 text-amber-400" />
                                        <span className="text-xs text-white/40">Três biomas em transição — biodiversidade singular</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CULTURA ──────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500/8 rounded-full blur-[80px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <SectionLabel>Identidade que sobrevive ao tempo</SectionLabel>
                            <SectionTitle light>
                                Tradição rural e{" "}
                                <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                    memória indígena
                                </span>
                            </SectionTitle>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-white/55 leading-relaxed mb-8"
                            >
                                Sidrolândia vive um encontro singular de culturas: a tradição indígena Terena
                                e a cultura sertaneja, pantaneira e sulista que chegou com os colonizadores.
                                Cavalgadas, rodeios, festas de colheita e rituais ancestrais convivem no
                                calendário cultural de uma cidade que não esquece de onde veio.
                            </motion.p>
                            <div className="space-y-3">
                                {[
                                    { label: "Cultura Terena", sub: "Língua, artesanato, espiritualidade e agricultura tradicional — herança viva de séculos" },
                                    { label: "Cavalgadas e Rodeios", sub: "Festas que reúnem milhares — herança dos tropeiros e da lida com o gado do cerrado" },
                                    { label: "Música Sertaneja Raiz", sub: "Viola, acordeão e chamamé — trilha sonora do interior produtivo do MS" },
                                    { label: "Artesanato Regional", sub: "Palha, cerâmica, couro e fibras — técnicas milenares Terena e rurais em cada peça" },
                                    { label: "Festas de Colheita", sub: "Celebrações da safra que misturam gratidão, identidade e comunidade" },
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
                                { animal: "Lobo-guará", detail: "Símbolo do cerrado preservado", emoji: "🐺" },
                                { animal: "Araras", detail: "Ave do cerrado e da tradição Terena", emoji: "🦜" },
                                { animal: "Capivara", detail: "Dona dos rios do cerrado", emoji: "🦫" },
                                { animal: "Dourado", detail: "O rei dos rios regionais", emoji: "🐟" },
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

            {/* ── GASTRONOMIA ──────────────────────────────────── */}
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Sabores do cerrado e da fazenda</SectionLabel>
                        <SectionTitle>
                            Cozinha de{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                brasa e afeto
                            </span>
                        </SectionTitle>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.12 }}
                            className="text-slate-500 leading-relaxed"
                        >
                            A mesa de Sidrolândia é um mapa da identidade do interior do MS: carne no fogo de chão,
                            peixe de rio, sobá que veio do Japão e tereré que é puro Pantanal. Uma culinária que
                            sustenta quem trabalha e celebra quem chega.
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

            {/* ── PONTOS TURÍSTICOS ────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>O que ver e fazer</SectionLabel>
                        <SectionTitle>
                            Experiências que{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                definem Sidrolândia
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

            {/* ── ROTEIRO ──────────────────────────────────────── */}
            <section className="section-padding bg-primary-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/6 rounded-full blur-[120px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionLabel>Roteiro Sugerido</SectionLabel>
                        <SectionTitle light>
                            3 dias{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                no coração do MS
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
                                        { time: "Manhã",  text: day.morning },
                                        { time: "Tarde",  text: day.afternoon },
                                        { time: "Noite",  text: day.evening },
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

            {/* ── CURIOSIDADES ─────────────────────────────────── */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <SectionLabel>Você sabia?</SectionLabel>
                        <SectionTitle>
                            Fatos que{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                surpreendem
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

            {/* ── INFORMAÇÕES PRÁTICAS ─────────────────────────── */}
            <section className="section-padding bg-primary-950">
                <div className="container-custom">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <SectionLabel>Planeje sua visita</SectionLabel>
                        <SectionTitle light>
                            Informações{" "}
                            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                práticas
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
                            <h3 className="font-display text-lg font-bold text-white mb-3">Como Chegar</h3>
                            <div className="space-y-3 text-white/50 text-sm leading-relaxed">
                                <p>
                                    <strong className="text-white/80">De Campo Grande:</strong> ~70 km pela BR-060.
                                    Aproximadamente 1h de viagem.
                                </p>
                                <p>
                                    <strong className="text-white/80">Para Jardim:</strong> ~160 km pela BR-060
                                    e MS-178. Cerca de 2h30 de viagem.
                                </p>
                                <p>
                                    <strong className="text-white/80">Na Rota Bioceânica:</strong> Segunda
                                    parada oficial no Brasil — entre Campo Grande e Jardim.
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
                            <h3 className="font-display text-lg font-bold text-white mb-3">Melhor Época</h3>
                            <div className="space-y-3 text-sm">
                                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                    <span className="text-amber-300 font-semibold text-xs block mb-1">Abr → Set</span>
                                    <span className="text-white/50 text-xs">Estação seca — melhor para festas, cavalgadas e trilhas no cerrado</span>
                                </div>
                                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                                    <span className="text-green-300 font-semibold text-xs block mb-1">Mai → Jun</span>
                                    <span className="text-white/50 text-xs">Colheita da soja — período de maior movimento e festas tradicionais</span>
                                </div>
                                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                    <span className="text-blue-300 font-semibold text-xs block mb-1">Ano todo</span>
                                    <span className="text-white/50 text-xs">Aldeias Terena recebem visitantes com agendamento em qualquer época</span>
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
                            <h3 className="font-display text-lg font-bold text-white mb-3">Informações Úteis</h3>
                            <div className="space-y-3">
                                {[
                                    { label: "Distância de Campo Grande", val: "~70 km", icon: MapPin },
                                    { label: "Distância de Jardim", val: "~160 km", icon: MapPin },
                                    { label: "Acesso às aldeias", val: "Agendamento necessário", icon: Users },
                                    { label: "Infraestrutura", val: "Hotéis, restaurantes e posto", icon: Camera },
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

            {/* ── CTA FINAL ────────────────────────────────────── */}
            <section className="py-20 bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_white_0%,_transparent_70%)]" />
                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-white/80 text-sm uppercase tracking-widest mb-4">
                            Rota Bioceânica · Brasil · Mato Grosso do Sul
                        </p>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            Sidrolândia — onde a terra vermelha alimenta continentes e a memória Terena resiste ao tempo.
                        </h2>
                        <p className="text-white/70 mb-8 max-w-lg mx-auto">
                            Continue explorando as cidades que formam o maior corredor bioceânico da América do Sul.
                        </p>
                        <Link
                            to="/cidades"
                            className="inline-flex items-center gap-2 bg-white text-amber-700 font-bold px-8 py-4 rounded-full hover:bg-amber-50 transition-colors group"
                        >
                            Ver todas as cidades
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
