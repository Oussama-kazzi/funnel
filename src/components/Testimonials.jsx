import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    stars: 5,
    quote: "FUTURA didn't just redesign our product — they rethought how users move through it. The activation rate jumped by 280% in the first 60 days. That's not a UI refresh. That's a growth lever.",
    initials: 'NB',
    name: 'Nour B.',
    role: 'CEO, Meridian AI',
    metric: '+280%',
    metricLabel: 'activation rate in 60 days',
  },
  {
    stars: 5,
    quote: "Three agencies gave us mood boards. FUTURA gave us a product architecture and shipped it in six weeks. The difference was night and day — we went into our Series A with a product we were proud to demo.",
    initials: 'JS',
    name: 'James S.',
    role: 'Co-founder, Vault Finance',
    metric: '6 wks',
    metricLabel: 'from kickoff to ship',
  },
  {
    stars: 5,
    quote: "Our design system from FUTURA became the foundation our engineering team actually uses. Clean, documented, and built to scale. We've onboarded five engineers since and the handoff was seamless.",
    initials: 'LL',
    name: 'Léa L.',
    role: 'CPO, Forma Studio',
    metric: '4.6×',
    metricLabel: 'daily active usage post-launch',
  },
  {
    stars: 5,
    quote: "We'd tried two other agencies before FUTURA. Neither could hold both design quality and technical execution at the same time. FUTURA did both, and delivered faster than either of them.",
    initials: 'AK',
    name: 'Amir K.',
    role: 'CTO, Orbit Protocol',
    metric: '89%',
    metricLabel: 'drop-off reduction at checkout',
  },
  {
    stars: 5,
    quote: "I was skeptical about the six-week timeline. We hit it. The product they handed us was production-ready, well-documented, and something our team actually understood. Zero throwaway code.",
    initials: 'SR',
    name: 'Sofia R.',
    role: 'Founder, Pulse Analytics',
    metric: '$2.4M',
    metricLabel: 'raised on the back of the design',
  },
  {
    stars: 5,
    quote: "FUTURA pushed back on two of our assumptions in week one. They were right both times. That kind of senior thinking — not just executing briefs — is exactly what we needed at this stage.",
    initials: 'TM',
    name: 'Thomas M.',
    role: 'VP Product, Layer Labs',
    metric: '3.1×',
    metricLabel: 'onboarding completion rate',
  },
]

const SPRING = { type: 'spring', stiffness: 180, damping: 24, mass: 1.3 }

// Returns signed position offset: 0 = center, -1 = left, +1 = right
function getOffset(index, active, total) {
  const raw = (index - active + total) % total
  return raw > total / 2 ? raw - total : raw
}

function getCardAnim(index, active, total, sideX) {
  const offset = getOffset(index, active, total)
  if (offset === 0) {
    return { x: 0, scale: 1, rotateY: 0, opacity: 1, zIndex: 3 }
  }
  if (Math.abs(offset) === 1) {
    const dir = Math.sign(offset)
    return { x: dir * sideX, scale: 0.8, rotateY: dir * -24, opacity: 0.55, zIndex: 2 }
  }
  // Far / hidden cards
  const dir = Math.sign(offset)
  return { x: dir * sideX * 1.9, scale: 0.65, rotateY: dir * -42, opacity: 0, zIndex: 1 }
}

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="#F59E0B">
          <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.5 4.3 12.3 5 8.2 2 5.3l4.2-.7z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ t, isActive }) {
  return (
    <div style={{
      background: isActive
        ? 'linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(199,247,81,0.05) 100%)'
        : 'linear-gradient(160deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 100%)',
      border: isActive
        ? '1px solid rgba(199,247,81,0.22)'
        : '1px solid rgba(255,255,255,0.07)',
      borderRadius: 20,
      padding: '32px 28px 26px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxSizing: 'border-box',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
      boxShadow: isActive
        ? '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(199,247,81,0.08), 0 0 60px rgba(199,247,81,0.06)'
        : '0 8px 32px rgba(0,0,0,0.3)',
    }}>
      {/* Shimmer line on top edge (active only) */}
      <div style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
        background: isActive
          ? 'linear-gradient(90deg, transparent, rgba(199,247,81,0.45), transparent)'
          : 'transparent',
        transition: 'background 0.4s ease',
        pointerEvents: 'none',
      }} />

      {/* Inner glow (active only) */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '45%',
        background: isActive
          ? 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(199,247,81,0.06), transparent 80%)'
          : 'transparent',
        transition: 'background 0.5s ease',
        pointerEvents: 'none',
      }} />

      {/* Metric */}
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 8,
        marginBottom: 22,
        paddingBottom: 18,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 34, fontWeight: 800,
          color: '#C7F751', letterSpacing: '-0.04em', lineHeight: 1,
          textShadow: isActive ? '0 0 28px rgba(199,247,81,0.4)' : 'none',
          transition: 'text-shadow 0.4s ease',
        }}>
          {t.metric}
        </span>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12, color: 'rgba(255,255,255,0.38)',
          lineHeight: 1.35, maxWidth: 110,
        }}>
          {t.metricLabel}
        </span>
      </div>

      <Stars count={t.stars} />

      <blockquote style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 14.5, color: 'rgba(255,255,255,0.58)',
        lineHeight: 1.75, fontStyle: 'italic',
        flex: 1, marginBottom: 24,
      }}>
        "{t.quote}"
      </blockquote>

      {/* Author */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 11,
        paddingTop: 18,
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'linear-gradient(135deg, #A8D830, #C7F751)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 12, fontWeight: 700, color: '#050816',
          flexShrink: 0,
          boxShadow: isActive
            ? '0 0 0 3px rgba(199,247,81,0.18), 0 0 20px rgba(199,247,81,0.2)'
            : '0 0 0 2px rgba(199,247,81,0.08)',
          transition: 'box-shadow 0.4s ease',
        }}>
          {t.initials}
        </div>
        <div>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 13, fontWeight: 600, color: '#FFFFFF',
          }}>
            {t.name}
          </div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11, color: 'rgba(255,255,255,0.36)',
          }}>
            {t.role}
          </div>
        </div>
      </div>
    </div>
  )
}


