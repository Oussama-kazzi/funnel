import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const EASE_ARR = [0.16, 1, 0.3, 1]

const steps = [
  { title: 'Réservation d’un appel', desc: 'Vous réservez un appel téléphonique ou en visio pour échanger sur votre projet.' },
  { title: 'Confirmation', desc: 'Nous vous confirmons la date et l’heure de l’appel et préparons votre dossier.' },
  { title: 'Discussion', desc: 'Lors de la réunion, nous vous écoutons attentivement afin de vous proposer les solutions les mieux adaptées à vos besoins.' },
  { title: 'Développement', desc: 'Une fois que nous sommes d’accord sur les détails, de délai et le budget, nous commençons la phase de développement.' },
  { title: 'Finalisation', desc: 'Nous vous livrons votre projet, prêt à être mis en ligne et à convertir vos visiteurs.' },
  { title: 'Formation', desc: 'Enfin, nous vous formons pour que vous puissiez gérer votre site en toute autonomie et sérénité.' },
]

// Meaningful line icons — one per step (24x24 viewBox, stroked).
const ICONS = [
  // 1. Réservation d'un appel — calendar
  <><rect x="3" y="4.5" width="18" height="16" rx="2.5"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="2.5" x2="8" y2="6.5"/><line x1="16" y1="2.5" x2="16" y2="6.5"/><circle cx="8.5" cy="13.5" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="13.5" r="1" fill="currentColor" stroke="none"/><circle cx="15.5" cy="13.5" r="1" fill="currentColor" stroke="none"/></>,
  // 2. Confirmation — check badge
  <><path d="M12 2.5l2.6 1.9 3.2-.1 1 3.1 2.6 1.9-1 3.1 1 3.1-2.6 1.9-1 3.1-3.2-.1L12 21.5l-2.6-1.9-3.2.1-1-3.1L2.6 14.7l1-3.1-1-3.1L5.2 6.6l1-3.1 3.2.1z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></>,
  // 3. Discussion — chat bubbles
  <><path d="M3 6.5a2 2 0 012-2h9a2 2 0 012 2v5a2 2 0 01-2 2H8l-4 3.5v-3.5H5a2 2 0 01-2-2z"/><path d="M8 8h6M8 10.5h4"/></>,
  // 4. Développement — code brackets
  <><polyline points="9 8 5 12 9 16"/><polyline points="15 8 19 12 15 16"/><line x1="13" y1="5.5" x2="11" y2="18.5"/></>,
  // 5. Finalisation — rocket launch
  <><path d="M12 2.5c3.5 2 5 5.5 5 9 0 1.6-.3 3-.8 4.2l-2.2-1.4h-4l-2.2 1.4C7.3 14.5 7 13.1 7 11.5c0-3.5 1.5-7 5-9z"/><circle cx="12" cy="9.5" r="1.8"/><path d="M9.8 18.5c-.5 1.5-.8 3-.8 3s1.8-.5 3-1.4M14.2 18.5c.5 1.5.8 3 .8 3s-1.8-.5-3-1.4"/></>,
  // 6. Formation — graduation cap
  <><path d="M12 4L2.5 8.5 12 13l9.5-4.5L12 4z"/><path d="M6 10.5v4.2c0 .9 2.7 2.3 6 2.3s6-1.4 6-2.3v-4.2"/><line x1="21.5" y1="8.5" x2="21.5" y2="13"/></>,
]

