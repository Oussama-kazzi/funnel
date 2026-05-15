import { useState, useEffect } from 'react'

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  padding: '12px 14px',
  fontFamily: "'Inter', sans-serif",
  fontSize: 15,
  color: '#FFFFFF',
  outline: 'none',
  transition: 'border-color 0.15s',
}

export default function Modal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', website: '', niche: '', goal: '' })

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setTimeout(() => setSubmitted(false), 400)
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(onClose, 2200)
  }

  return (
    <>
      <style>{`
        .futura-input::placeholder { color: rgba(255,255,255,0.25); }
        .futura-input option { background: #0D1117; color: #FFFFFF; }
      `}</style>

      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(5,8,22,0.85)',
          backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: '#0D1117',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            width: '100%', maxWidth: 540,
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            transform: open ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(16px)',
            transition: 'transform 0.3s ease',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 20, right: 20,
              width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 18, lineHeight: 1,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#FFFFFF' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
          >
            ×
          </button>

          <div style={{ padding: '36px 36px 0' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.25)',
              borderRadius: 100, padding: '4px 12px',
              fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600,
              color: '#00FF87', marginBottom: 20,
              letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>
              Strategy call · No commitment
            </div>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 26, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', marginBottom: 8 }}>
              Start a conversation.
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
              Tell us about your product and goals. If it sounds like a fit, we'll book a 30-minute strategy call within 48 hours.
            </p>
          </div>

          {submitted ? (
            <div style={{ padding: '48px 36px 48px', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>✅</div>
              <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>
                We've received your brief.
              </h4>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.5)' }}>
                We'll review it and reach out within 24 hours to schedule a strategy call.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ padding: '28px 36px 36px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>
                    First name
                  </label>
                  <input
                    type="text" required placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={inputStyle}
                    className="futura-input"
                    onFocus={e => e.target.style.borderColor = '#00FF87'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>
                    Email
                  </label>
                  <input
                    type="email" required placeholder="you@company.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={inputStyle}
                    className="futura-input"
                    onFocus={e => e.target.style.borderColor = '#00FF87'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>
                  Product or company URL
                </label>
                <input
                  type="url" required placeholder="https://yourwebsite.com"
                  value={form.website}
                  onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                  style={inputStyle}
                  className="futura-input"
                  onFocus={e => e.target.style.borderColor = '#00FF87'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>
                  Business type
                </label>
                <select
                  required
                  value={form.niche}
                  onChange={e => setForm(f => ({ ...f, niche: e.target.value }))}
                  style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }}
                  className="futura-input"
                  onFocus={e => e.target.style.borderColor = '#00FF87'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                >
                  <option value="" disabled>Select your product type</option>
                  <option>SaaS / Software product</option>
                  <option>AI product or platform</option>
                  <option>Startup / Pre-launch</option>
                  <option>Fintech or Web3</option>
                  <option>Enterprise software</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 6 }}>
                  What are you looking to build or improve?
                </label>
                <textarea
                  rows={3} placeholder="e.g. redesign our dashboard, build a new product from scratch, create a design system..."
                  value={form.goal}
                  onChange={e => setForm(f => ({ ...f, goal: e.target.value }))}
                  style={{ ...inputStyle, resize: 'none' }}
                  className="futura-input"
                  onFocus={e => e.target.style.borderColor = '#00FF87'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #00CC6E 0%, #00FF87 100%)', color: '#050816',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700, fontSize: 16,
                  padding: '16px',
                  border: 'none', borderRadius: 10,
                  cursor: 'pointer',
                  marginTop: 4,
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 24px rgba(0,255,135,0.3)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#00CC6E'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,255,135,0.45)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #00CC6E 0%, #00FF87 100%)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,255,135,0.3)' }}
              >
                Send my project brief →
              </button>

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.25)', textAlign: 'center' }}>
                No spam. We'll respond within 24 hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
