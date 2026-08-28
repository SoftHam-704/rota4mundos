import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, MapPin, Globe, Mountain, Award } from 'lucide-react';
import RotaRings from './RotaRings';
import CountUp from 'react-countup';

/* ─── Pássaros SVG estilizados ───────────────────────────── */
function Bird({ style }: { style: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 40 20"
      width="40" height="20"
      style={{ position: 'absolute', ...style }}
    >
      <path
        d="M20 10 Q14 4 6 8 Q10 10 14 9 Q17 8 20 10 Q23 8 26 9 Q30 10 34 8 Q26 4 20 10Z"
        fill="rgba(244,162,97,0.55)"
      />
    </svg>
  );
}

/* ─── Linha da rota SVG animada ───────────────────────────── */
function RouteMap() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '620px', margin: '0 auto' }}>
      <svg viewBox="0 0 620 60" width="100%" style={{ overflow: 'visible' }}>
        {/* Trilha da rota */}
        <path
          d="M 20 35 Q 80 20 140 30 Q 200 42 260 28 Q 320 14 380 26 Q 440 38 500 22 Q 560 10 600 28"
          fill="none"
          stroke="rgba(244,162,97,0.15)"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <path
          className="route-line"
          d="M 20 35 Q 80 20 140 30 Q 200 42 260 28 Q 320 14 380 26 Q 440 38 500 22 Q 560 10 600 28"
          fill="none"
          stroke="url(#routeGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <defs>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#22c55e" stopOpacity="0.9" />
            <stop offset="33%"  stopColor="#2dd4bf" stopOpacity="0.9" />
            <stop offset="66%"  stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f87171" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Pontos dos países com pulse */}
        {[
          { cx: 20,  cy: 35, label: 'Porto Murtinho', color: '#22c55e' },
          { cx: 200, cy: 42, label: 'Asunción',       color: '#2dd4bf' },
          { cx: 400, cy: 26, label: 'Mendoza',        color: '#60a5fa' },
          { cx: 600, cy: 28, label: 'Iquique',        color: '#f87171' },
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.cx} cy={p.cy} r="8" fill={p.color} opacity="0.12"
              style={{ animation: `pulse-dot ${1.5 + i * 0.3}s ease-in-out infinite`, animationDelay: `${2 + i * 0.2}s` }} />
            <circle cx={p.cx} cy={p.cy} r="4" fill={p.color} opacity="0.7" />
            <circle cx={p.cx} cy={p.cy} r="2" fill={p.color} />
          </g>
        ))}
      </svg>

      {/* Labels dos países */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '6px',
        paddingLeft: '4px',
        paddingRight: '4px',
      }}>
        {['🇧🇷 Brasil', '🇵🇾 Paraguai', '🇦🇷 Argentina', '🇨🇱 Chile'].map((c, i) => (
          <span key={i} style={{
            fontSize: '10px',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.08em',
            fontWeight: 600,
          }}>{c}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Canvas de partículas ─────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; twinkle: number; dir: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.6 + 0.2,
        twinkle: Math.random() * 0.015 + 0.004,
        dir: 1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.opacity += p.twinkle * p.dir;
        if (p.opacity > 0.85 || p.opacity < 0.1) p.dir *= -1;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        // Forma de losango alongado — estrela
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = `rgba(244,162,97,${p.opacity})`;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 2);
        ctx.lineTo(p.size * 0.5, 0);
        ctx.lineTo(0, p.size * 2);
        ctx.lineTo(-p.size * 0.5, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }}
    />
  );
}

