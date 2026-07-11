import { useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'
import AmbientBackground from './components/AmbientBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Technologies from './components/Technologies'
import Process from './components/Process'
import CaseStudies from './components/CaseStudies'
import ClientLogos from './components/ClientLogos'
import Testimonials from './components/Testimonials'
import Industries from './components/Industries'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
      smoothWheel: true,
      touchMultiplier: 2,
    })
    lenisRef.current = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  /* All CTAs scroll to the booking form in the footer. */
  const scrollToForm = useCallback(() => {
    const el = document.getElementById('booking')
    if (!el) return
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -80 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <AmbientBackground />

      <Navbar onCTA={scrollToForm} />
      <main style={{ background: 'transparent' }}>
        <Hero onCTA={scrollToForm} />
        <ClientLogos />
        <Services />
        <Technologies />
        <Process onCTA={scrollToForm} />
        <CaseStudies />
        <Testimonials />
        <Industries />
        <Pricing onCTA={scrollToForm} />
        <FAQ />

        {/* Closing statement */}
        <section style={{ padding: '80px 32px 100px', textAlign: 'center', position: 'relative' }}>
          <h2 style={{
            fontFamily: "'Mona Sans Variable', sans-serif",
            fontSize: 'clamp(28px, 4.5vw, 52px)',
            fontWeight: 800, letterSpacing: '-0.04em',
            color: '#1A1526', lineHeight: 1.1,
            maxWidth: 820, margin: '0 auto',
          }}>
            Vous avez l’idée, nous avons{' '}
            <span style={{ color: '#FED24B', textShadow: '0 0 32px rgba(254,210,75,0.25)' }}>l’expertise.</span>
            <br />Travaillons ensemble.
          </h2>
        </section>
      </main>
      <Footer />
    </>
  )
}