export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)
  const [windowWidth, setWindowWidth] = useState(1200)
  const ref = useRef(null)
  const n = testimonials.length

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const onResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowLeft')  setActive(a => (a - 1 + n) % n)
      if (e.key === 'ArrowRight') setActive(a => (a + 1) % n)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [n])

  const isMobile = windowWidth < 768
  const cardWidth  = isMobile ? 300 : 420
  const cardHeight = isMobile ? 520 : 460
  const sideX      = isMobile ? 210 : 365
  const stageH     = cardHeight + 40  // breathing room for scale

  return (
    <section
      ref={ref}
      style={{
        padding: '120px 0 100px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 32px',
        marginBottom: 56,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.14em',
          color: '#C7F751', marginBottom: 16,
        }}>
          Client voices
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontWeight: 800, letterSpacing: '-0.04em',
            color: '#FFFFFF', lineHeight: 1.05, margin: 0,
          }}>
            What founders say.
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15, color: 'rgba(255,255,255,0.38)',
            maxWidth: 340, lineHeight: 1.65,
          }}>
            Click any card — or use the arrows — to explore what clients share about working with us.
          </p>
        </div>
      </div>

      {/* Stage wrapper — holds cards + nav buttons */}
      <div style={{
        position: 'relative',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.18s, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.18s',
      }}>
        {/* 3-D stage */}
        <div style={{
          position: 'relative',
          height: stageH,
          perspective: '1100px',
          perspectiveOrigin: '50% 50%',
        }}>
          {testimonials.map((t, i) => {
            const { x, scale, rotateY, opacity, zIndex } = getCardAnim(i, active, n, sideX)
            return (
              <motion.div
                key={i}
                onClick={() => setActive(i)}
                style={{
                  position: 'absolute',
                  width: cardWidth,
                  height: cardHeight,
                  left: `calc(50% - ${cardWidth / 2}px)`,
                  top: 20,
                  zIndex,
                  cursor: i === active ? 'default' : 'pointer',
                  transformOrigin: 'center center',
                }}
                animate={{ x, scale, rotateY, opacity }}
                transition={SPRING}
              >
                <TestimonialCard t={t} isActive={i === active} />
              </motion.div>
            )
          })}
        </div>

      </div>

      {/* Dot indicators */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 8,
        marginTop: 36,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease 0.3s',
      }}>
        {testimonials.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            animate={{
              width: i === active ? 26 : 8,
              background: i === active ? '#C7F751' : 'rgba(199,247,81,0.22)',
              boxShadow: i === active ? '0 0 10px rgba(199,247,81,0.45)' : '0 0 0px transparent',
            }}
            transition={{ duration: 0.3 }}
            style={{
              height: 8, borderRadius: 4,
              border: 'none', cursor: 'pointer', padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  )
}
