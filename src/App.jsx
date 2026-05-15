import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HorizontalPortfolio from './components/HorizontalPortfolio'
import ClientLogos from './components/ClientLogos'
import CaseStudies from './components/CaseStudies'
import Testimonials from './components/Testimonials'
import Process from './components/Process'
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
      {/* Fixed global blue glow — sits behind all content at z-index -1 */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: '65%', height: '85%',
          background: 'radial-gradient(ellipse at 75% 10%, rgba(25,70,230,0.38) 0%, rgba(15,45,180,0.15) 40%, transparent 68%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: '50%', height: '65%',
          background: 'radial-gradient(ellipse at 20% 88%, rgba(10,30,150,0.22) 0%, transparent 58%)',
        }} />
      </div>

      <Navbar onCTA={() => setModalOpen(true)} />
      <main style={{ background: 'transparent' }}>
        <Hero onCTA={() => setModalOpen(true)} />
        <HorizontalPortfolio />
        <ClientLogos />
        <CaseStudies />
        <Testimonials />
        <Process />
        <Industries />
        <Pricing onCTA={() => setModalOpen(true)} />
        <FAQ />
        <FinalCTA onCTA={() => setModalOpen(true)} />
      </main>
      <Footer />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
