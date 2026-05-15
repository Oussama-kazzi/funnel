import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useMotionValue, useSpring } from 'framer-motion'

/* ─────────────────────────────────────────────
   Project data
───────────────────────────────────────────── */
const projects = [
  {
    id: '01',
    name: 'Slava Logistics',
    category: 'Transport & Logistics',
    desc: 'Full Webflow build for a pan-European logistics operator — from brand system to live production site.',
    tags: [
      { label: 'Webflow Development', color: '#F59E0B', bg: 'rgba(245,158,11,0.14)' },
      { label: 'Logistics',           color: '#FCD34D', bg: 'rgba(252,211,77,0.10)' },
    ],
    accent:    '#F59E0B',
    accentAlt: '#FCD34D',
    previewBg: 'linear-gradient(145deg, #100800 0%, #1E1200 55%, #2A1A00 100%)',
    href: '#',
  },
  {
    id: '02',
    name: 'GamFi',
    category: 'Gaming · Web3',
    desc: 'Metaverse Web 3.0 gaming launchpad and IGO platform with wallet-first UX and NFT marketplace.',
    tags: [
      { label: 'Migration to Webflow', color: '#8B5CF6', bg: 'rgba(139,92,246,0.14)' },
      { label: 'NR Marketplace',       color: '#A78BFA', bg: 'rgba(167,139,250,0.10)' },
    ],
    accent:    '#8B5CF6',
    accentAlt: '#C4B5FD',
    previewBg: 'linear-gradient(145deg, #06020F 0%, #100620 55%, #180A32 100%)',
    href: '#',
  },
  {
    id: '03',
    name: 'Payplus',
    category: 'Fintech · Mobile',
    desc: 'Next-generation mobile finance app with 10M+ projected users, 98% satisfaction, and $250M transactions.',
    tags: [
      { label: 'Migration to Webflow', color: '#EC4899', bg: 'rgba(236,72,153,0.14)' },
      { label: 'Fintech',              color: '#F9A8D4', bg: 'rgba(249,168,212,0.10)' },
    ],
    accent:    '#EC4899',
    accentAlt: '#F9A8D4',
    previewBg: 'linear-gradient(145deg, #0D0215 0%, #1A0525 55%, #230A35 100%)',
    href: '#',
  },
  {
    id: '04',
    name: 'Montagna',
    category: 'Sports · Adventure',
    desc: 'Ski school & outdoor adventure brand — Webflow build with booking, ecommerce, and motion design.',
    tags: [
      { label: 'Webflow Development', color: '#10B981', bg: 'rgba(16,185,129,0.14)' },
      { label: 'Adventure',           color: '#34D399', bg: 'rgba(52,211,153,0.10)' },
    ],
    accent:    '#10B981',
    accentAlt: '#6EE7B7',
    previewBg: 'linear-gradient(145deg, #001409 0%, #002615 55%, #003320 100%)',
    href: '#',
  },
]

