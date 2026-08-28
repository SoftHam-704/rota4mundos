import { motion } from 'framer-motion';
import { TrendingUp, Shield, Globe, Zap } from 'lucide-react';

const pillars = [
  {
    icon: TrendingUp,
    color: '#F4A261',
    title: 'Corredor Logístico',
    desc: '3.500 km de infraestrutura conectando o Atlântico ao Pacífico — reduzindo até 30% nos custos de exportação sul-americana.',
    badge: 'Infraestrutura',
  },
  {
    icon: Globe,
    color: '#2A9D8F',
    title: 'Integração Continental',
    desc: 'Brasil, Paraguai, Argentina e Chile unidos por uma rota de desenvolvimento econômico e cultural sem precedentes.',
    badge: '4 Países',
  },
  {
    icon: Shield,
    color: '#E9C46A',
    title: 'Segurança Jurídica',
    desc: 'Acordos bilaterais e marcos regulatórios consolidados para investimentos em infraestrutura, comércio e turismo.',
    badge: 'Regulado',
  },
  {
    icon: Zap,
    color: '#E76F51',
    title: 'Oportunidades Reais',
    desc: 'Agronegócio, mineração, turismo e tecnologia — setores em expansão ao longo de todo o corredor bioceânico.',
    badge: 'Alta demanda',
  },
];

export default function InvestmentSection() {
  return (
    <section id="rota" style={{ background: '#061B33', padding: '100px 0' }}>
      <div className="container-rota">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 64px' }}
        >
          <span style={{
            display: 'inline-block', fontSize: '11px', fontWeight: 700,
            color: '#F4A261', letterSpacing: '0.2em', textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif', marginBottom: '16px',
          }}>
            Por que investir na Rota
          </span>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            color: '#F8FAFC', lineHeight: 1, letterSpacing: '0.04em',
            marginBottom: '16px',
          }}>
            O MAIOR CORREDOR<br />
            <span style={{ color: '#F4A261' }}>DA AMÉRICA DO SUL</span>
          </h2>
          <p style={{
            fontFamily: '"Lora", Georgia, serif',
            fontSize: '1.05rem', fontStyle: 'italic',
            color: 'rgba(255,255,255,0.5)', lineHeight: 1.7,
          }}>
            Uma obra de integração continental que abre novos mercados e transforma economias regionais.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
        }}>
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid rgba(255,255,255,0.07)`,
                borderRadius: '20px',
                padding: '32px 28px',
                borderTop: `3px solid ${p.color}`,
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              whileHover={{ y: -4, background: 'rgba(255,255,255,0.07)' }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: `${p.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <p.icon size={22} style={{ color: p.color }} />
              </div>
              <span style={{
                display: 'inline-block', fontSize: '10px', fontWeight: 700,
                color: p.color, letterSpacing: '0.15em', textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif', marginBottom: '10px',
                background: `${p.color}18`, padding: '3px 10px', borderRadius: '100px',
              }}>
                {p.badge}
              </span>
              <h3 style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1.6rem', color: '#F8FAFC',
                letterSpacing: '0.04em', marginBottom: '12px',
              }}>
                {p.title}
              </h3>
              <p style={{
                fontSize: '13px', color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.7, fontFamily: 'Inter, sans-serif',
              }}>
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            marginTop: '60px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          {[
            { value: 'US$ 2.4bi', label: 'em investimentos previstos' },
            { value: '30%', label: 'redução no custo de exportação' },
            { value: '15M', label: 'pessoas beneficiadas' },
            { value: '2026', label: 'operação plena prevista' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '28px 24px', background: '#061B33',
              textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <div style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '2rem', color: '#F4A261',
                letterSpacing: '0.04em', marginBottom: '6px',
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: '11px', color: 'rgba(255,255,255,0.35)',
                fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
