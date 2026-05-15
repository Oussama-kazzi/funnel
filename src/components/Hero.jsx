import { useEffect, useState } from 'react'
import TextType from './TextType'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

/* ---------------- Tool icons (inline SVG, premium app-tile style) ---------------- */
const ToolIcons = {
  WordPress: (
    <svg viewBox="0 0 24 24" width="60%" height="60%" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#21759B" />
      <path
        d="M3.5 12c0 3.4 2 6.3 4.8 7.7L4.2 9.3c-.4.9-.7 1.8-.7 2.7zm14.2-.4c0-1.1-.4-1.8-.7-2.4-.5-.7-.9-1.3-.9-2 0-.8.6-1.5 1.4-1.5h.1A8.46 8.46 0 0 0 12 3.5c-3 0-5.7 1.6-7.2 4l.5.1c1 0 2.4-.1 2.4-.1.5 0 .5.7.1.7 0 0-.5 0-1.1.1l3.4 10 2-6.1L10.7 8c-.5 0-1-.1-1-.1-.5 0-.4-.8.1-.7 0 0 1.5.1 2.3.1 1 0 2.4-.1 2.4-.1.5 0 .6.7.1.7 0 0-.5 0-1.1.1l3.4 10 .9-3.1c.4-1.2.7-2.2.7-3zm-5.5 1.2-2.8 8.2c.8.2 1.7.4 2.6.4 1.1 0 2.1-.2 3.1-.5v-.1l-2.9-8zm7.3-4.8c0 .3.1.7.1 1 0 1-.2 2.2-.8 3.6L15.3 20a8.49 8.49 0 0 0 4.2-7.4c0-1.7-.4-3.3-1.2-4.6z"
        fill="#fff"
      />
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" width="58%" height="58%" aria-hidden="true">
      <path d="M8.5 1.5h3.5v7H8.5a3.5 3.5 0 0 1 0-7z" fill="#F24E1E" />
      <path d="M12 1.5h3.5a3.5 3.5 0 0 1 0 7H12z" fill="#FF7262" />
      <path d="M12 8.5h3.5a3.5 3.5 0 0 1 0 7H12z" fill="#A259FF" />
      <path d="M8.5 8.5H12v7H8.5a3.5 3.5 0 0 1 0-7z" fill="#1ABCFE" />
      <path d="M8.5 15.5H12V19a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 15.5z" fill="#0ACF83" />
    </svg>
  ),
  React: (
    <svg viewBox="0 0 24 24" width="62%" height="62%" aria-hidden="true">
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <g fill="none" stroke="#61DAFB" strokeWidth="1.1">
        <ellipse cx="12" cy="12" rx="10" ry="3.8" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(120 12 12)" />
      </g>
    </svg>
  ),
  Webflow: (
    <svg viewBox="0 0 24 24" width="62%" height="62%" aria-hidden="true">
      <path
        d="M22 5l-5.3 14h-4.4l-2.4-7-2.4 7H3.1L2 5h4.2l1 8 2.5-8h3.7l2.4 8 1.1-8z"
        fill="#4353FF"
      />
    </svg>
  ),
  Framer: (
    <svg viewBox="0 0 24 24" width="58%" height="58%" aria-hidden="true">
      <path d="M6 2h12v6h-6z" fill="#0099FF" />
      <path d="M6 8h12l-6 6H6z" fill="#00B8FF" />
      <path d="M6 14h6v6z" fill="#0055FF" />
    </svg>
  ),
}

