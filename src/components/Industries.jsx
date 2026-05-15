import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'

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

const HotelIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21V5a2 2 0 012-2h14a2 2 0 012 2v16" />
    <path d="M3 21h18" />
    <path d="M9 21v-6h6v6" />
    <rect x="7" y="7" width="3" height="3" rx="0.5" />
    <rect x="14" y="7" width="3" height="3" rx="0.5" />
    <rect x="7" y="13" width="3" height="3" rx="0.5" />
    <rect x="14" y="13" width="3" height="3" rx="0.5" />
  </svg>
)

const industries = [
  {
    icon: <CpuIcon />,
    title: 'SaaS & AI Products',
    desc: "Your product is complex. Your website needs to make it feel simple. We design trial flows that convert, pricing pages that don't confuse, and onboarding experiences that reduce churn from the first click.",
    bullets: [
      'Landing pages that explain your product in 10 seconds',
      'Pricing pages optimized for annual conversion',
      'Demo request flows that filter qualified leads',
      'Documentation and help center design',
    ],
    featured: true,
  },
  {
    icon: <TrendingUpIcon />,
    title: 'Startups & Scaleups',
    desc: "You're moving fast and every dollar has to work. We build websites that give investors confidence, generate inbound leads, and don't need rebuilding every 18 months.",
    bullets: [
      'Investor-grade brand identity and web presence',
      'MVP marketing sites launched in under 4 weeks',
      'Growth-ready architecture that scales without a rewrite',
      'Launch sequences and waitlist funnels',
    ],
    featured: false,
  },
  {
    icon: <ShieldCheckIcon />,
    title: 'Fintech & Web3',
    desc: 'Trust is your product. Your site needs to communicate credibility, compliance awareness, and security without being boring. We balance regulatory tone with conversion design.',
    bullets: [
      'Compliance-friendly copy architecture',
      'KYC / onboarding flow design',
      'Token launch pages and community portals',
    ],
    featured: false,
  },
  {
    icon: <HotelIcon />,
    title: 'Hostels & Boutique Hotels',
    desc: 'Direct bookings are your highest-margin revenue. We build sites that compete with OTAs on experience and win on personality — turning browsers into bookers without the commission.',
    bullets: [
      'Direct booking engine integration (Cloudbeds, Beds24, Apaleo)',
      'Experience-first storytelling and photography direction',
      'Multi-property and multi-room inventory design',
      'SEO-optimized destination content strategy',
    ],
    featured: false,
  },
]

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C7F751" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function IndustryCard({ icon, title, desc, bullets, featured, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'rgba(199,247,81,0.05)'
          : featured ? 'rgba(199,247,81,0.03)' : 'rgba(255,255,255,0.03)',
        border: featured
          ? '1px solid rgba(199,247,81,0.35)'
          : `1px solid ${hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 18,
        padding: '36px 32px 32px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, background 0.3s ease, border-color 0.3s ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 20px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(199,247,81,0.06)'
          : '0 4px 16px rgba(0,0,0,0.15)',
        opacity: 0,
        animation: `ind-fadein 0.6s ease forwards ${index * 0.12 + 0.2}s`,
      }}
    >
      {/* Featured badge */}
      {featured && (
        <div style={{
          position: 'absolute', top: -12, left: 24,
          background: '#C7F751', color: '#050816',
          fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '4px 12px', borderRadius: 100,
        }}>
          Core focus
        </div>
      )}

      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: hovered
          ? 'linear-gradient(135deg, rgba(199,247,81,0.18), rgba(168,216,48,0.1))'
          : 'linear-gradient(135deg, rgba(199,247,81,0.1), rgba(168,216,48,0.05))',
        border: '1px solid rgba(199,247,81,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24, color: '#C7F751',
        transition: 'background 0.25s ease, box-shadow 0.25s ease',
        boxShadow: hovered ? '0 0 20px rgba(199,247,81,0.15)' : 'none',
      }}>
        {icon}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 21, fontWeight: 700,
        color: '#FFFFFF', letterSpacing: '-0.025em',
        marginBottom: 12,
      }}>
        {title}
      </h3>

      {/* Desc */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 14, color: 'rgba(255,255,255,0.42)',
        lineHeight: 1.68, marginBottom: 22,
      }}>
        {desc}
      </p>

      {/* Divider */}
      <div style={{
        height: 1,
        background: featured ? 'rgba(199,247,81,0.12)' : 'rgba(255,255,255,0.06)',
        marginBottom: 20,
      }} />

      {/* Bullets */}
      <ul style={{
        listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10,
        marginTop: 'auto',
      }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
            <CheckIcon />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5,
            }}>
              {b}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Industries() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  return (
    <section className="ind-section" style={{
      padding: '80px 32px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={ref}
          style={{
            marginBottom: 60,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.2em',
            color: '#C7F751', marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 28, height: 1, background: '#C7F751', display: 'inline-block' }} />
            Who we build for
          </p>

          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(32px, 4.5vw, 58px)',
            fontWeight: 800, letterSpacing: '-0.04em',
            color: '#FFFFFF', lineHeight: 1.05,
            margin: '0 0 20px',
          }}>
            Built for teams shipping{' '}
            <em style={{ fontStyle: 'italic', color: '#C7F751', fontWeight: 700, textShadow: '0 0 40px rgba(199,247,81,0.3)' }}>
              ambitious products.
            </em>
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 17, color: 'rgba(255,255,255,0.42)',
            maxWidth: 560, lineHeight: 1.7, margin: 0,
          }}>
            We don't do everything for everyone. We've gone deep in three verticals and we know exactly what makes a great website in each one.
          </p>
        </div>

        {/* Grid */}
        <div className="ind-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
          alignItems: 'start',
        }}>
          {industries.map((ind, i) => (
            <IndustryCard key={i} {...ind} index={i} />
          ))}
        </div>

      </div>

      <style>{`
        @keyframes ind-fadein {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 860px) {
          .ind-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 768px) {
          .ind-section { padding: 56px 20px 48px !important; }
        }
        @media (max-width: 480px) {
          .ind-section { padding: 48px 16px 40px !important; }
          .ind-grid { gap: 16px !important; }
        }
      `}</style>
    </section>
  )
}
