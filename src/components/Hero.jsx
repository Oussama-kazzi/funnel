import { useEffect, useState } from 'react'
import TextType from './TextType'
import slide1 from '../assets/projet-3-webflow.png'
import slide2 from '../assets/projet-2-webflow.png'
import slide3 from '../assets/projet-4-webflow.png'
import slide4 from '../assets/projet-1-wordpress.png'
import slide5 from '../assets/projet-5-webflow.png'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

const SLIDES = [
  { img: slide1, label: 'Slava Logistics — Site Webflow' },
  { img: slide2, label: 'Payplus — Application Fintech' },
  { img: slide3, label: 'Midlane — Site Webflow' },
  { img: slide4, label: 'Souk2Surf — Site WordPress' },
  { img: slide5, label: 'Sunsurf Maroc — Site Webflow' },
]
const SLIDE_INTERVAL = 5000

export default function Hero({ onCTA }) {
  const [visible, setVisible] = useState(false)
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  // Auto-advance the showcase slideshow every 5s
  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % SLIDES.length)
    }, SLIDE_INTERVAL)
    return () => clearInterval(id)
  }, [])

  const fade = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.8s ${EASE} ${delay}s, transform 0.8s ${EASE} ${delay}s`,
    willChange: 'transform, opacity',
  })

  return (
    <section
      id="hero"
      style={{
        paddingTop: 132,
        paddingBottom: 80,
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle tech grid, fades toward center */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(26,21,38,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,21,38,0.05) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 90% 70% at 50% 0%, #000 15%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 0%, #000 15%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="hero-wrap">
        {/* Badge */}
        <div className="hero-badge" style={fade(0.02)}>
          <span className="hero-badge-dot" />
          AGENCE DIGITALE À AGADIR
        </div>

        {/* Headline */}
        <h1
          className="hero-h1"
          style={{
            fontFamily: "'Mona Sans Variable', sans-serif",
            fontSize: 'clamp(34px, 5.4vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: '-0.04em',
            color: '#1A1526',
            margin: '0 0 20px',
            ...fade(0.1),
          }}
        >
          <span className="hero-h1-static">Nous créons des sites qui</span>
          <span className="hero-accent-wrap">
            <span style={{ color: '#1A1526' }}>
              <TextType
                text={['réalisent vos objectifs', 'génèrent des résultats', 'convertissent vos visiteurs', 'font grandir votre marque']}
                as="span"
                typingSpeed={60}
                deletingSpeed={30}
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
        <p className="hero-sub" style={{ ...fade(0.2) }}>
          Notre philosophie&nbsp;: {' '}
          Nous concevons des sites web, landing pages et solutions digitales qui attirent, engagent et convertissent.
        </p>

        {/* CTAs */}
        <div className="hero-cta-row" style={{ ...fade(0.3) }}>
          <button onClick={onCTA} className="hero-btn-primary">
            Planifier un appel gratuit
          </button>
          <a href="#work" className="hero-btn-ghost">
            Voir nos réalisations
          </a>
        </div>

        {/* Featured project showcase card */}
        <div className="hero-showcase" style={{ ...fade(0.42) }}>
          <div className="hero-showcase-inner">
            {/* Stacked slides — crossfade between them */}
            {SLIDES.map((s, i) => (
              <img
                key={i}
                src={s.img}
                alt={s.label}
                className="hero-showcase-img"
                style={{
                  opacity: i === slide ? 1 : 0,
                  transform: i === slide ? 'scale(1)' : 'scale(1.04)',
                }}
                aria-hidden={i !== slide}
              />
            ))}

            {/* Floating caption chip (updates with the active slide) */}
            <div className="hero-showcase-chip">
              <span className="hero-chip-dot" />
              <span key={slide} className="hero-chip-label">{SLIDES[slide].label}</span>
            </div>

            {/* Progress dots */}
            <div className="hero-showcase-dots">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  className={`hero-dot${i === slide ? ' active' : ''}`}
                  onClick={() => setSlide(i)}
                  aria-label={`Voir le projet ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-cursor { color: #1A1526; opacity: 1; font-weight: 300; }

        .hero-wrap {
          position: relative; z-index: 1;
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 32px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Badge */
        .hero-badge {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 7px 15px; margin-bottom: 26px;
          background: rgba(26,21,38,0.05);
          border: 1px solid rgba(26,21,38,0.09);
          border-radius: 100px;
          font-family: 'Mona Sans Variable', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(26,21,38,0.92);
          backdrop-filter: blur(8px);
        }
        .hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #FED24B; box-shadow: 0 0 10px rgba(254,210,75,0.9);
          animation: hero-pulse 2.2s ease-in-out infinite;
        }
        @keyframes hero-pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%     { opacity: 0.4; transform: scale(0.7); }
        }

        .hero-h1 { max-width: 18ch; }
        .hero-h1-static { display: block; }
        .hero-accent-wrap { display: block; min-height: 1.1em; }

        .hero-sub {
          font-family: 'Mona Sans Variable', sans-serif;
          font-size: 17px; font-weight: 400;
          color: rgba(26,21,38,0.72);
          line-height: 1.65;
          max-width: 620px;
          margin: 0 auto 34px;
        }

        /* CTA row */
        .hero-cta-row {
          display: flex; align-items: center; justify-content: center;
          gap: 16px; flex-wrap: wrap;
          margin-bottom: 64px;
        }
        .hero-btn-primary {
          background: #1A1526; color: #FED24B;
          font-family: 'Mona Sans Variable', sans-serif;
          font-weight: 700; font-size: 16px;
          padding: 16px 34px;
          border: none; border-radius: 100px; cursor: pointer;
          letter-spacing: -0.005em;
          transition: transform 0.5s ${SPRING}, background 0.3s ${EASE};
        }
        .hero-btn-primary:hover {
          transform: translateY(-2px);
          background: #000000;
        }
        .hero-btn-ghost {
          font-family: 'Mona Sans Variable', sans-serif;
          font-weight: 600; font-size: 15px;
          color: rgba(26,21,38,0.92); text-decoration: none;
          padding: 15px 26px;
          border: 1px solid rgba(26,21,38,0.14);
          border-radius: 100px;
          transition: color 0.3s ${EASE}, border-color 0.3s ${EASE}, background 0.3s ${EASE};
        }
        .hero-btn-ghost:hover {
          color: #FFFFFF;
          border-color: rgba(26,21,38,0.40);
          background: rgba(26,21,38,0.05);
        }

        /* Showcase card */
        .hero-showcase {
          position: relative;
          width: 100%;
          max-width: 1080px;
        }
        .hero-showcase::before {
          /* glow bloom behind the card */
          content: '';
          position: absolute; inset: -6% -4% -12%;
          background: radial-gradient(ellipse 60% 60% at 50% 40%, rgba(254,210,75,0.35), transparent 65%);
          filter: blur(50px);
          z-index: 0;
        }
        .hero-showcase-inner {
          position: relative; z-index: 1;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(26,21,38,0.09);
          box-shadow: 0 40px 100px rgba(0,0,0,0.6), inset 0 1px 0 rgba(26,21,38,0.09);
          background: #0c0a16;
          aspect-ratio: 16 / 8.5;
        }
        .hero-showcase-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          display: block;
          /* smooth crossfade + gentle zoom between slides */
          transition: opacity 1.1s ${EASE}, transform 5.6s ease-out;
          will-change: opacity, transform;
        }
        .hero-showcase-chip {
          position: absolute; left: 18px; bottom: 18px; z-index: 2;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 16px;
          background: rgba(10,8,20,0.72);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(26,21,38,0.14);
          border-radius: 100px;
          font-family: 'Mona Sans Variable', sans-serif;
          font-size: 12.5px; font-weight: 600;
          color: rgba(26,21,38,0.92);
        }
        .hero-chip-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #FED24B; box-shadow: 0 0 8px rgba(254,210,75,0.8);
          flex-shrink: 0;
        }
        .hero-chip-label {
          display: inline-block;
          animation: chipIn 0.6s ${EASE};
          white-space: nowrap;
        }
        @keyframes chipIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Slideshow dots */
        .hero-showcase-dots {
          position: absolute; right: 18px; bottom: 18px; z-index: 2;
          display: inline-flex; align-items: center; gap: 7px;
          padding: 8px 12px;
          background: rgba(10,8,20,0.55);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(26,21,38,0.09);
          border-radius: 100px;
        }
        .hero-dot {
          width: 8px; height: 8px; border-radius: 50%;
          border: none; padding: 0; cursor: pointer;
          background: rgba(26,21,38,0.40);
          transition: width 0.4s ${EASE}, background 0.4s ${EASE};
        }
        .hero-dot.active {
          width: 22px; border-radius: 5px;
          background: #FED24B;
        }

        @media (max-width: 768px) {
          #hero { padding-top: 108px !important; padding-bottom: 56px !important; }
          .hero-wrap { padding: 0 20px; }
          .hero-sub { font-size: 15.5px; }
          .hero-cta-row { margin-bottom: 44px; gap: 12px; }
          .hero-btn-primary, .hero-btn-ghost { width: 100%; text-align: center; }
          .hero-showcase-inner { aspect-ratio: 16 / 11; border-radius: 16px; }
          .hero-showcase-chip { font-size: 11px; padding: 7px 12px; left: 12px; bottom: 12px; }
          .hero-showcase-dots { right: 12px; bottom: 12px; padding: 6px 10px; gap: 6px; }
        }
        @media (max-width: 480px) {
          #hero { padding-top: 96px !important; }
          .hero-badge { font-size: 10px; letter-spacing: 0.1em; }
        }
      `}</style>
    </section>
  )
}
