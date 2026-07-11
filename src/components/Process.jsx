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

// Line-art glyphs (arc, dome, orbit, zig, check-arc, 4-point star) — like the reference.
const GLYPHS = [
  { dot: { cx: 34, cy: 8 }, paths: ['M6 34 A28 28 0 0 1 34 6'] },
  { dot: { cx: 6, cy: 30 }, paths: ['M4 34 A16 16 0 0 1 36 34'] },
  { dot: { cx: 26, cy: 12 }, paths: ['M20 6 C6 14 6 26 20 34 C34 26 34 14 20 6 Z', 'M8 12 C18 22 22 22 32 12', 'M8 28 C18 18 22 18 32 28'] },
  { dot: { cx: 20, cy: 8 }, paths: ['M4 34 L14 16 L20 24 L26 10 L36 34'] },
  { dot: { cx: 34, cy: 12 }, paths: ['M6 22 L15 30 L34 8'] },
  { dot: { cx: 20, cy: 20 }, paths: ['M20 2 L23 17 L38 20 L23 23 L20 38 L17 23 L2 20 L17 17 Z'] },
]

function Glyph({ index, active }) {
  const g = GLYPHS[index] || GLYPHS[0]
  return (
    <svg width="52" height="52" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {g.paths.map((d, i) => (
        <path key={i} d={d} stroke="#1A1526" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"
          style={{ opacity: active ? 0.85 : 0.28, transition: 'opacity 0.5s ease' }}
        />
      ))}
      <circle cx={g.dot.cx} cy={g.dot.cy} r="3" fill="#FED24B"
        style={{ opacity: active ? 1 : 0.6, transition: 'opacity 0.4s ease' }}
      />
    </svg>
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
        .step-glyph { flex-shrink: 0; width: 52px; height: 52px; display: flex; align-items: center; justify-content: center; }
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
          .step-glyph { width: 42px; height: 42px; }
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
