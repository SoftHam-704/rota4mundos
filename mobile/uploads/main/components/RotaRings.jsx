import { useId } from "react";
import { motion } from "framer-motion";

function BrazilFlag({ r }) {
    return (
        <>
            <rect x={-r} y={-r} width={r * 2} height={r * 2} fill="#009c3b" />
            <polygon points={`0,${-r * 0.7} ${r * 0.88},0 0,${r * 0.7} ${-r * 0.88},0`} fill="#FEDF00" />
            <circle r={r * 0.36} fill="#002776" />
            <rect x={-r * 0.46} y={-r * 0.055} width={r * 0.92} height={r * 0.11} fill="rgba(255,255,255,0.35)" />
        </>
    );
}

function ParaguayFlag({ r }) {
    const h = (r * 2) / 3;
    return (
        <>
            <rect x={-r} y={-r}         width={r * 2} height={h} fill="#d52b1e" />
            <rect x={-r} y={-r + h}     width={r * 2} height={h} fill="#ffffff" />
            <rect x={-r} y={-r + h * 2} width={r * 2} height={h} fill="#0038a8" />
        </>
    );
}

function ArgentinaFlag({ r }) {
    const h = (r * 2) / 3;
    return (
        <>
            <rect x={-r} y={-r}         width={r * 2} height={h} fill="#74acdf" />
            <rect x={-r} y={-r + h}     width={r * 2} height={h} fill="#ffffff" />
            <rect x={-r} y={-r + h * 2} width={r * 2} height={h} fill="#74acdf" />
            {Array.from({ length: 16 }, (_, i) => {
                const ang = (i * 22.5 * Math.PI) / 180;
                const r1 = r * 0.13, r2 = i % 2 === 0 ? r * 0.27 : r * 0.20;
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

function StarShape({ r }) {
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
            <rect x={-r} y={0}  width={r * 2}       height={r} fill="#d52b1e" />
            <rect x={-r} y={-r} width={r * 2}       height={r} fill="#ffffff" />
            <rect x={-r} y={-r} width={(r * 2) / 3} height={r} fill="#0038a8" />
            <g transform={`translate(${-r * 0.67}, ${-r * 0.5})`}>
                <StarShape r={r * 0.19} />
            </g>
        </>
    );
}

const RINGS = [
    { name: "Brasil",    stroke: "#22c55e", Flag: BrazilFlag    },
    { name: "Paraguai",  stroke: "#2dd4bf", Flag: ParaguayFlag  },
    { name: "Argentina", stroke: "#60a5fa", Flag: ArgentinaFlag },
    { name: "Chile",     stroke: "#f87171", Flag: ChileFlag     },
];

const D    = 110;
const r    = D / 2;
const gap  = 26;
const padY = 6;
const H    = D + padY * 2 + 32;
const cy   = padY + r;

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
        },
    },
};

const ringVariants = {
    hidden: { opacity: 0, scale: 0.4 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 280,
            damping: 20,
        },
    },
};

const lineContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: RINGS.length * 0.18 + 0.15,
            staggerChildren: 0.35,
        },
    },
};

const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
};

const lineVariants = {
    hidden: { width: 0 },
    visible: { width: "160px", transition: { duration: 0.9, ease: "easeOut" } },
};

function Ring({ ring, index, id }) {
    return (
        <motion.div
            variants={ringVariants}
            style={{
                marginLeft: index > 0 ? -gap : 0,
                position: "relative",
                zIndex: index,
                flexShrink: 0,
            }}
        >
            <svg width={D} height={H} style={{ display: "block", overflow: "visible" }}>
                <defs>
                    <clipPath id={`${id}-c${index}`}>
                        <circle cx={r} cy={cy} r={r - 4} />
                    </clipPath>
                </defs>
                <g clipPath={`url(#${id}-c${index})`}>
                    <g transform={`translate(${r}, ${cy})`}>
                        <ring.Flag r={r - 4} />
                    </g>
                </g>
                <circle cx={r} cy={cy} r={r - 3}
                    fill="none" stroke={ring.stroke} strokeWidth="4.5" opacity="0.9" />
                <text
                    x={r} y={cy + r + 22}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.45)"
                    fontSize="9" fontWeight="700"
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing="0.1em"
                >
                    {ring.name.toUpperCase()}
                </text>
            </svg>
        </motion.div>
    );
}

export default function RotaRings({ className = "" }) {
    const rawId = useId();
    const id = rawId.replace(/:/g, "");

    return (
        <div className={`flex flex-col items-center gap-3 ${className}`}>
            {/* Argolas */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                style={{ display: "flex", alignItems: "flex-start" }}
            >
                {RINGS.map((ring, i) => (
                    <Ring key={ring.name} ring={ring} index={i} id={id} />
                ))}
            </motion.div>

            {/* Linha Atlântico → Pacífico */}
            <motion.div
                variants={lineContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
            >
                <motion.span
                    variants={fadeVariants}
                    style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.18em", textTransform: "uppercase" }}
                >
                    Atlântico
                </motion.span>

                <div style={{ overflow: "hidden" }}>
                    <motion.div
                        variants={lineVariants}
                        style={{
                            height: "1px",
                            background: "linear-gradient(to right, rgba(34,197,94,0.5), rgba(45,212,191,0.5), rgba(96,165,250,0.5), rgba(248,113,113,0.5))",
                        }}
                    />
                </div>

                <motion.span
                    variants={fadeVariants}
                    style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.18em", textTransform: "uppercase" }}
                >
                    Pacífico
                </motion.span>
            </motion.div>
        </div>
    );
}
