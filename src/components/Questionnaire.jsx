import { useState, useRef, useEffect } from 'react'

const LIME = '#8B5CF6'
const LETTERS = 'ABCDEFG'

export const questions = [
  {
    id: 1, type: 'text-pair',
    text: "Votre nom et votre entreprise ?",
    fields: [
      { key: 'name',    label: 'Nom complet',       placeholder: 'Nom complet' },
      { key: 'company', label: 'Nom de l’entreprise', placeholder: 'Nom de l’entreprise' },
    ],
  },
  {
    id: 2, type: 'text-pair',
    text: "Comment vous joindre ?",
    fields: [
      { key: 'whatsapp', label: 'Numéro WhatsApp', placeholder: '+212 6 00 00 00 00' },
      { key: 'email',    label: 'Adresse e-mail',  placeholder: 'vous@exemple.com' },
    ],
  },
  {
    id: 3, type: 'single',
    text: 'Quel type de projet souhaitez-vous ?',
    options: [
      'Site vitrine',
      'Landing page',
      'Site e-commerce',
      'Application web / plateforme sur mesure',
      'Refonte de site existant',
      'Automatisation / IA',
      'Autre (précisez)',
    ],
    conditional: { triggerValue: 'Autre (précisez)', placeholder: 'Décrivez votre projet…' },
  },
  {
    id: 4, type: 'single',
    text: 'Quel est votre budget estimé ?',
    options: [
      'Moins de 5 000 MAD',
      '5 000 – 10 000 MAD',
      '10 000 – 25 000 MAD',
      '25 000 – 50 000 MAD',
      '50 000 MAD et plus',
      'Je ne sais pas encore',
    ],
  },
  {
    id: 5, type: 'single',
    text: 'Pour quand souhaitez-vous lancer ?',
    options: [
      'Le plus tôt possible',
      'Dans les 4 semaines',
      'Dans 1 à 2 mois',
      'Dans 3 mois ou plus',
      'Pas de date fixe',
    ],
  },
  {
    id: 6, type: 'single',
    text: 'Avez-vous déjà un site web ?',
    options: ['Oui', 'Non — c’est un nouveau projet'],
    conditional: { triggerValue: 'Oui', placeholder: 'https://…', label: 'L’adresse de votre site' },
  },
  {
    id: 7, type: 'textarea',
    text: 'Un message ou des précisions à ajouter ?',
    subtitle: 'Optionnel — mais ça nous aide à mieux vous répondre.',
    placeholder: 'Écrivez votre message ici…',
    optional: true,
  },
]

