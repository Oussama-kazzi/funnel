import { useRef, useState, useEffect } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

const steps = [
  { title: 'Réservation d’un appel', desc: 'Vous réservez un appel téléphonique ou en visio pour échanger sur votre projet.' },
  { title: 'Confirmation', desc: 'Nous vous confirmons la date et l’heure de l’appel et préparons votre dossier.' },
  { title: 'Discussion', desc: 'Lors de la réunion, nous vous écoutons attentivement afin de vous proposer les solutions les mieux adaptées à vos besoins.' },
  { title: 'Développement', desc: 'Une fois que nous sommes d’accord sur les détails, de délai et le budget, nous commençons la phase de développement.' },
  { title: 'Finalisation', desc: 'Nous vous livrons votre projet, prêt à être mis en ligne et à convertir vos visiteurs.' },
  { title: 'Formation', desc: 'Enfin, nous vous formons pour que vous puissiez gérer votre site en toute autonomie et sérénité.' },
]

function StepRow({ i, title, desc, visible }) {
  const [open, setOpen] = useState(i === 0)
  const isFirst = i === 0
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      style={{
        display: 'flex', gap: 20,
        padding: '22px 24px',
        borderRadius: 16,
        background: open ? '#FFFFFF' : 'transparent',
        border: `1px solid ${open ? 'rgba(15,12,30,0.08)' : 'transparent'}`,
        boxShadow: open ? '0 12px 30px rgba(88,52,180,0.10)' : 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.7s ${EASE} ${0.1 + i * 0.08}s, transform 0.7s ${EASE} ${0.1 + i * 0.08}s, background 0.3s ${EASE}, box-shadow 0.3s ${EASE}, border-color 0.3s ${EASE}`,
      }}
    >
      {/* Number + connector */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: open ? '#8B5CF6' : 'rgba(139,92,246,0.1)',
          border: `1px solid ${open ? '#8B5CF6' : 'rgba(139,92,246,0.25)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 800,
          color: open ? '#FFFFFF' : '#8B5CF6',
          transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease',
        }}>
          {i + 1}
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 18, fontWeight: 700, color: '#141019',
          letterSpacing: '-0.02em', margin: '8px 0 0',
        }}>
          {title}
        </h3>
        <div style={{
          maxHeight: open ? 200 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 14,
            color: 'rgba(20,16,25,0.55)', lineHeight: 1.6,
            margin: '10px 0 0',
          }}>
            {desc}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Process({ onCTA }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id="process" className="section-light" style={{ padding: '104px 32px', position: 'relative' }}>
      <div className="process-wrap" style={{ maxWidth: 1120, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Left — heading */}
        <div className="process-head" style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 1s ${EASE}, transform 1s ${EASE}`,
        }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#7C3AED', marginBottom: 18 }}>
            Notre processus
          </p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(28px, 3.8vw, 46px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#141019', lineHeight: 1.1, margin: '0 0 20px' }}>
            6 étapes simples pour{' '}
            <span style={{ color: '#8B5CF6' }}>démarrer votre site.</span>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'rgba(20,16,25,0.55)', lineHeight: 1.65, maxWidth: 380, marginBottom: 28 }}>
            Un processus clair et sans friction, de la première prise de contact jusqu’à la mise en ligne de votre projet.
          </p>
          <button onClick={onCTA} className="process-cta">
            Réserver un appel gratuit
          </button>
        </div>

        {/* Right — stepper */}
        <div className="process-steps" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {steps.map((s, i) => (
            <StepRow key={i} i={i} {...s} visible={visible} />
          ))}
        </div>
      </div>

      <style>{`
        #process.section-light {
          background: linear-gradient(180deg, #ECEAF4 0%, #F4F3F8 100%);
        }
        .process-wrap {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 56px;
          align-items: start;
        }
        .process-head { position: sticky; top: 110px; }
        .process-cta {
          background: #8B5CF6; color: #FFFFFF;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700; font-size: 15px;
          padding: 15px 30px; border: none; border-radius: 100px; cursor: pointer;
          box-shadow: 0 6px 24px rgba(139,92,246,0.35);
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, background 0.3s ease;
        }
        .process-cta:hover { transform: translateY(-2px); background: #7C4DF0; box-shadow: 0 12px 32px rgba(139,92,246,0.5); }

        @media (max-width: 900px) {
          .process-wrap { grid-template-columns: 1fr; gap: 40px; }
          .process-head { position: static; text-align: center; display: flex; flex-direction: column; align-items: center; }
          .process-head p { margin-left: auto; margin-right: auto; }
        }
        @media (max-width: 768px) {
          #process { padding: 80px 20px !important; }
        }
        @media (max-width: 480px) {
          #process { padding: 64px 16px !important; }
          .process-steps > div { padding: 18px 16px !important; }
        }
      `}</style>
    </section>
  )
}
