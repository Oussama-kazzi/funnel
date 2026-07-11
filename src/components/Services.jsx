import { useState } from 'react'
import { motion } from 'framer-motion'

const services = [
  { title: 'Sites vitrines', desc: 'Des sites professionnels qui présentent votre entreprise et renforcent votre crédibilité.', tag: 'Vitrine', span: 2 },
  { title: 'Landing pages', desc: 'Des pages à forte conversion conçues pour générer plus de leads et de ventes.', tag: 'Conversion' },
  { title: 'E-commerce', desc: 'Des boutiques en ligne performantes, sécurisées et faciles à gérer.', tag: 'Boutique' },
  { title: 'Applications web', desc: 'Des plateformes web sur mesure pour simplifier vos processus métiers.', tag: 'Web App' },
  { title: 'UI / UX Design', desc: 'Des interfaces modernes, intuitives et centrées sur l’expérience utilisateur.', tag: 'Design' },
  { title: 'Refonte de site', desc: 'Nous transformons votre site actuel en une expérience moderne et performante.', tag: 'Refonte' },
  { title: 'Automatisation IA', desc: 'Nous intégrons l’intelligence artificielle et l’automatisation pour gagner du temps.', tag: 'IA' },
  { title: 'Maintenance', desc: 'Mises à jour, sécurité, optimisations et support continu pour votre site.', tag: 'Support' },
]

function Icon({ tag }) {
  const shared = { width: 22, height: 22, fill: 'none', stroke: '#FED24B', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
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

function ServiceCard({ title, desc, tag, span }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="svc-card"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.4 }}
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: span === 2 ? 'span 2' : 'span 1',
        background: '#FFFFFF',
        border: `1px solid ${hovered ? 'rgba(254,210,75,0.35)' : 'rgba(15,12,30,0.08)'}`,
        borderRadius: 20,
        padding: '30px 28px 26px',
        position: 'relative',
        display: 'flex',
        flexDirection: span === 2 ? 'row' : 'column',
        alignItems: span === 2 ? 'center' : 'flex-start',
        gap: span === 2 ? 24 : 0,
        height: '100%',
        boxShadow: hovered
          ? '0 14px 36px rgba(20,16,25,0.08), 0 2px 6px rgba(15,12,30,0.03)'
          : '0 1px 3px rgba(15,12,30,0.04)',
        transition: 'border-color 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'default',
        overflow: 'hidden',
      }}
    >
      {/* Icon tile */}
      <div style={{
        width: 48, height: 48, borderRadius: 13,
        background: 'linear-gradient(135deg, rgba(254,210,75,0.14), rgba(254,210,75,0.08))',
        border: '1px solid rgba(254,210,75,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: span === 2 ? 0 : 20, flexShrink: 0,
        boxShadow: hovered ? '0 0 22px rgba(254,210,75,0.16)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}>
        <Icon tag={tag} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        {/* Title */}
        <h3 style={{
          fontFamily: "'Mona Sans Variable', sans-serif",
          fontSize: 18, fontWeight: 700,
          color: '#141019', letterSpacing: '-0.02em',
          marginBottom: 8, lineHeight: 1.25,
        }}>
          {title}
        </h3>

        {/* Desc */}
        <p style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 13.5, color: 'rgba(20,16,25,0.55)', lineHeight: 1.6, margin: 0 }}>
          {desc}
        </p>
      </div>

    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="section-light" style={{ padding: '112px 32px 100px', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

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
          <p style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#1A1526', marginBottom: 18 }}>
            Ce que nous faisons
          </p>
          <h2 style={{ fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 'clamp(30px, 4.5vw, 50px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#141019', lineHeight: 1.08, margin: 0, maxWidth: 620 }}>
            Des solutions complètes pour accélérer votre croissance.
          </h2>
        </motion.div>

        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '1fr',
          gap: 18,
        }}>
          {services.map((s, i) => <ServiceCard key={i} {...s} />)}
        </div>
      </div>

      <style>{`
        /* Soft-edged warm band — fades in/out so the section melts into the
           ambient background instead of starting/ending on a hard seam. */
        #services.section-light {
          background: linear-gradient(180deg,
            rgba(240,235,222,0) 0%,
            rgba(240,235,222,0.55) 18%,
            rgba(240,235,222,0.55) 82%,
            rgba(240,235,222,0) 100%);
        }
        /* gentle gold bloom at the top edge for continuity with the hero */
        #services.section-light::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 180px;
          background: radial-gradient(ellipse 60% 100% at 50% 0%, rgba(254,210,75,0.08), transparent 70%);
          pointer-events: none;
        }
        @media (max-width: 1024px) {
          #services .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          #services .svc-card { grid-column: span 1 !important; flex-direction: column !important; align-items: flex-start !important; }
        }
        @media (max-width: 768px) {
          #services { padding: 80px 20px 72px !important; }
          #services > div > div:first-child { margin-bottom: 44px !important; }
        }
        @media (max-width: 560px) {
          #services .services-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          #services .svc-card { padding: 24px 22px 22px !important; }
        }
      `}</style>
    </section>
  )
}
