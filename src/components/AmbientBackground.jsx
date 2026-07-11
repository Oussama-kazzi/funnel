import { useScroll, useTransform, motion, useReducedMotion } from 'framer-motion'

/**
 * Fixed, full-viewport ambient field that sits behind all content.
 * Creates depth + continuity between sections:
 *  - two large violet auroras that slowly drift as you scroll (parallax)
 *  - a faint indigo counter-light
 *  - a very subtle grain/noise texture
 *  - a soft vignette so edges settle into black
 * Everything is GPU-cheap (transform/opacity only) and respects reduced-motion.
 */
export default function AmbientBackground() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()

  // Parallax drift — auroras move opposite directions across the scroll.
  const yA = useTransform(scrollYProgress, [0, 1], ['-6%', '14%'])
  const yB = useTransform(scrollYProgress, [0, 1], ['8%', '-10%'])
  const xB = useTransform(scrollYProgress, [0, 1], ['0%', '6%'])
  // Center accent breathes — a whisper of extra glow mid-page so it doesn't feel monotone.
  const centerOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.7, 0.35])

  const staticA = reduce ? { y: 0 } : { y: yA }
  const staticB = reduce ? { y: 0, x: 0 } : { y: yB, x: xB }

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', overflow: 'hidden', background: '#FBFAFE' }}
    >
      {/* Aurora A — top right, pale violet */}
      <motion.div
        style={{
          position: 'absolute', top: '-18%', right: '-12%',
          width: '70vw', height: '80vh',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 60% 40%, rgba(139,92,246,0.14), rgba(124,58,237,0.06) 42%, transparent 68%)',
          filter: 'blur(70px)',
          ...staticA,
        }}
      />

      {/* Aurora B — lower left, cool indigo wash */}
      <motion.div
        style={{
          position: 'absolute', bottom: '-16%', left: '-14%',
          width: '62vw', height: '72vh',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 60%, rgba(99,102,241,0.10), rgba(79,70,229,0.04) 45%, transparent 70%)',
          filter: 'blur(80px)',
          ...staticB,
        }}
      />

      {/* Center accent — very subtle, breathes with scroll */}
      <motion.div
        style={{
          position: 'absolute', top: '38%', left: '50%',
          width: '48vw', height: '40vh',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.05), transparent 65%)',
          filter: 'blur(90px)',
          opacity: reduce ? 0.5 : centerOpacity,
        }}
      />

      {/* Fine grain / noise — breaks up banding on the pale wash */}
      <div style={{
        position: 'absolute', inset: 0,
        opacity: 0.03,
        mixBlendMode: 'multiply',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: '160px 160px',
      }} />

      {/* Soft vignette — settles edges gently */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 92% 82% at 50% 40%, transparent 60%, rgba(230,226,244,0.5) 100%)',
      }} />
    </div>
  )
}
