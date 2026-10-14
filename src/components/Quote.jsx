import { useMemo, useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react'
import './Quote.css'

const quotes = [
  {
    text: 'Everything will be okay in the end.\nIf it\'s not okay,\nit\'s not the end.',
    author: 'Zhan Xuan 展轩'
  },
  {
    text: 'There\'s something beautiful about the characters who turn their pain into kindness, instead of bitterness.',
    author: null
  },
  {
    text: 'Only when it is dark enough can you see the stars.',
    author: null
  },
  {
    text: 'To be young is to burn bright. Don\'t live your life with regrets.',
    author: 'The On1y One, 2024'
  },
  {
    text: 'You and your dream were both beautiful. When you know more than anyone that your dream won\'t be rewarded… yet you still challenged it.',
    author: 'Achilles'
  },
  {
    text: 'Goodbyes are always going to come. You can\'t get through life if they make you sad all the time. So you send them off with as much appreciation as you can. And rejoice the fact that you met, and that you lived to say goodbye.',
    author: 'Ishtar'
  },
  {
    text: 'No matter what you\'re feeling, I hope you know you\'re allowed to feel that way. You don\'t have to force yourself to get over something right away, you\'re allowed to sit in your pain, your frustration, your exhaustion, whatever it may be, because you\'re only human.',
    author: 'Joshua Hong'
  },
  {
    text: 'The most important thing is you. You should recognize yourself. If you don\'t recognize yourself, how can others recognize you?',
    author: 'Zhengting'
  },
  {
    text: 'The world does not change first. The self does.',
    author: 'Love begins in the world of if, 2026'
  },
  {
    text: 'I realize that I have to believe in myself through the bumps against reality as I experience emotions of rejection, confusion, recognition, and dignity. I trust just believing in yourself can make you stand out.',
    author: 'Soyeon'
  },
  {
    text: 'Doubt is the foundation by which you break through blind faith.',
    author: null
  },
  {
    text: 'Maybe you are filling in answers for a test that you don\'t know the questions of.',
    author: null
  },
  {
    text: 'Not everything a person eats becomes a part of them. Eat too much and it\'ll go right through you.',
    author: null
  },
  {
    text: 'Just because someone carried it well doesn\'t mean it isn\'t heavy.',
    author: null
  },
  {
    text: 'It\'s ok to be lost, the journey of being lost is the process of finding yourself.',
    author: null
  },
  {
    text: 'Be willing to walk at a turtle\'s pace even though everyone is walking at a hare\'s pace, because ultimately taking that time for yourself will help you in getting to where you want to be.',
    author: 'Sarah Pan'
  },
  {
    text: 'It\'s courageous to do one thing at one thing in life, and it\'s cowardly to do everything.',
    author: null
  },
  {
    text: 'Regret is proof you\'ve grown. The fact that you wish you had done better means you are already someone who would.',
    author: null
  },
  {
    text: 'There is no losing if your goal is to experience.',
    author: null
  }
]

function dayLabel(offset) {
  if (offset === 0) return "today's pour"
  if (offset === -1) return "yesterday's pour"
  if (offset === 1) return "tomorrow's pour"
  if (offset < 0) return `${-offset} days ago`
  return `in ${offset} days`
}

// A window of days centered on today, sized so every quote is reachable once
const MAX_BACK = Math.floor((quotes.length - 1) / 2)
const MAX_FORWARD = quotes.length - 1 - MAX_BACK

function Quote() {
  // The quote shown today, by day of month (the same rotation as before)
  const todayIndex = useMemo(() => {
    const dayOfMonth = new Date().getDate()
    return (dayOfMonth - 1) % quotes.length
  }, [])

  const [offset, setOffset] = useState(0)
  const dragRef = useRef(null)
  const dragFrameRef = useRef(null)
  const directionRef = useRef(1)
  const containerRef = useRef(null)
  const stageRef = useRef(null)
  const contentRef = useRef(null)

  const move = useCallback((dir) => {
    directionRef.current = dir
    setOffset((o) => Math.max(-MAX_BACK, Math.min(MAX_FORWARD, o + dir)))
  }, [])

  // One change per gesture. Rearm when momentum ends, rather than blocking
  // the next intentional swipe for a fixed two seconds.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let accumulated = 0
    let direction = 0
    let consumed = false
    let resetId = null
    const reset = () => {
      accumulated = 0
      direction = 0
      consumed = false
    }
    const onWheel = (event) => {
      if (event.ctrlKey) return // Preserve trackpad pinch-to-zoom.
      const horizontal = event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX
      if (!horizontal || (!event.shiftKey && Math.abs(horizontal) <= Math.abs(event.deltaY))) return
      event.preventDefault()
      const nextDirection = Math.sign(horizontal)
      if (direction && nextDirection !== direction) reset()
      direction = nextDirection
      clearTimeout(resetId)
      resetId = setTimeout(reset, 160)
      if (consumed) return
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? el.clientWidth : 1
      accumulated += horizontal * unit
      if (Math.abs(accumulated) >= 36) {
        move(nextDirection)
        consumed = true
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
      clearTimeout(resetId)
      cancelAnimationFrame(dragFrameRef.current)
    }
  }, [move])

  const index = ((todayIndex + offset) % quotes.length + quotes.length) % quotes.length
  const quote = quotes[index]
  const label = dayLabel(offset)

  // Fit only the current quote; remeasure after font loads or viewport changes.
  useLayoutEffect(() => {
    const stage = stageRef.current
    const content = contentRef.current
    if (!stage || !content) return
    const resize = () => {
      stage.style.height = `${content.offsetHeight}px`
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(content)
    return () => observer.disconnect()
  }, [index])

  const resetDrag = () => {
    dragRef.current = null
    cancelAnimationFrame(dragFrameRef.current)
    containerRef.current?.classList.remove('is-dragging')
    containerRef.current?.style.setProperty('--quote-drag', '0px')
  }

  const onPointerDown = (event) => {
    if (!event.isPrimary || event.button !== 0) return
    dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, horizontal: false }
  }
  const onPointerMove = (event) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return
    const x = event.clientX - drag.x
    const y = event.clientY - drag.y
    if (!drag.horizontal) {
      if (Math.abs(y) > 8 && Math.abs(y) >= Math.abs(x)) {
        resetDrag()
        return
      }
      if (Math.abs(x) < 8 || Math.abs(x) <= Math.abs(y) * 1.2) return
      drag.horizontal = true
      event.currentTarget.setPointerCapture(event.pointerId)
      event.currentTarget.classList.add('is-dragging')
    }
    cancelAnimationFrame(dragFrameRef.current)
    dragFrameRef.current = requestAnimationFrame(() => {
      containerRef.current?.style.setProperty('--quote-drag', `${Math.max(-48, Math.min(48, x * 0.35))}px`)
    })
  }
  const onPointerEnd = (event) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return
    const distance = event.clientX - drag.x
    const threshold = Math.min(64, event.currentTarget.clientWidth * 0.12)
    const shouldMove = drag.horizontal && Math.abs(distance) >= threshold
    resetDrag()
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    if (shouldMove) move(distance < 0 ? 1 : -1)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); move(1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1) }
  }

  return (
    <section id="quote" aria-label="Today's pour">
      <div className="quote-label-row">
        <span className="quote-divider" aria-hidden="true" />
        <svg className="quote-cup" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path className="quote-cup-steam quote-cup-steam-1" d="M9 7 C8.4 5.8 9.6 4.9 9 3.6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path className="quote-cup-steam quote-cup-steam-2" d="M13 7 C12.4 5.8 13.6 4.9 13 3.6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M5 10 h12 v5 a4.5 4.5 0 0 1 -4.5 4.5 h-3 A4.5 4.5 0 0 1 5 15 z" fill="currentColor" />
          <path d="M17 11.5 h1.5 a2.2 2.2 0 0 1 0 4.4 H17" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M4 21.5 h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <span className="quote-label" aria-live="polite">{label}</span>
        <span className="quote-divider" aria-hidden="true" />
      </div>
      <blockquote
        ref={containerRef}
        className="quote-text reveal"
        tabIndex={0}
        role="group"
        aria-roledescription="quote browser"
        aria-label={`${label}, quote ${index + 1} of ${quotes.length}. Use the left and right arrow keys to browse.`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={resetDrag}
        onLostPointerCapture={resetDrag}
        onKeyDown={onKeyDown}
      >
        <div className="quote-stage" ref={stageRef}>
          <div
            className="quote-inner"
            ref={contentRef}
            key={index}
            style={{ '--quote-enter-x': `${directionRef.current * 14}px` }}
            aria-live="polite"
            aria-atomic="true"
          >
            <p>&ldquo;{quote.text}&rdquo;</p>
            {quote.author && <cite className="quote-author">— {quote.author}</cite>}
          </div>
        </div>
      </blockquote>
    </section>
  )
}

export default Quote
