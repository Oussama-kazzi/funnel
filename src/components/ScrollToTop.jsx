import { useEffect, useState } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

/* Floating button — appears once the user scrolls past the hero and smoothly
   returns to the top of the page. Uses the shared Lenis instance if provided,
   otherwise falls back to native smooth scroll. */
export default function ScrollToTop({ onClick }) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleClick = () => {
    if (onClick) onClick()
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      aria-label="Retour en haut"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        right: 'clamp(16px, 3vw, 32px)',
        bottom: 'clamp(16px, 3vw, 32px)',
        zIndex: 150,
        width: 48,
        height: 48,
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        background: '#CCF306',
        color: '#1A1526',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: hovered
          ? '0 12px 32px rgba(204,243,6,0.35), 0 0 0 1px rgba(26,21,38,0.06)'
          : '0 8px 24px rgba(26,21,38,0.18)',
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? (hovered ? '-3px' : '0') : '16px'}) scale(${visible ? 1 : 0.85})`,
        pointerEvents: visible ? 'auto' : 'none',
        transition: `opacity 0.4s ${EASE}, transform 0.45s ${SPRING}, box-shadow 0.3s ${EASE}`,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="6 11 12 5 18 11" />
      </svg>
    </button>
  )
}
