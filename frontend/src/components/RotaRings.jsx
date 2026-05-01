import { useId } from "react";
import { motion } from "framer-motion";

// ── Bandeiras simplificadas centradas em (0,0) ────────────────────────────────

function BrazilFlag({ r }) {
    return (
        <>
            <rect x={-r} y={-r} width={r * 2} height={r * 2} fill="#009c3b" />
            <polygon
                points={`0,${-r * 0.7} ${r * 0.88},0 0,${r * 0.7} ${-r * 0.88},0`}
                fill="#FEDF00"
            />
            <circle r={r * 0.36} fill="#002776" />
            <rect
                x={-r * 0.46} y={-r * 0.055}
                width={r * 0.92} height={r * 0.11}
                fill="rgba(255,255,255,0.35)"
            />
        </>
    );
}

function ParaguayFlag({ r }) {
    const h = (r * 2) / 3;
    return (
        <>
            <rect x={-r} y={-r}       width={r * 2} height={h} fill="#d52b1e" />
            <rect x={-r} y={-r + h}   width={r * 2} height={h} fill="#ffffff" />
            <rect x={-r} y={-r + h*2} width={r * 2} height={h} fill="#0038a8" />
        </>
    );
}

function ArgentinaFlag({ r }) {
    const h = (r * 2) / 3;
    return (
        <>
            <rect x={-r} y={-r}       width={r * 2} height={h} fill="#74acdf" />
            <rect x={-r} y={-r + h}   width={r * 2} height={h} fill="#ffffff" />
            <rect x={-r} y={-r + h*2} width={r * 2} height={h} fill="#74acdf" />
            {Array.from({ length: 16 }, (_, i) => {
                const ang = (i * 22.5 * Math.PI) / 180;
                const r1 = r * 0.13;
                const r2 = i % 2 === 0 ? r * 0.27 : r * 0.20;
                return (
                    <line key={i}
                        x1={r1 * Math.cos(ang)} y1={r1 * Math.sin(ang)}
                        x2={r2 * Math.cos(ang)} y2={r2 * Math.sin(ang)}
                        stroke="#F6B40E" strokeWidth={i % 2 === 0 ? 2 : 1}
                    />
                );
            })}
            <circle r={r * 0.12} fill="#F6B40E" />
        </>
    );
}

function Star({ r }) {
    const pts = Array.from({ length: 10 }, (_, i) => {
        const ang = ((i * 36 - 90) * Math.PI) / 180;
        const rad = i % 2 === 0 ? r : r * 0.42;
        return `${(rad * Math.cos(ang)).toFixed(2)},${(rad * Math.sin(ang)).toFixed(2)}`;
    });
    return <polygon points={pts.join(" ")} fill="white" />;
}

function ChileFlag({ r }) {
    return (
        <>
            <rect x={-r} y={0}  width={r * 2}       height={r}   fill="#d52b1e" />
            <rect x={-r} y={-r} width={r * 2}       height={r}   fill="#ffffff" />
            <rect x={-r} y={-r} width={(r * 2) / 3} height={r}   fill="#0038a8" />
            <g transform={`translate(${-r * 0.67}, ${-r * 0.5})`}>
                <Star r={r * 0.19} />
            </g>
        </>
    );
}

// ── Dados dos países ─────────────────────────────────────────────────────────

const RINGS = [
    { name: "Brasil",    stroke: "#22c55e", Flag: BrazilFlag    },
    { name: "Paraguai",  stroke: "#2dd4bf", Flag: ParaguayFlag  },
    { name: "Argentina", stroke: "#60a5fa", Flag: ArgentinaFlag },
    { name: "Chile",     stroke: "#f87171", Flag: ChileFlag     },
];

// ── Componente ────────────────────────────────────────────────────────────────

export default function RotaRings({ className = "" }) {
    const rawId = useId();
    const id = rawId.replace(/:/g, "");

    const D    = 120;          // diâmetro de cada argola
    const r    = D / 2;        // raio
    const gap  = 28;           // sobreposição entre argolas
    const step = D - gap;      // passo entre centros: 92px
    const W    = step * 3 + D; // largura total: 276 + 120 = 396
    const padY = 6;
    const H    = D + padY * 2 + 32; // altura + espaço para labels
    const cy   = padY + r;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className={`flex flex-col items-center gap-2 ${className}`}
        >
            <svg
                viewBox={`0 0 ${W} ${H}`}
                width={W}
                height={H}
                className="max-w-full"
                style={{ maxWidth: "100%" }}
            >
                <defs>
                    {RINGS.map((_, i) => (
                        <clipPath key={i} id={`${id}-c${i}`}>
                            <circle cx={r + i * step} cy={cy} r={r - 4} />
                        </clipPath>
                    ))}
                </defs>

                {/* Bandeiras recortadas nas argolas */}
                {RINGS.map(({ Flag }, i) => (
                    <g key={i} clipPath={`url(#${id}-c${i})`}>
                        <g transform={`translate(${r + i * step}, ${cy})`}>
                            <Flag r={r - 4} />
                        </g>
                    </g>
                ))}

                {/* Bordas das argolas (desenhadas por cima das bandeiras) */}
                {RINGS.map(({ stroke }, i) => (
                    <circle
                        key={i}
                        cx={r + i * step}
                        cy={cy}
                        r={r - 3}
                        fill="none"
                        stroke={stroke}
                        strokeWidth="4.5"
                        opacity="0.9"
                    />
                ))}

                {/* Nomes dos países */}
                {RINGS.map(({ name }, i) => (
                    <text
                        key={i}
                        x={r + i * step}
                        y={cy + r + 22}
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.5)"
                        fontSize="10"
                        fontWeight="700"
                        fontFamily="system-ui, sans-serif"
                        letterSpacing="0.08em"
                    >
                        {name.toUpperCase()}
                    </text>
                ))}
            </svg>

            {/* Linha da rota */}
            <div className="flex items-center gap-3">
                <span className="text-[11px] text-white/25 tracking-widest uppercase">Atlântico</span>
                <div className="h-px w-40 bg-gradient-to-r from-green-500/50 via-teal-400/50 via-blue-400/50 to-red-400/50" />
                <span className="text-[11px] text-white/25 tracking-widest uppercase">Pacífico</span>
            </div>
        </motion.div>
    );
}
