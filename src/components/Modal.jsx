import { useState, useEffect } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'
const ACCENT = '#C7F751'

const budgetOptions = ['Up to $10K', '$10–$20K', '$20–$50K', '$50–$100K', '>$100K']

const benefits = [
  'We will respond to you within 12 hours',
  'We’ll sign an NDA if requested',
  'Access to dedicated product specialists',
]

export default function Modal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', budget: '', about: '', file: null,
  })
  const [focused, setFocused] = useState(null)
  const [copied, setCopied] = useState(false)

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
    setTimeout(onClose, 2400)
  }

  const copyEmail = () => {
    navigator.clipboard?.writeText('hello@futura.studio')
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  const fieldUnderline = (key) => ({
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused === key ? '#0A0A0A' : 'rgba(10,10,10,0.18)'}`,
    padding: '10px 0',
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
    color: '#0A0A0A',
    outline: 'none',
    transition: `border-color 0.25s ${EASE}`,
  })

  return (
    <>
      <style>{`
        .fc-input::placeholder { color: rgba(10,10,10,0.32); }
        .fc-input { -webkit-appearance: none; appearance: none; }
        @media (max-width: 880px) {
          .fc-grid { grid-template-columns: 1fr !important; }
          .fc-left { padding: 32px 28px !important; }
          .fc-right { padding: 36px 28px !important; }
          .fc-title { font-size: 32px !important; }
        }
      `}</style>

      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(5,8,22,0.82)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: `opacity 0.35s ${EASE}`,
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%', maxWidth: 1080,
            maxHeight: '92vh',
            overflowY: 'auto',
            borderRadius: 28,
            background: '#FFFFFF',
            boxShadow: '0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)',
            transform: open ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(20px)',
            transition: `transform 0.45s ${EASE}, opacity 0.35s ${EASE}`,
            opacity: open ? 1 : 0,
            position: 'relative',
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 18, right: 18, zIndex: 10,
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(10,10,10,0.06)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(10,10,10,0.6)',
              fontSize: 20, lineHeight: 1,
              transition: `background 0.25s ${EASE}, color 0.25s ${EASE}, transform 0.3s ${EASE}`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(10,10,10,0.12)'
              e.currentTarget.style.color = '#0A0A0A'
              e.currentTarget.style.transform = 'rotate(90deg)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(10,10,10,0.06)'
              e.currentTarget.style.color = 'rgba(10,10,10,0.6)'
              e.currentTarget.style.transform = 'rotate(0deg)'
            }}
          >
            ×
          </button>

          <div
            className="fc-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '0.85fr 1.15fr',
              minHeight: 600,
            }}
          >
            {/* LEFT PANEL */}
            <div
              className="fc-left"
              style={{
                background: 'linear-gradient(155deg, #1F5C52 0%, #0F3530 65%, #0A2622 100%)',
                color: '#FFFFFF',
                padding: '44px 40px',
                display: 'flex', flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Soft glow */}
              <div style={{
                position: 'absolute', top: '-20%', right: '-10%',
                width: '70%', height: '60%',
                background: 'radial-gradient(circle, rgba(199,247,81,0.18), transparent 70%)',
                pointerEvents: 'none',
              }} />

              {/* Founder */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36, position: 'relative' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3DD9A4 0%, #1F5C52 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800, fontSize: 22, color: '#FFFFFF',
                    border: '2px solid rgba(255,255,255,0.18)',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.3)',
                    letterSpacing: '-0.02em',
                  }}>
                    VG
                  </div>
                  <div style={{
                    position: 'absolute', bottom: -3, right: -3,
                    width: 22, height: 22, borderRadius: '50%',
                    background: '#FFFFFF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#0A66C2">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', serif",
                    fontStyle: 'italic',
                    fontSize: 26, fontWeight: 700,
                    color: '#FFFFFF', letterSpacing: '-0.02em',
                    marginBottom: 2,
                  }}>
                    Vlad Gavriluk
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14, color: 'rgba(255,255,255,0.58)',
                  }}>
                    Founder & CEO
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
                {benefits.map(b => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%',
                      background: '#C7F751',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 0 0 4px rgba(199,247,81,0.12)',
                    }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0A2622" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 15, fontWeight: 500,
                      color: 'rgba(255,255,255,0.92)',
                      letterSpacing: '-0.005em',
                    }}>
                      {b}
                    </span>
                  </div>
                ))}
              </div>

              {/* Spacer */}
              <div style={{ flex: 1, minHeight: 32 }} />

              {/* Project inquiries */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12, fontWeight: 600,
                  color: 'rgba(255,255,255,0.5)',
                  textTransform: 'uppercase', letterSpacing: '0.14em',
                  marginBottom: 18,
                }}>
                  Project inquiries
                </div>

                <button
                  onClick={copyEmail}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 100,
                    padding: '12px 18px',
                    display: 'flex', alignItems: 'center', gap: 12,
                    cursor: 'pointer',
                    marginBottom: 10,
                    transition: `background 0.25s ${EASE}, border-color 0.25s ${EASE}`,
                    fontFamily: "'Inter', sans-serif",
                    color: '#FFFFFF',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  }}
                >
                  <span style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 500, flex: 1, textAlign: 'left' }}>
                    {copied ? 'Copied!' : 'hello@futura.studio'}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                </button>

                <a
                  href="#book"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 100,
                    padding: '12px 18px',
                    textDecoration: 'none',
                    color: '#FFFFFF',
                    fontFamily: "'Inter', sans-serif",
                    transition: `background 0.25s ${EASE}, border-color 0.25s ${EASE}`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  }}
                >
                  <span style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>Book a call</span>
                </a>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div
              className="fc-right"
              style={{
                background: '#FFFFFF',
                padding: '48px 48px 40px',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {submitted ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 0' }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: ACCENT,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 28,
                    boxShadow: `0 0 0 8px rgba(199,247,81,0.18)`,
                  }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0A2622" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h4 style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 28, fontWeight: 700, color: '#0A0A0A',
                    letterSpacing: '-0.03em', marginBottom: 12,
                  }}>
                    We’ve received your brief.
                  </h4>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 15, color: 'rgba(10,10,10,0.55)',
                    lineHeight: 1.6, maxWidth: 340,
                  }}>
                    We’ll review it and reach out within 12 hours to schedule a strategy call.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <h2
                    className="fc-title"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 'clamp(28px, 3.4vw, 42px)',
                      fontWeight: 700,
                      color: '#0A0A0A',
                      letterSpacing: '-0.035em',
                      lineHeight: 1.1,
                      marginBottom: 28,
                    }}
                  >
                    Tell us about your project
                  </h2>

                  {/* Autofill */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(10,10,10,0.55)' }}>
                      Autofill form via
                    </span>
                    <button type="button" aria-label="Autofill via LinkedIn"
                      style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: '#FFFFFF', border: '1px solid rgba(10,10,10,0.14)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer',
                        transition: `border-color 0.25s ${EASE}, transform 0.3s ${EASE}`,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#0A66C2'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,10,10,0.14)'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="#0A66C2">
                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                      </svg>
                    </button>
                    <button type="button" aria-label="Autofill via Gmail"
                      style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: '#FFFFFF', border: '1px solid rgba(10,10,10,0.14)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer',
                        transition: `border-color 0.25s ${EASE}, transform 0.3s ${EASE}`,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#EA4335'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,10,10,0.14)'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22 5.5v13c0 .83-.67 1.5-1.5 1.5H19V8.74l-7 5.25-7-5.25V20H3.5C2.67 20 2 19.33 2 18.5v-13c0-.41.17-.79.44-1.06.27-.27.65-.44 1.06-.44H4l8 6 8-6h.5c.41 0 .79.17 1.06.44.27.27.44.65.44 1.06z" />
                        <path fill="#34A853" d="M5 20V8.74l7 5.25v6.01H5z" />
                        <path fill="#FBBC04" d="M19 20h-7v-6.01l7-5.25V20z" />
                        <path fill="#EA4335" d="M20 4l-8 6-8-6h16z" />
                      </svg>
                    </button>
                  </div>

                  {/* Name + Email row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 26 }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14, color: 'rgba(10,10,10,0.55)',
                        marginBottom: 4,
                      }}>
                        Full name<span style={{ color: '#EA4335' }}>*</span>
                      </label>
                      <input
                        type="text" required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        className="fc-input"
                        style={fieldUnderline('name')}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14, color: 'rgba(10,10,10,0.55)',
                        marginBottom: 4,
                      }}>
                        Corporate email<span style={{ color: '#EA4335' }}>*</span>
                      </label>
                      <input
                        type="email" required
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        className="fc-input"
                        style={fieldUnderline('email')}
                      />
                    </div>
                  </div>

                  {/* Budget */}
                  <div style={{ marginBottom: 26 }}>
                    <label style={{
                      display: 'block',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14, color: 'rgba(10,10,10,0.55)',
                      marginBottom: 12,
                    }}>
                      What is your budget?<span style={{ color: '#EA4335' }}>*</span>
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                      {budgetOptions.map(opt => {
                        const active = form.budget === opt
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setForm(f => ({ ...f, budget: opt }))}
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 14, fontWeight: 500,
                              padding: '10px 18px',
                              borderRadius: 100,
                              cursor: 'pointer',
                              background: active ? '#0A0A0A' : 'rgba(10,10,10,0.04)',
                              color: active ? '#FFFFFF' : '#0A0A0A',
                              border: `1px solid ${active ? '#0A0A0A' : 'rgba(10,10,10,0.1)'}`,
                              transition: `background 0.25s ${EASE}, color 0.25s ${EASE}, border-color 0.25s ${EASE}, transform 0.3s ${SPRING}`,
                            }}
                            onMouseEnter={e => {
                              if (!active) {
                                e.currentTarget.style.background = 'rgba(10,10,10,0.08)'
                                e.currentTarget.style.borderColor = 'rgba(10,10,10,0.2)'
                              }
                            }}
                            onMouseLeave={e => {
                              if (!active) {
                                e.currentTarget.style.background = 'rgba(10,10,10,0.04)'
                                e.currentTarget.style.borderColor = 'rgba(10,10,10,0.1)'
                              }
                            }}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* About */}
                  <div style={{ marginBottom: 32 }}>
                    <label style={{
                      display: 'block',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14, color: 'rgba(10,10,10,0.55)',
                      marginBottom: 4,
                    }}>
                      About project<span style={{ color: '#EA4335' }}>*</span>
                    </label>
                    <textarea
                      required rows={2}
                      value={form.about}
                      onChange={e => setForm(f => ({ ...f, about: e.target.value }))}
                      onFocus={() => setFocused('about')}
                      onBlur={() => setFocused(null)}
                      className="fc-input"
                      style={{ ...fieldUnderline('about'), resize: 'none', minHeight: 50 }}
                    />
                  </div>

                  <div style={{ flex: 1 }} />

                  {/* Footer row */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 18,
                    flexWrap: 'wrap', justifyContent: 'space-between',
                  }}>
                    {/* File attach */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <label
                        htmlFor="fc-file"
                        style={{
                          width: 44, height: 44, borderRadius: '50%',
                          background: 'rgba(10,10,10,0.06)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer',
                          transition: `background 0.25s ${EASE}`,
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(10,10,10,0.12)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(10,10,10,0.06)'}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                        </svg>
                        <input
                          id="fc-file" type="file" accept=".doc,.docx,.pdf"
                          onChange={e => setForm(f => ({ ...f, file: e.target.files?.[0] || null }))}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <span style={{
                        background: 'rgba(10,10,10,0.06)',
                        borderRadius: 100,
                        padding: '10px 18px',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13, color: 'rgba(10,10,10,0.55)',
                        whiteSpace: 'nowrap',
                      }}>
                        {form.file ? form.file.name.slice(0, 18) : '*.doc  *.pdf'}
                      </span>
                    </div>

                    {/* Disclaimer */}
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12, color: 'rgba(10,10,10,0.5)',
                      lineHeight: 1.5, maxWidth: 220,
                      margin: 0,
                    }}>
                      By submitting this form you agree to our{' '}
                      <a href="#cookie" style={{ color: '#0A0A0A', textDecoration: 'underline' }}>Cookie Policy</a> and{' '}
                      <a href="#privacy" style={{ color: '#0A0A0A', textDecoration: 'underline' }}>Privacy Policy</a>
                    </p>

                    {/* Submit cluster */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button
                        type="button"
                        aria-label="Down"
                        style={{
                          width: 50, height: 50, borderRadius: '50%',
                          background: ACCENT, border: 'none',
                          cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: `transform 0.4s ${SPRING}, box-shadow 0.3s ${EASE}`,
                          boxShadow: '0 4px 16px rgba(199,247,81,0.5)',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(199,247,81,0.65)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'translateY(0) scale(1)'
                          e.currentTarget.style.boxShadow = '0 4px 16px rgba(199,247,81,0.5)'
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A2622" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="7" x2="17" y2="17" />
                          <polyline points="17 7 17 17 7 17" />
                        </svg>
                      </button>
                      <button
                        type="submit"
                        style={{
                          background: ACCENT, color: '#0A2622',
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 700, fontSize: 16,
                          padding: '14px 38px',
                          border: 'none', borderRadius: 100,
                          cursor: 'pointer',
                          letterSpacing: '-0.005em',
                          transition: `transform 0.4s ${SPRING}, box-shadow 0.3s ${EASE}`,
                          boxShadow: '0 4px 20px rgba(199,247,81,0.45)',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'translateY(-2px)'
                          e.currentTarget.style.boxShadow = '0 10px 28px rgba(199,247,81,0.65)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.boxShadow = '0 4px 20px rgba(199,247,81,0.45)'
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
