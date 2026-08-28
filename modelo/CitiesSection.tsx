import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

const cities = [
  {
    name: 'Porto Murtinho',
    country: 'Brasil 🇧🇷',
    state: 'Mato Grosso do Sul',
    tagline: 'A Guardiã do Rio Paraguai',
    desc: 'Porta de entrada da rota bioceânica pelo Brasil. Pantanal, Toro Candil e a histórica travessia do Rio Paraguai.',
    href: '/cidades/porto-murtinho',
    accent: '#F4A261',
    pop: '12.859',
  },
  {
    name: 'Campo Grande',
    country: 'Brasil 🇧🇷',
    state: 'Mato Grosso do Sul',
    tagline: 'A Capital Morena',
    desc: 'Hub logístico e cultural do corredor. Gastronomia plural, Bioparque Pantanal e a energia de uma capital em expansão.',
    href: '/cidades/campo-grande',
    accent: '#2A9D8F',
    pop: '906.092',
  },
  {
    name: 'Bonito',
    country: 'Brasil 🇧🇷',
    state: 'Mato Grosso do Sul',
    tagline: 'Ecoturismo Classe Mundial',
    desc: 'Rios de visibilidade cristalina, grutas e cachoeiras. Referência global em turismo sustentável e responsável.',
    href: '/cidades/bonito',
    accent: '#E9C46A',
    pop: '21.368',
  },
  {
    name: 'Concepción',
    country: 'Paraguai 🇵🇾',
    state: 'Concepción',
    tagline: 'A Capital do Norte',
    desc: 'Cidade histórica às margens do Rio Paraguai, ponto estratégico de cruzamento para a rota no Chaco profundo.',
    href: '/cidades',
    accent: '#60a5fa',
    pop: '93.000',
  },
];

export default function CitiesSection() {
  return (
    <section id="cidades" style={{ background: '#F8FAFC', padding: '100px 0' }}>
      <div className="container-rota">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: '560px', marginBottom: '56px' }}
        >
          <span style={{
            display: 'inline-block', fontSize: '11px', fontWeight: 700,
            color: '#F4A261', letterSpacing: '0.2em', textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif', marginBottom: '14px',
            background: 'rgba(244,162,97,0.1)', padding: '4px 12px', borderRadius: '100px',
          }}>
            Destinos da Rota
          </span>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            color: '#061B33', lineHeight: 1, letterSpacing: '0.04em',
            marginBottom: '16px',
          }}>
            CIDADES QUE<br />
            <span style={{ color: '#2A9D8F' }}>CONTAM HISTÓRIAS</span>
          </h2>
          <p style={{
            fontSize: '15px', color: '#64748b', lineHeight: 1.7,
            fontFamily: 'Inter, sans-serif',
          }}>
            Cada ponto da rota é um universo de cultura, natureza e oportunidade. Conheça os destinos que fazem dessa travessia uma experiência única.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {cities.map((city, i) => (
            <motion.a
              key={i}
              href={city.href}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              style={{
                display: 'block', textDecoration: 'none',
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'all 0.35s ease',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 20px 40px rgba(0,0,0,0.1), 0 0 0 2px ${city.accent}30`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
              }}
            >
              {/* Color bar */}
              <div style={{ height: '4px', background: `linear-gradient(90deg, ${city.accent}, ${city.accent}88)` }} />
              
              <div style={{ padding: '28px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                  <MapPin size={12} style={{ color: city.accent, flexShrink: 0 }} />
                  <span style={{
                    fontSize: '11px', fontWeight: 600, color: '#94a3b8',
                    fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}>
                    {city.country} · {city.state}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.8rem', color: '#061B33',
                  letterSpacing: '0.04em', lineHeight: 1, marginBottom: '6px',
                }}>
                  {city.name}
                </h3>

                <p style={{
                  fontSize: '12px', color: city.accent, fontWeight: 600,
                  fontFamily: 'Inter, sans-serif', fontStyle: 'italic',
                  marginBottom: '12px',
                }}>
                  {city.tagline}
                </p>

                <p style={{
                  fontSize: '13px', color: '#64748b', lineHeight: 1.65,
                  fontFamily: 'Inter, sans-serif', marginBottom: '20px',
                }}>
                  {city.desc}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontSize: '11px', color: '#94a3b8',
                    fontFamily: 'Inter, sans-serif',
                  }}>
                    {city.pop} hab.
                  </span>
                  <span style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    fontSize: '12px', fontWeight: 700, color: city.accent,
                    fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}>
                    Explorar <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA ver todas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: '48px' }}
        >
          <a href="/cidades" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '14px 32px', borderRadius: '12px',
            border: '2px solid #2A9D8F', color: '#2A9D8F',
            fontWeight: 700, fontSize: '13px', fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            textDecoration: 'none', transition: 'all 0.3s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#2A9D8F'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#2A9D8F'; }}
          >
            Ver todas as cidades <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
