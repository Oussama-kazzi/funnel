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

  return (
    <section
      ref={sectionRef}
      id="cta"
      style={{
        padding: '140px 32px 100px',
        background: 'transparent',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Green radial glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(199,247,81,0.08), transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
      }} />

      {/* CTA content */}
      <div style={{
        maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 1,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0,0,0)' : 'translate3d(0,28px,0)',
        transition: `opacity 1.1s ${EASE}, transform 1.1s ${EASE}`,
      }}>


        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 800, letterSpacing: '-0.04em',
          color: '#FFFFFF', lineHeight: 1.02,
          marginBottom: 24,
        }}>
          Ready to build <br /> something{' '}
          <span style={{ color: '#C7F751', textShadow: '0 0 24px rgba(199,247,81,0.35)' }}>
            <TextType
              text={['that lasts?', 'that scales?', 'that converts?', 'that matters?']}
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
          fontFamily: "'Inter', sans-serif",
          fontSize: 19, color: 'rgba(255,255,255,0.45)',
          maxWidth: 500, margin: '0 auto 48px',
          lineHeight: 1.65,
        }}>
          Book a 30-minute strategy call. We'll review your product, your goals, and tell you exactly how we'd approach it — before any agreement is signed.
        </p>

        {/* CTA button — changes state after form is shown */}
        {!showForm && (
          <div
            className="lime-cta"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}
          >
            <button
              onClick={handleOpen}
              aria-label="Book a strategy call"
              className="lime-cta-circle"
              style={{
                width: 64, height: 64, borderRadius: '50%',
                background: '#C7F751', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: `transform 0.5s ${SPRING}, box-shadow 0.35s ease`,
                boxShadow: '0 6px 28px rgba(199,247,81,0.5)',
                flexShrink: 0,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A2622" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="17" y1="7" x2="7" y2="17" />
                <polyline points="17 17 7 17 7 7" />
              </svg>
            </button>
            <button
              onClick={handleOpen}
              className="lime-cta-pill"
              style={{
                background: '#C7F751', color: '#0A2622',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700, fontSize: 18,
                padding: '20px 44px',
                border: 'none', borderRadius: 100, cursor: 'pointer',
                letterSpacing: '-0.005em',
                transition: `transform 0.5s ${SPRING}, box-shadow 0.35s ease`,
                boxShadow: '0 6px 36px rgba(199,247,81,0.5)',
              }}
            >
              Book a strategy call
            </button>
          </div>
        )}

        {showForm && (
          <button
            onClick={() => setShowForm(false)}
            style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 100, padding: '12px 24px',
              fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500,
              color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            Hide form
          </button>
        )}

        <style>{`
          .finalcta-cursor { color: #C7F751; font-weight: 300; }
        `}</style>


      </div>

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
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(199,247,81,0.12)',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 0 0 1px rgba(199,247,81,0.04), 0 24px 60px rgba(0,0,0,0.45), 0 0 60px rgba(199,247,81,0.06)',
        }}>
          {/* Card header */}
          <div style={{
            padding: '28px 40px 0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.2em',
                color: '#C7F751', margin: '0 0 6px',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ width: 18, height: 1, background: '#C7F751', display: 'inline-block' }} />
                Your first step
              </p>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 22, fontWeight: 800,
                color: '#FFFFFF', letterSpacing: '-0.03em',
                margin: 0,
              }}>
                Enter Your Info
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
        @media (max-width: 600px) {
          .lime-cta { flex-direction: column; }
        }
      `}</style>
    </section>
  )
}
