import { useState, useEffect } from 'react'
import coffeeBranch from '../assets/coffee-branch.svg'
import './Loader.css'

const POUR_MS = 800
const FADE_MS = 250
const SESSION_KEY = 'portfolio:brewed'

function Loader({ onFinish }) {
  const [shouldBrew] = useState(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    try {
      return sessionStorage.getItem(SESSION_KEY) !== 'true'
    } catch {
      return true
    }
  })
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (!shouldBrew) {
      document.body.classList.remove('is-loading')
      document.body.classList.add('loaded')
      onFinish()
      return
    }

    document.body.classList.remove('loaded')
    document.body.classList.add('is-loading')
    const closeTimer = setTimeout(() => setClosing(true), POUR_MS)
    const doneTimer = setTimeout(() => {
      document.body.classList.remove('is-loading')
      document.body.classList.add('loaded')
      try { sessionStorage.setItem(SESSION_KEY, 'true') } catch { /* Storage can be blocked. */ }
      onFinish()
    }, POUR_MS + FADE_MS)

    return () => {
      clearTimeout(closeTimer)
      clearTimeout(doneTimer)
      document.body.classList.remove('is-loading')
    }
  }, [onFinish, shouldBrew])

  if (!shouldBrew) return null

  return (
    <div className={`loader ${closing ? 'loader-closing' : ''}`} role="status" aria-label="Loading">
      <img className="loader-branch loader-branch-tl" src={coffeeBranch} alt="" aria-hidden="true" />
      <img className="loader-branch loader-branch-br" src={coffeeBranch} alt="" aria-hidden="true" />

      <div className="loader-scene" aria-hidden="true">
        <div className="loader-steam">
          <span className="loader-wisp loader-wisp-1" />
          <span className="loader-wisp loader-wisp-2" />
          <span className="loader-wisp loader-wisp-3" />
        </div>

        <div className="loader-cup-group">
          <span className="loader-handle" />
          <div className="loader-cup">
            <div className="loader-liquid">
              <span className="loader-wave loader-wave-back" />
              <span className="loader-wave loader-wave-front" />
            </div>
          </div>
        </div>

        <span className="loader-stream" />
        <span className="loader-saucer" />
      </div>

      <p className="loader-text" aria-hidden="true">
        brewing
        <span className="loader-dots"><span>.</span><span>.</span><span>.</span></span>
      </p>
    </div>
  )
}

export default Loader
