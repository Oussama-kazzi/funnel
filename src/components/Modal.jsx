import { useEffect, useState } from 'react'
import Questionnaire from './Questionnaire'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const LIME = '#FED24B'

export default function Modal({ open, onClose }) {
  const [formKey, setFormKey] = useState(0)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      /* reset form after close animation finishes */
      setTimeout(() => setFormKey(k => k + 1), 420)
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <>
      <style>{`
        .mo-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(26,21,38,0.45);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          transition: opacity 0.35s ${EASE};
        }
        .mo-card {
          position: relative; width: 100%; max-width: 620px; max-height: 92vh;
          background: #FFFFFF;
          border: 1px solid rgba(26,21,38,0.08);
          border-radius: 24px;
          box-shadow: 0 32px 90px rgba(26,21,38,0.28), 0 0 0 1px rgba(254,210,75,0.06);
          display: flex; flex-direction: column; overflow: hidden;
          transition: transform 0.45s ${EASE}, opacity 0.35s ${EASE};
        }
        .mo-close {
          position: absolute; top: 16px; right: 16px; z-index: 5;
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(26,21,38,0.09); border: 1px solid rgba(26,21,38,0.09);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(26,21,38,0.72);
          font-size: 20px; line-height: 1;
          transition: background 0.2s ease, color 0.2s ease, transform 0.3s ${EASE};
        }
        .mo-close:hover { background: rgba(26,21,38,0.14); color: rgba(26,21,38,0.92); transform: rotate(90deg); }
        @media (max-width: 560px) { .mo-card { border-radius: 18px; } }
      `}</style>

      {/* Overlay */}
      <div
        className="mo-overlay"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none' }}
        onClick={onClose}
      >
        {/* Card */}
        <div
          className="mo-card"
          style={{
            transform: open ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(18px)',
            opacity: open ? 1 : 0,
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Close */}
          <button className="mo-close" onClick={onClose}>×</button>

          {/* Header */}
          <div style={{ padding: '32px 40px 0', flexShrink: 0 }}>
            <p style={{
              fontFamily: "'Mona Sans Variable', sans-serif",
              fontSize: 10, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.2em',
              color: LIME, marginBottom: 10,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ width: 22, height: 1, background: LIME, display: 'inline-block' }} />
              Discutons de votre projet
            </p>
            <h2 style={{
              fontFamily: "'Mona Sans Variable', sans-serif",
              fontSize: 'clamp(26px, 4vw, 36px)',
              fontWeight: 800, color: '#1A1526',
              letterSpacing: '-0.03em', lineHeight: 1.1,
              margin: '0 0 20px',
            }}>
              Recevez une recommandation gratuite
            </h2>
          </div>

          {/* Questionnaire (keyed so it resets when modal re-opens) */}
          <Questionnaire key={formKey} />
        </div>
      </div>
    </>
  )
}
