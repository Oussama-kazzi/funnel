import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useMotionValue, useSpring } from 'framer-motion'

const CARD_W    = 320
const CARD_H    = 400
const PREVIEW_H = 200
const CARD_GAP  = 20

const projects = [
  {
    id: '01',
    name: 'Slava Logistics',
    desc: 'Full Webflow build for a pan-European logistics operator — from brand system to live production site.',
    accent:    '#F59E0B',
    accentAlt: '#FCD34D',
    previewBg: 'linear-gradient(145deg, #100800 0%, #1E1200 55%, #2A1A00 100%)',
    href: '#',
  },
  {
    id: '02',
    name: 'GamFi',
    desc: 'Metaverse Web 3.0 gaming launchpad and IGO platform with wallet-first UX and NFT marketplace.',
    accent:    '#8B5CF6',
    accentAlt: '#C4B5FD',
    previewBg: 'linear-gradient(145deg, #06020F 0%, #100620 55%, #180A32 100%)',
    href: '#',
  },
  {
    id: '03',
    name: 'Payplus',
    desc: 'Next-generation mobile finance app — 10M+ projected users, 98% satisfaction, $250M in transactions.',
    accent:    '#EC4899',
    accentAlt: '#F9A8D4',
    previewBg: 'linear-gradient(145deg, #0D0215 0%, #1A0525 55%, #230A35 100%)',
    href: '#',
  },
  {
    id: '04',
    name: 'Montagna',
    desc: 'Ski school & outdoor adventure brand — Webflow build with booking, ecommerce, and motion design.',
    accent:    '#10B981',
    accentAlt: '#6EE7B7',
    previewBg: 'linear-gradient(145deg, #001409 0%, #002615 55%, #003320 100%)',
    href: '#',
  },
  {
    id: '05',
    name: 'Orbit',
    desc: 'Product analytics SaaS for B2B teams — custom dashboard system with real-time event pipeline.',
    accent:    '#06B6D4',
    accentAlt: '#67E8F9',
    previewBg: 'linear-gradient(145deg, #000C0F 0%, #001B22 55%, #002633 100%)',
    href: '#',
  },
  {
    id: '06',
    name: 'Stratum',
    desc: 'Real estate investment platform — end-to-end Framer site with property search, filters, and CMS.',
    accent:    '#6366F1',
    accentAlt: '#A5B4FC',
    previewBg: 'linear-gradient(145deg, #03030F 0%, #080820 55%, #0D0D30 100%)',
    href: '#',
  },
  {
    id: '07',
    name: 'Arca',
    desc: 'DeFi portfolio tracker and wallet UI — high-performance Next.js build with live chain data.',
    accent:    '#14B8A6',
    accentAlt: '#5EEAD4',
    previewBg: 'linear-gradient(145deg, #000F0E 0%, #001F1C 55%, #002B28 100%)',
    href: '#',
  },
]

