import { useState, useEffect } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

export default function Navbar({ onCTA }) {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [ctaHovered, setCtaHovered] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: `background 0.5s ${EASE}, border-color 0.5s ${EASE}, box-shadow 0.5s ${EASE}, backdrop-filter 0.5s ${EASE}`,
        background: scrolled ? 'rgba(5, 8, 22, 0.72)' : 'transparent',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
        backdropFilter: scrolled ? 'blur(18px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(160%)' : 'none',
        boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.35)' : 'none',
      }}
    >
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 clamp(20px, 3vw, 32px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: scrolled ? 64 : 72,
        transition: `height 0.45s ${EASE}`,
      }}>

        {/* Logo */}
        <a
          href="#"
          style={{
            textDecoration: 'none', display: 'flex', alignItems: 'center',
            transition: `opacity 0.3s ${EASE}`,
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <img
            src="/futura.png"
            alt="FUTURA"
            style={{
              height: scrolled ? 56 : 64,
              width: 'auto',
              display: 'block',
              transition: `height 0.45s ${EASE}`,
            }}
          />
        </a>

        {/* Desktop nav links */}
        <nav
          className="hidden-mobile"
          style={{
            display: 'flex', alignItems: 'center',
            gap: 4,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 100,
            padding: '6px',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          {links.map(l => {
            const isHovered = hoveredLink === l.href
            return (
              <a
                key={l.href}
                href={l.href}
                onMouseEnter={() => setHoveredLink(l.href)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  position: 'relative',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13, fontWeight: 500,
                  color: isHovered ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: 100,
                  background: isHovered ? 'rgba(199,247,81,0.08)' : 'transparent',
                  letterSpacing: '-0.005em',
                  transition: `color 0.3s ${EASE}, background 0.3s ${EASE}`,
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}
              >
                <span
                  style={{
                    width: 4, height: 4, borderRadius: '50%',
                    background: '#C7F751',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'scale(1)' : 'scale(0)',
                    transition: `opacity 0.3s ${EASE}, transform 0.45s ${SPRING}`,
                    boxShadow: isHovered ? '0 0 8px rgba(199,247,81,0.6)' : 'none',
                  }}
                />
                {l.label}
              </a>
            )
          })}
        </nav>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={onCTA}
            className="lime-cta-pill"
            style={{
              background: 'linear-gradient(135deg, #A8D830 0%, #C7F751 100%)',
              color: '#050816',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700, fontSize: 13,
              padding: '10px 20px',
              border: 'none',
              borderRadius: 100,
              cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              letterSpacing: '-0.005em',
              transition: `transform 0.5s ${SPRING}, box-shadow 0.4s ${EASE}`,
              boxShadow: '0 2px 16px rgba(199,247,81,0.25)',
            }}
          >
            Start a project
            <span style={{
              display: 'inline-block',
              transition: `transform 0.4s ${SPRING}`,
            }}>→</span>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </header>
  )
}
