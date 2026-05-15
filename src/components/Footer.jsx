export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '32px 32px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img
            src="/futura.png"
            alt="FUTURA"
            style={{
              height: 66,
              width: 'auto',
              display: 'block',
              filter: 'none',
              opacity: 0.8,
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
          />
        </a>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
          © 2025 FUTURA Studio. Built with intention.
        </p>
        <a
          href="mailto:hello@futura.studio"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
        >
          hello@futura.studio
        </a>
      </div>
    </footer>
  )
}
