import img1 from '../assets/projet-1-webflow.png'
import img2 from '../assets/projet-2-webflow.png'
import img3 from '../assets/projet-3-webflow.png'
import img4 from '../assets/projet-4-webflow.png'
import img5 from '../assets/projet-5-webflow.png'
import img6 from '../assets/projet-6-webflow.png'
import img7 from '../assets/projet-7-webflow.png'
import img8 from '../assets/projet-1-wordpress.png'
import img9 from '../assets/projet-2-wordpress.png'
import img10 from '../assets/projet-1-code.png'

const rowA = [img1, img2, img3, img4, img5]
const rowB = [img6, img7, img8, img9, img10]

function Row({ images, reverse }) {
  const track = [...images, ...images]
  return (
    <div className={`ticker-track${reverse ? ' rev' : ''}`}>
      {track.map((src, i) => (
        <div className="ticker-card" key={i}>
          <img src={src} alt="" loading="lazy" draggable={false} />
        </div>
      ))}
    </div>
  )
}

export default function VideoTicker() {
  const edgeMask =
    'radial-gradient(ellipse 96% 82% at 50% 50%, #000 55%, transparent 100%)'

  return (
    <section
      aria-hidden="true"
      className="ticker-section"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        background: '#05050F',
        padding: '40px 0',
      }}
    >
      {/* Tilted, feathered viewport with two opposing rows */}
      <div
        className="ticker-viewport"
        style={{
          maskImage: edgeMask,
          WebkitMaskImage: edgeMask,
        }}
      >
        <div className="ticker-stage">
          <Row images={rowA} />
          <Row images={rowB} reverse />
        </div>
      </div>

      {/* Ambient darkening + violet tint so it sits in the theme */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background:
          'linear-gradient(180deg, rgba(5,5,15,0.5) 0%, rgba(5,5,15,0.06) 45%, rgba(5,5,15,0.5) 100%), radial-gradient(ellipse 55% 65% at 50% 50%, rgba(139,92,246,0.10), transparent 70%)',
      }} />

      <style>{`
        .ticker-viewport { width: 100%; overflow: hidden; }
        .ticker-stage {
          display: flex;
          flex-direction: column;
          gap: 24px;
          /* tilt echoes the original diagonal drift, scale hides the tilt corners */
          transform: rotate(-3deg) scale(1.08);
          transform-origin: center;
        }
        .ticker-track {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: ticker-scroll 68s linear infinite;
          will-change: transform;
        }
        .ticker-track.rev {
          animation-direction: reverse;
          animation-duration: 82s;
          margin-left: -80px; /* offset so the two rows don't align */
        }
        .ticker-section:hover .ticker-track { animation-play-state: paused; }
        .ticker-card {
          flex-shrink: 0;
          width: 320px;
          height: 200px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 20px 50px rgba(0,0,0,0.45);
          background: #0a0912;
        }
        .ticker-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          user-select: none;
        }

        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-50% - 12px)); }
        }

        @media (max-width: 768px) {
          .ticker-section { padding: 28px 0; }
          .ticker-card { width: 240px; height: 150px; }
          .ticker-stage { gap: 18px; }
          .ticker-track { gap: 18px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
      `}</style>
    </section>
  )
}
