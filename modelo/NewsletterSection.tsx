import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section style={{
      background: 'linear-gradient(135deg, #020d1a 0%, #061B33 50%, #0B2E4F 100%)',
      padding: '100px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow background */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(244,162,97,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-rota" style={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'rgba(244,162,97,0.12)',
            border: '1px solid rgba(244,162,97,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <Mail size={22} style={{ color: '#F4A261' }} />
          </div>

          <span style={{
            display: 'inline-block', fontSize: '11px', fontWeight: 700,
            color: '#F4A261', letterSpacing: '0.2em', textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif', marginBottom: '16px',
          }}>
            Newsletter
          </span>

          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            color: '#F8FAFC', lineHeight: 1, letterSpacing: '0.04em',
            marginBottom: '16px',
          }}>
            FIQUE POR DENTRO<br />
            <span style={{ color: '#F4A261' }}>DA ROTA</span>
          </h2>

          <p style={{
            fontFamily: '"Lora", Georgia, serif',
            fontSize: '1rem', fontStyle: 'italic',
            color: 'rgba(255,255,255,0.45)', lineHeight: 1.7,
            marginBottom: '40px',
          }}>
            Receba as últimas novidades sobre investimentos, cidades e oportunidades da Rota Bioceânica.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                padding: '20px 32px', borderRadius: '16px',
                background: 'rgba(42,157,143,0.1)', border: '1px solid rgba(42,157,143,0.3)',
              }}
            >
              <CheckCircle size={20} style={{ color: '#2A9D8F' }} />
              <span style={{ color: '#2A9D8F', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                Inscrição realizada com sucesso!
              </span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Seu melhor email"
                required
                style={{
                  flex: 1, minWidth: '240px',
                  padding: '14px 20px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#F8FAFC', fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(244,162,97,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
              />
              <button type="submit" className="btn-amber" style={{ flexShrink: 0 }}>
                Inscrever-se <ArrowRight size={14} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
