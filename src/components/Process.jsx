import { useRef, useState, useEffect } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

function StepIcon({ i }) {
  const p = { width: 20, height: 20, fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const paths = [
    <svg key="0" viewBox="0 0 24 24" {...p}><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    <svg key="1" viewBox="0 0 24 24" {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    <svg key="2" viewBox="0 0 24 24" {...p}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>,
    <svg key="3" viewBox="0 0 24 24" {...p}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    <svg key="4" viewBox="0 0 24 24" {...p}><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.8a2 2 0 00-3 0z"/><path d="M12 15l-3-3a22 22 0 015-9 12.4 12.4 0 015 5 22 22 0 01-9 5z"/></svg>,
    <svg key="5" viewBox="0 0 24 24" {...p}><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
  ]
  return paths[i] || paths[0]
}

const steps = [
  { num: '01', title: 'Comprendre', desc: 'Nous analysons votre activité, vos objectifs et vos besoins pour poser les bonnes bases.', time: 'Étape 1' },
  { num: '02', title: 'Structurer', desc: 'Nous définissons l’architecture, le parcours utilisateur et les éléments clés de conversion.', time: 'Étape 2' },
  { num: '03', title: 'Concevoir', desc: 'Nous créons un design moderne, cohérent et centré sur vos utilisateurs.', time: 'Étape 3' },
  { num: '04', title: 'Développer', desc: 'Nous développons un site rapide, sécurisé et optimisé sur tous les appareils.', time: 'Étape 4' },
  { num: '05', title: 'Lancer', desc: 'Nous testons, ajustons et mettons en ligne votre projet avec tous les outils nécessaires.', time: 'Étape 5' },
  { num: '06', title: 'Optimiser', desc: 'Nous analysons les résultats et améliorons continuellement vos performances.', time: 'Étape 6' },
]

export default function Process() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id="process" style={{ padding: '104px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          marginBottom: 56, textAlign: 'center',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 1s ${EASE}, transform 1s ${EASE}`,
          willChange: 'transform, opacity',
        }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#8B5CF6', marginBottom: 16 }}>
            Notre processus
          </p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(30px, 4.2vw, 48px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#FFFFFF', lineHeight: 1.08, margin: 0, maxWidth: 640 }}>
            Une approche claire. Un processus simple.
          </h2>
        </div>

        <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0, position: 'relative' }}>
          <div className="process-line" style={{
            position: 'absolute',
            top: 22, left: '8.3%', right: '8.3%',
            height: 1, background: 'rgba(255,255,255,0.08)', zIndex: 0,
            opacity: visible ? 1 : 0,
            transition: `opacity 1.2s ${EASE} 0.25s`,
          }} />

          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                padding: '0 16px 0 0',
                position: 'relative', zIndex: 1,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.9s ${EASE} ${0.15 + i * 0.1}s, transform 0.9s ${EASE} ${0.15 + i * 0.1}s`,
                willChange: 'transform, opacity',
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'rgba(139,92,246,0.12)',
                border: '1px solid rgba(139,92,246,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#8B5CF6',
                marginBottom: 22,
              }}>
                <StepIcon i={i} />
              </div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: 8 }}>
                {s.num.replace(/^0/, '')}. {s.title}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #process .process-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 40px 0 !important; }
          #process .process-line { display: none !important; }
        }
        @media (max-width: 768px) {
          #process { padding: 56px 20px 48px !important; }
          #process > div > div:first-child { margin-bottom: 48px !important; }
          #process .process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 32px 0 !important;
          }
        }
        @media (max-width: 480px) {
          #process { padding: 48px 16px 40px !important; }
          #process .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
