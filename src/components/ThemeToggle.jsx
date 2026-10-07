import { useEffect, useRef, useState } from 'react'
import './ThemeToggle.css'

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')

  const fadeTimerRef = useRef(null)

  useEffect(() => () => {
    window.clearTimeout(fadeTimerRef.current)
    document.documentElement.classList.remove('theme-fade')
  }, [])

  const toggle = () => {
    const root = document.documentElement
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark'
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const applyTheme = () => {
      root.dataset.theme = theme
      setDark(theme === 'dark')
      try {
        localStorage.setItem('theme', theme)
      } catch {
        /* storage blocked ? theme still applies for this visit */
      }
      const meta = document.querySelector('meta[name="theme-color"]')
      if (meta) meta.content = theme === 'dark' ? '#0C1519' : '#2E271F'
    }

    window.clearTimeout(fadeTimerRef.current)
    root.classList.remove('theme-fade')

    if (!reducedMotion) {
      root.classList.add('theme-fade')
      void root.offsetWidth
      applyTheme()
      fadeTimerRef.current = window.setTimeout(() => root.classList.remove('theme-fade'), 400)
    } else {
      applyTheme()
    }
  }

  return (
    <button
      type="button"
      role="switch"
      className={`theme-toggle ${dark ? 'is-dark' : ''}`}
      onClick={toggle}
      aria-label="Dark mode"
      aria-checked={dark}
    >
      <span className="theme-toggle-label theme-toggle-light" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </span>
      <span className="theme-toggle-label theme-toggle-dark" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.5 14.2A8.8 8.8 0 0 1 9.8 3.5a8.8 8.8 0 1 0 10.7 10.7Z" />
        </svg>
      </span>
    </button>
  )
}

export default ThemeToggle
