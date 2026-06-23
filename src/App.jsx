import { useCallback, useEffect, useState } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Header from './components/Header'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import OtherWorks from './components/OtherWorks'
import Quote from './components/Quote'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import './App.css'

function App() {
  const [brewing, setBrewing] = useState(true)
  const handleBrewed = useCallback(() => setBrewing(false), [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      // No scroll animations — content must still be visible
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            const cleanup = () => {
              entry.target.classList.remove('reveal', 'visible')
              entry.target.removeEventListener('transitionend', cleanup)
            }
            entry.target.addEventListener('transitionend', cleanup)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const branches = Array.from(document.querySelectorAll('.float-icon[class*="branch-"]'))
    if (branches.length === 0) return

    let rafId = null
    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        branches.forEach((el, i) => {
          const sway = Math.sin((scrollY + i * 90) / 240) * 4
          el.style.setProperty('--sway', `${sway.toFixed(2)}deg`)
        })
        rafId = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {brewing && <Loader onFinish={handleBrewed} />}
      <a href="#main" className="skip-link">Skip to main content</a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Header />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <OtherWorks />
        <Quote />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

export default App
