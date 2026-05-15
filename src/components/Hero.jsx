import { useEffect, useState } from 'react'
import TextType from './TextType'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

export default function Hero({ onCTA }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: 'calc(100vh - clamp(16px, 2.8vw, 36px))',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 48,
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'clamp(16px, 2vw, 26px)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: [
          'inset 0 1px 0 rgba(255,255,255,0.07)',
          '0 0 0 1px rgba(255,255,255,0.03)',
          '0 40px 100px rgba(0,0,0,0.75)',
          '0 0 140px rgba(199,247,81,0.05)',
        ].join(', '),
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
        pointerEvents: 'none',
      }} />

      {/* Main content */}
      <div style={{
        maxWidth: 900, margin: '0 auto',
        padding: '60px 32px 80px',
        position: 'relative', zIndex: 1, width: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center',
      }}>

        {/* Eyebrow */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(199,247,81,0.06)',
          border: '1px solid rgba(199,247,81,0.18)',
          borderRadius: 100, padding: '6px 14px 6px 10px',
          marginBottom: 40,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(18px)',
          transition: `opacity 1.1s ${EASE}, transform 1.1s ${EASE}`,
          willChange: 'transform, opacity',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#C7F751', flexShrink: 0, boxShadow: '0 0 0 3px rgba(199,247,81,0.25)' }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>
            Available for new projects · 2 spots open
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(44px, 7vw, 88px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
            marginBottom: 28,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: `opacity 1.1s ${EASE} 0.18s, transform 1.1s ${EASE} 0.18s`,
            willChange: 'transform, opacity',
          }}
        >
          <span style={{ display: 'block' }}>We design and build</span>

          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 14, verticalAlign: 'middle', lineHeight: 1.1 }}>
            <span style={{
              color: '#C7F751',
              textShadow: '0 0 60px rgba(199,247,81,0.5)',
            }}>
              <TextType
                text={['digital products', 'SaaS platforms', 'AI experiences', 'design systems']}
                as="span"
                typingSpeed={65}
                deletingSpeed={35}
                pauseDuration={2200}
                showCursor={true}
                cursorCharacter="|"
                cursorClassName="hero-cursor"
                loop={true}
              />
            </span>
          </span>

          <span style={{ display: 'block' }}>that scale.</span>
        </h1>

        {/* Subheading */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18, fontWeight: 400,
            color: 'rgba(255,255,255,0.5)', lineHeight: 1.65,
            maxWidth: 520, marginBottom: 48,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: `opacity 1.1s ${EASE} 0.32s, transform 1.1s ${EASE} 0.32s`,
            willChange: 'transform, opacity',
          }}
        >
          FUTURA is a{' '}
          <strong style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
            product design & development studio
          </strong>{' '}
          for startups, SaaS companies, and AI teams. From first concept to production-ready system — strategy, design, and code, in-house.
        </p>

        {/* CTA row */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
            justifyContent: 'center',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(28px)',
            transition: `opacity 1.1s ${EASE} 0.46s, transform 1.1s ${EASE} 0.46s`,
            willChange: 'transform, opacity',
          }}
        >
          <div
            className="lime-cta"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
          >
            <button
              onClick={onCTA}
              aria-label="Start a project"
              className="lime-cta-circle"
              style={{
                width: 56, height: 56, borderRadius: '50%',
                background: '#C7F751', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: `transform 0.5s ${SPRING}, box-shadow 0.35s ${EASE}`,
                boxShadow: '0 4px 22px rgba(199,247,81,0.5)',
                flexShrink: 0,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A2622" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                fontWeight: 700, fontSize: 16,
                padding: '16px 36px',
                border: 'none', borderRadius: 100, cursor: 'pointer',
                letterSpacing: '-0.005em',
                transition: `transform 0.5s ${SPRING}, box-shadow 0.35s ${EASE}`,
                boxShadow: '0 4px 28px rgba(199,247,81,0.5)',
              }}
            >
              Start a project
            </button>
          </div>

          <a
            href="#work"
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 500,
              color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >
            See our work ↓
          </a>
        </div>
      </div>

      <style>{`
        .hero-cursor {
          color: #C7F751;
          opacity: 1;
          font-weight: 300;
        }
        .lime-cta:hover .lime-cta-circle {
          transform: translateY(-3px) rotate(-12deg);
          box-shadow: 0 12px 36px rgba(199,247,81,0.7);
        }
        .lime-cta:hover .lime-cta-pill {
          transform: translateY(-3px);
          box-shadow: 0 14px 40px rgba(199,247,81,0.7);
        }
        @media (max-width: 768px) {
          #hero h1 { font-size: clamp(36px, 9vw, 54px) !important; }
        }
      `}</style>
    </section>
  )
}