/* ─────────────────────────────────────────────
   Card preview mockup — unique per project
───────────────────────────────────────────── */
function PreviewMockup({ project }) {
  const { accent, accentAlt, previewBg, id } = project

  return (
    <div style={{ width: '100%', height: '100%', background: previewBg, position: 'relative', overflow: 'hidden' }}>

      {/* Browser chrome */}
      <div style={{
        position: 'absolute', top: 20, left: 20, right: 20, height: 30,
        background: 'rgba(255,255,255,0.055)', borderRadius: 7,
        display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px',
        backdropFilter: 'blur(4px)',
      }}>
        {['#FF5F57','#FEBC2E','#28C840'].map((c, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.75, flexShrink: 0 }} />
        ))}
        <div style={{ flex: 1, height: 9, background: 'rgba(255,255,255,0.07)', borderRadius: 4, margin: '0 8px' }} />
      </div>

      {/* Navbar */}
      <div style={{
        position: 'absolute', top: 62, left: 20, right: 20, height: 26,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ width: 48, height: 9, background: accent, borderRadius: 4, opacity: 0.9, flexShrink: 0 }} />
        {[66, 52, 58].map((w, i) => (
          <div key={i} style={{ width: w, height: 7, background: 'rgba(255,255,255,0.10)', borderRadius: 3 }} />
        ))}
        <div style={{ marginLeft: 'auto', width: 56, height: 20, background: accent, borderRadius: 5, opacity: 0.85, flexShrink: 0 }} />
      </div>

      {/* ─── project-specific hero area ─── */}

      {id === '01' && (
        /* Slava Logistics — route + trucks */
        <>
          <div style={{ position: 'absolute', top: 104, left: 20, right: '42%' }}>
            <div style={{ width: '90%', height: 13, background: 'rgba(255,255,255,0.8)', borderRadius: 3, marginBottom: 6 }} />
            <div style={{ width: '70%', height: 13, background: accent, borderRadius: 3, marginBottom: 6 }} />
            <div style={{ width: '95%', height: 13, background: 'rgba(255,255,255,0.8)', borderRadius: 3, marginBottom: 14 }} />
            <div style={{ width: '80%', height: 6, background: 'rgba(255,255,255,0.18)', borderRadius: 2, marginBottom: 4 }} />
            <div style={{ width: '65%', height: 6, background: 'rgba(255,255,255,0.12)', borderRadius: 2, marginBottom: 18 }} />
            <div style={{ width: 76, height: 22, background: accent, borderRadius: 5 }} />
          </div>
          <div style={{ position: 'absolute', top: 100, right: 12, width: '38%', bottom: 12 }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${accent}30`, borderRadius: 8, height: '100%', padding: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {/* Road / route visual */}
              <div style={{ flex: 1, position: 'relative' }}>
                <svg width="100%" height="100%" viewBox="0 0 120 100" preserveAspectRatio="xMidYMid meet">
                  <line x1="20" y1="80" x2="100" y2="20" stroke={`${accent}60`} strokeWidth="2" strokeDasharray="4 3"/>
                  {[[20,80],[55,50],[100,20]].map(([x,y],i) => (
                    <circle key={i} cx={x} cy={y} r="5" fill={i===2 ? accent : `${accent}80`} />
                  ))}
                  <rect x="45" y="42" width="18" height="10" rx="2" fill={accent} opacity="0.85"/>
                  <rect x="43" y="46" width="4" height="8" rx="1" fill={accentAlt} opacity="0.6"/>
                </svg>
              </div>
              <div style={{ height: 6, background: `${accent}40`, borderRadius: 2 }} />
              <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 2, width: '70%' }} />
            </div>
          </div>
        </>
      )}

      {id === '02' && (
        /* GamFi — grid + glow */
        <>
          {/* Grid pattern */}
          <svg style={{ position: 'absolute', top: 58, left: 0, right: 0, bottom: 0, width: '100%', height: '75%', opacity: 0.18 }} preserveAspectRatio="none">
            <defs>
              <pattern id="grid-gamfi" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke={accent} strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-gamfi)"/>
          </svg>
          <div style={{ position: 'absolute', top: 104, left: 20, right: '40%' }}>
            <div style={{ fontSize: 9, fontFamily: 'Inter', color: `${accent}CC`, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>Metaverse Web 3.0</div>
            <div style={{ width: '90%', height: 11, background: 'rgba(255,255,255,0.8)', borderRadius: 3, marginBottom: 5 }} />
            <div style={{ width: '75%', height: 11, background: 'rgba(255,255,255,0.8)', borderRadius: 3, marginBottom: 14 }} />
            <div style={{ width: '85%', height: 5, background: 'rgba(255,255,255,0.15)', borderRadius: 2, marginBottom: 4 }} />
            <div style={{ width: '60%', height: 5, background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginBottom: 16 }} />
            <div style={{ width: 76, height: 22, background: accent, borderRadius: 5, boxShadow: `0 4px 16px ${accent}60` }} />
          </div>
          <div style={{ position: 'absolute', top: 96, right: 12, width: '36%', bottom: 12 }}>
            <div style={{ background: `${accent}15`, border: `1px solid ${accent}40`, borderRadius: 10, height: '100%', padding: 10, display: 'flex', flexDirection: 'column', gap: 6, boxShadow: `inset 0 0 20px ${accent}20` }}>
              <div style={{ height: 36, background: `${accent}25`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: accent, opacity: 0.7 }} />
              </div>
              {[100, 75, 88].map((w, i) => (
                <div key={i} style={{ height: 5, background: `${accent}30`, borderRadius: 2, width: `${w}%` }} />
              ))}
              <div style={{ flex: 1 }} />
              <div style={{ height: 20, background: accent, borderRadius: 5, opacity: 0.8 }} />
            </div>
          </div>
        </>
      )}

      {id === '03' && (
        /* Payplus — mobile app mock */
        <>
          <div style={{ position: 'absolute', top: 104, left: 20, right: '42%' }}>
            <div style={{ fontSize: 9, fontFamily: 'Inter', color: `${accent}CC`, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Next-gen finance app</div>
            <div style={{ width: '88%', height: 11, background: 'rgba(255,255,255,0.8)', borderRadius: 3, marginBottom: 5 }} />
            <div style={{ width: '65%', height: 11, background: 'rgba(255,255,255,0.8)', borderRadius: 3, marginBottom: 14 }} />
            <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
              <div style={{ width: 50, height: 14, background: 'rgba(255,255,255,0.1)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)' }} />
              <div style={{ width: 50, height: 14, background: 'rgba(255,255,255,0.1)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)' }} />
            </div>
            <div style={{ display: 'flex', gap: 20, marginBottom: 6 }}>
              {[['10M', 'Users'], ['98%', 'Rating'], ['250M', 'Trans']].map(([n, l], i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11, fontWeight: 800, color: accent }}>{n}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 7, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Phone mockup */}
          <div style={{ position: 'absolute', top: 88, right: 18, width: 62, bottom: 12 }}>
            <div style={{ background: `linear-gradient(180deg, ${accent}20, ${accentAlt}10)`, border: `1px solid ${accent}40`, borderRadius: 14, height: '100%', padding: 5, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, width: '60%', margin: '0 auto' }} />
              <div style={{ flex: 1, background: `${accent}15`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${accent}, ${accentAlt})`, opacity: 0.8 }} />
              </div>
              {[100, 80].map((w, i) => (
                <div key={i} style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, width: `${w}%` }} />
              ))}
            </div>
          </div>
        </>
      )}

      {id === '04' && (
        /* Montagna — ski/mountain */
        <>
          <div style={{ position: 'absolute', top: 104, left: 20, right: '40%' }}>
            <div style={{ fontSize: 9, fontFamily: 'Inter', color: `${accent}CC`, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Ski school for everyone</div>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 12, letterSpacing: '-0.02em' }}>
              Made for<br/><span style={{ color: accent }}>winter sports</span>
            </div>
            <div style={{ width: '85%', height: 5, background: 'rgba(255,255,255,0.15)', borderRadius: 2, marginBottom: 4 }} />
            <div style={{ width: '65%', height: 5, background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginBottom: 14 }} />
            <div style={{ width: 76, height: 22, background: accent, borderRadius: 5 }} />
          </div>
          <div style={{ position: 'absolute', top: 96, right: 10, width: '40%', bottom: 10 }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${accent}30`, borderRadius: 8, height: '100%', overflow: 'hidden', position: 'relative' }}>
              {/* Mountain silhouette */}
              <svg width="100%" height="100%" viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
                <polygon points="60,15 100,90 20,90" fill={`${accent}18`} stroke={`${accent}50`} strokeWidth="0.8"/>
                <polygon points="35,45 65,90 5,90"  fill={`${accent}10`} stroke={`${accent}30`} strokeWidth="0.6"/>
                <line x1="0" y1="90" x2="120" y2="90" stroke={`${accent}40`} strokeWidth="0.8"/>
              </svg>
              <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8 }}>
                {[100, 75, 60].map((w, i) => (
                  <div key={i} style={{ height: 4, background: `${accent}30`, borderRadius: 2, marginBottom: 3, width: `${w}%` }} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bottom ambient glow */}
      <div style={{
        position: 'absolute', bottom: -30, left: '15%', right: '15%', height: '55%',
        background: `radial-gradient(ellipse at 50% 100%, ${accent}35, transparent 70%)`,
        pointerEvents: 'none',
      }} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Single portfolio card
───────────────────────────────────────────── */
function PortfolioCard({ project, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 520,
        minWidth: 520,
        height: 560,
        borderRadius: 20,
        border: `1px solid ${hovered ? `${project.accent}35` : 'rgba(255,255,255,0.08)'}`,
        background: hovered ? 'rgba(255,255,255,0.035)' : 'rgba(255,255,255,0.02)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.35s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px ${project.accent}20`
          : '0 8px 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* Preview — 55% height */}
      <div style={{ height: 308, flexShrink: 0, position: 'relative' }}>
        <PreviewMockup project={project} />
        {/* Index badge */}
        <div style={{
          position: 'absolute', bottom: 14, left: 16,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
          color: 'rgba(255,255,255,0.25)',
        }}>{project.id}</div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 24px 20px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>

        {/* Name + category */}
        <div>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 20, fontWeight: 800, color: '#FFFFFF',
            letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: 5,
          }}>{project.name}</div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.06em', textTransform: 'uppercase',
          }}>{project.category}</div>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13, color: 'rgba(255,255,255,0.42)',
          lineHeight: 1.65, margin: 0, flex: 1,
        }}>{project.desc}</p>

        {/* Tags + CTA row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {project.tags.map((tag, i) => (
              <span key={i} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10, fontWeight: 600,
                color: tag.color,
                background: tag.bg,
                border: `1px solid ${tag.color}28`,
                padding: '4px 10px',
                borderRadius: 100,
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
              }}>{tag.label}</span>
            ))}
          </div>
          <a
            href={project.href}
            style={{
              flexShrink: 0,
              width: 36, height: 36, borderRadius: '50%',
              background: hovered ? project.accent : 'rgba(255,255,255,0.06)',
              border: `1px solid ${hovered ? project.accent : 'rgba(255,255,255,0.12)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none',
              transition: 'background 0.25s ease, border-color 0.25s ease',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2.5 10.5L10.5 2.5M10.5 2.5H5M10.5 2.5V8"
                stroke={hovered ? '#000' : 'rgba(255,255,255,0.6)'}
                strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Section heading
───────────────────────────────────────────── */
function SectionHeading() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 80px', marginBottom: 40,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
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

/* ─────────────────────────────────────────────
   Mobile stacked layout
───────────────────────────────────────────── */
function MobileLayout() {
  return (
    <section style={{ padding: '80px 20px 60px' }}>
      <SectionHeading />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
        {projects.map((p, i) => (
          <div key={p.id} style={{ width: '100%', maxWidth: 520 }}>
            <PortfolioCard project={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Main component — desktop: sticky h-scroll
───────────────────────────────────────────── */
export default function HorizontalPortfolio() {
  const containerRef = useRef(null)
  const trackRef     = useRef(null)
  const maxXRef      = useRef(0)
  const isMobileRef  = useRef(false)

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 1024
  )

  /* scroll progress over the full container */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  /* raw x motion value → smooth spring */
  const rawX    = useMotionValue(0)
  const smoothX = useSpring(rawX, { stiffness: 80, damping: 22, restDelta: 0.001 })

  /* ── measure & set container height ── */
  useEffect(() => {
    const measure = () => {
      const mobile = window.innerWidth < 1024
      isMobileRef.current = mobile
      setIsMobile(mobile)

      if (mobile || !trackRef.current || !containerRef.current) return

      const trackW     = trackRef.current.scrollWidth
      const vw         = window.innerWidth
      const scrollable = Math.max(0, trackW - vw + 80) // 80px right breathing room
      maxXRef.current  = scrollable
      containerRef.current.style.height = `calc(100vh + ${scrollable}px)`
    }

    /* run after first paint so refs are populated */
    const id = requestAnimationFrame(() => requestAnimationFrame(measure))
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('resize', measure)
    }
  }, [])

  /* ── drive rawX from scroll ── */
  useEffect(() => {
    return scrollYProgress.on('change', v => {
      if (isMobileRef.current) return
      rawX.set(-v * maxXRef.current)
    })
  }, [scrollYProgress]) // eslint-disable-line react-hooks/exhaustive-deps

  if (isMobile) return <MobileLayout />

  return (
    <div
      ref={containerRef}
      /* initial height; overwritten by measurement */
      style={{ position: 'relative', height: `calc(100vh + ${Math.max(projects.length - 1, 1) * 560}px)` }}
    >
      {/* ── sticky viewport ── */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>

        <SectionHeading />

        {/* ── animated cards track ── */}
        <motion.div
          ref={trackRef}
          style={{
            x: smoothX,
            display: 'flex',
            gap: 28,
            paddingLeft: 80,
            paddingRight: 80,
            alignItems: 'center',
            willChange: 'transform',
          }}
        >
          {projects.map((p, i) => (
            <PortfolioCard key={p.id} project={p} index={i} />
          ))}
        </motion.div>

        {/* ── progress bar ── */}
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
