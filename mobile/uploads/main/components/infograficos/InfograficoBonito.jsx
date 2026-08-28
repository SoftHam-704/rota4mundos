import { motion } from "framer-motion";
import { MapPin, Droplets, Fish, Calendar, Mountain, Leaf, Camera, Star } from "lucide-react";

const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay },
});

export default function InfograficoBonito() {
    return (
        <div className="bg-[#051e2e] text-white rounded-3xl overflow-hidden font-sans select-text">

            {/* ── HEADER ─────────────────────────────────────── */}
            <div className="relative bg-gradient-to-br from-[#051e2e] via-[#062940] to-[#041520] px-8 pt-8 pb-6 border-b border-white/10">
                {/* Silhueta de peixe */}
                <div className="absolute top-4 right-6 opacity-15">
                    <svg width="72" height="52" viewBox="0 0 72 52">
                        <ellipse cx="30" cy="26" rx="22" ry="14" fill="#22d3ee" />
                        <polygon points="52,26 68,10 68,42" fill="#22d3ee" />
                        <circle cx="20" cy="22" r="3" fill="#051e2e" />
                        <ellipse cx="30" cy="34" rx="8" ry="3" fill="#0e7490" opacity="0.5" />
                    </svg>
                </div>

                <motion.div {...fade(0)}>
                    <div className="flex items-center gap-2 text-cyan-400/70 text-xs font-semibold uppercase tracking-widest mb-1">
                        <MapPin className="w-3 h-3" />
                        Mato Grosso do Sul · Brasil
                    </div>
                    <h1 className="font-bold leading-none mb-1" style={{ fontSize: "clamp(2rem,6vw,3.5rem)", fontFamily: "Georgia, serif" }}>
                        BONITO
                    </h1>
                    <p className="text-cyan-400 italic font-medium mb-3" style={{ fontSize: "clamp(0.95rem,2.5vw,1.3rem)", fontFamily: "Georgia, serif" }}>
                        O Aquário Natural do Mundo
                    </p>
                    <p className="text-white/55 text-sm max-w-xl leading-relaxed">
                        Onde o calcário purifica a água até 40 metros de visibilidade e os dourados nadam mansos ao lado
                        de mergulhadores — o ecoturismo mais premiado do Brasil na Rota Bioceânica.
                    </p>
                </motion.div>

                {/* Stats strip */}
                <motion.div {...fade(0.1)} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                    {[
                        { icon: Droplets,  val: "40 m",       sub: "visibilidade n'água" },
                        { icon: Calendar,  val: "1992",       sub: "decreto ecoturismo" },
                        { icon: Mountain,  val: "4.934 km²",  sub: "área territorial" },
                        { icon: Fish,      val: "≥ 260",      sub: "espécies de peixes" },
                    ].map((s, i) => (
                        <div key={i} className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                            <s.icon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
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

                {/* CIÊNCIA DA ÁGUA */}
                <motion.div {...fade(0.1)} className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                            <Droplets className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div>
                            <div className="text-[10px] text-cyan-400/70 uppercase tracking-widest">01</div>
                            <div className="font-bold text-white text-sm">CIÊNCIA DA ÁGUA</div>
                        </div>
                    </div>
                    <div className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Por que a água é cristalina?</div>

                    {/* Processo de filtração */}
                    <div className="space-y-3 mb-4">
                        {[
                            { step: "01", title: "Chuva infiltra no calcário", body: "A água da chuva atravessa camadas de rocha calcária da Bacia do Pantanal — solo poroso que age como filtro natural." },
                            { step: "02", title: "CO₂ dissolve o carbonato", body: "O gás carbônico forma ácido carbônico que dissolve o CaCO₃, carregando consigo partículas em suspensão." },
                            { step: "03", title: "Ressurgência cristalizada", body: "A água aflora nos rios e lagoas com altíssima concentração de carbonato de cálcio — que precipita ao contato com a luz, tornando o fundo branco e a água azul-turquesa." },
                            { step: "04", title: "Aquífero Guarani", body: "Reservatório subterrâneo de 1,2 milhão km² alimenta nascentes e garante vazão constante e temperatura de 22°C o ano inteiro." },
                        ].map((c, i) => (
                            <div key={i} className="flex gap-3">
                                <div className="flex-shrink-0 w-6 text-right">
                                    <span className="text-cyan-500/60 text-[10px] font-bold">{c.step}</span>
                                </div>
                                <div className="border-l border-cyan-500/20 pl-3">
                                    <div className="text-white/90 text-xs font-semibold mb-0.5">{c.title}</div>
                                    <div className="text-white/45 text-[11px] leading-relaxed">{c.body}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Destaque visibilidade */}
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Camera className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="text-cyan-300 text-xs font-bold uppercase tracking-wide">40m de visibilidade</span>
                        </div>
                        <p className="text-white/50 text-[11px] leading-relaxed">
                            Equivale a enxergar um prédio de 13 andares dentro d'água. O Mar do Caribe tem em média 20–25 m.
                            Bonito supera os mares tropicais mais famosos do mundo.
                        </p>
                    </div>
                </motion.div>

                {/* ATRAÇÕES */}
                <motion.div {...fade(0.2)} className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center">
                            <Fish className="w-4 h-4 text-teal-400" />
                        </div>
                        <div>
                            <div className="text-[10px] text-teal-400/70 uppercase tracking-widest">02</div>
                            <div className="font-bold text-white text-sm">ATRAÇÕES</div>
                        </div>
                    </div>
                    <div className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Experiências únicas no mundo</div>

                    <div className="space-y-2.5">
                        {[
                            {
                                badge: "AQUÁTICO",
                                color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
                                name: "Rio da Prata",
                                desc: "Snorkeling entre 260+ espécies de peixes. Dourados, piraputangas e pacus nadam sem medo dos mergulhadores. Visibilidade de 40 m.",
                            },
                            {
                                badge: "GRUTA",
                                color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
                                name: "Gruta do Lago Azul",
                                desc: "Caverna de 350 m de profundidade com lago de 90 m. Luz solar reflete em azul intenso das 7h às 9h — fenômeno único.",
                            },
                            {
                                badge: "FLUTUAÇÃO",
                                color: "bg-teal-500/20 text-teal-300 border-teal-500/30",
                                name: "Aquário Natural",
                                desc: "Rio Sucuri: 21°C, 1.600 m de flutuação em correnteza suave. Cardumes de milhares de peixes em formação cristalina.",
                            },
                            {
                                badge: "AVENTURA",
                                color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                                name: "Abismo Anhumas",
                                desc: "Rapel de 72 m até lago cristalino subterrâneo. Mergulho com cilindro em lago de 80 m de profundidade.",
                            },
                            {
                                badge: "CACHOEIRA",
                                color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
                                name: "Buraco das Araras",
                                desc: "Dolina de 500 m de diâmetro e 100 m de profundidade. Araras-canindé em nidificação — espécie ameaçada de extinção.",
                            },
                        ].map((a, i) => (
                            <div key={i} className="bg-white/5 border border-white/8 rounded-xl p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${a.color}`}>{a.badge}</span>
                                    <span className="text-white/85 text-[11px] font-semibold">{a.name}</span>
                                </div>
                                <p className="text-white/40 text-[10px] leading-relaxed">{a.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ECOTURISMO & REGULAÇÃO */}
                <motion.div {...fade(0.3)} className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                            <Leaf className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                            <div className="text-[10px] text-emerald-400/70 uppercase tracking-widest">03</div>
                            <div className="font-bold text-white text-sm">ECOTURISMO</div>
                        </div>
                    </div>
                    <div className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Modelo de referência da ONU</div>

                    {/* Lei pioneira destaque */}
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 mb-3">
                        <div className="text-emerald-300 text-xs font-bold uppercase tracking-wide mb-1">📜 Lei 1.253 / 1997</div>
                        <div className="grid grid-cols-2 gap-1.5 mb-2">
                            {[
                                { v: "Voucher", l: "único por atração" },
                                { v: "Guias", l: "credenciados obrig." },
                                { v: "Capacidade", l: "máx. por período" },
                                { v: "ONU", l: "modelo internacional" },
                            ].map((s, i) => (
                                <div key={i} className="bg-black/20 rounded-lg px-2 py-1.5 text-center">
                                    <div className="text-emerald-300 font-bold text-xs">{s.v}</div>
                                    <div className="text-white/35 text-[9px]">{s.l}</div>
                                </div>
                            ))}
                        </div>
                        <p className="text-white/45 text-[10px] leading-relaxed">
                            Sistema de voucher controla fluxo diário por atração. Guia obrigatório em todas as atividades.
                            Referência citada pela ONU como modelo de turismo sustentável.
                        </p>
                    </div>

                    {/* Prêmios */}
                    <div className="mb-3">
                        <div className="text-white/40 text-[10px] uppercase tracking-widest mb-2">Reconhecimentos</div>
                        <div className="space-y-1.5">
                            {[
                                { emoji: "🥇", name: "Melhor Destino Ecoturismo", desc: "Brasil por 15+ anos consecutivos — Ministério do Turismo" },
                                { emoji: "🌿", name: "Prêmio ONU Ambiente", desc: "Programa Voucher citado como modelo global de gestão" },
                                { emoji: "🎥", name: "Destino Cinematográfico", desc: "Globo Repórter, BBC, NatGeo — maior cobertura midiática do MS" },
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
                    </div>

                    {/* Fauna destaque */}
                    <div className="bg-white/5 border border-white/8 rounded-xl p-3">
                        <div className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2">Fauna Emblemática</div>
                        <div className="grid grid-cols-2 gap-1">
                            {[
                                { emoji: "🐟", name: "Dourado", sub: "Salminus brasiliensis" },
                                { emoji: "🐦", name: "Arara-canindé", sub: "Ara ararauna" },
                                { emoji: "🦦", name: "Lontra", sub: "Lontra longicaudis" },
                                { emoji: "🐊", name: "Jacaré-do-pantanal", sub: "Caiman yacare" },
                            ].map((f, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                    <span className="text-base">{f.emoji}</span>
                                    <div>
                                        <div className="text-white/70 text-[10px] font-medium">{f.name}</div>
                                        <div className="text-white/25 text-[9px] italic">{f.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ── ROTEIRO ────────────────────────────────────── */}
            <motion.div {...fade(0.2)} className="border-t border-white/10 px-6 py-5">
                <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Roteiro Sugerido</span>
                    <span className="ml-1 text-cyan-400 font-bold text-sm italic" style={{ fontFamily: "Georgia, serif" }}>4 dias de imersão</span>
                </div>
                <div className="grid sm:grid-cols-4 gap-3">
                    {[
                        { dia: "Dia 1", titulo: "Chegada & Gruta", items: ["Chegada — check-in na pousada ecológica", "Tarde: Gruta do Lago Azul (luz das 7–9h: reservar para D2)", "Noite: Rua Cel. Pilad Rebuá — restaurantes regionais"] },
                        { dia: "Dia 2", titulo: "Aquático Clássico", items: ["Manhã cedo: Gruta do Lago Azul — luz azul perfeita", "Rio da Prata — snorkeling 40m visibilidade", "Pôr do sol no Buraco das Araras"] },
                        { dia: "Dia 3", titulo: "Flutuação & Cachoeiras", items: ["Rio Sucuri — flutuação 1.600 m (booking antecipado!)", "Lagoa Misteriosa — mergulho em dolina 220m profundidade", "Balneário Municipal — lazer à tarde"] },
                        { dia: "Dia 4", titulo: "Aventura & Rota", items: ["Abismo Anhumas — rapel 72m (para aventureiros)", "Almoço com peixe fresco — pintado ou pacu assado", "Seguir para Porto Murtinho (140 km) ou Campo Grande (297 km)"] },
                    ].map((d, i) => (
                        <div key={i} className="bg-white/5 border border-white/8 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full">{d.dia}</span>
                                <span className="text-white/70 text-xs font-semibold">{d.titulo}</span>
                            </div>
                            <ul className="space-y-1.5">
                                {d.items.map((item, j) => (
                                    <li key={j} className="flex gap-1.5 text-[11px] text-white/45">
                                        <span className="text-cyan-500/50 mt-0.5 flex-shrink-0">›</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ── RODAPÉ ─────────────────────────────────────── */}
            <div className="bg-gradient-to-r from-cyan-600/15 via-teal-600/10 to-emerald-600/15 border-t border-white/10 px-6 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-white/40 text-[11px] text-center sm:text-left">
                        <strong className="text-cyan-400/80">BONITO</strong> — onde a natureza faz o que o homem não consegue imitar: pureza absoluta.
                    </p>
                    <p className="text-white/30 text-[10px] uppercase tracking-widest">
                        Destino Ecoturístico · Rota Bioceânica
                    </p>
                </div>
            </div>

        </div>
    );
}
