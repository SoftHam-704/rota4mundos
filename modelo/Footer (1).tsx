import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Globe, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#020d1a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container-rota" style={{ padding: '64px 1.5rem 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '48px',
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <img src="/logo-icon.png" alt="Logo" style={{ height: '32px', width: '32px', objectFit: 'contain' }} />
              <span style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700, fontSize: '16px', color: '#F8FAFC',
              }}>
                Rota 4 Mundos
              </span>
            </div>
            <p style={{
              fontSize: '13px', color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.7, fontFamily: 'Inter, sans-serif', marginBottom: '20px',
            }}>
              Conectando o Brasil ao Pacífico através de um corredor estratégico de desenvolvimento e investimentos.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['🇧🇷', '🇵🇾', '🇦🇷', '🇨🇱'].map((flag, i) => (
                <span key={i} style={{ fontSize: '18px' }}>{flag}</span>
              ))}
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h4 style={{
              fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif', marginBottom: '20px',
            }}>
              Navegação
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Início', 'Cidades', 'Notícias'].map((item, i) => (
                <li key={i}>
                  <a href="/" style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    fontSize: '13px', color: 'rgba(255,255,255,0.4)',
                    textDecoration: 'none', fontFamily: 'Inter, sans-serif',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F4A261')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                  >
                    {item} <ArrowUpRight size={10} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 style={{
              fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif', marginBottom: '20px',
            }}>
              Contato
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: Mail, text: 'contato@rota4mundos.com' },
                { icon: Phone, text: '+55 (67) 3613-5600' },
                { icon: MapPin, text: 'Campo Grande, MS — Brasil' },
                { icon: Globe, text: 'rota4mundos.com' },
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <item.icon size={13} style={{ color: '#F4A261', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif' }}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', fontFamily: 'Inter, sans-serif' }}>
            © {new Date().getFullYear()} Portal da Rota Bioceânica. Todos os direitos reservados.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Termos de Uso', 'Privacidade'].map((item, i) => (
              <a key={i} href="/" style={{
                fontSize: '11px', color: 'rgba(255,255,255,0.2)',
                textDecoration: 'none', fontFamily: 'Inter, sans-serif',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
