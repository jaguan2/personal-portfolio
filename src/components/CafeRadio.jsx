import { useEffect, useRef, useState } from 'react'
import './CafeRadio.css'

// The single YouTube video to loop as background music (the "v=" id in the URL).
// Leave empty to hide the player.
const VIDEO_ID = 'mAR8giOH5NY'

function CafeRadio() {
  const playerRef = useRef(null)
  const holderRef = useRef(null)
  const createdRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!VIDEO_ID) return

    const createPlayer = () => {
      if (createdRef.current || !holderRef.current || !window.YT?.Player) return
      createdRef.current = true
      playerRef.current = new window.YT.Player(holderRef.current, {
        height: '180',
        width: '320',
        videoId: VIDEO_ID,
        playerVars: {
          loop: 1,
          playlist: VIDEO_ID,
          autoplay: 0,
          playsinline: 1
        },
        events: {
          onReady: () => setReady(true),
          onStateChange: (e) => {
            const YT = window.YT
            if (e.data === YT.PlayerState.PLAYING) setPlaying(true)
            else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) setPlaying(false)
          }
        }
      })
    }

    if (window.YT?.Player) {
      createPlayer()
    } else {
      if (!document.getElementById('yt-iframe-api')) {
        const tag = document.createElement('script')
        tag.id = 'yt-iframe-api'
        tag.src = 'https://www.youtube.com/iframe_api'
        document.body.appendChild(tag)
      }
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prev === 'function') prev()
        createPlayer()
      }
    }

    return () => {
      try { playerRef.current?.destroy?.() } catch { /* ignore */ }
      createdRef.current = false
    }
  }, [])

  if (!VIDEO_ID) return null

  const toggle = () => {
    const p = playerRef.current
    if (!p) return
    if (playing) p.pauseVideo()
    else p.playVideo()
  }

  return (
    <>
      {/* Hidden audio source — rendered off-screen so only the sound plays */}
      <div className="cafe-radio-holder" aria-hidden="true">
        <div ref={holderRef} />
      </div>

      <button
        type="button"
        className={`cafe-radio ${playing ? 'is-playing' : ''}`}
        onClick={toggle}
        disabled={!ready}
        aria-label={playing ? 'Pause music' : 'Play music'}
        aria-pressed={playing}
        title={ready ? (playing ? 'Pause music' : 'Play music') : 'Loading music…'}
      >
        <svg className="turntable" viewBox="0 0 100 100" width="72" height="72" aria-hidden="true">
          {/* floating music notes (while playing) */}
          <g className="tt-notes">
            <g className="tt-note tt-note-1">
              <ellipse cx="18" cy="30" rx="3" ry="2.3" transform="rotate(-18 18 30)" />
              <rect x="20.3" y="21" width="1.5" height="9" rx="0.7" />
            </g>
            <g className="tt-note tt-note-2">
              <ellipse cx="30" cy="24" rx="2.5" ry="1.9" transform="rotate(-18 30 24)" />
              <rect x="32" y="16" width="1.3" height="8" rx="0.6" />
            </g>
          </g>

          {/* the record (spins while playing) */}
          <g className="tt-record">
            <circle className="tt-vinyl" cx="44" cy="60" r="32" />
            <circle className="tt-groove" cx="44" cy="60" r="26" />
            <circle className="tt-groove" cx="44" cy="60" r="20" />
            <circle className="tt-label" cx="44" cy="60" r="11" />
            <rect className="tt-mark" x="42.8" y="51" width="2.4" height="6" rx="1" />
            <circle className="tt-hole" cx="44" cy="60" r="2.4" />
          </g>

          {/* tonearm (drops onto the record while playing) */}
          <g className="tt-arm">
            <line className="tt-arm-rod" x1="84" y1="24" x2="52" y2="50" />
            <circle className="tt-head" cx="52" cy="50" r="3.6" />
          </g>
          <circle className="tt-pivot" cx="84" cy="24" r="6" />
          <circle className="tt-pivot-dot" cx="84" cy="24" r="2.4" />
        </svg>
      </button>
    </>
  )
}

export default CafeRadio
