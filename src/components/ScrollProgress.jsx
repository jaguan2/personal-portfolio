import { useEffect, useRef } from 'react'
import './ScrollProgress.css'

function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    let rafId = null
    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
        if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
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
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  )
}

export default ScrollProgress