/* ─── CSS shared by modal and inline variants ─────────────────────── */
const css = `
  .q-prog-track { height: 2px; background: rgba(26,21,38,0.09); }
  .q-prog-fill  { height: 100%; background: ${LIME}; transition: width 0.5s cubic-bezier(0.16,1,0.3,1); box-shadow: 0 0 8px rgba(139,92,246,0.45); }
  .q-body { overflow-y: auto; scrollbar-width: thin; scrollbar-color: rgba(26,21,38,0.09) transparent; }
  .q-body::-webkit-scrollbar { width: 4px; }
  .q-body::-webkit-scrollbar-thumb { background: rgba(26,21,38,0.09); border-radius: 4px; }
  .q-anim { animation: qIn 0.38s cubic-bezier(0.16,1,0.3,1) forwards; }
  @keyframes qIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  .q-opt {
    display:flex; align-items:center; gap:12px; width:100%;
    padding:13px 16px; background:rgba(26,21,38,0.05);
    border:1px solid rgba(26,21,38,0.09); border-radius:10px; cursor:pointer;
    font-family:'Inter',sans-serif; font-size:14px; font-weight:500;
    color:rgba(26,21,38,0.92); text-align:left;
    transition:background .18s ease, border-color .18s ease, color .18s ease;
  }
  .q-opt:hover { background:rgba(26,21,38,0.09); border-color:rgba(26,21,38,0.14); color:rgba(26,21,38,0.92); }
  .q-opt.q-sel  { background:rgba(139,92,246,0.1); border-color:rgba(139,92,246,0.5); color:#6D28D9; }
  .q-ltr {
    display:inline-flex; align-items:center; justify-content:center;
    width:24px; height:24px; min-width:24px;
    border:1px solid rgba(26,21,38,0.14); border-radius:5px;
    font-family:'Inter',sans-serif; font-size:11px; font-weight:700;
    color:rgba(26,21,38,0.72); background:rgba(26,21,38,0.05); flex-shrink:0;
    transition:all .18s ease;
  }
  .q-opt.q-sel .q-ltr { background:rgba(139,92,246,0.18); border-color:rgba(139,92,246,0.5); color:${LIME}; }
  .q-input {
    width:100%; background:transparent; border:none;
    border-bottom:1.5px solid rgba(26,21,38,0.14); padding:10px 0;
    font-family:'Inter',sans-serif; font-size:16px; color:#1A1526;
    outline:none; resize:none; display:block; transition:border-color .2s ease;
  }
  .q-input:focus { border-bottom-color:rgba(139,92,246,0.65); }
  .q-input::placeholder { color:rgba(26,21,38,0.40); }
  .q-input-sm {
    width:100%; background:transparent; border:none;
    border-bottom:1.5px solid rgba(26,21,38,0.14); padding:8px 0;
    font-family:'Inter',sans-serif; font-size:15px; color:#1A1526;
    outline:none; display:block; transition:border-color .2s ease;
  }
  .q-input-sm:focus { border-bottom-color:rgba(139,92,246,0.65); }
  .q-input-sm::placeholder { color:rgba(26,21,38,0.40); }
  .q-ok {
    display:inline-flex; align-items:center; gap:8px;
    background:${LIME}; color:#FFFFFF; border:none; border-radius:100px;
    padding:11px 26px; font-family:'Plus Jakarta Sans',sans-serif;
    font-size:15px; font-weight:800; cursor:pointer; letter-spacing:-0.01em;
    transition:transform .35s cubic-bezier(0.34,1.56,0.64,1), box-shadow .25s ease;
    box-shadow:0 4px 20px rgba(139,92,246,0.3);
  }
  .q-ok:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(139,92,246,0.5); }
  .q-nav {
    display:flex; align-items:center; justify-content:center;
    width:38px; height:38px; border:none; border-radius:8px;
    cursor:pointer; transition:background .18s ease, transform .25s ease;
  }
  .q-nav.qon  { background:rgba(139,92,246,0.12); }
  .q-nav.qon:hover { background:rgba(139,92,246,0.2); transform:translateY(-1px); }
  .q-nav.qoff { background:rgba(26,21,38,0.05); cursor:default; opacity:0.35; }
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
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: 'rgba(26,21,38,0.40)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {step + 1} / {total}
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            <button className={`q-nav ${step === 0 ? 'qoff' : 'qon'}`} onClick={goPrev} disabled={step === 0} aria-label="Précédent">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
            </button>
            <button className="q-nav qon" onClick={goNext} aria-label="Suivant">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(26,21,38,0.09)', margin: '12px 0 0' }} />

      {/* Body */}
      <div className="q-body" ref={bodyRef} style={{ padding: bodyPadding }}>

        {/* ── Success ── */}
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0 8px' }}>
            <div style={{
              width: 60, height: 60, borderRadius: '50%',
              background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', boxShadow: '0 0 32px rgba(139,92,246,0.12)',
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={LIME} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 800, color: '#1A1526', letterSpacing: '-0.03em', marginBottom: 12 }}>
              Bien reçu. Nous vous répondons sous 24h.
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(26,21,38,0.72)', lineHeight: 1.7, maxWidth: 380, margin: '0 auto' }}>
              Nous lisons chaque demande personnellement. Si votre projet correspond, nous vous proposons un appel gratuit pour en discuter et vous recommander la meilleure approche.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(26,21,38,0.40)', lineHeight: 1.6, maxWidth: 340, margin: '16px auto 0' }}>
              Pas d’emails automatiques, pas de newsletter non sollicitée. Juste une vraie réponse.
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
                background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)',
                flexShrink: 0, marginTop: 2,
              }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 800, color: LIME, lineHeight: 1 }}>
                  {current.id}
                </span>
              </div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(17px, 2vw, 21px)', fontWeight: 700, color: '#1A1526', letterSpacing: '-0.02em', lineHeight: 1.4, margin: 0 }}>
                {current.text}
                {!current.optional && <span style={{ color: LIME }}> *</span>}
                {current.optional && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 400, color: 'rgba(26,21,38,0.55)', marginLeft: 8 }}>optionnel</span>}
              </h3>
            </div>

            {/* Subtitle */}
            {current.subtitle && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(26,21,38,0.55)', margin: '0 0 18px 40px', lineHeight: 1.5 }}>
                {current.subtitle}
              </p>
            )}

            {/* Multi-select counter */}
            {current.type === 'multi' && current.max && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: multiCount >= current.max ? LIME : 'rgba(26,21,38,0.40)', margin: '0 0 12px 40px', transition: 'color 0.2s ease' }}>
                {multiCount} / {current.max} sélectionné(s)
              </p>
            )}

            {/* ── Input area ── */}
            <div style={{ marginLeft: 40 }}>

              {/* text-pair — two labeled inputs */}
              {current.type === 'text-pair' && (
                <div className="q-pair-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                  {current.fields.map(f => (
                    <div key={f.key} style={{ marginBottom: 8 }}>
                      <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: 'rgba(26,21,38,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
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
                            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: 'rgba(26,21,38,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
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
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(26,21,38,0.40)', margin: '6px 0 0' }}>
                    <strong>Shift ⇧ + Entrée ↵</strong> pour un saut de ligne
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
                    ? 'Envoyer — réponse sous 24h'
                    : 'Suivant'}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
