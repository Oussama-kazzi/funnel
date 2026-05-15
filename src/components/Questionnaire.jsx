import { useState, useRef, useEffect } from 'react'

const LIME = '#C7F751'
const LETTERS = 'ABCDEFG'

export const questions = [
  {
    id: 1, type: 'text-pair',
    text: "What's your name and company?",
    fields: [
      { key: 'name',    label: 'First name',    placeholder: 'First name' },
      { key: 'company', label: 'Company name',  placeholder: 'Company name' },
    ],
  },
  {
    id: 2, type: 'textarea',
    text: 'What does your company do?',
    subtitle: '1–3 sentences, plain language',
    placeholder: 'Type your answer here…',
  },
  {
    id: 3, type: 'single',
    text: 'What industry best describes you?',
    options: [
      'SaaS / Software product',
      'Startup (pre-revenue or early stage)',
      'Hospitality (hostel, hotel, boutique accommodation)',
      'E-commerce',
      'Fintech / Web3',
      'Agency or studio',
      'Other (please specify)',
    ],
    conditional: { triggerValue: 'Other (please specify)', placeholder: 'Describe your industry…' },
  },
  {
    id: 4, type: 'single',
    text: 'What stage is your business at right now?',
    options: [
      'Idea / pre-launch — no revenue yet',
      'Early stage — making money but less than $10k/month',
      'Growth stage — $10k–$100k/month',
      'Scaling — $100k+/month or funded',
      'Established brand looking to redesign',
    ],
  },
  {
    id: 5, type: 'multi', max: 2,
    text: "What's the primary goal of this project?",
    subtitle: 'Pick up to 2',
    options: [
      'Launch a new product or brand online',
      'Increase conversions / trial signups / bookings',
      "Redesign an existing site that isn't working",
      'Build a design system for our product team',
      'Rebrand and refresh the visual identity',
      'Replace a Squarespace / Wix / Webflow template',
      "Build something custom that off-the-shelf can't handle",
    ],
  },
  {
    id: 6, type: 'single',
    text: 'Do you have an existing website?',
    options: ['Yes', 'No — this is a new build'],
    conditional: { triggerValue: 'Yes', placeholder: 'https://…', label: 'Your website URL' },
  },
  {
    id: 7, type: 'single',
    text: "What's your budget range for this project?",
    options: [
      'Under $3,000',
      '$3,000 – $5,000',
      '$5,000 – $10,000',
      '$10,000 – $20,000',
      '$20,000 – $50,000',
      '$50,000+',
    ],
  },
  {
    id: 8, type: 'single',
    text: "What's your ideal launch timeline?",
    options: [
      'ASAP — I needed this yesterday',
      'Within 4 weeks',
      'Within 6–8 weeks',
      '2–3 months',
      'No fixed deadline — quality over speed',
    ],
  },
  {
    id: 9, type: 'single',
    text: 'Have you worked with a web design agency or freelancer before?',
    options: [
      'No — this is our first time',
      "Yes — it went well and we're looking for something better",
      'Yes — it was a bad experience',
      "Yes — we've worked with many agencies",
    ],
  },
  {
    id: 10, type: 'single',
    text: 'Who will be the main decision-maker on this project?',
    options: [
      'Me — I have full authority to approve and move forward',
      'Me plus one other person (co-founder, partner)',
      "I'll need approval from a team or board",
      "I'm researching on behalf of someone else",
    ],
  },
  {
    id: 11, type: 'single',
    text: 'How did you hear about Futura?',
    options: [
      'Google search',
      'Referral from someone I know',
      'LinkedIn',
      'Twitter / X',
      'Saw your work on a site I like',
      'Clutch / agency directory',
      'Other',
    ],
    conditional: { triggerValue: 'Other', placeholder: 'Please tell us more…' },
  },
  {
    id: 12, type: 'textarea',
    text: 'Anything else you want us to know before we talk?',
    subtitle: 'Optional — but the clients who write here are usually the best ones to work with.',
    placeholder: 'Type your answer here…',
    optional: true,
  },
]

