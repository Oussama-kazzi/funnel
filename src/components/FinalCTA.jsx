import { useRef, useState, useEffect } from 'react'
import TextType from './TextType'
import Questionnaire from './Questionnaire'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

export default function FinalCTA({ onCTA }) {
  const [visible, setVisible] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const formRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  /* Smooth-scroll the form into view after it appears */
  const handleOpen = () => {
    setShowForm(true)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  const perks = [
    { title: 'Réponse rapide', sub: 'Sous 24h ouvrées' },
    { title: 'Appel gratuit', sub: 'Sans engagement' },
    { title: 'Solutions sur mesure', sub: 'Adaptées à vos objectifs' },
  ]

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="finalcta-section"
      style={{
        padding: '100px 32px 96px',
        background: 'transparent',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* CTA panel */}
      <div
        className="cta-panel"
        style={{
          maxWidth: 1040, margin: '0 auto', position: 'relative', zIndex: 1,
          borderRadius: 32,
          padding: 'clamp(48px, 6vw, 88px) clamp(24px, 5vw, 72px)',
          overflow: 'hidden',
          background: '#CCF306',
          border: '1px solid rgba(204,243,6,0.4)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translate3d(0,0,0)' : 'translate3d(0,32px,0)',
          transition: `opacity 1s ${EASE}, transform 1s ${EASE}`,
        }}
      >
        {/* Ambient glows inside the panel */}
        <div style={{
          position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)',
          width: '80%', height: '90%',
          background: 'radial-gradient(ellipse at 50% 30%, rgba(204,243,6,0.35), transparent 62%)',
          filter: 'blur(20px)', pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0.4,
          backgroundImage: 'linear-gradient(rgba(26,21,38,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,21,38,0.05) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, #000 30%, transparent 75%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        {!showForm && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            padding: '7px 16px', marginBottom: 26,
            background: 'rgba(26,21,38,0.08)',
            border: '1px solid rgba(26,21,38,0.18)',
            borderRadius: 100,
            fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#1A1526',
          }}>
            <span className="cta-badge-dot" />
            Prochaine étape
          </div>
        )}

        <h2 style={{
          fontFamily: "'Mona Sans Variable', sans-serif",
          fontSize: 'clamp(34px, 5vw, 60px)',
          fontWeight: 800, letterSpacing: '-0.04em',
          color: '#1A1526', lineHeight: 1.04,
          marginBottom: 20,
        }}>
          Prêt à lancer votre{' '} <br/>
          <span style={{ color: '#FFFFFF', textShadow: '0 2px 12px rgba(26,21,38,0.25)' }}>
            <TextType
              text={['projet ?', 'site web ?', 'landing page ?', 'croissance ?']}
              as="span"
              typingSpeed={70}
              deletingSpeed={40}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="|"
              cursorClassName="finalcta-cursor"
              loop={true}
            />
          </span>
        </h2>

        <p style={{
          fontFamily: "'Mona Sans Variable', sans-serif",
          fontSize: 17, color: 'rgba(26,21,38,0.72)',
          maxWidth: 540, margin: '0 auto 36px',
          lineHeight: 1.65,
        }}>
          Discutons de vos idées et transformons-les en un site web performant qui génère des résultats. Réponse sous 24h ouvrées, sans engagement.
        </p>

        {/* CTA button — changes state after form is shown */}
        {!showForm && (
          <div
            className="lime-cta"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <button
              onClick={handleOpen}
              className="lime-cta-pill"
              style={{
                background: '#1A1526', color: '#FFFFFF',
                fontFamily: "'Mona Sans Variable', sans-serif",
                fontWeight: 700, fontSize: 17,
                padding: '18px 40px',
                border: 'none', borderRadius: 100, cursor: 'pointer',
                letterSpacing: '-0.005em',
                transition: `transform 0.5s ${SPRING}`,
              }}
            >
              Planifier un appel gratuit
            </button>
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-whatsapp"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                padding: '18px 30px',
                background: 'rgba(26,21,38,0.08)',
                border: '1px solid rgba(26,21,38,0.22)',
                borderRadius: 100, cursor: 'pointer', textDecoration: 'none',
                fontFamily: "'Mona Sans Variable', sans-serif",
                fontWeight: 700, fontSize: 16, color: '#1A1526',
                transition: 'background 0.25s ease, border-color 0.25s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(26,21,38,0.14)'; e.currentTarget.style.borderColor = 'rgba(26,21,38,0.35)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(26,21,38,0.08)'; e.currentTarget.style.borderColor = 'rgba(26,21,38,0.22)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 01-1.9-1.2 7.2 7.2 0 01-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4c0-.1-.5-1.3-.7-1.8s-.4-.4-.5-.4h-.5a1 1 0 00-.7.3A2.8 2.8 0 006 8.9c0 1.7 1.2 3.3 1.4 3.5s2.4 3.7 5.9 5.1c2.9 1.1 2.9.8 3.5.7a2.5 2.5 0 001.6-1.2 2 2 0 00.2-1.2c-.1-.1-.3-.2-.5-.3z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        )}

        {/* Trust perks */}
        {!showForm && (
          <div className="cta-perks" style={{
            display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
            gap: '16px 40px', marginTop: 44,
          }}>
            {perks.map((p) => (
              <div key={p.title} style={{ display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
                <span style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(26,21,38,0.08)', border: '1px solid rgba(26,21,38,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1526" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>
                  <span style={{ display: 'block', fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 14, fontWeight: 700, color: '#1A1526' }}>{p.title}</span>
                  <span style={{ display: 'block', fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 12.5, color: 'rgba(26,21,38,0.6)' }}>{p.sub}</span>
                </span>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <button
            onClick={() => setShowForm(false)}
            style={{
              background: 'rgba(26,21,38,0.09)', border: '1px solid rgba(26,21,38,0.14)',
              borderRadius: 100, padding: '12px 24px',
              fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 14, fontWeight: 500,
              color: 'rgba(26,21,38,0.72)', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(26,21,38,0.09)'; e.currentTarget.style.color = 'rgba(26,21,38,0.92)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(26,21,38,0.09)'; e.currentTarget.style.color = 'rgba(26,21,38,0.72)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
Masquer le formulaire
          </button>
        )}

        <style>{`
          .finalcta-cursor { color: #FFFFFF; font-weight: 300; }
        `}</style>

        </div>{/* /z-index inner */}
      </div>{/* /cta-panel */}

      {/* ── Inline form ── */}
      <div
        ref={formRef}
        style={{
          maxWidth: 680,
          margin: showForm ? '56px auto 0' : '0 auto',
          position: 'relative', zIndex: 1,
          /* mount animation */
          animation: showForm ? 'ctaFormIn 0.65s cubic-bezier(0.16,1,0.3,1) forwards' : 'none',
          display: showForm ? 'block' : 'none',
        }}
      >
        {/* Card */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid rgba(26,21,38,0.08)',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 24px 70px rgba(26,21,38,0.25)',
        }}>
          {/* Card header */}
          <div style={{
            padding: '28px 40px 0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <p style={{
                fontFamily: "'Mona Sans Variable', sans-serif",
                fontSize: 10, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.2em',
                color: '#1A1526', margin: '0 0 6px',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ width: 18, height: 1, background: '#CCF306', display: 'inline-block' }} />
                Première étape
              </p>
              <h3 style={{
                fontFamily: "'Mona Sans Variable', sans-serif",
                fontSize: 22, fontWeight: 800,
                color: '#1A1526', letterSpacing: '-0.03em',
                margin: 0,
              }}>
Recevez une recommandation gratuite
              </h3>
            </div>
          </div>

          <div style={{ height: 20 }} />

          {/* Questionnaire */}
          {showForm && <Questionnaire bodyPadding="28px 40px 36px" />}
        </div>
      </div>

      <style>{`
        @keyframes ctaFormIn {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cta-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #CCF306; box-shadow: 0 0 8px rgba(74,56,0,0.6);
          animation: ctaDotPulse 2.2s ease-in-out infinite;
        }
        @keyframes ctaDotPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%     { opacity: 0.4; transform: scale(0.7); }
        }
        @media (max-width: 768px) {
          .finalcta-section { padding: 72px 20px 64px !important; }
          .lime-cta { width: 100%; }
          .cta-perks { gap: 16px 28px !important; }
        }
        @media (max-width: 560px) {
          .lime-cta-circle { display: none !important; }
          .lime-cta-pill, .cta-whatsapp { width: 100%; justify-content: center; }
          .cta-perks { flex-direction: column; align-items: center; gap: 14px !important; }
        }
        @media (max-width: 480px) {
          .finalcta-section { padding: 56px 16px 52px !important; }
        }
      `}</style>
    </section>
  )
}
