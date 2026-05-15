import { useState } from 'react'

const CpuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <line x1="9"  y1="1"  x2="9"  y2="5" />
    <line x1="15" y1="1"  x2="15" y2="5" />
    <line x1="9"  y1="19" x2="9"  y2="23" />
    <line x1="15" y1="19" x2="15" y2="23" />
    <line x1="1"  y1="9"  x2="5"  y2="9" />
    <line x1="1"  y1="15" x2="5"  y2="15" />
    <line x1="19" y1="9"  x2="23" y2="9" />
    <line x1="19" y1="15" x2="23" y2="15" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
)

const ShieldCheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L4 6v5c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
)

const BuildingIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="18" rx="1" />
    <rect x="14" y="8" width="7" height="13" rx="1" />
    <line x1="7"  y1="7"  x2="7"  y2="7.01" />
    <line x1="7"  y1="11" x2="7"  y2="11.01" />
    <line x1="7"  y1="15" x2="7"  y2="15.01" />
    <line x1="18" y1="12" x2="18" y2="12.01" />
    <line x1="18" y1="16" x2="18" y2="16.01" />
  </svg>
)

const industries = [
  {
    icon: <CpuIcon />,
    title: 'SaaS & AI Products',
    desc: 'Your product is your pitch. Investors, users, and enterprise buyers judge it in the first ten seconds. We make those seconds count — and every screen after that.',
    stat: 'Most common engagement',
    featured: true,
  },
  {
    icon: <TrendingUpIcon />,
    title: 'Startups & Scaleups',
    desc: "You've found product-market fit. Now you need a product surface that matches your ambition and scales with your team — without accumulating design debt.",
    stat: 'Typical engagement: $18K – $40K',
    featured: false,
  },
  {
    icon: <ShieldCheckIcon />,
    title: 'Fintech & Web3',
    desc: 'Trust is the product. Complex flows need to feel effortless. We design for compliance, clarity, and conversion simultaneously — without sacrificing any of the three.',
    stat: 'Typical engagement: $24K – $60K',
    featured: false,
  },
  {
    icon: <BuildingIcon />,
    title: 'Enterprise Software',
    desc: 'Internal tools and enterprise SaaS that people actually want to use. We turn operational complexity into clarity without stripping away the capability that makes it powerful.',
    stat: 'Typical engagement: Custom scope',
    featured: false,
  },
]

function IndustryCard({ icon, title, desc, stat, featured }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'rgba(0,255,135,0.06)'
          : featured ? 'rgba(0,255,135,0.04)' : 'rgba(255,255,255,0.04)',
        border: featured
          ? '1px solid rgba(0,255,135,0.4)'
          : '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: '36px 32px',
        position: 'relative',
        transition: 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.35s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px rgba(0,255,135,0.1)' : '0 0 0 transparent',
        cursor: 'default',
      }}
    >
      {featured && (
        <div style={{
          position: 'absolute', top: -12, left: 24,
          background: '#00CC6E', color: '#050816',
          fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '4px 12px', borderRadius: 100,
        }}>
          Core focus
        </div>
      )}

      {/* Icon container */}
      <div style={{
        width: 52, height: 52,
        borderRadius: 14,
        background: hovered
          ? 'linear-gradient(135deg, rgba(0,255,135,0.18) 0%, rgba(0,204,110,0.12) 100%)'
          : 'linear-gradient(135deg, rgba(0,255,135,0.1) 0%, rgba(0,204,110,0.06) 100%)',
        border: '1px solid rgba(0,255,135,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24,
        color: '#00FF87',
        transition: 'background 0.25s ease, box-shadow 0.25s ease',
        boxShadow: hovered
          ? '0 0 24px rgba(0,255,135,0.18)'
          : '0 0 0 transparent',
      }}>
        {icon}
      </div>

      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 22, fontWeight: 700,
        color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: 12,
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 14, color: 'rgba(255,255,255,0.45)',
        lineHeight: 1.65, marginBottom: 20,
      }}>
        {desc}
      </p>
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 13, fontWeight: 600, color: '#00FF87',
      }}>
        {stat}
      </span>
    </div>
  )
}

export default function Industries() {
  return (
    <section style={{
      padding: '120px 32px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 56 }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.14em',
            color: '#00FF87', marginBottom: 16,
          }}>
            Who we build for
          </p>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontWeight: 800, letterSpacing: '-0.04em',
            color: '#FFFFFF', lineHeight: 1.05, margin: '0 0 16px 0',
          }}>
            Built for teams shipping ambitious products.
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 17, color: 'rgba(255,255,255,0.45)', maxWidth: 520,
          }}>
            We work with founders and product teams where the quality of the digital experience directly determines the outcome.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {industries.map((ind, i) => <IndustryCard key={i} {...ind} />)}
        </div>
      </div>
    </section>
  )
}