/* ─── CSS shared by modal and inline variants ─────────────────────── */
const css = `
  .q-prog-track { height: 2px; background: rgba(255,255,255,0.07); }
  .q-prog-fill  { height: 100%; background: ${LIME}; transition: width 0.5s cubic-bezier(0.16,1,0.3,1); box-shadow: 0 0 8px rgba(199,247,81,0.45); }
  .q-body { overflow-y: auto; scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.1) transparent; }
  .q-body::-webkit-scrollbar { width: 4px; }
  .q-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
  .q-anim { animation: qIn 0.38s cubic-bezier(0.16,1,0.3,1) forwards; }
  @keyframes qIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  .q-opt {
    display:flex; align-items:center; gap:12px; width:100%;
    padding:13px 16px; background:rgba(255,255,255,0.04);
    border:1px solid rgba(255,255,255,0.09); border-radius:10px; cursor:pointer;
    font-family:'Inter',sans-serif; font-size:14px; font-weight:500;
    color:rgba(255,255,255,0.7); text-align:left;
    transition:background .18s ease, border-color .18s ease, color .18s ease;
  }
  .q-opt:hover { background:rgba(255,255,255,0.07); border-color:rgba(255,255,255,0.16); color:rgba(255,255,255,0.9); }
  .q-opt.q-sel  { background:rgba(199,247,81,0.08); border-color:rgba(199,247,81,0.35); color:#FFF; }
  .q-ltr {
    display:inline-flex; align-items:center; justify-content:center;
    width:24px; height:24px; min-width:24px;
    border:1px solid rgba(255,255,255,0.18); border-radius:5px;
    font-family:'Inter',sans-serif; font-size:11px; font-weight:700;
    color:rgba(255,255,255,0.45); background:rgba(255,255,255,0.05); flex-shrink:0;
    transition:all .18s ease;
  }
  .q-opt.q-sel .q-ltr { background:rgba(199,247,81,0.18); border-color:rgba(199,247,81,0.5); color:${LIME}; }
  .q-input {
    width:100%; background:transparent; border:none;
    border-bottom:1.5px solid rgba(255,255,255,0.18); padding:10px 0;
    font-family:'Inter',sans-serif; font-size:16px; color:#FFF;
    outline:none; resize:none; display:block; transition:border-color .2s ease;
  }
  .q-input:focus { border-bottom-color:rgba(199,247,81,0.65); }
  .q-input::placeholder { color:rgba(255,255,255,0.22); }
  .q-input-sm {
    width:100%; background:transparent; border:none;
    border-bottom:1.5px solid rgba(255,255,255,0.18); padding:8px 0;
    font-family:'Inter',sans-serif; font-size:15px; color:#FFF;
    outline:none; display:block; transition:border-color .2s ease;
  }
  .q-input-sm:focus { border-bottom-color:rgba(199,247,81,0.65); }
  .q-input-sm::placeholder { color:rgba(255,255,255,0.22); }
  .q-ok {
    display:inline-flex; align-items:center; gap:8px;
    background:${LIME}; color:#0A2622; border:none; border-radius:100px;
    padding:11px 26px; font-family:'Plus Jakarta Sans',sans-serif;
    font-size:15px; font-weight:800; cursor:pointer; letter-spacing:-0.01em;
    transition:transform .35s cubic-bezier(0.34,1.56,0.64,1), box-shadow .25s ease;
    box-shadow:0 4px 20px rgba(199,247,81,0.3);
  }
  .q-ok:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(199,247,81,0.5); }
  .q-nav {
    display:flex; align-items:center; justify-content:center;
    width:38px; height:38px; border:none; border-radius:8px;
    cursor:pointer; transition:background .18s ease, transform .25s ease;
  }
  .q-nav.qon  { background:rgba(199,247,81,0.12); }
  .q-nav.qon:hover { background:rgba(199,247,81,0.2); transform:translateY(-1px); }
  .q-nav.qoff { background:rgba(255,255,255,0.04); cursor:default; opacity:0.35; }
  .q-cond-enter { animation: qCondIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards; }
  @keyframes qCondIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
  @media (max-width:560px) {
    .q-opt { font-size:13px; padding:11px 13px; }
    .q-pair-grid { grid-template-columns: 1fr !important; }
  }
`

