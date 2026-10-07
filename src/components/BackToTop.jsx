import { useEffect, useRef } from 'react'
import './BackToTop.css'

function BackToTop() {
  const buttonRef = useRef(null)
  const visibleRef = useRef(false)

  useEffect(() => {
    let rafId = null
    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const visible = window.scrollY > 600
        if (visible !== visibleRef.current && buttonRef.current) {
          visibleRef.current = visible
          buttonRef.current.classList.toggle('show', visible)
          buttonRef.current.tabIndex = visible ? 0 : -1
        }
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      ref={buttonRef}
      className="back-to-top"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={-1}
    >
      <svg viewBox="0 0 40 40" width="26" height="26" aria-hidden="true">
        {/* steam wisps */}
        <path className="btt-steam btt-steam-1" d="M15 13 C14 11 16 9.5 15 7.5" fill="none" strokeWidth="1.8" strokeLinecap="round" />
        <path className="btt-steam btt-steam-2" d="M20 12.5 C19 10.5 21 9 20 7" fill="none" strokeWidth="1.8" strokeLinecap="round" />
        <path className="btt-steam btt-steam-3" d="M25 13 C24 11 26 9.5 25 7.5" fill="none" strokeWidth="1.8" strokeLinecap="round" />
        {/* cup */}
        <path d="M11 17 h18 v8 a7 7 0 0 1 -7 7 h-4 a7 7 0 0 1 -7 -7 z" fill="currentColor" />
        {/* handle */}
        <path d="M29 19 h2.5 a3.5 3.5 0 0 1 0 7 H29" fill="none" stroke="currentColor" strokeWidth="2.2" />
        {/* saucer */}
        <path d="M9 34 h22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </button>
  )
}

export default BackToTop
