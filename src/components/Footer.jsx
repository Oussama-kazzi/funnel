export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(26,21,38,0.09)',
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
              filter: 'invert(1) brightness(0.15)',
              opacity: 0.8,
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
          />
        </a>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(26,21,38,0.55)' }}>
          © 2025 FuturA Digital Studio. Agence digitale à Casablanca.
        </p>
        <a
          href="mailto:contact@futura.ma"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(26,21,38,0.55)', textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(26,21,38,0.92)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,21,38,0.55)'}
        >
          contact@futura.ma
        </a>
      </div>
    </footer>
  )
}
