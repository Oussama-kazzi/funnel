import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../i18n/context'

const testimonials = [
  {
    stars: 5,
    quote: "Avant, notre ancien site ne générait quasiment aucun contact. On était présents en ligne mais invisibles, en gros. En quelques semaines après le nouveau site, on a commencé à recevoir des demandes sérieuses presque chaque jour. Franchement je ne m’attendais pas à un changement aussi rapide.",
    initials: 'YM',
    name: 'Youssef El M.',
    role: 'CEO, NextEra',
    metric: '+65%',
    metricLabel: 'de leads en quelques semaines',
  },
  {
    stars: 5,
    quote: "On lançait une campagne pub mais la page d’avant convertissait super mal, on cramait du budget pour rien. Ils nous ont refait une landing propre et là ça a bougé : on a quasiment doublé le taux de conversion sur la même pub. Même budget, deux fois plus de leads.",
    initials: 'SK',
    name: 'Sarah K.',
    role: 'Marketing Manager, Bloomy',
    metric: '×2',
    metricLabel: 'taux de conversion',
  },
  {
    stars: 5,
    quote: "Ce qui me stressait le plus c’était de dépendre d’un dev à chaque petite modif. Là je gère mes contenus moi-même, sans galérer, et le site charge vite même sur mobile. Ça paraît un détail mais au quotidien ça change tout pour moi.",
    initials: 'MT',
    name: 'Mehdi T.',
    role: 'Fondateur, Axelance',
    metric: '100%',
    metricLabel: 'satisfaction',
  },
  {
    stars: 5,
    quote: "Je suis dans le médical, pas du tout à l’aise avec le digital, donc j’avais un peu peur de me lancer. Ils ont pris le temps de tout m’expliquer simplement. Résultat, on reçoit environ 40% de nouveaux patients en plus qui nous trouvent directement en ligne. Je recommande.",
    initials: 'AB',
    name: 'Dr. Amine B.',
    role: 'Directeur, Medicare',
    metric: '+40%',
    metricLabel: 'de nouveaux patients',
  },
  {
    stars: 5,
    quote: "J’avais déjà été déçue par un prestataire qui a traîné des mois sans rien livrer. Là, en 3 semaines c’était en ligne, et le rendu colle vraiment à l’image haut de gamme qu’on voulait pour le studio. Mes clientes me disent que le site fait « sérieux » — c’est exactement ça que je cherchais.",
    initials: 'LK',
    name: 'Lina K.',
    role: 'Gérante, Studio Nour',
    metric: '3 sem.',
    metricLabel: 'du lancement à la mise en ligne',
  },
  {
    stars: 5,
    quote: "On perdait un temps fou à relancer les prospects et remplir des tableaux à la main. Ils nous ont monté un système qui gère tout ça automatiquement. Aujourd’hui l’équipe passe presque 30% de temps en moins sur ces tâches et on se concentre enfin sur les vrais dossiers.",
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

function MasonryCard({ item, i }) {
  const { t } = useLang()
  return (
    <motion.div
      className="tm-card"
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
      whileHover={{ y: -4 }}
    >
      <Stars count={item.stars} />

      <blockquote className="tm-quote">“{t(item.quote)}”</blockquote>

      <div className="tm-author">
        <div className="tm-avatar">{item.initials}</div>
        <div>
          <div className="tm-name">{item.name}</div>
          <div className="tm-role">{t(item.role)}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  const { t } = useLang()

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
          {t('Témoignages')}
        </p>
        <h2 style={{
          fontFamily: "'Mona Sans Variable', sans-serif",
          fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 800,
          letterSpacing: '-0.04em', color: '#1A1526', lineHeight: 1.1, margin: '0 auto', maxWidth: 720,
        }}>
          {t('Pour toutes les')} <span style={{ color: '#1A1526' }}>{t('entreprises')}</span>{t(', entrepreneurs et agences.')}
        </h2>
        <p style={{
          fontFamily: "'Mona Sans Variable', sans-serif", fontSize: 16, color: 'rgba(26,21,38,0.72)',
          lineHeight: 1.65, margin: '18px auto 0', maxWidth: 520,
        }}>
          {t('Ce que nos clients disent de nous après avoir travaillé avec FuturA.')}
        </p>
      </div>

      {/* Masonry grid */}
      <div className="tm-masonry">
        {testimonials.map((item, i) => (
          <MasonryCard key={i} item={item} i={i} />
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
          box-shadow: 0 10px 30px rgba(20,16,25,0.06), 0 2px 6px rgba(20,16,25,0.03);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .tm-card:hover {
          border-color: rgba(204,243,6,0.55);
          box-shadow: 0 20px 44px rgba(20,16,25,0.10), 0 0 0 1px rgba(204,243,6,0.2);
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
          background: linear-gradient(135deg, #CCF306, #B4DA00);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Mona Sans Variable', sans-serif; font-size: 12px; font-weight: 800; color: #1A1526;
          box-shadow: 0 0 0 2px rgba(204,243,6,0.22);
        }
        .tm-name { font-family: 'Mona Sans Variable', sans-serif; font-size: 13.5px; font-weight: 700; color: #1A1526; }
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
