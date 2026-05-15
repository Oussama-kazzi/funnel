import { useState, useEffect, useRef } from 'react'

const clients = [
  { name: 'Meridian AI',     abbr: 'MA', desc: 'AI Infrastructure',  accent: '#00FF87' },
  { name: 'Vault Finance',   abbr: 'VF', desc: 'Fintech Platform',   accent: '#00CC6E' },
  { name: 'Pulse Analytics', abbr: 'PA', desc: 'B2B Analytics',      accent: '#10B981' },
  { name: 'Forma Studio',    abbr: 'FS', desc: 'Design Tools',       accent: '#00FF87' },
  { name: 'Orbit Protocol',  abbr: 'OP', desc: 'Web3 Layer',         accent: '#34D399' },
  { name: 'Layer Labs',      abbr: 'LL', desc: 'Dev Platform',       accent: '#00CC6E' },
]

function ClientCard({ client, idx }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        minWidth: 264,
        background: hovered ? 'rgba(0,255,135,0.06)' : 'rgba(255,255,255,0.03)',
        border: hovered
          ? '1px solid rgba(0,255,135,0.3)'
          : '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        padding: '18px 22px',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        cursor: 'default',
        transition: [
          'background 0.35s cubic-bezier(0.23,1,0.32,1)',
          'border-color 0.35s cubic-bezier(0.23,1,0.32,1)',
          'box-shadow 0.35s cubic-bezier(0.23,1,0.32,1)',
          'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
        ].join(', '),
        transform: hovered ? 'scale(1.03) translateY(-2px)' : 'scale(1) translateY(0)',
        boxShadow: hovered
          ? `0 16px 48px rgba(0,255,135,0.14), 0 0 0 1px rgba(0,255,135,0.08)`
          : '0 2px 16px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Top shimmer on hover */}
      <div style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
        background: hovered
          ? `linear-gradient(90deg, transparent, ${client.accent}90, transparent)`
          : 'transparent',
        transition: 'background 0.4s ease',
        pointerEvents: 'none',
      }} />

      {/* Inner top glow on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '55%',
        background: hovered
          ? `radial-gradient(ellipse 60% 50% at 50% 0%, ${client.accent}12, transparent 80%)`
          : 'transparent',
        transition: 'background 0.4s ease',
        pointerEvents: 'none',
      }} />

      {/* Avatar */}
      <div style={{ position: 'relative', flexShrink: 0, width: 44, height: 44 }}>
        {/* Pulsing glow ring */}
        <div style={{
          position: 'absolute', inset: -5, borderRadius: 16,
          background: `radial-gradient(ellipse at center, ${client.accent}30, transparent 70%)`,
          animation: `cl-glow-pulse 3s ease-in-out infinite ${idx * 380}ms`,
          pointerEvents: 'none',
        }} />
        {/* Tile */}
        <div style={{
          position: 'relative', width: '100%', height: '100%', borderRadius: 12,
          background: `linear-gradient(135deg, ${client.accent}22 0%, ${client.accent}55 100%)`,
          border: `1px solid ${client.accent}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 13, fontWeight: 800, color: '#FFFFFF',
            letterSpacing: '-0.01em',
          }}>{client.abbr}</span>
          {/* Status dot */}
          <span style={{
            position: 'absolute', bottom: -3, right: -3,
            width: 10, height: 10, borderRadius: '50%',
            background: '#22C55E',
            border: '2px solid #0A0A0A',
            boxShadow: '0 0 0 3px rgba(34,197,94,0.18)',
          }} />
        </div>
      </div>

      {/* Text */}
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 15, fontWeight: 700, color: '#FFFFFF',
          letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: 4,
          whiteSpace: 'nowrap',
        }}>{client.name}</div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12, color: 'rgba(255,255,255,0.32)',
          letterSpacing: '0.01em', whiteSpace: 'nowrap',
        }}>{client.desc}</div>
      </div>
    </div>
  )
}

function MarqueeRow({ reverse, speed }) {
  const items = [...clients, ...clients, ...clients]

  return (
    <div className="cl-row-mask">
      <div
        className={reverse ? 'cl-track cl-track-reverse' : 'cl-track'}
        style={{ '--speed': `${speed}s` }}
      >
        {items.map((c, i) => (
          <ClientCard key={`${c.abbr}-${i}`} client={c} idx={i % clients.length} />
        ))}
      </div>
    </div>
  )
}

export default function ClientLogos() {
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
    <section
      ref={ref}
      style={{
        position: 'relative',
        padding: '96px 0 88px',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%', height: '100%',
        background: 'radial-gradient(ellipse at center, rgba(0,255,135,0.05) 0%, rgba(0,204,110,0.02) 40%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Grain */}
      <div style={{
        position: 'absolute', top: '-50%', left: '-50%',
        width: '200%', height: '200%',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '160px 160px',
        opacity: 0.022, mixBlendMode: 'overlay', pointerEvents: 'none',
      }} />

      {/* Top border */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <div style={{
          textAlign: 'center', marginBottom: 56, padding: '0 32px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div style={{ width: 36, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15))' }} />
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
              color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.2em',
            }}>Trusted By</span>
            <div style={{ width: 36, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.15), transparent)' }} />
          </div>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(17px, 2.2vw, 24px)', fontWeight: 600,
            color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.02em',
            lineHeight: 1.45, maxWidth: 500, margin: '0 auto',
          }}>
            Trusted by founders building the next generation of products
          </p>
        </div>
      </div>

      {/* Marquee rows — full bleed, no max-width */}
      <div style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.9s ease 200ms',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <MarqueeRow reverse={false} speed={38} />
        <MarqueeRow reverse={true}  speed={50} />
      </div>

      {/* Bottom separator */}
      <div style={{
        maxWidth: 1100, margin: '60px auto 0', padding: '0 32px',
        display: 'flex', alignItems: 'center', gap: 20,
        position: 'relative', zIndex: 1,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.7s ease 500ms',
      }}>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06))' }} />
        <span style={{
          fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500,
          color: 'rgba(255,255,255,0.2)', letterSpacing: '0.14em',
          textTransform: 'uppercase', whiteSpace: 'nowrap',
        }}>50+ product teams shipped</span>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.06), transparent)' }} />
      </div>

      {/* Bottom border */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
        pointerEvents: 'none',
      }} />

      <style>{`
        /* Each row: mask fades edges, overflow clips horizontal seam */
        .cl-row-mask {
          overflow: hidden;
          padding: 8px 0;
          /* Fade left + right edges */
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            #000 8%,
            #000 92%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            #000 8%,
            #000 92%,
            transparent 100%
          );
        }

        /* Scrolling track */
        .cl-track {
          display: flex;
          gap: 14px;
          width: max-content;
          animation: cl-scroll-left var(--speed, 38s) linear infinite;
        }
        .cl-track-reverse {
          animation-name: cl-scroll-right;
        }

        /* Pause entire row on hover */
        .cl-row-mask:hover .cl-track {
          animation-play-state: paused;
        }

        @keyframes cl-scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes cl-scroll-right {
          0%   { transform: translateX(calc(-100% / 3)); }
          100% { transform: translateX(0); }
        }

        @keyframes cl-glow-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1);    }
          50%       { opacity: 0.75; transform: scale(1.18); }
        }
      `}</style>
    </section>
  )
}
