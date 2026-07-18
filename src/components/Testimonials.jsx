import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    stars: 5,
    quote: "FuturA a transformé notre présence en ligne. Le résultat dépasse nos attentes. Professionnels, réactifs et à l’écoute du début à la fin du projet.",
    initials: 'YM',
    name: 'Youssef El M.',
    role: 'CEO, NextEra',
    metric: '+65%',
    metricLabel: 'de leads en quelques semaines',
  },
  {
    stars: 5,
    quote: "La landing page qu’ils ont créée nous a permis d’augmenter nos leads de 65% en seulement quelques semaines. Un vrai levier de croissance.",
    initials: 'SK',
    name: 'Sarah K.',
    role: 'Marketing Manager, Bloomy',
    metric: '×2',
    metricLabel: 'taux de conversion',
  },
  {
    stars: 5,
    quote: "Une équipe talentueuse, créative et très professionnelle. Notre site est rapide, moderne et facile à gérer au quotidien.",
    initials: 'MT',
    name: 'Mehdi T.',
    role: 'Fondateur, Axelance',
    metric: '100%',
    metricLabel: 'satisfaction',
  },
  {
    stars: 5,
    quote: "Excellent accompagnement du début à la fin. Ils comprennent vraiment les besoins du client et proposent les bonnes solutions.",
    initials: 'AB',
    name: 'Dr. Amine B.',
    role: 'Directeur, Medicare',
    metric: '+40%',
    metricLabel: 'de nouveaux patients',
  },
  {
    stars: 5,
    quote: "Livraison rapide et un design premium qui reflète parfaitement notre image de marque. Nous recommandons FuturA sans hésiter.",
    initials: 'LK',
    name: 'Lina K.',
    role: 'Gérante, Studio Nour',
    metric: '3 sem.',
    metricLabel: 'du lancement à la mise en ligne',
  },
  {
    stars: 5,
    quote: "Ils ont automatisé une grande partie de notre acquisition. Nous gagnons un temps précieux chaque semaine grâce à leurs solutions IA.",
    initials: 'RB',
    name: 'Reda B.',
    role: 'Directeur, Optima Conseil',
    metric: '−30%',
    metricLabel: 'de temps sur les tâches répétitives',
  },
]

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="#F59E0B">
          <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.5 4.3 12.3 5 8.2 2 5.3l4.2-.7z" />
        </svg>
      ))}
    </div>
  )
}

function MasonryCard({ t, i }) {
  return (
    <motion.div
      className="tm-card"
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
      whileHover={{ y: -4 }}
    >
      {/* Metric chip */}
      <div className="tm-metric">
        <span className="tm-metric-val">{t.metric}</span>
        <span className="tm-metric-label">{t.metricLabel}</span>
      </div>

      <Stars count={t.stars} />

      <blockquote className="tm-quote">“{t.quote}”</blockquote>

      <div className="tm-author">
        <div className="tm-avatar">{t.initials}</div>
        <div>
          <div className="tm-name">{t.name}</div>
          <div className="tm-role">{t.role}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="testimonials"
      className="testi-section"
      style={{ padding: '112px 32px 104px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Header */}
      <div className="testi-head" style={{
        maxWidth: 900, margin: '0 auto 56px', textAlign: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <p style={{
          fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 12, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.16em', color: '#1A1526', marginBottom: 18,
        }}>
          Témoignages
        </p>
        <h2 style={{
          fontFamily: "'Mona Sans Variable', sans-serif",
          fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 800,
          letterSpacing: '-0.04em', color: '#1A1526', lineHeight: 1.1, margin: '0 auto', maxWidth: 720,
        }}>
          Pour toutes les <span style={{ color: '#1A1526' }}>entreprises</span>, entrepreneurs et agences.
        </h2>
        <p style={{
          fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 16, color: 'rgba(26,21,38,0.72)',
          lineHeight: 1.65, margin: '18px auto 0', maxWidth: 520,
        }}>
          Ce que nos clients disent de nous après avoir travaillé avec FuturA.
        </p>
      </div>

      {/* Masonry grid */}
      <div className="tm-masonry">
        {testimonials.map((t, i) => (
          <MasonryCard key={i} t={t} i={i} />
        ))}
      </div>

      <style>{`
        .tm-masonry {
          max-width: 1120px; margin: 0 auto;
          columns: 3; column-gap: 20px;
        }
        .tm-card {
          break-inside: avoid;
          margin-bottom: 20px;
          background: linear-gradient(160deg, rgba(26,21,38,0.05) 0%, rgba(204,243,6,0.04) 100%);
          border: 1px solid rgba(26,21,38,0.09);
          border-radius: 20px;
          padding: 26px 24px 22px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .tm-card:hover {
          border-color: rgba(204,243,6,0.3);
          box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(204,243,6,0.06);
        }
        .tm-metric {
          display: flex; align-items: baseline; gap: 8px;
          margin-bottom: 18px; padding-bottom: 16px;
          border-bottom: 1px solid rgba(26,21,38,0.09);
        }
        .tm-metric-val {
          font-family: 'Mona Sans Variable', sans-serif; font-size: 30px; font-weight: 800;
          color: #1A1526; letter-spacing: -0.04em; line-height: 1;
          text-shadow: 0 0 24px rgba(204,243,6,0.35);
        }
        .tm-metric-label {
          font-family: 'Mona Sans Variable', sans-serif; font-size: 12px;
          color: rgba(26,21,38,0.55); line-height: 1.35;
        }
        .tm-quote {
          font-family: 'Mona Sans Variable', sans-serif; font-size: 14.5px;
          color: rgba(26,21,38,0.92); line-height: 1.7; font-style: italic;
          margin: 16px 0 22px;
        }
        .tm-author { display: flex; align-items: center; gap: 11px; padding-top: 16px; border-top: 1px solid rgba(26,21,38,0.09); }
        .tm-avatar {
          width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, #CCF306, #CCF306);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Mona Sans Variable', sans-serif; font-size: 12px; font-weight: 700; color: #fff;
          box-shadow: 0 0 0 2px rgba(204,243,6,0.12);
        }
        .tm-name { font-family: 'Mona Sans Variable', sans-serif; font-size: 13px; font-weight: 600; color: #FFFFFF; }
        .tm-role { font-family: 'Mona Sans Variable', sans-serif; font-size: 11px; color: rgba(26,21,38,0.55); }

        @media (max-width: 900px) { .tm-masonry { columns: 2; } }
        @media (max-width: 768px) {
          .testi-section { padding: 80px 20px 72px !important; }
        }
        @media (max-width: 560px) { .tm-masonry { columns: 1; } }
      `}</style>
    </section>
  )
}
