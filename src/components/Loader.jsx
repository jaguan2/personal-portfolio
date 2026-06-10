import { useState, useEffect } from 'react'
import coffeeBranch from '../assets/coffee-branch.svg'
import './Loader.css'

const POUR_MS = 2350
const FADE_MS = 550
const REDUCED_MS = 700

function Loader({ onFinish }) {
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    document.body.classList.add('is-loading')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const showMs = reduced ? REDUCED_MS : POUR_MS

    const closeTimer = setTimeout(() => setClosing(true), showMs)
    const doneTimer = setTimeout(() => {
      document.body.classList.remove('is-loading')
      document.body.classList.add('loaded')
      onFinish()
    }, showMs + FADE_MS)

    return () => {
      clearTimeout(closeTimer)
      clearTimeout(doneTimer)
      document.body.classList.remove('is-loading')
    }
  }, [onFinish])

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
