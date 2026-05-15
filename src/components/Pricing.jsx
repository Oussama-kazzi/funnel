import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fixedPlans = [
  {
    name: 'Foundation',
    capacity: 1,
    desc: 'Best for early validation and focused design sprints',
    price: '$8,000',
    priceSuffix: '– $14,000',
    timeline: '3–4 weeks delivery',
    cta: 'Start a project',
    popular: false,
    features: [
      'Product strategy session',
      'Up to 5 designed screens',
      'Figma design system',
      'React or Next.js build',
      'Responsive across all devices',
      'Analytics & tracking setup',
      '30-day post-launch support',
    ],
  },
  {
    name: 'Studio',
    capacity: 2,
    desc: 'For growing teams needing consistent design and build delivery',
    price: '$18,000',
    priceSuffix: '– $32,000',
    timeline: '5–7 weeks delivery',
    cta: 'Start your project',
    popular: true,
    features: [
      'Full discovery & strategy sprint',
      'Up to 16 designed screens',
      'Complete Figma design system',
      'React / Next.js production build',
      'Auth, API & CMS integration',
      'Animations & micro-interactions',
      'Performance & Core Web Vitals',
      '60-day post-launch support',
    ],
  },
  {
    name: 'Enterprise',
    capacity: 3,
    desc: 'For companies that scale fast or build complex products',
    price: '$40,000',
    priceSuffix: '+',
    timeline: 'Scoped per engagement',
    cta: 'Talk to us',
    popular: false,
    features: [
      'Multi-product strategy',
      'Unlimited screens & flows',
      'Full design system + tokens',
      'Next.js or custom architecture',
      'Backend & infrastructure design',
      'Team onboarding & documentation',
      'Dedicated senior team',
      '6-month support retainer option',
    ],
  },
]

const retainerPlans = [
  {
    name: 'Part-Time',
    capacity: 1,
    desc: 'Ongoing senior design support for focused recurring tasks',
    price: '$4,500',
    priceSuffix: '/mo',
    timeline: 'Month-to-month · pause anytime',
    cta: 'Start now',
    popular: false,
    features: [
      'Dedicated designer at half-time capacity',
      'Head of Design oversight',
      'Support for ongoing product tasks',
      'Unlimited tasks within monthly hours',
      '3-day free trial included',
      'Pause or cancel anytime',
      'Weekly sync call',
    ],
  },
  {
    name: 'Full-Time',
    capacity: 2,
    desc: 'For growing teams needing consistent delivery at full capacity',
    price: '$8,500',
    priceSuffix: '/mo',
    timeline: 'Month-to-month · pause anytime',
    cta: 'Start now',
    popular: true,
    features: [
      'Dedicated designer at full capacity',
      'Head of Design oversight',
      'Unlimited tasks within monthly hours',
      'Faster turnaround for complex tasks',
      '3-day free trial included',
      'Pause or cancel anytime',
      'Priority Slack support',
    ],
  },
  {
    name: 'Design Team',
    capacity: 3,
    desc: 'For companies that scale fast or build complex products',
    price: '$15,000',
    priceSuffix: '/mo',
    timeline: 'Month-to-month · pause anytime',
    cta: 'Talk to us',
    popular: false,
    features: [
      'Two or more dedicated designers',
      'End-to-end design ownership',
      'Head of Design oversight and direction',
      'Parallel delivery across workstreams',
      '3-day free trial included',
      'Pause or cancel anytime',
      'Dedicated Slack channel',
    ],
  },
]

