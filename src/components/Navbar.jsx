import { useState, useEffect } from 'react'

export default function Navbar({ onCTA }) {
  const [scrolled, setScrolled] = useState(false)

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

  // Adapt colours for dark hero (unscrolled) vs light sections (scrolled)
  const linkColor = scrolled ? '#6B7280'          : 'rgba(255,255,255,0.55)'
  const linkHover = scrolled ? '#0A0A0A'          : '#FFFFFF'

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(5,8,22,0.3)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid #E5E5E5' : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img
            src="/futura.png"
            alt="FUTURA"
            style={{
              height: 72,
              width: 'auto',
              display: 'block',
              filter: scrolled ? 'brightness(0)' : 'none',
              transition: 'filter 0.35s ease, opacity 0.35s ease',
              opacity: scrolled ? 0.85 : 1,
            }}
          />
        </a>

        {/* Desktop nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden-mobile">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14, fontWeight: 500,
                color: linkColor,
                textDecoration: 'none',
                transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={e => e.currentTarget.style.color = linkHover}
              onMouseLeave={e => e.currentTarget.style.color = linkColor}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={onCTA}
            style={{
              background: scrolled ? '#0A0A0A' : 'rgba(0,255,135,0.12)',
              color: scrolled ? '#FFFFFF' : '#00FF87',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600, fontSize: 14,
              padding: '10px 22px',
              border: scrolled ? 'none' : '1px solid rgba(0,255,135,0.35)',
              borderRadius: 8, cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              letterSpacing: '-0.01em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#00CC6E'
              e.currentTarget.style.color = '#050816'
              e.currentTarget.style.border = '1px solid #00CC6E'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,255,135,0.35)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = scrolled ? '#0A0A0A' : 'rgba(0,255,135,0.12)'
              e.currentTarget.style.color = scrolled ? '#FFFFFF' : '#00FF87'
              e.currentTarget.style.border = scrolled ? 'none' : '1px solid rgba(0,255,135,0.35)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Start a project →
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
