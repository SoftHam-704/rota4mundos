import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/cidades', label: 'Cidades' },
  { to: '/noticias', label: 'Notícias' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => location === path;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.5s ease',
        background: scrolled
          ? 'rgba(6,27,51,0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
      }}
    >
      <div className="container-rota">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          
          {/* Logo */}
          <Link href="/">
            <a style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', cursor: 'pointer' }}>
              <img src="/logo-icon.png" alt="Rota 4 Mundos" style={{ height: '36px', width: '36px', objectFit: 'contain' }} />
              <div style={{ display: 'none' }} className="sm-block">
                <span style={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700, fontSize: '18px',
                  color: '#F8FAFC', lineHeight: 1.1,
                }}>
                  Rota 4 Mundos
                </span>
                <span style={{
                  display: 'block', fontSize: '9px', fontWeight: 600,
                  color: 'rgba(255,255,255,0.35)', letterSpacing: '0.2em',
                  textTransform: 'uppercase', fontFamily: 'Inter, sans-serif',
                }}>
                  Bioceanic Route
                </span>
              </div>
            </a>
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {navLinks.map(link => (
              <Link key={link.to} href={link.to}>
                <a style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.25s',
                  fontFamily: 'Inter, sans-serif',
                  color: isActive(link.to) ? '#F4A261' : 'rgba(255,255,255,0.7)',
                  background: isActive(link.to) ? 'rgba(244,162,97,0.12)' : 'transparent',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => { if (!isActive(link.to)) (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.07)'; }}
                  onMouseLeave={e => { if (!isActive(link.to)) { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)'; (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; } }}
                >
                  {link.label}
                </a>
              </Link>
            ))}

            {/* Idioma */}
            <div style={{ position: 'relative', marginLeft: '8px' }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 12px', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
                  fontSize: '12px', fontWeight: 600, fontFamily: 'Inter, sans-serif',
                }}
              >
                <Globe size={14} />
                <span>PT</span>
                <ChevronDown size={12} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    style={{
                      position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                      background: '#0B2E4F', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px', overflow: 'hidden', minWidth: '120px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    }}
                  >
                    {[{ code: 'pt', label: 'Português', flag: '🇧🇷' }, { code: 'en', label: 'English', flag: '🇺🇸' }, { code: 'es', label: 'Español', flag: '🇪🇸' }].map(l => (
                      <button key={l.code} onClick={() => setLangOpen(false)}
                        style={{
                          width: '100%', padding: '10px 16px', textAlign: 'left',
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: 'rgba(255,255,255,0.7)', fontSize: '13px',
                          fontFamily: 'Inter, sans-serif', display: 'flex', gap: '8px',
                        }}>
                        <span>{l.flag}</span><span>{l.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA entrar */}
            <Link href="/login">
              <a style={{
                marginLeft: '8px', padding: '9px 20px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #F4A261, #E9C46A)',
                color: '#061B33', fontWeight: 700, fontSize: '13px',
                textDecoration: 'none', fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.03em',
                boxShadow: '0 4px 20px rgba(244,162,97,0.3)',
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}>
                Entrar
              </a>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', color: '#F8FAFC', cursor: 'pointer', padding: '8px' }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'rgba(6,27,51,0.98)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="container-rota" style={{ paddingTop: '16px', paddingBottom: '24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navLinks.map(link => (
                <Link key={link.to} href={link.to}>
                  <a
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block', padding: '12px 16px', borderRadius: '10px',
                      color: isActive(link.to) ? '#F4A261' : 'rgba(255,255,255,0.75)',
                      background: isActive(link.to) ? 'rgba(244,162,97,0.1)' : 'transparent',
                      textDecoration: 'none', fontSize: '15px', fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
