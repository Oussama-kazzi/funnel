import { useEffect, useState } from 'react'
import Questionnaire from './Questionnaire'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const LIME = '#C7F751'

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
          background: rgba(4,6,18,0.88);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          transition: opacity 0.35s ${EASE};
        }
        .mo-card {
          position: relative; width: 100%; max-width: 620px; max-height: 92vh;
          background: #070914;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 24px;
          box-shadow: 0 0 0 1px rgba(199,247,81,0.04), 0 32px 80px rgba(0,0,0,0.7), 0 0 80px rgba(199,247,81,0.05);
          display: flex; flex-direction: column; overflow: hidden;
          transition: transform 0.45s ${EASE}, opacity 0.35s ${EASE};
        }
        .mo-close {
          position: absolute; top: 16px; right: 16px; z-index: 5;
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.5);
          font-size: 20px; line-height: 1;
          transition: background 0.2s ease, color 0.2s ease, transform 0.3s ${EASE};
        }
        .mo-close:hover { background: rgba(255,255,255,0.13); color: rgba(255,255,255,0.9); transform: rotate(90deg); }
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
              fontFamily: "'Inter', sans-serif",
              fontSize: 10, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.2em',
              color: LIME, marginBottom: 10,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ width: 22, height: 1, background: LIME, display: 'inline-block' }} />
              Your first step
            </p>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(26px, 4vw, 36px)',
              fontWeight: 800, color: '#FFFFFF',
              letterSpacing: '-0.03em', lineHeight: 1.1,
              margin: '0 0 20px',
            }}>
              Enter Your Info
            </h2>
          </div>

          {/* Questionnaire (keyed so it resets when modal re-opens) */}
          <Questionnaire key={formKey} />
        </div>
      </div>
    </>
  )
}
