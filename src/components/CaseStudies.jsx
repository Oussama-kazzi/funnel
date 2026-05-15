import { useState } from 'react'

const cases = [
  { num: '01', name: 'Meridian AI', industry: 'AI SaaS', result: '+280%', resultLabel: 'trial activation rate after complete product and onboarding redesign', stack: 'Next.js' },
  { num: '02', name: 'Vault Finance', industry: 'Fintech', result: '3.1×', resultLabel: 'user onboarding completion after full UX architecture overhaul', stack: 'React' },
  { num: '03', name: 'Forma Studio', industry: 'Design tools', result: '4.6×', resultLabel: 'daily active usage post dashboard redesign and design system launch', stack: 'Custom' },
  { num: '04', name: 'Pulse Analytics', industry: 'B2B SaaS', result: '$2.4M', resultLabel: 'raised after investor-ready product design and pitch narrative', stack: 'Next.js' },
  { num: '05', name: 'Orbit Protocol', industry: 'Web3', result: '89%', resultLabel: 'reduction in checkout drop-off through conversion-led interface redesign', stack: 'Custom' },
]

function CaseRow({ num, name, industry, result, resultLabel, stack }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr 1fr 100px',
        gap: 32,
        alignItems: 'center',
        padding: hovered ? '32px 24px' : '32px 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        borderRadius: hovered ? 12 : 0,
        background: hovered ? 'rgba(255,255,255,0.04)' : 'transparent',
        transition: 'all 0.25s ease',
        cursor: 'default',
      }}
    >
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 40, fontWeight: 800, color: 'rgba(255,255,255,0.07)', letterSpacing: '-0.04em', lineHeight: 1 }}>
        {num}
      </span>
      <div>
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: 6 }}>
          {name}
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)' }}>
          {industry}
        </div>
      </div>
      <div>
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 32, fontWeight: 800, color: '#00FF87', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 6 }}>
          {result}
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
          {resultLabel}
        </div>
      </div>
      <div>
        <span style={{
          fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500,
          color: 'rgba(255,255,255,0.45)',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '6px 14px', borderRadius: 100,
          whiteSpace: 'nowrap',
        }}>
          {stack}
        </span>
      </div>
    </div>
  )
}

export default function CaseStudies() {
  return (
    <section id="work" style={{
      padding: '120px 32px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, marginBottom: 64 }}>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#00FF87', marginBottom: 16 }}>
              Selected work
            </p>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#FFFFFF', lineHeight: 1.05, margin: 0 }}>
              Products that ship and scale.
            </h2>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.45)', maxWidth: 400, lineHeight: 1.65 }}>
            Five teams that came to FUTURA with a vision and launched with a product.
          </p>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {cases.map((c, i) => <CaseRow key={i} {...c} />)}
        </div>
      </div>
    </section>
  )
}
