import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stacks = [
  {
    id: 'wordpress',
    name: 'WordPress',
    sub: 'The Veteran Heavyweight',
    featured: false,
    desc: 'Open-source CMS that powers ~43% of the web. Massive plugin ecosystem, infinite flexibility, and the only real option if you need WooCommerce, deep SEO control, or membership functionality at scale.',
    cost:    '$$',
    speed:   'Med',
    flex:    'High',
    pros: [
      'Unmatched plugin ecosystem — anything you can imagine exists',
      'Best-in-class for blogs, content sites, SEO',
      'WooCommerce for serious e-commerce',
      'You actually own everything — code, data, hosting',
    ],
    cons: [
      'Requires ongoing security updates and maintenance',
      'Plugin conflicts can break things at midnight',
      'Performance depends heavily on hosting + setup',
    ],
    bestFor: 'Content-heavy brands, blogs with serious SEO ambitions, membership sites, and e-commerce with 500+ SKUs.',
  },
  {
    id: 'webflow',
    name: 'Webflow',
    sub: "The Visual Designer's CMS",
    featured: true,
    desc: "Visual development platform with hosted infrastructure. Pixel-perfect design control without writing code, beautiful animations out of the box, and zero plugin maintenance. The fastest way to ship a premium-looking marketing site.",
    cost:    '$$$',
    speed:   'Fast',
    flex:    'Med',
    pros: [
      'Stunning animations and interactions without code',
      'Fast, secure hosting baked in — no plugins to update',
      'Clean code output, great Core Web Vitals',
      'Your client can edit text without breaking anything',
      'Built-in CMS perfect for case studies, blogs, careers',
    ],
    cons: [
      "Monthly Webflow hosting fees (you don't own hosting)",
      'E-commerce is limited compared to Shopify/Woo',
      "No real plugin ecosystem — it's whatever Webflow ships",
    ],
    bestFor: 'Marketing sites, agencies, SaaS landing pages, premium personal brands, and design-led companies under 200 pages.',
  },
  {
    id: 'custom',
    name: 'Custom code',
    sub: 'Built From the Metal Up',
    featured: false,
    desc: 'React, Next.js, Astro — a hand-built application tailored to your exact requirements. Maximum performance, maximum flexibility, maximum control. Also: maximum investment and the longest timeline.',
    cost:    '$$$$',
    speed:   'Slow',
    flex:    'Max',
    pros: [
      'Perfect Lighthouse scores, sub-second load times',
      'Complete control over every pixel, every interaction',
      'Custom logic — calculators, dashboards, dynamic pricing',
      'Scales to millions of users without re-architecture',
      'No platform fees, no vendor lock-in, ever',
    ],
    cons: [
      'Highest upfront investment',
      'Requires a developer to make changes',
      'Longest timeline — typically 8–16 weeks',
    ],
    bestFor: 'Funded SaaS products, ambitious e-commerce, high-traffic publishers, or anything with complex custom logic.',
  },
]

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="7" cy="7" r="6.5" stroke="#C7F751" strokeWidth="1"/>
      <path d="M7 4v6M4 7h6" stroke="#C7F751" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="7" cy="7" r="6.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      <path d="M4 7h6" stroke="rgba(255,255,255,0.25)" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

function StatBlock({ value, label, highlight }) {
  return (
    <div>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 22, fontWeight: 800,
        color: highlight ? '#C7F751' : '#FFFFFF',
        letterSpacing: '-0.02em', lineHeight: 1,
        marginBottom: 4,
      }}>{value}</div>
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 9, fontWeight: 600,
        color: 'rgba(255,255,255,0.28)',
        textTransform: 'uppercase', letterSpacing: '0.14em',
      }}>{label}</div>
    </div>
  )
}

