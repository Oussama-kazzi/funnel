import BookingForm from './BookingForm'

// Same scattered squares vocabulary as the hero, mirrored for the footer.
const SQUARES = [
  { top: '22%', left: '12%', size: 110, o: 0.05 },
  { top: '58%', left: '82%', size: 140, o: 0.05 },
  { top: '70%', left: '30%', size: 90, o: 0.04 },
  { top: '38%', left: '64%', size: 80, o: 0.035 },
  { top: '14%', left: '48%', size: 70, o: 0.03 },
]

export default function Footer() {
  return (
    <footer className="footer-dark">
      {/* ── Dark backdrop (mirrors the hero; fades in from the light page above) ── */}
      <div className="footer-bg" aria-hidden="true">
        <div className="footer-bg-grad" />
        <div className="footer-bg-grid" />
        {SQUARES.map((s, i) => (
          <span
            key={i}
            className="footer-bg-square"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, background: `rgba(255,255,255,${s.o})` }}
          />
        ))}
        <div className="footer-bg-glow" />
        {/* fade from the page's light background into the dark footer */}
        <div className="footer-bg-fade" />
      </div>

      <div className="footer-form-area">
        <BookingForm />
      </div>

      <div className="footer-bar">
        <div className="footer-bar-inner">
          <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img
              src="/futura.png"
              alt="FUTURA"
              style={{
                height: 66,
                width: 'auto',
                display: 'block',
                filter: 'brightness(0) invert(1)',
                opacity: 0.85,
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.85'}
            />
          </a>
          <p style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
            © 2025 FuturA Digital Studio.
          </p>
          <a
            href="mailto:contact@futura.ma"
            style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >
            contact@futura.ma
          </a>
        </div>
      </div>

      <style>{`
        .footer-dark {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          padding-top: 120px;
        }

        /* ── Backdrop ── */
        .footer-bg { position: absolute; inset: 0; z-index: -1; pointer-events: none; }
        .footer-bg-grad {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 80% 55% at 50% 110%, #241a52 0%, transparent 60%),
            linear-gradient(180deg, #0c0a1e 0%, #100c26 55%, #14102e 100%);
        }
        .footer-bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px);
          background-size: 68px 68px;
          mask-image: radial-gradient(ellipse 95% 85% at 50% 90%, #000 30%, transparent 82%);
          -webkit-mask-image: radial-gradient(ellipse 95% 85% at 50% 90%, #000 30%, transparent 82%);
        }
        .footer-bg-square { position: absolute; border-radius: 8px; filter: blur(0.3px); }
        .footer-bg-glow {
          position: absolute; bottom: -12%; left: 50%; transform: translateX(-50%);
          width: 60vw; height: 45vh;
          background: radial-gradient(ellipse at center, rgba(204,243,6,0.12), transparent 68%);
          filter: blur(60px);
        }
        /* fade the light page above into the dark footer */
        .footer-bg-fade {
          position: absolute; left: 0; right: 0; top: 0; height: 40%;
          background: linear-gradient(180deg, #FAF9F6 0%, transparent 96%);
        }

        .footer-form-area { position: relative; z-index: 1; }

        .footer-bar {
          position: relative; z-index: 1;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 32px;
        }
        .footer-bar-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
        }
      `}</style>
    </footer>
  )
}
