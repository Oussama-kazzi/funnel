import { useState } from 'react'
import { motion } from 'framer-motion'

const services = [
  { num: '01', title: 'Sites vitrines', desc: 'Des sites professionnels qui présentent votre entreprise et renforcent votre crédibilité.', tag: 'Vitrine' },
  { num: '02', title: 'Landing pages', desc: 'Des pages à forte conversion conçues pour générer plus de leads et de ventes.', tag: 'Conversion' },
  { num: '03', title: 'E-commerce', desc: 'Des boutiques en ligne performantes, sécurisées et faciles à gérer.', tag: 'Boutique' },
  { num: '04', title: 'Applications web', desc: 'Des plateformes web sur mesure pour simplifier vos processus métiers.', tag: 'Web App' },
  { num: '05', title: 'UI / UX Design', desc: 'Des interfaces modernes, intuitives et centrées sur l’expérience utilisateur.', tag: 'Design' },
  { num: '06', title: 'Refonte de site', desc: 'Nous transformons votre site actuel en une expérience moderne et performante.', tag: 'Refonte' },
  { num: '07', title: 'Automatisation IA', desc: 'Nous intégrons l’intelligence artificielle et l’automatisation pour gagner du temps.', tag: 'IA' },
  { num: '08', title: 'Maintenance', desc: 'Mises à jour, sécurité, optimisations et support continu pour votre site.', tag: 'Support' },
]

function Icon({ tag }) {
  const shared = { width: 22, height: 22, fill: 'none', stroke: '#8B5CF6', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (tag) {
    case 'Vitrine':
      return <svg viewBox="0 0 24 24" {...shared}><rect x="3" y="4" width="18" height="14" rx="2"/><line x1="3" y1="8" x2="21" y2="8"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="18" x2="12" y2="21"/></svg>
    case 'Conversion':
      return <svg viewBox="0 0 24 24" {...shared}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>
    case 'Boutique':
      return <svg viewBox="0 0 24 24" {...shared}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6"/></svg>
    case 'Web App':
      return <svg viewBox="0 0 24 24" {...shared}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="6" y1="7" x2="10" y2="7"/></svg>
    case 'Design':
      return <svg viewBox="0 0 24 24" {...shared}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/></svg>
    case 'Refonte':
      return <svg viewBox="0 0 24 24" {...shared}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.5 9a9 9 0 0114.9-3.4L23 10M1 14l4.6 4.4A9 9 0 0020.5 15"/></svg>
    case 'IA':
      return <svg viewBox="0 0 24 24" {...shared}><path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z"/><circle cx="19" cy="19" r="2"/></svg>
    case 'Support':
      return <svg viewBox="0 0 24 24" {...shared}><path d="M14.7 6.3a4 4 0 00-5.7 5.7l-6 6a2 2 0 002.8 2.8l6-6a4 4 0 005.7-5.7l-2.6 2.6-2.8-.4-.4-2.8 2.6-2.6z"/></svg>
    default: return null
  }
}

function ArrowUpRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="12" x2="18" y2="12"/>
      <polyline points="13 7 18 12 13 17"/>
    </svg>
  )
}

const headerVariants = {
  offscreen: { y: 24, opacity: 0 },
  onscreen: {
    y: 0, opacity: 1,
    transition: { type: 'spring', bounce: 0.15, duration: 0.9 },
  },
}

// Each card has its own whileInView — fires independently as you scroll, matching the reference pattern
const cardVariants = {
  offscreen: { y: 60, opacity: 0 },
  onscreen: {
    y: 0, opacity: 1,
    transition: { type: 'spring', bounce: 0.4, duration: 0.85 },
  },
}

function ServiceCard({ num, title, desc, tag }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.45 }}
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(139,92,246,0.05)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? 'rgba(139,92,246,0.35)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 16,
        padding: '28px 26px 24px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: hovered ? '0 18px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(139,92,246,0.08)' : '0 4px 16px rgba(0,0,0,0.15)',
        transition: 'background 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'default',
      }}
    >
      {/* Icon tile */}
      <div style={{
        width: 46, height: 46, borderRadius: 12,
        background: hovered
          ? 'linear-gradient(135deg, rgba(139,92,246,0.22), rgba(99,102,241,0.12))'
          : 'linear-gradient(135deg, rgba(139,92,246,0.14), rgba(99,102,241,0.06))',
        border: '1px solid rgba(139,92,246,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 20,
        boxShadow: hovered ? '0 0 20px rgba(139,92,246,0.18)' : 'none',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
      }}>
        <Icon tag={tag} />
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 18, fontWeight: 700,
        color: '#FFFFFF', letterSpacing: '-0.02em',
        marginBottom: 10, lineHeight: 1.25,
      }}>
        {title}
      </h3>

      {/* Desc */}
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
        {desc}
      </p>

      {/* Arrow — always visible, slides on hover */}
      <div style={{
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <ArrowUpRight />
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" style={{ padding: '112px 32px 72px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          style={{
            textAlign: 'center', marginBottom: 64,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#8B5CF6', marginBottom: 18 }}>
            Nos services
          </p>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#FFFFFF', lineHeight: 1.08, margin: 0, maxWidth: 620 }}>
            Des solutions complètes pour accélérer votre croissance.
          </h2>
        </motion.div>

        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
        }}>
          {services.map((s, i) => <ServiceCard key={i} {...s} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #services .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          #services { padding: 72px 20px !important; }
        }
        @media (max-width: 560px) {
          #services .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
