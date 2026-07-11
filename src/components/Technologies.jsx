import { useRef } from 'react'
import { useInView } from 'framer-motion'

/* ── Brand / concept icons ── */
const icons = {
  framer: (
    <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
      <path d="M6 2h12v6h-6z" fill="#1A1526" />
      <path d="M6 8h12l-6 6H6z" fill="#1A1526" />
      <path d="M6 14h6v6z" fill="#1A1526" />
    </svg>
  ),
  wordpress: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="#1A1526" aria-hidden="true">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 1.4a8.6 8.6 0 016.9 3.5h-.2c-.8 0-1.4.7-1.4 1.5 0 .7.4 1.3.9 2 .4.6.7 1.3.7 2.4 0 .8-.3 1.8-.7 3l-.9 3.1-3.4-10c.6-.1 1.1-.1 1.1-.1.5 0 .5-.7-.1-.7 0 0-1.4.1-2.4.1-.8 0-2.3-.1-2.3-.1-.5-.1-.6.7-.1.7 0 0 .5 0 1 .1l1.5 4-2 6.1-3.4-10c.6 0 1.1-.1 1.1-.1.5 0 .4-.8-.1-.7 0 0-1.4.1-2.4.1l-.5-.1A8.6 8.6 0 0112 3.4zM3.9 9.3l4.1 11.2A8.6 8.6 0 013.9 9.3zm12.3 11a8.6 8.6 0 004.3-7.4c0-1-.2-1.9-.5-2.7l.1 1z"/>
    </svg>
  ),
  webflow: (
    <svg viewBox="0 0 24 24" width="34" height="34" fill="#1A1526" aria-hidden="true">
      <path d="M22 5l-5.3 14h-4.4l-2.4-7-2.4 7H3.1L2 5h4.2l1 8 2.5-8h3.7l2.4 8 1.1-8z"/>
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#1A1526" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#1A1526" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z"/>
      <circle cx="19" cy="19" r="2"/>
    </svg>
  ),
}

const techs = [
  { key: 'framer',    name: 'Framer',                 desc: 'Idéal pour des landing pages modernes, rapides et animées.' },
  { key: 'wordpress', name: 'WordPress',              desc: 'Parfait pour les sites vitrines, blogs et projets à fort contenu.' },
  { key: 'webflow',   name: 'Webflow',                desc: 'Excellent pour des sites visuels, puissants et faciles à administrer.' },
  { key: 'code',      name: 'Développement sur mesure', desc: 'Des solutions 100% personnalisées pour des projets complexes.' },
  { key: 'ai',        name: 'Automatisation & IA',    desc: 'Pour optimiser vos processus, automatiser vos tâches et booster votre productivité.' },
]

export default function Technologies() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="technologies" className="tech-section" style={{ padding: '40px 32px 96px' }}>
      <div
        ref={ref}
        className="tech-card"
        style={{
          maxWidth: 1200, margin: '0 auto',
          background: '#FFFFFF',
          border: '1px solid rgba(26,21,38,0.08)',
          boxShadow: '0 20px 60px rgba(20,16,25,0.08)',
          borderRadius: 24,
          padding: 'clamp(36px, 5vw, 64px)',
          position: 'relative',
          overflow: 'hidden',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Ambient violet glow */}
        <div style={{
          position: 'absolute', top: '-30%', right: '-10%',
          width: '55%', height: '90%',
          background: 'radial-gradient(ellipse at 70% 20%, rgba(254,210,75,0.18), transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Header row */}
        <div className="tech-head" style={{
          display: 'flex', justifyContent: 'space-between', gap: 40,
          flexWrap: 'wrap', marginBottom: 48, position: 'relative', zIndex: 1,
        }}>
          <div style={{ maxWidth: 460 }}>
            <p style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#1A1526', marginBottom: 18 }}>
              Technologies
            </p>
            <h2 style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 'clamp(24px, 5.5vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#1A1526', lineHeight: 1.12, margin: 0 }}>
              Nous utilisons les meilleures technologies pour votre projet.
            </h2>
          </div>
          <p style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 15, color: 'rgba(26,21,38,0.72)', lineHeight: 1.7, maxWidth: 380, alignSelf: 'flex-end' }}>
            Chaque projet est unique. Nous choisissons la technologie la plus adaptée à vos objectifs, votre budget et vos besoins.
          </p>
        </div>

        {/* Tech grid */}
        <div className="tech-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 0, position: 'relative', zIndex: 1,
        }}>
          {techs.map((t, i) => (
            <div key={t.key} className="tech-item" style={{
              padding: '0 24px',
              borderLeft: i === 0 ? 'none' : '1px solid rgba(26,21,38,0.09)',
            }}>
              <div style={{ marginBottom: 20 }}>{icons[t.key]}</div>
              <h3 style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 17, fontWeight: 700, color: '#1A1526', letterSpacing: '-0.02em', marginBottom: 12 }}>
                {t.name}
              </h3>
              <p style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 13, color: 'rgba(26,21,38,0.72)', lineHeight: 1.6, margin: 0 }}>
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .tech-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px 0 !important; }
          .tech-item { border-left: none !important; padding: 0 20px !important; }
          .tech-item:nth-child(odd) { padding-left: 0 !important; }
        }
        @media (max-width: 768px) {
          .tech-section { padding: 24px 20px 72px !important; }
          .tech-card { padding: 32px 24px !important; }
          .tech-head { margin-bottom: 32px !important; gap: 16px !important; }
        }
        @media (max-width: 520px) {
          .tech-grid { grid-template-columns: 1fr !important; gap: 26px 0 !important; }
          .tech-item { padding: 0 !important; }
        }
      `}</style>
    </section>
  )
}
