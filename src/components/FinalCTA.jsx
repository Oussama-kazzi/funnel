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
        borderRadius: 'clamp(16px, 2vw, 26px)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: [
          'inset 0 1px 0 rgba(255,255,255,0.07)',
          '0 0 0 1px rgba(255,255,255,0.03)',
          '0 40px 100px rgba(0,0,0,0.75)',
          '0 0 140px rgba(0,255,135,0.05)',
        ].join(', '),
      }}
    >
      {/* Green radial glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,255,135,0.08), transparent 70%)',
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
          background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.25)',
          borderRadius: 100, padding: '6px 16px',
          fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase', color: '#00FF87',
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
            color: '#00FF87',
            textShadow: '0 0 24px rgba(0,255,135,0.35)',
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

        <button
          onClick={onCTA}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'linear-gradient(135deg, #00CC6E 0%, #00FF87 100%)', color: '#050816',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700, fontSize: 18,
            padding: '20px 44px',
            border: 'none', borderRadius: 12, cursor: 'pointer',
            boxShadow: '0 8px 40px rgba(0,255,135,0.35)',
            transition: `transform 0.5s ${SPRING}, box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,255,135,0.55)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,255,135,0.35)' }}
        >
          Book a strategy call
          <span>→</span>
        </button>

        <style>{`.finalcta-cursor { color: #00FF87; font-weight: 300; }`}</style>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 24 }}>
          No pitch. No hard sell. Just an honest conversation about your product.
        </p>

      </div>
    </section>
  )
}
