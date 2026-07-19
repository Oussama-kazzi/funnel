import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { useLang } from '../i18n/context'

/* ── Brand / concept icons (official brand marks) ── */
const icons = {
  framer: (
    <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
      <path d="M4 2h16v6.667H12L4 2zm0 6.667h8L20 15.333h-8V22l-8-6.667V8.667z" fill="#0055FF" />
    </svg>
  ),
  wordpress: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="#21759B" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM3.01 12c0-1.3.28-2.54.78-3.65l4.29 11.75A8.99 8.99 0 013.01 12zm8.99 8.99c-.88 0-1.73-.13-2.53-.37l2.69-7.81 2.75 7.54c.02.04.04.09.06.12-.93.33-1.93.52-2.97.52zm1.24-13.21c.54-.03 1.03-.09 1.03-.09.48-.06.43-.77-.06-.74 0 0-1.46.11-2.4.11-.88 0-2.37-.11-2.37-.11-.48-.03-.54.71-.05.74 0 0 .46.06.95.09l1.41 3.87-1.99 5.96-3.31-9.83c.54-.03 1.03-.09 1.03-.09.48-.06.43-.77-.06-.74 0 0-1.46.11-2.4.11-.17 0-.37 0-.58-.01A8.98 8.98 0 0112 3.01c2.34 0 4.47.89 6.07 2.36-.04 0-.08-.01-.12-.01-.88 0-1.51.77-1.51 1.6 0 .74.43 1.37.88 2.11.34.6.74 1.37.74 2.48 0 .77-.3 1.66-.68 2.91l-.9 2.99-3.24-9.68zm2.51 11.31l2.74-7.93c.51-1.28.68-2.31.68-3.22 0-.33-.02-.64-.06-.93A8.95 8.95 0 0121 12a8.98 8.98 0 01-4.25 7.64z"/>
    </svg>
  ),
  webflow: (
    <svg viewBox="0 0 129.9 81" width="34" height="34" fill="#146EF5" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M129.9,0L88.4,81H49.5l17.3-33.6h-0.8C51.8,66,30.4,78.2,0,81V47.9c0,0,19.5-1.1,30.9-13.2H0V0h34.7v28.6l0.8,0L49.7,0h26.3v28.4l0.8,0L91.4,0H129.9z"/>
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
  const { t } = useLang()

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
          background: 'radial-gradient(ellipse at 70% 20%, rgba(204,243,6,0.18), transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Header row */}
        <div className="tech-head" style={{
          display: 'flex', justifyContent: 'space-between', gap: 40,
          flexWrap: 'wrap', marginBottom: 48, position: 'relative', zIndex: 1,
        }}>
          <div style={{ maxWidth: 460 }}>
            <p style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#1A1526', marginBottom: 18 }}>
              {t('Technologies')}
            </p>
            <h2 style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 'clamp(24px, 5.5vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#1A1526', lineHeight: 1.12, margin: 0 }}>
              {t('Nous utilisons les meilleures technologies pour votre projet.')}
            </h2>
          </div>
          <p style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 15, color: 'rgba(26,21,38,0.72)', lineHeight: 1.7, maxWidth: 380, alignSelf: 'flex-end' }}>
            {t('Chaque projet est unique. Nous choisissons la technologie la plus adaptée à vos objectifs, votre budget et vos besoins.')}
          </p>
        </div>

        {/* Tech grid */}
        <div className="tech-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 0, position: 'relative', zIndex: 1,
        }}>
          {techs.map((tech, i) => (
            <div key={tech.key} className="tech-item" style={{
              padding: '0 24px',
              borderLeft: i === 0 ? 'none' : '1px solid rgba(26,21,38,0.09)',
            }}>
              <div style={{ marginBottom: 20 }}>{icons[tech.key]}</div>
              <h3 style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 17, fontWeight: 700, color: '#1A1526', letterSpacing: '-0.02em', marginBottom: 12 }}>
                {t(tech.name)}
              </h3>
              <p style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 13, color: 'rgba(26,21,38,0.72)', lineHeight: 1.6, margin: 0 }}>
                {t(tech.desc)}
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
