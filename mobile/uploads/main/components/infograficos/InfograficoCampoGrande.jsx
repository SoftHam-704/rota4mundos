import { motion } from "framer-motion";
import { MapPin, Users, Calendar, Building2, Leaf, Fish, Train, Globe } from "lucide-react";

const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay },
});

export default function InfograficoCampoGrande() {
    return (
        <div className="bg-[#0d1f35] text-white rounded-3xl overflow-hidden font-sans select-text">

            {/* ── HEADER ─────────────────────────────────────── */}
            <div className="relative bg-gradient-to-br from-[#0d1f35] via-[#102840] to-[#0a1a2e] px-8 pt-8 pb-6 border-b border-white/10">
                {/* Mapa MS silhueta */}
                <div className="absolute top-4 right-6 opacity-20">
                    <svg width="60" height="52" viewBox="0 0 60 52">
                        <path d="M8,4 L52,2 L56,14 L54,38 L40,48 L20,50 L4,40 L2,22 Z" fill="#F4A261" stroke="#F4A261" strokeWidth="1"/>
                        <text x="28" y="30" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MS</text>
                    </svg>
                </div>

                <motion.div {...fade(0)}>
                    <div className="flex items-center gap-2 text-amber-400/70 text-xs font-semibold uppercase tracking-widest mb-1">
                        <MapPin className="w-3 h-3" />
                        Mato Grosso do Sul · Brasil
                    </div>
                    <h1 className="font-bold leading-none mb-1" style={{ fontSize: "clamp(2rem,6vw,3.5rem)", fontFamily: "Georgia, serif" }}>
                        CAMPO GRANDE
                    </h1>
                    <p className="text-amber-400 italic font-medium mb-3" style={{ fontSize: "clamp(0.95rem,2.5vw,1.3rem)", fontFamily: "Georgia, serif" }}>
                        A Capital Morena do Cerrado
                    </p>
                    <p className="text-white/55 text-sm max-w-xl leading-relaxed">
                        Entre o solo avermelhado que inspirou seu apelido e as raízes de quatro continentes, Campo Grande
                        é o hub logístico e cultural da Rota Bioceânica — onde o Brasil encontra o mundo.
                    </p>
                </motion.div>

                {/* Stats strip */}
                <motion.div {...fade(0.1)} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                    {[
                        { icon: Users,    val: "906.092",   sub: "habitantes (2022)" },
                        { icon: Calendar, val: "1899",      sub: "fundação" },
                        { icon: Building2,val: "8.096 km²", sub: "área territorial" },
                        { icon: Train,    val: "1.914",     sub: "chegada da ferrovia" },
                    ].map((s, i) => (
                        <div key={i} className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                            <s.icon className="w-5 h-5 text-amber-400 flex-shrink-0" />
                            <div>
                                <div className="font-bold text-white text-sm leading-none">{s.val}</div>
                                <div className="text-white/40 text-[10px] mt-0.5">{s.sub}</div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* ── CORPO ──────────────────────────────────────── */}
            <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">

                {/* HISTÓRIA */}
                <motion.div {...fade(0.1)} className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                            <Train className="w-4 h-4 text-amber-400" />
                        </div>
                        <div>
                            <div className="text-[10px] text-amber-400/70 uppercase tracking-widest">01</div>
                            <div className="font-bold text-white text-sm">HISTÓRIA</div>
                        </div>
                    </div>
                    <div className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Ciclos que construíram a cidade</div>

                    <div className="space-y-3">
                        {[
                            { period: "1872", title: "Fazenda Campo Grande", body: "Arraial fundado por José Antônio Pereira às margens do Córrego Prosa. Solo vermelho de terra roxa batizaria a futura 'Capital Morena'." },
                            { period: "1914", title: "A Ferrovia Transforma Tudo", body: "A chegada da Estrada de Ferro Noroeste do Brasil dispara crescimento de 1.800 para 50.000 habitantes em décadas — motor da urbanização." },
                            { period: "1977", title: "Capital do Novo Estado", body: "Com a divisão do Mato Grosso, Campo Grande torna-se capital de Mato Grosso do Sul — novo centro político e econômico do Centro-Oeste." },
                            { period: "2023", title: "Hub da Rota Bioceânica", body: "Ponto de partida brasileiro oficial da rota. Infraestrutura logística, aeroporto internacional e diversidade cultural únicos na rota." },
                        ].map((c, i) => (
                            <div key={i} className="flex gap-3">
                                <div className="flex-shrink-0 w-10 text-right">
                                    <span className="text-amber-500/60 text-[10px] font-bold">{c.period}</span>
                                </div>
                                <div className="border-l border-amber-500/20 pl-3">
                                    <div className="text-white/90 text-xs font-semibold mb-0.5">{c.title}</div>
                                    <div className="text-white/45 text-[11px] leading-relaxed">{c.body}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* CULTURA */}
                <motion.div {...fade(0.2)} className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center">
                            <Globe className="w-4 h-4 text-teal-400" />
                        </div>
                        <div>
                            <div className="text-[10px] text-teal-400/70 uppercase tracking-widest">02</div>
                            <div className="font-bold text-white text-sm">CULTURA</div>
                        </div>
                    </div>
                    <div className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Identidade dos quatro continentes</div>

                    {/* Imigrantes */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {[
                            { flag: "🇯🇵", povo: "Okinawanos", leg: "Sobá — patrimônio imaterial do Brasil" },
                            { flag: "🇱🇧", povo: "Sírio-Libaneses", leg: "Comércio e gastronomia árabe" },
                            { flag: "🇵🇾", povo: "Paraguaios", leg: "Chipa, sopa paraguaia e guarani" },
                            { flag: "🌾",  povo: "Gaúchos & Nordestinos", leg: "Sertanejo e agropecuária" },
                        ].map((p, i) => (
                            <div key={i} className="bg-white/5 border border-white/8 rounded-xl p-3">
                                <div className="text-xl mb-1">{p.flag}</div>
                                <div className="text-white/80 text-[11px] font-semibold">{p.povo}</div>
                                <div className="text-white/35 text-[10px] leading-tight mt-0.5">{p.leg}</div>
                            </div>
                        ))}
                    </div>

                    {/* Sobá destaque */}
                    <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Fish className="w-3.5 h-3.5 text-teal-400" />
                            <span className="text-teal-300 text-xs font-bold uppercase tracking-wide">Sobá — IPHAN 2016</span>
                        </div>
                        <p className="text-white/50 text-[11px] leading-relaxed">
                            Macarrão frio em caldo de carne, herança okinawana trazida por Hiroshi Katsuren.
                            Patrimônio imaterial nacional — símbolo maior da identidade campo-grandense.
                        </p>
                    </div>
                </motion.div>

                {/* NATUREZA & TURISMO */}
                <motion.div {...fade(0.3)} className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                            <Leaf className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                            <div className="text-[10px] text-emerald-400/70 uppercase tracking-widest">03</div>
                            <div className="font-bold text-white text-sm">NATUREZA & TURISMO</div>
                        </div>
                    </div>
                    <div className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Porta do Pantanal</div>

                    {/* BIOPARQUE destaque */}
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 mb-3">
                        <div className="text-emerald-300 text-xs font-bold uppercase tracking-wide mb-1">🐊 BIOPARQUE Pantanal</div>
                        <div className="grid grid-cols-2 gap-1.5 mb-2">
                            {[
                                { v: "3,2 km", l: "maior aquário" },
                                { v: "213 m²", l: "maior túnel subaq." },
                                { v: "4 biomas", l: "pantaneiros" },
                                { v: "Recorde", l: "mundial Guinness" },
                            ].map((s, i) => (
                                <div key={i} className="bg-black/20 rounded-lg px-2 py-1.5 text-center">
                                    <div className="text-emerald-300 font-bold text-xs">{s.v}</div>
                                    <div className="text-white/35 text-[9px]">{s.l}</div>
                                </div>
                            ))}
                        </div>
                        <p className="text-white/45 text-[10px] leading-relaxed">
                            Maior aquário de água doce do mundo — recorde Guinness. Mergulho com jacarés e piranhas
                            sem gaiola.
                        </p>
                    </div>

                    <div className="space-y-2">
                        {[
                            { emoji: "🦜", name: "Parque das Nações Indígenas", desc: "Maior parque urbano do Brasil: 119 ha no centro da cidade" },
                            { emoji: "🍜", name: "Feira Central", desc: "Sobá, chipa e diversidade noturna desde 1933" },
                            { emoji: "🏛️", name: "Museu das Culturas Dom Bosco", desc: "10.000 peças — maior acervo indígena da América Latina" },
                        ].map((a, i) => (
                            <div key={i} className="flex gap-2 items-start">
                                <span className="text-base flex-shrink-0">{a.emoji}</span>
                                <div>
                                    <div className="text-white/80 text-[11px] font-semibold">{a.name}</div>
                                    <div className="text-white/35 text-[10px]">{a.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* ── ROTEIRO ────────────────────────────────────── */}
            <motion.div {...fade(0.2)} className="border-t border-white/10 px-6 py-5">
                <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Roteiro Sugerido</span>
                    <span className="ml-1 text-amber-400 font-bold text-sm italic" style={{ fontFamily: "Georgia, serif" }}>3 dias inesquecíveis</span>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                    {[
                        { dia: "Dia 1", titulo: "História & Rio", items: ["Feira Central ao amanhecer — sobá com os campo-grandenses", "Museu das Culturas Dom Bosco — 10.000 peças indígenas", "Pôr do sol no Parque das Nações Indígenas"] },
                        { dia: "Dia 2", titulo: "Cultura & Sabores", items: ["BIOPARQUE Pantanal — recorde Guinness de água doce", "Almoço no Mercado Municipal — sopa paraguaia e chipa", "Feira Indígena — artesanato e produtos locais"] },
                        { dia: "Dia 3", titulo: "Cultura & Rota", items: ["Museu José Antônio Pereira — o fundador", "Gastronomia árabe — quibe, esfirra, tabule campo-grandense", "Seguir para Bonito (297 km) ou Porto Murtinho (340 km)"] },
                    ].map((d, i) => (
                        <div key={i} className="bg-white/5 border border-white/8 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">{d.dia}</span>
                                <span className="text-white/70 text-xs font-semibold">{d.titulo}</span>
                            </div>
                            <ul className="space-y-1.5">
                                {d.items.map((item, j) => (
                                    <li key={j} className="flex gap-1.5 text-[11px] text-white/45">
                                        <span className="text-amber-500/50 mt-0.5 flex-shrink-0">›</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ── RODAPÉ ─────────────────────────────────────── */}
            <div className="bg-gradient-to-r from-amber-600/15 via-teal-600/10 to-emerald-600/15 border-t border-white/10 px-6 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-white/40 text-[11px] text-center sm:text-left">
                        <strong className="text-amber-400/80">CAMPO GRANDE</strong> — onde o solo vermelho conta a história de quem chegou e ficou.
                    </p>
                    <p className="text-white/30 text-[10px] uppercase tracking-widest">
                        Destino estratégico · Rota Bioceânica
                    </p>
                </div>
            </div>

        </div>
    );
}
