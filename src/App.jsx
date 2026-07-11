import { useState, useEffect } from 'react'
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
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import Modal from './components/Modal'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
      smoothWheel: true,
      touchMultiplier: 2,
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <AmbientBackground />

      <Navbar onCTA={() => setModalOpen(true)} />
      <main style={{ background: 'transparent' }}>
        <Hero onCTA={() => setModalOpen(true)} />
        <ClientLogos />
        <Services />
        <Technologies />
        <Process onCTA={() => setModalOpen(true)} />
        <CaseStudies />
        <Testimonials />
        <Industries />
        <Pricing onCTA={() => setModalOpen(true)} />
        <FAQ />
        <FinalCTA onCTA={() => setModalOpen(true)} />

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
            <span style={{ color: '#FED24B', textShadow: '0 0 40px rgba(254,210,75,0.4)' }}>l’expertise.</span>
            <br />Travaillons ensemble.
          </h2>
        </section>
      </main>
      <Footer />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