function PersonIcon({ active }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="7" r="4" fill={active ? '#FFFFFF' : 'rgba(255,255,255,0.15)'} />
      <path
        d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8"
        stroke={active ? '#FFFFFF' : 'rgba(255,255,255,0.15)'}
        strokeWidth="1.5" strokeLinecap="round" fill="none"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M3 8l3.5 3.5L13 4.5" stroke="#00FF87" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PricingCard({ plan, onCTA, isLast }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '40px 32px',
        display: 'flex',
        flexDirection: 'column',
        borderRight: !isLast ? '1px solid rgba(255,255,255,0.07)' : 'none',
        background: hovered ? 'rgba(255,255,255,0.025)' : 'transparent',
        transition: 'background 0.35s cubic-bezier(0.4,0,0.2,1)',
        position: 'relative',
      }}
    >
      {plan.popular && (
        <div style={{
          position: 'absolute', top: 20, right: 20,
          background: '#00CC6E', color: '#050816',
          fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '4px 12px', borderRadius: 100, whiteSpace: 'nowrap',
        }}>
          Most popular
        </div>
      )}

      {/* Plan name */}
      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 26, fontWeight: 800,
        color: '#FFFFFF', letterSpacing: '-0.02em',
        lineHeight: 1.15, marginBottom: 22,
        paddingRight: plan.popular ? 100 : 0,
      }}>
        {plan.name}
      </h3>

      {/* Capacity icons */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <PersonIcon key={i} active={i < plan.capacity} />
        ))}
      </div>

      {/* Description */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 14, color: 'rgba(255,255,255,0.5)',
        lineHeight: 1.65, marginBottom: 28,
      }}>
        {plan.desc}
      </p>

      {/* Price */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 32, fontWeight: 800,
            color: '#FFFFFF', letterSpacing: '-0.04em', lineHeight: 1,
          }}>
            {plan.price}
          </span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15, color: 'rgba(255,255,255,0.4)',
          }}>
            {plan.priceSuffix}
          </span>
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12, color: 'rgba(255,255,255,0.3)',
          marginTop: 5,
        }}>
          {plan.timeline}
        </div>
      </div>

      {/* CTA — pill button matching the screenshot */}
      <button
        onClick={onCTA}
        style={{
          alignSelf: 'flex-start',
          background: '#FFFFFF',
          color: '#0A0A0A',
          border: 'none',
          borderRadius: 100,
          padding: '13px 30px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 14, fontWeight: 700,
          cursor: 'pointer',
          marginBottom: 32,
          transition: 'background 0.25s, color 0.25s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#00FF87' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF' }}
      >
        {plan.cta}
      </button>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 28 }} />

      {/* Feature list */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
        {plan.features.map((f, i) => (
          <li key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            fontFamily: "'Inter', sans-serif",
            fontSize: 13.5, color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.45,
          }}>
            <CheckIcon />
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

const headerVariants = {
  offscreen: { y: 24, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { type: 'spring', bounce: 0.15, duration: 0.9 } },
}

export default function Pricing({ onCTA }) {
  const [tab, setTab] = useState('fixed')
  const plans = tab === 'fixed' ? fixedPlans : retainerPlans

  return (
    <section id="pricing" style={{ padding: '120px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#00FF87', marginBottom: 16 }}>
            Investment
          </p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#FFFFFF', lineHeight: 1.05, marginBottom: 36 }}>
            Straightforward engagements.
          </h2>

          {/* Toggle — Design/Development style from the screenshot */}
          <div style={{
            display: 'inline-flex',
            padding: '4px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 100,
          }}>
            {[['fixed', 'Fixed Price'], ['retainer', 'Retainer']].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setTab(val)}
                style={{
                  padding: '10px 28px',
                  borderRadius: 100,
                  border: 'none',
                  background: tab === val ? '#FFFFFF' : 'transparent',
                  color: tab === val ? '#0A0A0A' : 'rgba(255,255,255,0.45)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14, fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.3s cubic-bezier(0.4,0,0.2,1), color 0.3s cubic-bezier(0.4,0,0.2,1)',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards — unified container with column dividers, matching the screenshot */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20,
              overflow: 'hidden',
            }}
          >
            {plans.map((plan, i) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                onCTA={onCTA}
                isLast={i === plans.length - 1}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14, color: 'rgba(255,255,255,0.3)',
            textAlign: 'center', marginTop: 32,
          }}
        >
          All engagements include delivery milestones and a structured revision process.{' '}
          <strong style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
            Payment: 50% on kickoff, 50% on handover.
          </strong>
        </motion.p>

      </div>
    </section>
  )
}