function Glyph({ index, active }) {
  return (
    <div className={`step-icon-tile${active ? ' is-active' : ''}`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        {ICONS[index] || ICONS[0]}
      </svg>
    </div>
  )
}

// Layout geometry (px).
const SPREAD_GAP = 156    // spacing between cards in the "before" expanded list
const TIGHT_GAP = 84      // spacing once compressed into the tight stack

// Cards keep the SAME shape the whole time (full card + description). Before
// scroll they're a spread-out list; as progress → 1 they slide together into a
// tight overlapping stack — nothing changes shape, they only move & overlap.
function StepCard({ i, total, title, desc, progress, activeIndex }) {
  const reduce = useReducedMotion()
  const active = activeIndex === i

  const spreadY = i * SPREAD_GAP
  const tightY = i * TIGHT_GAP

  const rawY = useTransform(progress, [0, 0.55], [spreadY, tightY], { clamp: true })
  // Fast, responsive settle: high stiffness + low mass, damping kept
  // high enough to stay wobble-free.
  const y = useSpring(rawY, { stiffness: 420, damping: 40, mass: 0.4 })

  return (
    <motion.div
      className={`step-card${active ? ' is-active' : ''}`}
      style={reduce ? { position: 'relative', marginBottom: 18 } : { y, zIndex: i + 1 }}
    >
      <div className="step-glyph"><Glyph index={i} active={active} /></div>
      <div className="step-body">
        <h3 className="step-title">{title}</h3>
        <div className="step-desc-wrap">
          <p className="step-desc">{desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

function StackScroller() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  // Highlight the front card of the formed stack once compressed.
  const [activeIndex, setActiveIndex] = useState(-1)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveIndex(v > 0.5 ? steps.length - 1 : -1)
  })

  return (
    <div ref={container} className="step-container">
      <div className="step-frame">
        <div className="step-stage">
          {steps.map((s, i) => (
            <StepCard
              key={i}
              i={i}
              total={steps.length}
              {...s}
              progress={scrollYProgress}
              activeIndex={activeIndex}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Process({ onCTA }) {
  return (
    <section id="process" className="section-light" style={{ padding: '104px 32px 120px', position: 'relative' }}>
      <div className="process-wrap">
        {/* Left — sticky heading + CTA */}
        <motion.div
          className="process-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: EASE_ARR }}
        >
          <p style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#1A1526', marginBottom: 18 }}>
            Notre processus
          </p>
          <h2 style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 'clamp(30px, 3.6vw, 52px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#141019', lineHeight: 1.08, margin: '0 0 22px' }}>
            6 étapes simples pour<br /><span style={{ color: '#1A1526' }}>démarrer votre site</span>
          </h2>
          <p style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 16, color: 'rgba(20,16,25,0.55)', lineHeight: 1.65, maxWidth: 380, marginBottom: 30 }}>
            Un processus clair et sans friction, de la première prise de contact jusqu’à la mise en ligne de votre projet.
          </p>
          <button onClick={onCTA} className="process-cta">
            Réservez un appel gratuit
          </button>
        </motion.div>

        {/* Right — scroll-driven card stack */}
        <StackScroller />
      </div>

      <style>{`
        #process.section-light {
          background: linear-gradient(180deg,
            rgba(240,235,222,0) 0%,
            rgba(240,235,222,0.55) 18%,
            rgba(240,235,222,0.55) 82%,
            rgba(240,235,222,0) 100%);
        }
        .process-wrap {
          max-width: 1160px; margin: 0 auto;
          display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 64px;
          align-items: start; position: relative; z-index: 1;
        }
        .process-head {
          position: sticky; top: 22vh;
          display: flex; flex-direction: column; align-items: flex-start;
        }
        .process-cta {
          background: #1A1526; color: #FED24B;
          font-family: 'Mona Sans Variable', sans-serif;
          font-weight: 700; font-size: 15px;
          padding: 15px 32px; border: none; border-radius: 100px; cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease;
        }
        .process-cta:hover { transform: translateY(-2px); background: #000000; }

        /* Scroll track: tall so the whole card sequence has room to play out.
           The sticky wrapper pins to the viewport (no visible frame — cards
           look like a plain list, then rise up one on top of another as you
           scroll). Cards are absolutely positioned inside the stage. */
        .step-container { position: relative; height: ${steps.length * 38}vh; }
        .step-frame {
          position: sticky;
          top: 14vh;
        }
        /* Clip the waiting cards parked just below the stage so they only
           appear as they rise in. 'clip' + overflow-clip-margin lets the card
           shadows bleed a little instead of being hard-cut at the edges. */
        .step-stage {
          position: relative;
          height: 560px;
          width: 100%;
        }
        .step-card {
          position: absolute;
          left: 0; right: 0; top: 0;
          transform-origin: center top;
          background: #FFFFFF;
          border: 1px solid rgba(20,16,25,0.06);
          border-radius: 22px;
          padding: 24px 28px;
          display: flex; align-items: flex-start; gap: 22px;
          box-shadow: 0 12px 32px rgba(20,16,25,0.06), 0 2px 6px rgba(20,16,25,0.03);
          transition: box-shadow 0.4s ${EASE}, border-color 0.4s ${EASE};
          will-change: transform;
        }
        .step-card.is-active {
          border-color: rgba(254,210,75,0.45);
          box-shadow: 0 18px 44px rgba(20,16,25,0.10), 0 3px 10px rgba(20,16,25,0.04);
        }
        .step-glyph { flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        /* Icon sits in a soft gold rounded tile; brightens when the card is active. */
        .step-icon-tile {
          width: 48px; height: 48px; border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, rgba(254,210,75,0.14), rgba(254,210,75,0.07));
          border: 1px solid rgba(254,210,75,0.22);
          color: rgba(20,16,25,0.55);
          transition: color 0.4s ${EASE}, background 0.4s ${EASE}, border-color 0.4s ${EASE}, box-shadow 0.4s ${EASE};
        }
        .step-icon-tile.is-active {
          background: linear-gradient(135deg, rgba(254,210,75,0.28), rgba(254,210,75,0.14));
          border-color: rgba(254,210,75,0.5);
          color: #1A1526;
          box-shadow: 0 0 20px rgba(254,210,75,0.18);
        }
        .step-body { flex: 1; min-width: 0; }
        .step-title {
          font-family: 'Mona Sans Variable', sans-serif;
          font-size: clamp(18px, 1.6vw, 22px); font-weight: 700;
          letter-spacing: -0.02em; color: #1A1526; margin: 0;
          transition: color 0.4s ease;
        }
        .step-card.is-active .step-title { color: #141019; }
        .step-desc-wrap { overflow: hidden; }
        .step-desc {
          font-family: 'Mona Sans Variable', sans-serif;
          font-size: 14.5px; line-height: 1.6;
          color: rgba(20,16,25,0.55); margin: 10px 0 0;
        }

        @media (max-width: 900px) {
          .process-wrap { grid-template-columns: 1fr; gap: 36px; }
          .process-head { position: static; align-items: center; text-align: center; }
          .process-head h2, .process-head p { margin-left: auto; margin-right: auto; }
        }
        @media (max-width: 768px) {
          #process { padding: 80px 20px 90px !important; }
          .step-card { padding: 20px 20px; gap: 16px; }
          .step-icon-tile { width: 42px; height: 42px; border-radius: 11px; }
          .step-title { font-size: 18px; }
        }
        @media (max-width: 480px) {
          #process { padding: 64px 16px 72px !important; }
          .step-card { padding: 18px 16px; gap: 14px; border-radius: 18px; }
        }
      `}</style>
    </section>
  )
}
