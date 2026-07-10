import { motion, useReducedMotion } from 'framer-motion'

/**
 * Premium reveal-on-scroll primitive.
 * Fade-up + blur-to-sharp with a fast, refined easing (Linear/Vercel feel).
 * Use for any element that should animate in as it enters the viewport.
 *
 *   <Reveal>          → single element
 *   <Reveal delay={0.08}>
 *   <Reveal.Group>    → stagger children (each child wrapped in <Reveal.Item>)
 */
const EASE = [0.22, 1, 0.36, 1]

export default function Reveal({
  children,
  delay = 0,
  y = 22,
  blur = 8,
  duration = 0.7,
  once = true,
  amount = 0.35,
  as = 'div',
  style,
  className,
  ...rest
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reduce) {
    const Tag = as
    return <Tag style={style} className={className} {...rest}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/* Stagger container: children animate in sequence as the group enters view. */
function Group({ children, stagger = 0.08, delayChildren = 0, once = true, amount = 0.25, style, className, ...rest }) {
  const reduce = useReducedMotion()
  if (reduce) return <div style={style} className={className} {...rest}>{children}</div>
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

function Item({ children, y = 22, blur = 8, duration = 0.65, style, className, ...rest }) {
  const reduce = useReducedMotion()
  if (reduce) return <div style={style} className={className} {...rest}>{children}</div>
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y, filter: `blur(${blur}px)` },
        show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

Reveal.Group = Group
Reveal.Item = Item
