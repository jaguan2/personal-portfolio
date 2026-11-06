import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './ThemeToggle.css'

function startCoffeeFlow(canvas, theme) {
  const context = canvas.getContext('2d')
  if (!context) return null
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const scale = Math.min(window.devicePixelRatio || 1, 1.5)
  canvas.width = Math.ceil(width * scale)
  canvas.height = Math.ceil(height * scale)
  context.scale(scale, scale)

  const colors = theme === 'dark'
    ? ['#5C483A', '#4B392E', '#382B23']
    : ['#E7CDA2', '#F1DDB6', '#FEECC1']
  const layers = [
    { depth: 0.7, amplitude: 0.22, speed: 0.65, phase: 0, color: colors[0] },
    { depth: 0.64, amplitude: 0.205, speed: 0.72, phase: 0.24, color: colors[1] },
    { depth: 0.58, amplitude: 0.19, speed: 0.8, phase: 0.48, color: colors[2] }
  ]
  const wavelength = Math.max(480, Math.min(window.innerWidth * 1.25, 1800))
  const taper = (width - window.innerWidth) / 2
  const started = performance.now()
  let frame

  const draw = now => {
    const elapsed = (now - started) / 1000
    context.clearRect(0, 0, width, height)
    for (const layer of layers) {
      context.beginPath()
      context.moveTo(0, height)
      for (let x = 0; x <= width; x += 4) {
        // Round off the leading and trailing tips instead of cutting a vertical edge.
        const edge = Math.min(1, x / taper, (width - x) / taper)
        const envelope = edge * edge * (3 - 2 * edge)
        const phase = (x / wavelength) * Math.PI * 2 - elapsed * layer.speed + layer.phase
        const swell = Math.sin(phase) + Math.sin(phase * 0.53 + elapsed * 0.4) * 0.22
        const y = height - envelope * height * (layer.depth + swell * layer.amplitude)
        context.lineTo(x, y)
      }
      context.lineTo(width, height)
      context.closePath()
      context.fillStyle = layer.color
      context.fill()
    }
    frame = requestAnimationFrame(draw)
  }
  draw(started)
  return () => cancelAnimationFrame(frame)
}

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')

  const [wave, setWave] = useState(null)
  const liquidRef = useRef(null)
  const canvasRef = useRef(null)
  const busyRef = useRef(false)

  const applyTheme = useCallback((theme) => {
    document.documentElement.dataset.theme = theme
    setDark(theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* The theme still applies when browser storage is unavailable. */
    }
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.content = theme === 'dark' ? '#211B17' : '#2E271F'
  }, [])

  useLayoutEffect(() => {
    if (!wave) return
    const liquid = liquidRef.current
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let cancelled = false
    let finishRequested = false
    let animation
    let stopFlow
    const finishEarly = () => {
      finishRequested = true
      animation?.cancel()
    }

    const pour = async () => {
      try {
        if (motion.matches) {
          applyTheme(wave)
          return
        }
        stopFlow = startCoffeeFlow(canvasRef.current, wave)
        if (!stopFlow) {
          applyTheme(wave)
          return
        }
        document.documentElement.classList.add('theme-shifting')
        animation = liquid.animate([
          { transform: 'translateX(-100%)', opacity: 0 },
          { transform: 'translateX(calc(-1 * var(--wave-width)))', opacity: 0.9 }
        ], { duration: 1000, easing: 'cubic-bezier(0.4, 0, 0.3, 1)', fill: 'forwards' })
        await animation.finished
        if (cancelled) return
        // Change the palette as the low wave crosses the bottom of the page.
        applyTheme(wave)
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
        if (cancelled || finishRequested) return
        animation = liquid.animate([
          { transform: 'translateX(calc(-1 * var(--wave-width)))', opacity: 0.9 },
          { transform: 'translateX(100vw)', opacity: 0 }
        ], { duration: 1100, easing: 'cubic-bezier(0.4, 0, 0.3, 1)', fill: 'forwards' })
        await animation.finished
      } catch {
        if (!cancelled) applyTheme(wave)
      } finally {
        stopFlow?.()
        if (!cancelled) {
          document.documentElement.classList.remove('theme-shifting')
          busyRef.current = false
          setWave(null)
        }
      }
    }
    window.addEventListener('resize', finishEarly)
    motion.addEventListener('change', finishEarly)
    pour()
    return () => {
      cancelled = true
      animation?.cancel()
      stopFlow?.()
      document.documentElement.classList.remove('theme-shifting')
      window.removeEventListener('resize', finishEarly)
      motion.removeEventListener('change', finishEarly)
    }
  }, [wave, applyTheme])

  const toggle = () => {
    if (busyRef.current) return
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !Element.prototype.animate) {
      applyTheme(theme)
      return
    }
    busyRef.current = true
    setWave(theme)
  }

  return (
    <>
      <button
        type="button"
        role="switch"
        className={`theme-toggle ${dark ? 'is-dark' : ''}`}
        onClick={toggle}
        aria-label="Dark mode"
        aria-checked={dark}
        aria-disabled={wave !== null}
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
      {wave && createPortal(
        <div className={`theme-wave-overlay${wave === 'light' ? ' is-latte' : ''}`} aria-hidden="true">
          <div className="theme-wave-liquid" ref={liquidRef}>
            <canvas className="theme-wave-canvas" ref={canvasRef} />
          </div>
        </div>, document.body
      )}
    </>
  )
}

export default ThemeToggle
