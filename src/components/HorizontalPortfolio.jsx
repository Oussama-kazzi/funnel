import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useMotionValue, useSpring } from 'framer-motion'

import img1  from '../assets/projet-3-webflow.png'
import img2  from '../assets/projet-2-webflow.png'
import img3  from '../assets/projet-1-webflow.png'
import img4  from '../assets/projet-4-webflow.png'
import img5  from '../assets/projet-5-webflow.png'
import img6  from '../assets/projet-6-webflow.png'
import img7  from '../assets/projet-7-webflow.png'
import img8  from '../assets/projet-1-wordpress.png'
import img9  from '../assets/projet-2-wordpress.png'
import img10 from '../assets/projet-1-code.png'

const CARD_W    = 320
const CARD_H    = 400
const PREVIEW_H = 200
const CARD_GAP  = 20

const projects = [
  {
    id: '01',
    name: 'Slava Logistics',
    desc: 'Site Webflow complet pour un opérateur logistique pan-européen — de l’identité de marque à la mise en ligne.',
    accent:    '#F59E0B',
    accentAlt: '#FCD34D',
    image: img1,
    href: 'https://slavalogistics.webflow.io/',
  },
  {
    id: '02',
    name: 'Payplus',
    desc: 'Application mobile de finance nouvelle génération — plus de 10M d’utilisateurs projetés et 98% de satisfaction.',
    accent:    '#EC4899',
    accentAlt: '#F9A8D4',
    image: img2,
    href: 'https://payplus.webflow.io/',
  },
  {
    id: '03',
    name: 'Montagna',
    desc: 'Marque d’aventure et école de ski — site Webflow avec réservation, e-commerce et animations.',
    accent:    '#10B981',
    accentAlt: '#6EE7B7',
    image: img3,
    href: 'https://montagna.webflow.io/',
  },
  {
    id: '04',
    name: 'Midlane',
    desc: 'Site Webflow premium au design épuré, animations sur mesure et structure orientée conversion.',
    accent:    '#06B6D4',
    accentAlt: '#67E8F9',
    image: img4,
    href: 'https://www.midlane.com/',
  },
  {
    id: '05',
    name: 'Sunsurf Maroc',
    desc: 'Surf camp et voyages d’aventure — présence web complète avec système de réservation et design immersif.',
    accent:    '#F97316',
    accentAlt: '#FDBA74',
    image: img5,
    href: 'https://sunsurfmaroc.com/',
  },
  {
    id: '06',
    name: 'Dar Surfana Morocco',
    desc: 'Lodge de surf boutique — réservation de chambres, galerie et storytelling dans un site Webflow sur mesure.',
    accent:    '#EAB308',
    accentAlt: '#FED24B',
    image: img6,
    href: 'https://darsurfanamorocco.com/',
  },
  {
    id: '07',
    name: 'Salt House Morocco',
    desc: 'Retraite de surf en bord de mer — design sur mesure, parcours de réservation et photographie lifestyle.',
    accent:    '#14B8A6',
    accentAlt: '#5EEAD4',
    image: img7,
    href: 'https://salthousemorocco.com/',
  },
  {
    id: '08',
    name: 'Souk2Surf',
    desc: 'Plateforme de voyage surf mêlant culture marocaine et spots de vagues — séjours, coaching et expériences.',
    accent:    '#FED24B',
    accentAlt: '#FED24B',
    image: img8,
    href: 'https://souk2surf.com/',
  },
  {
    id: '09',
    name: 'Surfana Tours',
    desc: 'Tour-opérateur de surf premium — offres multi-destinations, expériences guidées et marque communautaire.',
    accent:    '#FED24B',
    accentAlt: '#A5B4FC',
    image: img9,
    href: 'https://surfanatours.com/',
  },
  {
    id: '10',
    name: 'Adsolution',
    desc: 'Agence de marketing digital — design orienté performance avec capture de leads, études de cas et CMS.',
    accent:    '#FED24B',
    accentAlt: '#D8B4FE',
    image: img10,
    href: 'https://adsolution.ma/',
  },
]

/* ── Card ── */
function PortfolioCard({ project }) {
  const [hovered, setHovered] = useState(false)
  const { accent, accentAlt, image } = project

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: CARD_W,
        minWidth: CARD_W,
        height: CARD_H,
        borderRadius: 18,
        border: `1px solid ${hovered ? `${accent}40` : 'rgba(26,21,38,0.09)'}`,
        background: 'rgba(26,21,38,0.05)',
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
        background: '#0a0912',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Project image */}
        <img
          src={image}
          alt={project.name}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            display: 'block',
          }}
        />
        {/* Accent glow on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at center, ${accent}20 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
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
          fontFamily: "'Mona Sans Variable', sans-serif",
          fontSize: 17, fontWeight: 800, color: '#1A1526',
          letterSpacing: '-0.025em', lineHeight: 1.2,
          marginBottom: 8,
          flexShrink: 0,
        }}>
          {project.name}
        </div>

        <p style={{
          fontFamily: "'Mona Sans Variable', sans-serif",
          fontSize: 12.5, color: 'rgba(26,21,38,0.55)',
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
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: hovered ? accent : 'rgba(26,21,38,0.05)',
              border: `1px solid ${hovered ? accent : 'rgba(26,21,38,0.09)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none', flexShrink: 0,
              transition: 'background 0.25s ease, border-color 0.25s ease',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
              <path d="M2.5 10.5L10.5 2.5M10.5 2.5H5M10.5 2.5V8"
                stroke={hovered ? '#000' : 'rgba(26,21,38,0.72)'}
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
          fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 10, fontWeight: 600,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(26,21,38,0.40)',
        }}>※</span>
        <span style={{
          fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 10, fontWeight: 600,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(26,21,38,0.40)',
        }}>Nos réalisations</span>
        <span style={{
          fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 10, fontWeight: 600,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(26,21,38,0.40)',
        }}>※</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 11, color: 'rgba(26,21,38,0.40)',
          letterSpacing: '0.04em',
        }}>{projects.length} projets</span>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
          <path d="M0 5h14M10 1l4 4-4 4" stroke="rgba(26,21,38,0.40)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
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
            <span style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(26,21,38,0.40)' }}>※</span>
            <span style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(26,21,38,0.40)' }}>Nos réalisations</span>
            <span style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(26,21,38,0.40)' }}>※</span>
          </div>
          <span style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 11, color: 'rgba(26,21,38,0.40)' }}>{projects.length} projets</span>
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
          height: 1, background: 'rgba(26,21,38,0.09)',
        }}>
          <motion.div style={{
            height: '100%',
            background: 'rgba(254,210,75,0.5)',
            transformOrigin: 'left',
            scaleX: scrollYProgress,
          }} />
        </div>
      </div>
    </div>
  )
}
