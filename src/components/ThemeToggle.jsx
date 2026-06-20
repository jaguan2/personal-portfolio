import { useState } from 'react'
import './ThemeToggle.css'

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')

  const toggle = () => {
    const next = !dark
    setDark(next)
    const theme = next ? 'dark' : 'light'

    // Brief global transition so the swap fades instead of snapping
    document.documentElement.classList.add('theme-fade')
    document.documentElement.dataset.theme = theme
    window.setTimeout(() => document.documentElement.classList.remove('theme-fade'), 400)

    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage blocked — theme still applies for this visit */
    }

    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.content = next ? '#171210' : '#2E271F'
  }

  return (
    <button
      className={`theme-toggle ${dark ? 'is-dark' : ''}`}
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={dark}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <mask id="theme-toggle-moon">
          <rect width="24" height="24" fill="white" />
          <circle className="tt-moon" cx="30" cy="2" r="8" fill="black" />
        </mask>
        <circle className="tt-sun" cx="12" cy="12" r="5.5" fill="currentColor" mask="url(#theme-toggle-moon)" />
        <g className="tt-rays" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <line x1="12" y1="1.5" x2="12" y2="3.8" />
          <line x1="12" y1="20.2" x2="12" y2="22.5" />
          <line x1="1.5" y1="12" x2="3.8" y2="12" />
          <line x1="20.2" y1="12" x2="22.5" y2="12" />
          <line x1="4.6" y1="4.6" x2="6.2" y2="6.2" />
          <line x1="17.8" y1="17.8" x2="19.4" y2="19.4" />
          <line x1="4.6" y1="19.4" x2="6.2" y2="17.8" />
          <line x1="17.8" y1="6.2" x2="19.4" y2="4.6" />
        </g>
      </svg>
    </button>
  )
}

export default ThemeToggle
