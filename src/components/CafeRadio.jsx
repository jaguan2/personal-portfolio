import { useEffect, useRef, useState } from 'react'
import './CafeRadio.css'

const VIDEO_ID = 'mAR8giOH5NY'
const TRACK_TITLE = 'Rainy Library - Relaxing Jazz for Studying & Reading'
const TRACK_ARTIST = 'Leafeey / Animal Crossing Ambience'

function savedVolume() {
  try {
    const saved = localStorage.getItem('cafeRadioVolume')
    const value = Number(saved)
    if (saved !== null && Number.isFinite(value) && value >= 0 && value <= 100) return value
  } catch { /* Use the default when storage is unavailable. */ }
  return 35
}

function VinylRecord() {
  return (
    <svg className="vinyl-record" viewBox="0 0 64 64" aria-hidden="true">
      <g className="tt-record">
        <circle className="tt-vinyl" cx="32" cy="32" r="30" />
        <circle className="tt-groove" cx="32" cy="32" r="25" />
        <circle className="tt-groove" cx="32" cy="32" r="21" />
        <circle className="tt-groove" cx="32" cy="32" r="17" />
        <circle className="tt-label" cx="32" cy="32" r="9" />
        <circle className="tt-mark" cx="35" cy="27" r="1.2" />
        <circle className="tt-hole" cx="32" cy="32" r="3" />
      </g>
    </svg>
  )
}

