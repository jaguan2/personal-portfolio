import { useMemo, useState, useRef, useCallback, useEffect } from 'react'
import './Quote.css'

const quotes = [
  {
    text: 'Everything will be okay in the end.\nIf it\'s not okay,\nit\'s not the end.',
    author: 'Zhan Xuan 展轩'
  },
  {
    text: 'There\'s something beautiful about the people who turn their pain into kindness, instead of bitterness.',
    author: null
  },
  {
    text: 'Only when it is dark enough can you see the stars. Let us fill the sky with the light of a billion brilliant stars.',
    author: null
  },
  {
    text: 'To be young is to burn bright. Don\'t live your life with regrets.',
    author: 'The On1y One, 2024'
  },
  {
    text: 'Even when you\'re suffering so much that you lose your mind, just as the flower blooms even in the harsh rain, let\'s press on.',
    author: 'Hwasa'
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
    author: null
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
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)
  const containerRef = useRef(null)

  const move = useCallback((dir) => {
    setOffset((o) => Math.max(-MAX_BACK, Math.min(MAX_FORWARD, o + dir)))
  }, [])

  // Trackpad / horizontal-wheel swipe on desktop. A native non-passive listener
  // lets us preventDefault on horizontal intent while leaving vertical scroll alone.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    // One swipe = one quote, then a ~2s gate. The gate also absorbs the trackpad's
    // momentum tail, so a single flick can't sneak in extra moves.
    const STEP = 30
    const COOLDOWN = 2000
    let accum = 0
    let lastMove = -Infinity
    let resetId = null
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return // vertical: let the page scroll
      e.preventDefault()
      if (e.timeStamp - lastMove < COOLDOWN) { accum = 0; return } // inside the gate: ignore
      accum += e.deltaX
      clearTimeout(resetId)
      resetId = setTimeout(() => { accum = 0 }, 120) // drop a stale partial swipe
      if (accum >= STEP) { move(1); accum = 0; lastMove = e.timeStamp }
      else if (accum <= -STEP) { move(-1); accum = 0; lastMove = e.timeStamp }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [move])

  const index = ((todayIndex + offset) % quotes.length + quotes.length) % quotes.length
  const quote = quotes[index]
  const label = dayLabel(offset)

  // Pointer events unify mouse drag (desktop) and touch swipe (mobile)
  const minSwipe = 28
  const onPointerDown = (e) => {
    if (e.button && e.button !== 0) return
    touchEndX.current = null
    touchStartX.current = e.clientX
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* not supported */ }
  }
  const onPointerMove = (e) => {
    if (touchStartX.current === null) return
    touchEndX.current = e.clientX
  }
  const onPointerEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const dist = touchStartX.current - touchEndX.current
      if (dist > minSwipe) move(1)        // drag/swipe left → forward (tomorrow)
      else if (dist < -minSwipe) move(-1) // drag/swipe right → back (yesterday)
    }
    touchStartX.current = null
    touchEndX.current = null
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
        onPointerCancel={onPointerEnd}
        onKeyDown={onKeyDown}
      >
        <div className="quote-inner" key={index}>
          <p>&ldquo;{quote.text}&rdquo;</p>
          {quote.author && (
            <cite className="quote-author">— {quote.author}</cite>
          )}
        </div>
      </blockquote>
    </section>
  )
}

export default Quote
