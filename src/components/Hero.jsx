import { useEffect, useState } from 'react'
import TextType from './TextType'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

/* ---------------- Device mockup visual (laptop + phone, pure CSS UI) ---------------- */
function MiniSiteUI() {
  return (
    <div className="dv-site">
      {/* top nav */}
      <div className="dv-nav">
        <span className="dv-logo">Futur<b>A</b></span>
        <div className="dv-nav-links">
          <i /><i /><i /><i />
        </div>
        <span className="dv-nav-cta" />
      </div>
      {/* hero copy + visual */}
      <div className="dv-hero">
        <div className="dv-hero-left">
          <span className="dv-pill" />
          <div className="dv-h1"><span /><span /><span className="dv-h1-accent" /></div>
          <div className="dv-p"><span /><span /></div>
          <div className="dv-btns"><span className="dv-btn-a" /><span className="dv-btn-b" /></div>
        </div>
        <div className="dv-hero-right">
          <div className="dv-card dv-card-1"><span className="dv-dot" /><i /><i /></div>
          <div className="dv-card dv-card-2"><span className="dv-dot dv-dot-v" /><i /><i /></div>
        </div>
      </div>
    </div>
  )
}

function DeviceMockup({ tilt }) {
  const rx = (tilt?.y ?? 0) * -6
  const ry = (tilt?.x ?? 0) * 8
  return (
    <div className="dv-stage" aria-hidden="true">
      {/* glow behind devices */}
      <div className="dv-glow" />

      <div
        className="dv-float"
        style={{ transform: 'perspective(1400px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)' }}
      >
        {/* Laptop */}
        <div className="dv-laptop">
          <div className="dv-laptop-screen">
            <div className="dv-cam" />
            <div className="dv-screen-inner"><MiniSiteUI /></div>
          </div>
          <div className="dv-laptop-base"><span className="dv-notch" /></div>
        </div>

        {/* Phone (overlaps bottom-right) */}
        <div className="dv-phone">
          <div className="dv-phone-notch" />
          <div className="dv-phone-inner">
            <div className="dv-phone-top">
              <span className="dv-logo dv-logo-sm">Futur<b>A</b></span>
              <span className="dv-burger"><i /><i /><i /></span>
            </div>
            <div className="dv-phone-head"><span /><span /><span className="dv-h1-accent" /></div>
            <div className="dv-phone-cardwrap">
              <div className="dv-phone-card"><span className="dv-dot dv-dot-v" /><i /><i /></div>
              <div className="dv-phone-card"><span className="dv-dot" /><i /><i /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero({ onCTA }) {
  const [visible, setVisible] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  // Mouse parallax — normalised -0.5..0.5 relative to the section
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setTilt({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    })
  }
  const resetTilt = () => setTilt({ x: 0, y: 0 })

  return (
    <section
      id="hero"
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      style={{
        display: 'flex',
        alignItems: 'center',
        minHeight: '100svh',
        paddingTop: 72,
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle tech grid — fades out toward center + edges so it reads as texture, not a box */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 100% 80% at 50% 0%, #000 20%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 100% 80% at 50% 0%, #000 20%, transparent 75%)',
        pointerEvents: 'none',
      }} />

      {/* Two-column layout */}
      <div className="hero-grid">
        {/* LEFT — text content */}
        <div className="hero-text">
          {/* Badge */}
          <div
            className="hero-badge"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.7s ${EASE} 0.02s, transform 0.7s ${EASE} 0.02s`,
            }}
          >
            <span className="hero-badge-dot" />
            AGENCE DIGITALE À CASABLANCA
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(32px, 3.6vw, 52px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.035em',
              color: '#FFFFFF',
              marginBottom: 20,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
              transition: `opacity 0.8s ${EASE} 0.1s, transform 0.8s ${EASE} 0.1s`,
              willChange: 'transform, opacity',
            }}
          >
            <span className="hero-h1-line" style={{ display: 'block' }}>Des expériences digitales</span>
            <span style={{ display: 'block' }}>
              qui génèrent des{' '}
              <br /><span style={{
                color: '#8B5CF6',
                textShadow: '0 0 60px rgba(139,92,246,0.5)',
              }}>
                <TextType
                  text={['résultats.', 'leads.', 'ventes.', 'clients.']}
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
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16.5, fontWeight: 400,
              color: 'rgba(255,255,255,0.55)', lineHeight: 1.65,
              maxWidth: 470, marginBottom: 30,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
              transition: `opacity 0.8s ${EASE} 0.2s, transform 0.8s ${EASE} 0.2s`,
              willChange: 'transform, opacity',
            }}
          >
            Chez{' '}
            <strong style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
              FuturA
            </strong>, nous concevons des sites web, landing pages et solutions digitales
            qui attirent, engagent et convertissent vos visiteurs en clients.
          </p>

          {/* Feature checklist row */}
          <div
            style={{
              display: 'flex', flexWrap: 'wrap', gap: '12px 22px',
              marginBottom: 36,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
              transition: `opacity 0.8s ${EASE} 0.28s, transform 0.8s ${EASE} 0.28s`,
            }}
          >
            {['Design premium', 'Développement sur mesure', 'Livraison rapide', 'Accompagnement'].map((f) => (
              <span key={f} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500,
                color: 'rgba(255,255,255,0.7)',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {f}
              </span>
            ))}
          </div>

          {/* CTA row */}
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
              transition: `opacity 0.8s ${EASE} 0.36s, transform 0.8s ${EASE} 0.36s`,
              willChange: 'transform, opacity',
            }}
          >
            <div
              className="lime-cta"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
            >
              <button
                onClick={onCTA}
                className="lime-cta-pill"
                style={{
                  background: '#8B5CF6', color: '#FFFFFF',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700, fontSize: 16,
                  padding: '16px 36px',
                  border: 'none', borderRadius: 100, cursor: 'pointer',
                  letterSpacing: '-0.005em',
                  transition: `transform 0.5s ${SPRING}, box-shadow 0.35s ${EASE}`,
                  boxShadow: '0 4px 28px rgba(139,92,246,0.5)',
                }}
              >
                Planifier un appel gratuit
              </button>
            </div>

            <a
              href="#work"
              className="hero-see-work"
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 500,
                color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 6,
                transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              Voir nos réalisations
            </a>
          </div>
        </div>

        {/* RIGHT — device mockup visual */}
        <div
          className="hero-orbit"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(0.92)',
            transition: `opacity 1s ${EASE} 0.3s, transform 1s ${EASE} 0.3s`,
          }}
        >
          <DeviceMockup tilt={tilt} />
        </div>
      </div>

      <style>{`
        .hero-cursor {
          color: #8B5CF6;
          opacity: 1;
          font-weight: 300;
        }

        /* ---------- Badge ---------- */
        .hero-badge {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 7px 15px; margin-bottom: 22px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.62);
          backdrop-filter: blur(8px);
        }
        .hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #8B5CF6; box-shadow: 0 0 10px rgba(139,92,246,0.9);
          animation: hero-pulse 2.2s ease-in-out infinite;
        }
        @keyframes hero-pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%     { opacity: 0.4; transform: scale(0.7); }
        }


        /* ---------- Device mockup ---------- */
        .dv-stage {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .dv-glow {
          position: absolute; inset: -8%;
          background:
            radial-gradient(ellipse 55% 50% at 58% 38%, rgba(139,92,246,0.30), transparent 62%),
            radial-gradient(ellipse 70% 30% at 50% 82%, rgba(99,102,241,0.20), transparent 70%);
          filter: blur(38px); pointer-events: none;
        }
        .dv-float {
          position: relative; width: 92%;
          margin: 0 auto;
          animation: dv-bob 6s ease-in-out infinite;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
          transform-style: preserve-3d;
        }
        @keyframes dv-bob {
          0%,100% { translate: 0 0; }
          50%     { translate: 0 -14px; }
        }

        /* Laptop */
        .dv-laptop { position: relative; width: 100%; }
        .dv-laptop-screen {
          position: relative;
          background: linear-gradient(150deg, #16131f, #0c0a14);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px 14px 4px 4px;
          padding: 12px 12px 14px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .dv-cam {
          position: absolute; top: 6px; left: 50%; transform: translateX(-50%);
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(255,255,255,0.18);
        }
        .dv-screen-inner {
          border-radius: 6px; overflow: hidden;
          aspect-ratio: 16 / 10; background: #0a0812;
        }
        .dv-laptop-base {
          position: relative; height: 14px; margin: 0 -4%;
          background: linear-gradient(180deg, #23202c, #100e16);
          border-radius: 0 0 12px 12px;
          box-shadow: 0 18px 30px rgba(0,0,0,0.5);
        }
        .dv-notch {
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 22%; height: 5px;
          background: rgba(0,0,0,0.4); border-radius: 0 0 6px 6px;
        }

        /* Phone */
        .dv-phone {
          position: absolute; right: -4%; bottom: -14%;
          width: 26%; aspect-ratio: 9 / 19;
          background: linear-gradient(150deg, #1a1622, #0c0a14);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 22px; padding: 8px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6);
          animation: dv-bob 6s ease-in-out infinite 0.4s;
        }
        .dv-phone-notch {
          position: absolute; top: 8px; left: 50%; transform: translateX(-50%);
          width: 34%; height: 6px; background: #000; border-radius: 100px; z-index: 2;
        }
        .dv-phone-inner {
          height: 100%; border-radius: 15px; overflow: hidden;
          background: linear-gradient(180deg, #0d0a16, #0a0812);
          padding: 14px 9px 9px; display: flex; flex-direction: column; gap: 8px;
        }
        .dv-phone-top { display: flex; align-items: center; justify-content: space-between; }
        .dv-burger { display: flex; flex-direction: column; gap: 2px; }
        .dv-burger i { width: 10px; height: 1.5px; background: rgba(255,255,255,0.4); border-radius: 2px; }
        .dv-phone-head { display: flex; flex-direction: column; gap: 4px; margin-top: 4px; }
        .dv-phone-head span { height: 6px; border-radius: 3px; background: rgba(255,255,255,0.16); }
        .dv-phone-head span:nth-child(1) { width: 80%; }
        .dv-phone-head span:nth-child(2) { width: 60%; }
        .dv-phone-cardwrap { display: flex; flex-direction: column; gap: 6px; margin-top: auto; }
        .dv-phone-card {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px; padding: 8px; display: flex; flex-direction: column; gap: 5px;
        }
        .dv-phone-card i { height: 4px; border-radius: 2px; background: rgba(255,255,255,0.12); }
        .dv-phone-card i:nth-child(2) { width: 70%; }
        .dv-phone-card i:nth-child(3) { width: 45%; }

        /* Mini-site UI (inside laptop) */
        .dv-site {
          height: 100%; background: linear-gradient(170deg, #0e0b18 0%, #0a0812 100%);
          display: flex; flex-direction: column; padding: 10px 14px;
          font-family: 'Inter', sans-serif;
        }
        .dv-nav { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .dv-logo { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; font-weight: 800; color: #fff; }
        .dv-logo b { color: #8B5CF6; }
        .dv-logo-sm { font-size: 10px; }
        .dv-nav-links { display: flex; gap: 8px; }
        .dv-nav-links i { width: 16px; height: 3px; border-radius: 2px; background: rgba(255,255,255,0.18); }
        .dv-nav-cta { width: 34px; height: 12px; border-radius: 100px; background: #8B5CF6; box-shadow: 0 0 12px rgba(139,92,246,0.6); }
        .dv-hero { display: flex; gap: 14px; flex: 1; align-items: center; }
        .dv-hero-left { flex: 1.1; display: flex; flex-direction: column; gap: 7px; }
        .dv-pill { width: 44px; height: 8px; border-radius: 100px; background: rgba(255,255,255,0.08); }
        .dv-h1 { display: flex; flex-direction: column; gap: 5px; }
        .dv-h1 span { height: 9px; border-radius: 3px; background: rgba(255,255,255,0.85); }
        .dv-h1 span:nth-child(1) { width: 90%; }
        .dv-h1 span:nth-child(2) { width: 78%; }
        .dv-h1-accent { background: #8B5CF6 !important; width: 55% !important; box-shadow: 0 0 14px rgba(139,92,246,0.55); }
        .dv-p { display: flex; flex-direction: column; gap: 4px; margin-top: 3px; }
        .dv-p span { height: 4px; border-radius: 2px; background: rgba(255,255,255,0.22); }
        .dv-p span:nth-child(1) { width: 85%; }
        .dv-p span:nth-child(2) { width: 65%; }
        .dv-btns { display: flex; gap: 6px; margin-top: 6px; }
        .dv-btn-a { width: 46px; height: 14px; border-radius: 100px; background: #8B5CF6; box-shadow: 0 0 10px rgba(139,92,246,0.5); }
        .dv-btn-b { width: 36px; height: 14px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.2); }
        .dv-hero-right { flex: 0.9; display: flex; flex-direction: column; gap: 8px; }
        .dv-card {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px; padding: 8px; display: flex; flex-direction: column; gap: 5px;
          position: relative;
        }
        .dv-card i { height: 4px; border-radius: 2px; background: rgba(255,255,255,0.14); }
        .dv-card i:nth-child(2) { width: 80%; }
        .dv-card i:nth-child(3) { width: 55%; }
        .dv-dot { width: 12px; height: 12px; border-radius: 4px; background: rgba(255,255,255,0.2); }
        .dv-dot-v { background: rgba(139,92,246,0.35); box-shadow: 0 0 10px rgba(139,92,246,0.4); }
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
          max-width: 1240px;
          margin: 0 auto;
          /* extra top offset clears the fixed navbar so content sits optically centered */
          padding: 96px 48px 72px;
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          align-items: center;
          gap: 56px;
        }
        .hero-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          min-width: 0;
        }
        .hero-text h1 { overflow-wrap: break-word; max-width: 100%; }
        .hero-text p { overflow-wrap: break-word; }

        /* ----------- Device visual ----------- */
        .hero-orbit {
          position: relative;
          width: 100%;
          height: 480px;
          max-width: 660px;
          min-width: 0;
          justify-self: center;
        }

        /* Keep line 1 on one line only on wide screens */
        .hero-h1-line { white-space: nowrap; }

        /* ----------- Responsive ----------- */
        @media (max-width: 1080px) {
          .hero-grid { grid-template-columns: 1fr 0.92fr; gap: 36px; }
          #hero h1 { font-size: clamp(30px, 3.4vw, 46px) !important; }
        }
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 44px;
            padding: 48px 24px 56px;
          }
          .hero-text {
            align-items: center;
            text-align: center;
          }
          .hero-h1-line { white-space: normal; }
          #hero h1 { font-size: clamp(32px, 6vw, 48px) !important; }
          .hero-text p { margin-left: auto; margin-right: auto; }
          .hero-orbit { max-width: 520px; order: 2; }
        }
        @media (max-width: 768px) {
          #hero { min-height: 0 !important; }
          #hero h1 { font-size: clamp(30px, 8vw, 44px) !important; }
          .hero-grid { padding: 40px 20px 44px !important; }
          .hero-orbit { max-width: 420px !important; height: 380px; }
          .hero-see-work { display: none !important; }
        }
        @media (max-width: 480px) {
          #hero h1 { font-size: 30px !important; }
          .hero-grid { padding: 32px 16px 40px !important; }
          .hero-badge { max-width: 100%; white-space: normal; text-align: center; font-size: 10px !important; letter-spacing: 0.1em !important; }
          .hero-orbit { max-width: 300px !important; height: 300px; }
          .lime-cta-circle { display: none !important; }
          .lime-cta { justify-content: center; width: 100%; }
          .lime-cta-pill {
            font-size: 15px !important;
            padding: 15px 30px !important;
          }
          .hero-text > div:nth-of-type(3) { justify-content: center !important; width: 100%; }
        }
      `}</style>
    </section>
  )
}
