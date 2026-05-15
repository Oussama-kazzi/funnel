import { useRef, useState, useEffect } from 'react'
import TextType from './TextType'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

export default function FinalCTA({ onCTA }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="cta"
      style={{
        padding: '140px 32px',
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

      <div style={{
        maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 1,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0,0,0)' : 'translate3d(0,28px,0)',
        transition: `opacity 1.1s ${EASE}, transform 1.1s ${EASE}`,
      }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(199,247,81,0.08)', border: '1px solid rgba(199,247,81,0.25)',
          borderRadius: 100, padding: '6px 16px',
          fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C7F751',
          marginBottom: 32,
        }}>
          Strategy call · No commitment
        </div>

        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 800, letterSpacing: '-0.04em',
          color: '#FFFFFF', lineHeight: 1.02,
          marginBottom: 24,
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          textRendering: 'geometricPrecision',
        }}>
          Ready to build something{' '}
          <span style={{
            color: '#C7F751',
            textShadow: '0 0 24px rgba(199,247,81,0.35)',
            display: 'inline-block',
            transform: 'translate3d(0,0,0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            willChange: 'transform, opacity',
          }}>
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

        <div
          className="lime-cta"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}
        >
          <button
            onClick={onCTA}
            aria-label="Book a strategy call"
            className="lime-cta-circle"
            style={{
              width: 64, height: 64, borderRadius: '50%',
              background: '#C7F751', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: `transform 0.5s ${SPRING}, box-shadow 0.35s cubic-bezier(0.4,0,0.2,1)`,
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
            onClick={onCTA}
            className="lime-cta-pill"
            style={{
              background: '#C7F751', color: '#0A2622',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700, fontSize: 18,
              padding: '20px 44px',
              border: 'none', borderRadius: 100, cursor: 'pointer',
              letterSpacing: '-0.005em',
              transition: `transform 0.5s ${SPRING}, box-shadow 0.35s cubic-bezier(0.4,0,0.2,1)`,
              boxShadow: '0 6px 36px rgba(199,247,81,0.5)',
            }}
          >
            Book a strategy call
          </button>
        </div>

        <style>{`
          .finalcta-cursor { color: #C7F751; font-weight: 300; }
        `}</style>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 24 }}>
          No pitch. No hard sell. Just an honest conversation about your product.
        </p>

      </div>
    </section>
  )
}