export default function Questionnaire({ onDone, bodyPadding = '32px 40px 36px' }) {
  const [step, setStep]           = useState(0)
  const [answers, setAnswers]     = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [animKey, setAnimKey]     = useState(0)
  const bodyRef = useRef(null)

  const total   = questions.length
  const current = questions[step]
  const answer  = answers[step]
  const progress = submitted ? 100 : (step / total) * 100

  /* Derived helpers for conditional questions */
  const choice     = current.conditional ? (answer?.choice ?? null)  : answer
  const extraVal   = current.conditional ? (answer?.extra  ?? '')     : ''
  const showExtra  = current.conditional && choice === current.conditional.triggerValue

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0
  }, [step])

  const goNext = () => {
    if (step < total - 1) { setAnimKey(k => k + 1); setStep(s => s + 1) }
    else { setSubmitted(true); onDone?.() }
  }
  const goPrev = () => {
    if (step > 0) { setAnimKey(k => k + 1); setStep(s => s - 1) }
  }

  const toggleOpt = (opt) => {
    if (current.type === 'multi') {
      setAnswers(a => {
        const prev = a[step] || []
        if (prev.includes(opt)) return { ...a, [step]: prev.filter(x => x !== opt) }
        if (current.max && prev.length >= current.max) return a
        return { ...a, [step]: [...prev, opt] }
      })
    } else if (current.conditional) {
      /* Reset extra when a different option is picked */
      setAnswers(a => ({ ...a, [step]: { choice: opt, extra: '' } }))
    } else {
      setAnswers(a => ({ ...a, [step]: opt }))
    }
  }

  const isSel = (opt) => {
    if (current.type === 'multi')    return (answer || []).includes(opt)
    if (current.conditional)         return choice === opt
    return answer === opt
  }

  const setPairField = (key, val) =>
    setAnswers(a => ({ ...a, [step]: { ...(a[step] || {}), [key]: val } }))

  const setExtra = (val) =>
    setAnswers(a => ({ ...a, [step]: { ...(a[step] || {}), extra: val } }))

  const multiCount = current.type === 'multi' ? (answer || []).length : 0

  return (
    <>
      <style>{css}</style>

      {/* Progress bar */}
      <div className="q-prog-track">
        <div className="q-prog-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Step counter + nav */}
      {!submitted && (
        <div style={{ padding: '12px 40px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {step + 1} / {total}
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            <button className={`q-nav ${step === 0 ? 'qoff' : 'qon'}`} onClick={goPrev} disabled={step === 0} aria-label="Previous">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
            </button>
            <button className="q-nav qon" onClick={goNext} aria-label="Next">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '12px 0 0' }} />

      {/* Body */}
      <div className="q-body" ref={bodyRef} style={{ padding: bodyPadding }}>

        {/* ── Success ── */}
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0 8px' }}>
            <div style={{
              width: 60, height: 60, borderRadius: '50%',
              background: 'rgba(199,247,81,0.12)', border: '1px solid rgba(199,247,81,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', boxShadow: '0 0 32px rgba(199,247,81,0.12)',
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', marginBottom: 12 }}>
              We've got it. Give us 24 hours.
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 380, margin: '0 auto' }}>
              We read every submission personally. If it looks like a strong fit, you'll get a calendar link to book a free 30-minute call. If we're not the right fit, we'll tell you honestly and point you somewhere better.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.25)', lineHeight: 1.6, maxWidth: 340, margin: '16px auto 0' }}>
              No automated pitch emails. No newsletter signup you didn't ask for. Just a real response.
            </p>
          </div>

        ) : (
          /* ── Question ── */
          <div key={animKey} className="q-anim">

            {/* Number + question text */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: (current.subtitle || current.optional) ? 8 : 20 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 28, height: 28, borderRadius: 6,
                background: 'rgba(199,247,81,0.12)', border: '1px solid rgba(199,247,81,0.25)',
                flexShrink: 0, marginTop: 2,
              }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 800, color: LIME, lineHeight: 1 }}>
                  {current.id}
                </span>
              </div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(17px, 2vw, 21px)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.4, margin: 0 }}>
                {current.text}
                {!current.optional && <span style={{ color: LIME }}> *</span>}
                {current.optional && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.3)', marginLeft: 8 }}>optional</span>}
              </h3>
            </div>

            {/* Subtitle */}
            {current.subtitle && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.35)', margin: '0 0 18px 40px', lineHeight: 1.5 }}>
                {current.subtitle}
              </p>
            )}

            {/* Multi-select counter */}
            {current.type === 'multi' && current.max && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: multiCount >= current.max ? LIME : 'rgba(255,255,255,0.22)', margin: '0 0 12px 40px', transition: 'color 0.2s ease' }}>
                {multiCount} / {current.max} selected
              </p>
            )}

            {/* ── Input area ── */}
            <div style={{ marginLeft: 40 }}>

              {/* text-pair — two labeled inputs */}
              {current.type === 'text-pair' && (
                <div className="q-pair-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                  {current.fields.map(f => (
                    <div key={f.key} style={{ marginBottom: 8 }}>
                      <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                        {f.label}
                      </label>
                      <input
                        type="text"
                        className="q-input-sm"
                        placeholder={f.placeholder}
                        value={(answer || {})[f.key] || ''}
                        onChange={e => setPairField(f.key, e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') goNext() }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* single / multi — option buttons */}
              {(current.type === 'single' || current.type === 'multi') && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {current.options.map((opt, i) => (
                    <div key={i}>
                      <button className={`q-opt${isSel(opt) ? ' q-sel' : ''}`} onClick={() => toggleOpt(opt)}>
                        <span className="q-ltr">{LETTERS[i]}</span>
                        {opt}
                      </button>

                      {/* Conditional extra field (URL / specify) */}
                      {current.conditional && isSel(opt) && opt === current.conditional.triggerValue && (
                        <div className="q-cond-enter" style={{ marginTop: 8, paddingLeft: 36 }}>
                          {current.conditional.label && (
                            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                              {current.conditional.label}
                            </label>
                          )}
                          <input
                            type="text"
                            className="q-input-sm"
                            placeholder={current.conditional.placeholder}
                            value={extraVal}
                            onChange={e => setExtra(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') goNext() }}
                            autoFocus
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* textarea */}
              {current.type === 'textarea' && (
                <div>
                  <textarea
                    className="q-input" placeholder={current.placeholder}
                    value={answer || ''} rows={4}
                    onChange={e => setAnswers(a => ({ ...a, [step]: e.target.value }))}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); goNext() } }}
                  />
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.25)', margin: '6px 0 0' }}>
                    <strong>Shift ⇧ + Enter ↵</strong> to add a line break
                  </p>
                </div>
              )}

              {/* text */}
              {current.type === 'text' && (
                <input
                  type="text" className="q-input" placeholder={current.placeholder}
                  value={answer || ''}
                  onChange={e => setAnswers(a => ({ ...a, [step]: e.target.value }))}
                  onKeyDown={e => { if (e.key === 'Enter') goNext() }}
                />
              )}

              {/* OK / Submit */}
              <div style={{ marginTop: 24 }}>
                <button className="q-ok" onClick={goNext}>
                  {step === total - 1
                    ? 'Submit — We\'ll be in touch within 24 hours'
                    : 'OK'}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0A2622" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  )
}