/* ---------------- Orbit visual ---------------- */
function OrbitVisual() {
  /*
    Each icon has:
    - orbit: degrees rotation of the orbit ring it sits on
    - r: orbit radius (% of container)
    - delay: animation delay so the icons feel naturally staggered
    The wrapper rotates clockwise; the inner counter-rotates so icons stay upright.
  */
  const icons = [
    { key: 'Figma',     r: 30, angle:  20, dur: 38, size: 56, color: '#FF7262' },
    { key: 'React',     r: 42, angle: 110, dur: 46, size: 60, color: '#61DAFB' },
    { key: 'WordPress', r: 30, angle: 200, dur: 38, size: 56, color: '#21759B' },
    { key: 'Webflow',   r: 42, angle: 290, dur: 46, size: 60, color: '#4353FF' },
    { key: 'Framer',    r: 36, angle: 340, dur: 42, size: 54, color: '#0099FF' },
  ]

  return (
    <div className="orbit-wrap" aria-hidden="true">
      {/* Outer atmospheric glow */}
      <div className="orbit-atmos" />

      {/* Concentric rings (static, glowing) */}
      <svg className="orbit-rings" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="ringFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(199,247,81,0.0)" />
            <stop offset="60%"  stopColor="rgba(199,247,81,0.18)" />
            <stop offset="100%" stopColor="rgba(199,247,81,0.0)" />
          </radialGradient>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(199,247,81,0.55)" />
            <stop offset="35%"  stopColor="rgba(167,139,250,0.18)" />
            <stop offset="70%"  stopColor="rgba(99,102,241,0.06)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Soft purple/blue atmosphere */}
        <circle cx="50" cy="50" r="48" fill="url(#centerGlow)" />

        {/* Concentric circles */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.07)"  strokeWidth="0.15" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.10)"  strokeWidth="0.18" />
        <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255,255,255,0.12)"  strokeWidth="0.20" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(199,247,81,0.18)"   strokeWidth="0.22" />
        <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(199,247,81,0.12)"   strokeWidth="0.20" />
      </svg>

      {/* Center label */}
      <div className="orbit-center">
        <div className="orbit-center-num">5+</div>
        <div className="orbit-center-label">Stacks We Master</div>
      </div>

      {/* Orbiting icons — each on its own rotating ring.
          orbit-ring inset = 50% - r%, so the icon (placed at top:0/left:50%)
          sits exactly r% from the container center. */}
      {icons.map((it) => {
        const inset = 50 - it.r
        return (
          <div
            key={it.key}
            className="orbit-ring"
            style={{
              inset: `${inset}%`,
              animationDuration: `${it.dur}s`,
              animationDelay: `${-it.dur * (it.angle / 360)}s`,
            }}
          >
            <div
              className="orbit-icon-anchor"
              style={{ width: it.size, height: it.size }}
            >
              <div
                className="orbit-icon"
                style={{
                  animationDuration: `${it.dur}s`,
                  animationDelay: `${-it.dur * (it.angle / 360)}s`,
                  '--icon-glow': it.color,
                }}
              >
                <div className="orbit-icon-tile">
                  {ToolIcons[it.key]}
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Tag bubble (decorative, like screenshot's "David") */}
      <div className="orbit-tag">
        <span className="orbit-tag-dot" />
        Stack
      </div>
    </div>
  )
}

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
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 48,
        background: 'transparent',
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
        pointerEvents: 'none',
      }} />

      {/* Two-column layout */}
      <div className="hero-grid">
        {/* LEFT — text content */}
        <div className="hero-text">
          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(40px, 5.4vw, 76px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: '#FFFFFF',
              marginBottom: 24,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
              transition: `opacity 1.1s ${EASE} 0.18s, transform 1.1s ${EASE} 0.18s`,
              willChange: 'transform, opacity',
            }}
          >
            <span style={{ display: 'block' }}>We design and build</span>

            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14, lineHeight: 1.1 }}>
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
              fontSize: 17, fontWeight: 400,
              color: 'rgba(255,255,255,0.5)', lineHeight: 1.65,
              maxWidth: 520, marginBottom: 40,
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

        {/* RIGHT — orbit visual */}
        <div
          className="hero-orbit"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(0.92)',
            transition: `opacity 1.4s ${EASE} 0.4s, transform 1.4s ${EASE} 0.4s`,
          }}
        >
          <OrbitVisual />
        </div>
      </div>

      <style>{`
        .hero-cursor {
          color: #C7F751;
          opacity: 1;
          font-weight: 300;
        }
        /* Hover: flip lime → white pill + white circle with dark arrow */
        .lime-cta:hover .lime-cta-circle,
        .lime-cta .lime-cta-circle:hover {
          background: #FFFFFF !important;
          box-shadow: 0 10px 32px rgba(255,255,255,0.18) !important;
        }
        .lime-cta:hover .lime-cta-circle svg,
        .lime-cta .lime-cta-circle:hover svg {
          transform: rotate(-135deg);
          stroke: #0A0A0A;
        }
        .lime-cta:hover .lime-cta-pill,
        .lime-cta .lime-cta-pill:hover {
          background: #FFFFFF !important;
          color: #0A0A0A !important;
          box-shadow: 0 12px 36px rgba(255,255,255,0.22) !important;
        }
        .lime-cta-circle svg {
          transition: transform 0.4s ${SPRING}, stroke 0.3s ${EASE};
        }
        .lime-cta-circle, .lime-cta-pill {
          transition:
            background 0.35s ${EASE},
            color 0.35s ${EASE},
            transform 0.5s ${SPRING},
            box-shadow 0.35s ${EASE} !important;
        }

        /* ----------- Two-column hero ----------- */
        .hero-grid {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 60px 48px 80px;
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          align-items: center;
          gap: 48px;
        }
        .hero-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        /* ----------- Orbit ----------- */
        .hero-orbit {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          max-width: 560px;
          justify-self: center;
        }
        .orbit-wrap {
          position: absolute;
          inset: 0;
        }
        .orbit-atmos {
          position: absolute;
          inset: -8%;
          background:
            radial-gradient(circle at 50% 50%, rgba(167,139,250,0.22) 0%, rgba(99,102,241,0.10) 28%, transparent 60%),
            radial-gradient(circle at 35% 30%, rgba(199,247,81,0.10) 0%, transparent 45%);
          filter: blur(20px);
          pointer-events: none;
        }
        .orbit-rings {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 12px rgba(199,247,81,0.10));
        }

        /* Center label */
        .orbit-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          pointer-events: none;
        }
        .orbit-center-num {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(36px, 4.4vw, 56px);
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #FFFFFF;
          text-shadow: 0 0 30px rgba(199,247,81,0.35);
          line-height: 1;
        }
        .orbit-center-label {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          margin-top: 8px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* Each orbit ring is a rotating square whose top-center is the icon's anchor */
        .orbit-ring {
          position: absolute;
          /* inset is set inline per-icon to control orbit radius */
          animation: orbit-spin linear infinite;
          will-change: transform;
        }
        .orbit-icon-anchor {
          position: absolute;
          top: 0;
          left: 50%;
          /* shift so the tile sits centered on the orbit circle */
          transform: translate(-50%, -50%);
        }
        .orbit-icon {
          width: 100%;
          height: 100%;
          animation: orbit-counter linear infinite;
          will-change: transform;
          filter: drop-shadow(0 0 14px var(--icon-glow, rgba(199,247,81,0.4)));
        }
        .orbit-icon-tile {
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background: linear-gradient(135deg, #0E1020 0%, #0A0B16 100%);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.06),
            0 8px 24px rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .orbit-icon-tile::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.10), transparent 60%);
          pointer-events: none;
        }

        /* Decorative tag */
        .orbit-tag {
          position: absolute;
          bottom: 10%;
          left: 12%;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 14px;
          background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 600;
          border-radius: 100px;
          box-shadow: 0 8px 24px rgba(139,92,246,0.45), 0 0 0 1px rgba(255,255,255,0.08);
        }
        .orbit-tag-dot {
          width: 6px;
          height: 6px;
          background: #fff;
          border-radius: 50%;
          opacity: 0.9;
        }

        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbit-counter {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }

        /* ----------- Responsive ----------- */
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 48px 24px 64px;
          }
          .hero-text {
            align-items: center;
            text-align: center;
          }
          .hero-text p { margin-left: auto; margin-right: auto; }
          .hero-text > div:last-child { justify-content: center; }
          .hero-orbit { max-width: 420px; }
        }
        @media (max-width: 768px) {
          #hero h1 { font-size: clamp(36px, 9vw, 54px) !important; }
        }
        @media (max-width: 480px) {
          .hero-orbit { max-width: 320px; }
          .orbit-tag { font-size: 11px; padding: 6px 12px; }
        }
      `}</style>
    </section>
  )
}
