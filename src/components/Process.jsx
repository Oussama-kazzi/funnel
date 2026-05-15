import { useRef, useState, useEffect } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

const steps = [
  { num: '01', title: 'Discovery & Strategy', desc: 'We map your product, users, and goals. Competitive analysis, user flows, and a clear north star before a single design decision is made.', time: 'Week 1' },
  { num: '02', title: 'Design Sprint', desc: 'High-fidelity UI in Figma — every screen, every state. Two structured revision rounds. Nothing moves to development until you have signed off.', time: 'Weeks 2–3' },
  { num: '03', title: 'Build & Integrate', desc: 'Production-ready React or Next.js. Every component tested, every API wired, every integration documented and handed over cleanly.', time: 'Weeks 4–5' },
  { num: '04', title: 'Ship & Iterate', desc: 'We go live, monitor real user behaviour, and optimise. Launch is the beginning of the product life — not the end of the engagement.', time: 'Week 6' },
]

export default function Process() {
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
    <section ref={ref} id="process" style={{ padding: '120px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          marginBottom: 80,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 1s ${EASE}, transform 1s ${EASE}`,
          willChange: 'transform, opacity',
        }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#C7F751', marginBottom: 16 }}>
            How it works
          </p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#FFFFFF', lineHeight: 1.05, margin: '0 0 16px 0', maxWidth: 700 }}>
            Strategy to production in four phases.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: 'rgba(255,255,255,0.45)', maxWidth: 480 }}>
            A focused process built for speed and precision. No bloated timelines, no endless feedback loops.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: 22, left: '12.5%', right: '12.5%',
            height: 1, background: 'rgba(255,255,255,0.08)', zIndex: 0,
            opacity: visible ? 1 : 0,
            transition: `opacity 1.2s ${EASE} 0.25s`,
          }} />

          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                padding: '0 24px 0 0',
                position: 'relative', zIndex: 1,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.9s ${EASE} ${0.15 + i * 0.13}s, transform 0.9s ${EASE} ${0.15 + i * 0.13}s`,
                willChange: 'transform, opacity',
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: i === 0 ? '#C7F751' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${i === 0 ? '#C7F751' : 'rgba(255,255,255,0.12)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 14, fontWeight: 700,
                color: i === 0 ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                marginBottom: 28,
              }}>
                {s.num}
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C7F751',
                marginBottom: 10,
              }}>
                {s.time}
              </div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: 10 }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #process > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