function CafeRadio() {
  const playerRef = useRef(null)
  const holderRef = useRef(null)
  const wrapperRef = useRef(null)
  const triggerRef = useRef(null)
  const closeRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')
  const [title, setTitle] = useState(TRACK_TITLE)
  const [volume, setVolume] = useState(savedVolume)
  const volumeRef = useRef(volume)

  const closePanel = (restoreFocus = false) => {
    setOpen(false)
    if (restoreFocus) triggerRef.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const outside = event => {
      if (!wrapperRef.current?.contains(event.target)) setOpen(false)
    }
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (!initialized || !VIDEO_ID) return
    let disposed = false
    let created = false
    let previousReady
    let apiReady
    setReady(false)
    setError('')
    const fail = () => {
      if (disposed) return
      setError('Music could not load. Try again or listen on YouTube.')
      setReady(false)
      setPlaying(false)
    }
    const timeout = window.setTimeout(fail, 15000)
    const updateTitle = player => {
      try {
        const name = player.getVideoData?.().title
        if (name) setTitle(name)
      } catch { /* The configured track title remains available. */ }
    }
    const createPlayer = () => {
      if (disposed || created || !holderRef.current || !window.YT?.Player) return
      created = true
      const mount = document.createElement('div')
      holderRef.current.replaceChildren(mount)
      playerRef.current = new window.YT.Player(mount, {
        height: '200',
        width: '320',
        videoId: VIDEO_ID,
        playerVars: { loop: 1, playlist: VIDEO_ID, autoplay: 0, playsinline: 1, origin: window.location.origin },
        events: {
          onReady: event => {
            if (disposed) return
            window.clearTimeout(timeout)
            event.target.setVolume(volumeRef.current)
            updateTitle(event.target)
            setReady(true)
            setError('')
          },
          onStateChange: event => {
            if (disposed) return
            if (event.data === window.YT.PlayerState.PLAYING) {
              setPlaying(true)
              updateTitle(event.target)
            } else if ([window.YT.PlayerState.PAUSED, window.YT.PlayerState.ENDED, window.YT.PlayerState.CUED].includes(event.data)) {
              setPlaying(false)
            }
          },
          onError: () => { window.clearTimeout(timeout); fail() },
          onAutoplayBlocked: () => {
            if (!disposed) setPlaying(false)
          }
        }
      })
    }
    let script = document.getElementById('yt-iframe-api')
    if (window.YT?.Player) {
      createPlayer()
    } else {
      previousReady = window.onYouTubeIframeAPIReady
      apiReady = () => {
        if (typeof previousReady === 'function') previousReady()
        createPlayer()
      }
      window.onYouTubeIframeAPIReady = apiReady
      if (!script) {
        script = document.createElement('script')
        script.id = 'yt-iframe-api'
        script.src = 'https://www.youtube.com/iframe_api'
        script.async = true
        document.body.appendChild(script)
      }
      script.addEventListener('error', fail)
    }
    return () => {
      disposed = true
      window.clearTimeout(timeout)
      script?.removeEventListener('error', fail)
      if (apiReady && window.onYouTubeIframeAPIReady === apiReady) window.onYouTubeIframeAPIReady = previousReady
      try { playerRef.current?.destroy?.() } catch { /* Already removed. */ }
      playerRef.current = null
    }
  }, [initialized, attempt])

  if (!VIDEO_ID) return null

  const togglePanel = () => {
    if (!open) setInitialized(true)
    setOpen(value => !value)
  }
  const togglePlayback = () => {
    if (!ready) return
    if (playing) playerRef.current?.pauseVideo()
    else playerRef.current?.playVideo()
  }
  const changeVolume = event => {
    const value = Number(event.target.value)
    volumeRef.current = value
    setVolume(value)
    if (ready) playerRef.current?.setVolume(value)
    try { localStorage.setItem('cafeRadioVolume', String(value)) } catch { /* Visit-only volume is fine. */ }
  }

  return (
    <>
      <div className="cafe-radio-holder" ref={holderRef} aria-hidden="true" inert />
      <div
        className="cafe-radio-widget"
        ref={wrapperRef}
        onBlurCapture={event => {
          if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(false)
        }}
      >
        {open && (
          <section className={`radio-panel ${playing ? 'is-playing' : ''}`} id="cafe-radio-controls" role="dialog" aria-modal="false" aria-labelledby="radio-heading">
            <div className="radio-panel-record"><VinylRecord /></div>
            <div className="radio-copy">
              <p id="radio-heading" className="radio-heading">{playing ? 'Now playing' : 'Cafe radio'}</p>
              <a className="radio-track" href={`https://www.youtube.com/watch?v=${VIDEO_ID}`} target="_blank" rel="noopener noreferrer" title={title} aria-label={`Listen to ${title} on YouTube`}>{title}</a>
              <p className="radio-artist">{TRACK_ARTIST}</p>
            </div>
            <div className="radio-actions">
              <button type="button" className="radio-play radio-control" onClick={togglePlayback} disabled={!ready} aria-label={playing ? 'Pause music' : 'Play music'}>
                {playing ? (
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zm8 0h4v16h-4z" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M7 4v16l14-8z" /></svg>
                )}
              </button>
              <button type="button" className="radio-close radio-control" ref={closeRef} onClick={() => closePanel(true)} aria-label="Close music controls">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
              </button>
            </div>
            <div className="radio-volume">
              <label htmlFor="cafe-radio-volume" className="radio-sr-only">Volume</label>
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                {volume > 0 ? <path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" /> : <path d="m16 9 6 6m0-6-6 6" />}
              </svg>
              <input id="cafe-radio-volume" type="range" min="0" max="100" step="1" value={volume} onChange={changeVolume} aria-valuetext={`${volume} percent`} title={`Volume: ${volume}%`} />
            </div>
            <p className="radio-status radio-sr-only" role="status">{error ? 'Player unavailable' : ready ? playing ? 'Now playing' : 'Ready when you are' : 'Loading player...'}</p>
            {error && <p className="radio-error">{error} <button type="button" onClick={() => {
              if (!window.YT?.Player) document.getElementById('yt-iframe-api')?.remove()
              closeRef.current?.focus()
              setAttempt(value => value + 1)
            }}>Retry</button></p>}
          </section>
        )}
        <button
          type="button"
          className={`cafe-radio ${playing ? 'is-playing' : ''}`}
          ref={triggerRef}
          onClick={togglePanel}
          aria-label={open ? 'Close music controls' : 'Open music controls'}
          aria-expanded={open}
          aria-controls="cafe-radio-controls"
          aria-haspopup="dialog"
          title="Cafe radio"
        >
          <VinylRecord />
        </button>
      </div>
    </>
  )
}

export default CafeRadio