/* ── Card ── */
function PortfolioCard({ project }) {
  const [hovered, setHovered] = useState(false)
  const { accent, accentAlt, previewBg } = project

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: CARD_W,
        minWidth: CARD_W,
        height: CARD_H,
        borderRadius: 18,
        border: `1px solid ${hovered ? `${accent}40` : 'rgba(255,255,255,0.08)'}`,
        background: 'rgba(255,255,255,0.02)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        transition: 'border-color 0.3s ease, box-shadow 0.35s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 24px 56px rgba(0,0,0,0.5), 0 0 0 1px ${accent}18, 0 0 48px ${accent}12`
          : '0 4px 18px rgba(0,0,0,0.28)',
      }}
    >
      {/* ── Preview (fixed height) ── */}
      <div style={{
        height: PREVIEW_H,
        flexShrink: 0,
        background: previewBg,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${accent}07 1px, transparent 1px), linear-gradient(90deg, ${accent}07 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }} />
        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -52%)',
          width: 140, height: 140,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}28 0%, ${accentAlt}10 55%, transparent 72%)`,
          filter: 'blur(22px)',
          opacity: hovered ? 1 : 0.55,
          transition: 'opacity 0.35s ease',
        }} />
        {/* Ring */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -52%)',
          width: 58, height: 58,
          borderRadius: '50%',
          border: `1px solid ${accent}28`,
          boxShadow: `0 0 18px ${accent}18`,
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          ...(hovered ? { borderColor: `${accent}55`, boxShadow: `0 0 28px ${accent}30` } : {}),
        }} />
        {/* Bottom fade into card bg */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 56,
          background: 'linear-gradient(to top, rgba(10,9,18,0.95), transparent)',
        }} />
      </div>

      {/* ── Content (fills remaining CARD_H - PREVIEW_H) ── */}
      <div style={{
        flex: 1,
        padding: '18px 20px 18px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 17, fontWeight: 800, color: '#FFFFFF',
          letterSpacing: '-0.025em', lineHeight: 1.2,
          marginBottom: 8,
          flexShrink: 0,
        }}>
          {project.name}
        </div>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12.5, color: 'rgba(255,255,255,0.38)',
          lineHeight: 1.65, margin: 0,
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {project.desc}
        </p>

        {/* Arrow */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 12, flexShrink: 0 }}>
          <a
            href={project.href}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: hovered ? accent : 'rgba(255,255,255,0.05)',
              border: `1px solid ${hovered ? accent : 'rgba(255,255,255,0.1)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none', flexShrink: 0,
              transition: 'background 0.25s ease, border-color 0.25s ease',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
              <path d="M2.5 10.5L10.5 2.5M10.5 2.5H5M10.5 2.5V8"
                stroke={hovered ? '#000' : 'rgba(255,255,255,0.55)'}
                strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

/* ── Heading ── */
function SectionHeading() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 80px', marginBottom: 40,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{
          fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
        }}>※</span>
        <span style={{
          fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.28)',
        }}>Featured Work</span>
        <span style={{
          fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
        }}>※</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.04em',
        }}>{projects.length} projects</span>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
          <path d="M0 5h14M10 1l4 4-4 4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}

/* ── Mobile snap-scroll layout ── */
function MobileSnapScroll() {
  return (
    <section style={{ padding: '48px 0 40px', overflow: 'hidden' }}>
      <div style={{ padding: '0 20px', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>※</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>Featured Work</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>※</span>
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>{projects.length} projects</span>
        </div>
      </div>
      <div className="hp-snap-track">
        {projects.map((p) => (
          <div key={p.id} className="hp-snap-item">
            <PortfolioCard project={p} />
          </div>
        ))}
      </div>
      <style>{`
        .hp-snap-track {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding: 8px 20px 16px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hp-snap-track::-webkit-scrollbar { display: none; }
        .hp-snap-item {
          scroll-snap-align: start;
          flex-shrink: 0;
          width: 88vw;
          max-width: ${CARD_W}px;
        }
      `}</style>
    </section>
  )
}

/* ── Tablet 2-column grid ── */
function StackedLayout({ columns }) {
  return (
    <section style={{ padding: '72px 32px 56px' }}>
      <SectionHeading />
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: CARD_GAP,
        maxWidth: 860,
        margin: '0 auto',
        justifyItems: 'center',
      }}>
        {projects.map((p) => (
          <PortfolioCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}

/* ── Main ── */
export default function HorizontalPortfolio() {
  const containerRef = useRef(null)
  const trackRef     = useRef(null)
  const maxXRef      = useRef(0)
  const breakRef     = useRef('desktop')

  const [layout, setLayout] = useState(() => {
    if (typeof window === 'undefined') return 'desktop'
    if (window.innerWidth < 640)  return 'mobile'
    if (window.innerWidth < 1024) return 'tablet'
    return 'desktop'
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const rawX    = useMotionValue(0)
  const smoothX = useSpring(rawX, { stiffness: 80, damping: 22, restDelta: 0.001 })

  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth
      const next = w < 640 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop'
      breakRef.current = next
      setLayout(next)

      if (next !== 'desktop' || !trackRef.current || !containerRef.current) return

      const trackW     = trackRef.current.scrollWidth
      const horizontal = Math.max(0, trackW - w)
      maxXRef.current  = horizontal
      // Compress the vertical scroll distance so the sticky section releases
      // right after the last card lands. Horizontal travel is preserved —
      // scrolling just moves cards through faster per pixel.
      const vertical = Math.min(horizontal * 0.4, 100)
      containerRef.current.style.height = `calc(100vh + ${vertical}px)`
    }

    const id = requestAnimationFrame(() => requestAnimationFrame(measure))
    window.addEventListener('resize', measure)
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', measure) }
  }, [])

  useEffect(() => {
    return scrollYProgress.on('change', v => {
      if (breakRef.current !== 'desktop') return
      rawX.set(-v * maxXRef.current)
    })
  }, [scrollYProgress]) // eslint-disable-line react-hooks/exhaustive-deps

  if (layout === 'mobile')  return <MobileSnapScroll />
  if (layout === 'tablet')  return <StackedLayout columns={2} />

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', height: `calc(100vh + 100px)` }}
    >
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <SectionHeading />

        <motion.div
          ref={trackRef}
          style={{
            x: smoothX,
            display: 'flex',
            gap: CARD_GAP,
            paddingLeft: 80,
            paddingRight: 80,
            alignItems: 'center',
            willChange: 'transform',
          }}
        >
          {projects.map((p) => (
            <PortfolioCard key={p.id} project={p} />
          ))}
        </motion.div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: 32, left: 80, right: 80,
          height: 1, background: 'rgba(255,255,255,0.06)',
        }}>
          <motion.div style={{
            height: '100%',
            background: 'rgba(199,247,81,0.5)',
            transformOrigin: 'left',
            scaleX: scrollYProgress,
          }} />
        </div>
      </div>
    </div>
  )
}