function StackCard({ stack, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: stack.featured
          ? 'rgba(255,255,255,0.05)'
          : hovered ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.015)',
        border: `1px solid ${stack.featured ? 'rgba(199,247,81,0.18)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 16,
        padding: '36px 32px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: stack.featured
          ? '0 0 0 1px rgba(199,247,81,0.06), 0 24px 48px rgba(0,0,0,0.35)'
          : hovered ? '0 16px 40px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.15)',
        opacity: 0,
        animation: `pr-fadein 0.55s ease forwards ${index * 0.13 + 0.15}s`,
      }}
    >
      {/* Featured badge */}
      {stack.featured && (
        <div style={{
          position: 'absolute', top: -1, left: '50%',
          transform: 'translateX(-50%)',
          background: '#C7F751',
          color: '#0A0A0A',
          fontFamily: "'Inter', sans-serif",
          fontSize: 9, fontWeight: 800,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          padding: '5px 14px',
          borderRadius: '0 0 8px 8px',
          whiteSpace: 'nowrap',
        }}>Our pick for most</div>
      )}

      {/* Name */}
      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 28, fontWeight: 800,
        color: '#FFFFFF', letterSpacing: '-0.03em',
        lineHeight: 1.1, marginBottom: 8,
        marginTop: stack.featured ? 10 : 0,
      }}>{stack.name}</h3>

      {/* Sub */}
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 10, fontWeight: 600,
        color: stack.featured ? 'rgba(199,247,81,0.65)' : 'rgba(255,255,255,0.28)',
        textTransform: 'uppercase', letterSpacing: '0.15em',
        marginBottom: 20,
      }}>{stack.sub}</div>

      {/* Description */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 13.5, color: 'rgba(255,255,255,0.5)',
        lineHeight: 1.7, marginBottom: 24,
      }}>{stack.desc}</p>

      {/* Stats row */}
      <div style={{
        display: 'flex', gap: 28, alignItems: 'flex-start',
        paddingBottom: 24,
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        marginBottom: 24,
      }}>
        <StatBlock value={stack.cost}  label="Cost"          highlight={true} />
        <StatBlock value={stack.speed} label="Speed to ship" highlight={false} />
        <StatBlock value={stack.flex}  label="Flexibility"   highlight={false} />
      </div>

      {/* Pros */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 14 }}>
        {stack.pros.map((p, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
            <PlusIcon />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5,
            }}>{p}</span>
          </li>
        ))}
      </ul>

      {/* Cons */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 28 }}>
        {stack.cons.map((c, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
            <MinusIcon />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13, color: 'rgba(255,255,255,0.32)', lineHeight: 1.5,
            }}>{c}</span>
          </li>
        ))}
      </ul>

      {/* Best for */}
      <div style={{
        marginTop: 'auto',
        padding: '16px 18px',
        background: stack.featured ? 'rgba(199,247,81,0.06)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${stack.featured ? 'rgba(199,247,81,0.18)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 10,
      }}>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 9, fontWeight: 700,
          color: stack.featured ? '#C7F751' : 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase', letterSpacing: '0.18em',
          marginBottom: 8,
        }}>Best for</div>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13, fontStyle: 'italic',
          color: 'rgba(255,255,255,0.6)', lineHeight: 1.6,
          margin: 0,
        }}>{stack.bestFor}</p>
      </div>
    </div>
  )
}

export default function Pricing({ onCTA }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="pricing" ref={ref} style={{ padding: '120px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{
          maxWidth: 680,
          marginBottom: 72,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.2em',
            color: '#C7F751', marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 28, height: 1, background: '#C7F751', display: 'inline-block' }} />
            The Stack Question
          </p>

          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
            lineHeight: 1.06,
            marginBottom: 28,
          }}>
            WordPress, Webflow,{' '}
            or custom code —{' '}
            <em style={{
              fontStyle: 'italic',
              color: '#C7F751',
              fontWeight: 700,
              textShadow: '0 0 40px rgba(199,247,81,0.35)',
            }}>
              which one is right for you?
            </em>
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16, color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.75, margin: 0,
          }}>
            Most agencies push you toward whatever they happen to build with. We've shipped on all three, and the honest answer depends entirely on what you sell, how fast you ship, and who maintains it after launch.
          </p>
        </div>

        {/* ── Stack cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          alignItems: 'start',
        }}>
          {stacks.map((stack, i) => (
            <StackCard key={stack.id} stack={stack} index={i} />
          ))}
        </div>

      </div>

      <style>{`
        @keyframes pr-fadein {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          #pricing > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
