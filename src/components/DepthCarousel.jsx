import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import './DepthCarousel.css'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

function DepthCarousel({ items, label, onExpand }) {
  const data = useMemo(() => (Array.isArray(items) ? items : []), [items])
  const cardRefs = useRef([])
  const rootRef = useRef(null)
  const positionRef = useRef(0)
  const tweenRef = useRef(null)
  const dragRef = useRef(null)
  const [active, setActive] = useState(0)

  const layout = useCallback((position) => {
    const count = data.length
    if (!count) return

    cardRefs.current.forEach((card, index) => {
      if (!card) return
      let distance = index - position
      distance = ((distance % count) + count) % count
      if (distance > count / 2) distance -= count

      const behind = Math.max(0, distance)
      const visible = distance >= -0.7 && distance <= 3.4
      const x = distance * 46
      const z = distance * -115
      const rotate = clamp(distance, 0, 1) * 10

      card.style.transform = `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${rotate}deg)`
      card.style.opacity = visible ? String(distance < 0 ? Math.max(0, 1 + distance) : 1) : '0'
      card.style.zIndex = String(100 - Math.round(distance * 10))
      card.style.pointerEvents = Math.abs(distance) < 0.55 ? 'auto' : 'none'
      const shade = card.querySelector('.depth-carousel-shade')
      if (shade) shade.style.opacity = String(Math.min(0.58, behind * 0.18))
    })
  }, [data.length])

  const goTo = useCallback((rawIndex, animate = true) => {
    const count = data.length
    if (!count) return
    const next = ((rawIndex % count) + count) % count
    let delta = next - positionRef.current
    delta = ((delta % count) + count) % count
    if (delta > count / 2) delta -= count

    tweenRef.current?.kill()
    rootRef.current?.classList.add('is-moving')
    const proxy = { value: positionRef.current }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    tweenRef.current = gsap.to(proxy, {
      value: positionRef.current + delta,
      duration: animate && !reduceMotion ? 0.65 : 0,
      ease: 'power3.out',
      onUpdate: () => {
        positionRef.current = proxy.value
        layout(proxy.value)
      },
      onComplete: () => {
        positionRef.current = next
        layout(next)
        rootRef.current?.classList.remove('is-moving')
      }
    })
    setActive(next)
  }, [data.length, layout])

  const step = useCallback((direction) => goTo(active + direction), [active, goTo])

  useEffect(() => {
    layout(0)
    return () => {
      tweenRef.current?.kill()
      rootRef.current?.classList.remove('is-moving')
    }
  }, [layout])

  const onPointerDown = (event) => {
    tweenRef.current?.kill()
    rootRef.current?.classList.add('is-moving')
    dragRef.current = { x: event.clientX, id: event.pointerId, moved: false }
  }

  const onPointerMove = (event) => {
    const drag = dragRef.current
    if (!drag) return
    const distance = event.clientX - drag.x
    if (Math.abs(distance) > 8) {
      drag.moved = true
      rootRef.current?.setPointerCapture(drag.id)
    }
  }

  const onPointerUp = (event) => {
    const drag = dragRef.current
    dragRef.current = null
    if (!drag?.moved) {
      rootRef.current?.classList.remove('is-moving')
      return
    }
    const distance = event.clientX - drag.x
    if (Math.abs(distance) > 35) step(distance < 0 ? 1 : -1)
    else rootRef.current?.classList.remove('is-moving')
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      step(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      step(1)
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onExpand(active)
    }
  }

  return (
    <div
      ref={rootRef}
      className="depth-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${label} screenshots`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        dragRef.current = null
        rootRef.current?.classList.remove('is-moving')
      }}
    >
      <div className="depth-carousel-stage">
        {data.map((item, index) => (
          <button
            type="button"
            className="depth-carousel-card"
            ref={(node) => { cardRefs.current[index] = node }}
            key={item.src}
            aria-label={`Expand ${label} image ${index + 1} of ${data.length}`}
            aria-hidden={active !== index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => onExpand(index)}
          >
            <img src={item.src} alt={item.alt} loading="lazy" decoding="async" draggable="false" />
            <span className="depth-carousel-shade" aria-hidden="true" />
          </button>
        ))}
      </div>

      <button type="button" className="depth-carousel-arrow depth-carousel-prev" onClick={() => step(-1)} aria-label={`Previous ${label} image`}>&#10094;</button>
      <button type="button" className="depth-carousel-arrow depth-carousel-next" onClick={() => step(1)} aria-label={`Next ${label} image`}>&#10095;</button>

      <div className="depth-carousel-footer">
        <div className="depth-carousel-dots" aria-label="Choose screenshot">
          {data.map((_, index) => (
            <button
              type="button"
              key={index}
              className={`depth-carousel-dot${active === index ? ' active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Show ${label} image ${index + 1}`}
              aria-current={active === index ? 'true' : undefined}
            />
          ))}
        </div>
        <span className="depth-carousel-count">{active + 1} / {data.length}</span>
      </div>
    </div>
  )
}

export default DepthCarousel