/* ─── HERO PRINCIPAL ────────────────────────────────────────── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 600], [0, 80]);
  const contentY = useTransform(scrollY, [0, 600], [0, -60]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { icon: MapPin,   value: 3500,  suffix: 'km',    label: 'de travessia continental', color: '#F4A261' },
    { icon: Globe,    value: 4,     suffix: '',      label: 'países integrados',         color: '#2dd4bf' },
    { icon: Mountain, value: 12,    suffix: '',      label: 'cidades de cultura viva',   color: '#60a5fa' },
    { icon: Award,    value: 1,     suffix: '',      label: 'Patrimônio UNESCO',         color: '#E9C46A', text: 'UNESCO' },
  ];

  const birds = [
    { top: '22%', animationDelay: '0s',    animationDuration: '18s' },
    { top: '18%', animationDelay: '4s',    animationDuration: '22s' },
    { top: '28%', animationDelay: '8s',    animationDuration: '16s' },
    { top: '15%', animationDelay: '12s',   animationDuration: '20s' },
    { top: '32%', animationDelay: '6s',    animationDuration: '25s' },
    { top: '12%', animationDelay: '15s',   animationDuration: '19s' },
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#020d1a',
      }}
    >
      {/* ── Vídeo de fundo com parallax ── */}
      <motion.div style={{ y: videoY, position: 'absolute', inset: '-10% 0 -10% 0', zIndex: 0 }}>
        <video
          autoPlay muted loop playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.45) saturate(1.2)' }}
          src="/hero-bridge.mp4"
        />
      </motion.div>

      {/* ── Overlay multicamada ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(180deg, rgba(2,13,26,0.75) 0%, rgba(2,13,26,0.15) 35%, rgba(2,13,26,0.15) 60%, rgba(2,13,26,0.92) 100%)',
      }} />

      {/* Overlay lateral esquerda (profundidade) */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(90deg, rgba(2,13,26,0.5) 0%, transparent 40%, transparent 100%)',
      }} />

      {/* ── Névoa 1 ── */}
      <div className="hero-fog-1" style={{
        position: 'absolute', bottom: 0, left: '-10%', right: '-10%', height: '45%', zIndex: 3,
        background: 'linear-gradient(to top, rgba(6,27,51,0.85) 0%, rgba(42,157,143,0.06) 60%, transparent 100%)',
        transformOrigin: 'center bottom',
      }} />

      {/* ── Névoa 2 (mais sutil, layer acima) ── */}
      <div className="hero-fog-2" style={{
        position: 'absolute', bottom: 0, left: '-5%', right: '-5%', height: '30%', zIndex: 4,
        background: 'linear-gradient(to top, rgba(2,13,26,0.7) 0%, rgba(31,122,140,0.04) 70%, transparent 100%)',
        transformOrigin: 'center bottom',
      }} />

      {/* ── Pássaros migrando ── */}
      {birds.map((b, i) => (
        <Bird
          key={i}
          style={{
            top: b.top,
            left: 0,
            zIndex: 6,
            animation: `bird-fly ${b.animationDuration} linear infinite`,
            animationDelay: b.animationDelay,
          }}
        />
      ))}

      {/* ── Partículas ── */}
      <ParticleCanvas />

      {/* ── Conteúdo principal ── */}
      <motion.div
        style={{ y: contentY, opacity, position: 'relative', zIndex: 20, width: '100%' }}
      >
        <div className="container-rota" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '8px 20px', borderRadius: '100px',
                background: 'rgba(244,162,97,0.1)',
                border: '1px solid rgba(244,162,97,0.3)',
                backdropFilter: 'blur(12px)',
                marginBottom: '32px',
              }}
            >
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: '#F4A261',
                boxShadow: '0 0 12px rgba(244,162,97,0.8)',
                animation: 'pulse-dot 2s ease-in-out infinite',
                flexShrink: 0,
              }} />
              <span style={{
                fontSize: '11px', fontWeight: 700, color: '#F4A261',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}>
                Rota Bioceânica · 4 Países · 3.500 km
              </span>
            </motion.div>

            {/* Título linha 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(4rem, 11vw, 8rem)',
                lineHeight: 0.95,
                color: '#F8FAFC',
                letterSpacing: '0.04em',
                marginBottom: '0',
              }}>
                A PONTE ENTRE
              </h1>
            </motion.div>

            {/* Título linha 2 — gradiente âmbar shimmering */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h1
                className="hero-title-gradient"
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(4rem, 11vw, 8rem)',
                  lineHeight: 0.95,
                  letterSpacing: '0.04em',
                  marginBottom: '24px',
                }}
              >
                DOIS OCEANOS
              </h1>
            </motion.div>

            {/* Subtítulo serif */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{
                fontFamily: '"Lora", Georgia, serif',
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.7,
                maxWidth: '580px',
                margin: '0 auto 40px',
              }}
            >
              Do Pantanal ao Pacífico — a maior integração continental da América do Sul
            </motion.p>

            {/* Argolas da rota */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              style={{ marginBottom: '40px' }}
            >
              <RotaRings />
            </motion.div>

            {/* Mapa da rota animado */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
              style={{ marginBottom: '44px', padding: '0 12px' }}
            >
              <RouteMap />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '64px' }}
            >
              <a href="#cidades" className="btn-amber">
                <span>Explorar as Cidades</span>
                <ArrowRight size={16} />
              </a>
              <a href="#rota" className="btn-ghost">
                <Play size={14} />
                <span>Conheça a Rota</span>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.9 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
                maxWidth: '720px',
                margin: '0 auto',
              }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 2.1 + i * 0.1 }}
                  className="glass-card"
                  style={{ padding: '20px 12px', textAlign: 'center' }}
                >
                  <stat.icon
                    size={18}
                    style={{ color: stat.color, margin: '0 auto 10px', display: 'block' }}
                  />
                  <div style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                    color: '#F8FAFC',
                    letterSpacing: '0.04em',
                    lineHeight: 1,
                    marginBottom: '6px',
                  }}>
                    {stat.text ? stat.text : (
                      statsVisible ? (
                        <CountUp
                          end={stat.value}
                          duration={2}
                          suffix={stat.suffix}
                          separator="."
                        />
                      ) : '0'
                    )}
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '0.06em',
                    lineHeight: 1.4,
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        style={{
          position: 'absolute', bottom: '32px', left: '50%',
          transform: 'translateX(-50%)', zIndex: 20,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        }}
      >
        <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>scroll</span>
        <div style={{
          width: '22px', height: '36px', borderRadius: '11px',
          border: '1.5px solid rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '5px',
        }}>
          <div className="scroll-hint-dot" style={{
            width: '5px', height: '5px', borderRadius: '50%',
            background: 'rgba(244,162,97,0.7)',
          }} />
        </div>
      </motion.div>

      {/* ── Gradiente inferior (blend com próxima seção) ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', zIndex: 15,
        background: 'linear-gradient(to bottom, transparent, #061B33)',
        pointerEvents: 'none',
      }} />
    </section>
  );
}
