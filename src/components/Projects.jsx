import { useState, useRef, useLayoutEffect } from 'react'
import deftechlinkCover from '../assets/deftechlink.png'
import dtlDashboardImage from '../assets/dtldashboard.png'
import dtlOpportunitiesImage from '../assets/dtlopportunities.png'
import deftechlearnImage from '../assets/deftechlearn.png'
import deftechpodImage from '../assets/deftechpod.png'
import dtlOrganizationsImage from '../assets/dtlorganizations.png'
import twitterFeelImage from '../assets/TwitterFeel.JPG'
import tasknookLoft from '../assets/tasknook-loft.webp'
import tasknookCommonRoom from '../assets/tasknook-common-room.webp'
import tasknookLibrary from '../assets/tasknook-library.webp'
import tasknookLibrarySeats from '../assets/tasknook-library-seats.webp'
import tasknookCharacterCustomization from '../assets/tasknook-character-customization.webp'
import tasknookCharacterOutfits from '../assets/tasknook-character-outfits.webp'
import tasknookCharacterModels from '../assets/tasknook-character-models.webp'
import tasknookCharacterSeated from '../assets/tasknook-character-seated.webp'
import coffeeBranch from '../assets/coffee-branch.svg'
import coffeeSprig from '../assets/coffee-sprig.svg'
import leafLine from '../assets/leaf-line.svg'
import sparkle from '../assets/sparkle.svg'
import DepthCarousel from './DepthCarousel'
import './Projects.css'

const projects = [
  {
    id: 0,
    eyebrow: 'Professional Work',
    title: 'DefTechLink',
    technologies: 'Python • Flask • SQLAlchemy • PostgreSQL • AWS Lambda • Auth0 • Stripe',
    description: 'DefTechLink helps technology companies discover government contracting opportunities. I built backend APIs, cloud infrastructure, and data pipelines for two production SaaS platforms, including an AWS pipeline that processed 1,000+ contract notices daily.',
    link: 'https://deftechlink.com',
    linkType: 'external',
    media: [
      { type: 'image', src: deftechlinkCover, alt: 'DefTechLink landing page with the headline "Find and Win Defense Contracts Worldwide"' },
      { type: 'image', src: dtlDashboardImage, alt: 'DefTechLink dashboard with due opportunities, upcoming events and recommendations' },
      { type: 'image', src: dtlOpportunitiesImage, alt: 'DefTechLink opportunities board listing global defense solicitations and tenders' },
      { type: 'image', src: deftechlearnImage, alt: 'DefTechLearn course and resource library' },
      { type: 'image', src: deftechpodImage, alt: 'DefTechPod podcast episode library' },
      { type: 'image', src: dtlOrganizationsImage, alt: 'DefTechLink organizations directory of defense networks and programmes' }
    ]
  },
  {
    id: 1,
    eyebrow: 'Cozy Full-Stack Task Tracker',
    title: 'TaskNook',
    technologies: 'React • Tailwind CSS • Framer Motion • Flask • SQLAlchemy • Alembic • SQLite • Web Audio API • PyInstaller',
    description: 'TaskNook is a cozy customizable task tracker that intends to provide every user with an ideal working condition. Customize your work environment, from a rainy window to sunny day. Connect with friends, share your activity and stay motivated together.',
    link: 'https://github.com/jaguan2/TaskNook',
    linkType: 'github',
    media: [
      { type: 'image', src: tasknookLoft, alt: 'TaskNook loft at night with a workstation, aquarium, reading chair and bed' },
      { type: 'image', src: tasknookCommonRoom, alt: 'TaskNook Common Cottage with shared desks, a raised reading nook and seated neighbours' },
      { type: 'image', src: tasknookLibrary, alt: 'TaskNook Grand Library with tall bookshelves, arched windows, shared study tables and reading areas' },
      { type: 'image', src: tasknookLibrarySeats, alt: 'TaskNook Grand Library with available seats highlighted and a seat-selection menu open' },
      { type: 'image', src: tasknookCharacterCustomization, alt: 'TaskNook character editor with a model preview, style options, colour choices and body proportion controls' },
      { type: 'image', src: tasknookCharacterOutfits, alt: 'TaskNook profile panel showing saved outfits and character previews beside the cozy lounge' },
      { type: 'image', src: tasknookCharacterModels, alt: 'Ten TaskNook standing character models with varied hairstyles, clothing and accessories' },
      { type: 'image', src: tasknookCharacterSeated, alt: 'Ten TaskNook character models in seated poses with varied outfits and resting postures' }
    ]
  },
  {
    id: 2,
    eyebrow: 'Sentiment Analysis',
    title: 'TwitterFeel',
    technologies: 'Python • TensorFlow • Pandas • NumPy • Hugging Face',
    description: 'TwitterFeel explores the relationship between social media and mental health through emotional patterns in a user\'s tweets. The project combines sentiment and emotion analysis with models that use a sequence of previous tweets to predict the emotion of the next post.',
    link: 'https://github.com/jaguan2/twitterFeel',
    linkType: 'github',
    media: { type: 'image', src: twitterFeelImage, alt: 'TwitterFeel confusion matrices comparing model evaluation results' }
  }
]

const CoffeeCupIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* steam */}
    <path d="M8.5 2.6c-.5.7-.5 1.4 0 2.1M12 2.2c-.5.7-.5 1.4 0 2.1M15.5 2.6c-.5.7-.5 1.4 0 2.1" />
    {/* cup body */}
    <path d="M3.5 8h13v4.5a5 5 0 0 1-5 5H8.5a5 5 0 0 1-5-5z" />
    {/* handle */}
    <path d="M16.5 9.2h2.3a2.4 2.4 0 0 1 0 4.8h-2.3" />
    {/* saucer */}
    <path d="M3 20.5h14" />
  </svg>
)

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
)

// A project's `media` may be a single object or an array (carousel).
const galleryOf = (project) =>
  Array.isArray(project.media) ? project.media : [project.media]

function Projects() {
  const [lightbox, setLightbox] = useState(null)
  const lightboxRef = useRef(null)
  const closeRef = useRef(null)
  const lightboxOpen = lightbox !== null
  const stepLightbox = (dir) =>
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index + dir + lb.gallery.length) % lb.gallery.length } : lb
    )

  // A native modal keeps the rest of the page inert and contains keyboard focus.
  useLayoutEffect(() => {
    if (!lightboxOpen) return
    const dialog = lightboxRef.current
    const opener = document.activeElement
    const prevOverflow = document.body.style.overflow
    dialog.showModal()
    closeRef.current?.focus({ preventScroll: true })
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = prevOverflow
      if (opener?.isConnected) opener.focus({ preventScroll: true })
    }
  }, [lightboxOpen])

  return (
    <section id="projects">
      <div className="floating-elements">
        <img className="float-icon branch-br" src={coffeeBranch} alt="" aria-hidden="true" />
        <img className="float-icon sprig-tl" src={coffeeSprig} alt="" aria-hidden="true" />
        <img className="float-icon leaf-1" src={leafLine} alt="" aria-hidden="true" />
        <img className="float-icon night-decor star-1" src={sparkle} alt="" aria-hidden="true" />
        <img className="float-icon night-decor star-2" src={sparkle} alt="" aria-hidden="true" />
      </div>
      <div className="container">
        <h1>Featured Work</h1>
        <div className="projects-list">
          {projects.map((project) => {
            const gallery = galleryOf(project)
            return (
            <article className="project-row reveal" key={project.id}>
              <div className="project-media">
                {gallery.length > 1 ? (
                  <DepthCarousel
                    items={gallery}
                    label={project.title}
                    onExpand={(index) => setLightbox({ gallery, index })}
                  />
                ) : (
                  <button
                    type="button"
                    className="media-frame"
                    onClick={() => setLightbox({ gallery, index: 0 })}
                    aria-label={`Expand ${project.title} image`}
                  >
                    <img src={gallery[0].src} alt={gallery[0].alt} loading="lazy" decoding="async" />
                    <span className="media-expand-hint" aria-hidden="true"><ExpandIcon /></span>
                  </button>
                )}
              </div>

              <div className="project-info">
                {project.eyebrow && (
                  <p className="project-eyebrow">{project.eyebrow}</p>
                )}
                <div className="project-title-row">
                  <h2 className="project-title">{project.title}</h2>
                  {project.link && (
                    <a
                      className="project-link"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={project.linkType === 'github' ? 'View on GitHub' : 'View project'}
                      aria-label={`View ${project.title}${project.linkType === 'github' ? ' on GitHub' : ''}`}
                    >
                      {project.linkType === 'github' ? <CoffeeCupIcon /> : <ExternalIcon />}
                    </a>
                  )}
                </div>
                <p className="project-tech">{project.technologies}</p>
                {project.description && (
                  <p className="project-description">{project.description}</p>
                )}
                {project.highlights && (
                  <ul className="project-highlights">
                    {project.highlights.map((item, i) => (
                      <li key={i}><strong>{item.bold}</strong>{item.rest}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
            )
          })}
        </div>
      </div>

      {lightbox && (
        <dialog
          ref={lightboxRef}
          className="lightbox"
          aria-modal="true"
          aria-label="Expanded project media"
          onCancel={(event) => {
            event.preventDefault()
            setLightbox(null)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Tab') {
              const controls = event.currentTarget.querySelectorAll('button:not([disabled]), video[controls]')
              const first = controls[0]
              const last = controls[controls.length - 1]
              if (event.shiftKey && (document.activeElement === first || document.activeElement === event.currentTarget)) {
                event.preventDefault()
                last?.focus()
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault()
                first?.focus()
              }
              return
            }
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
              event.preventDefault()
              event.stopPropagation()
              stepLightbox(event.key === 'ArrowRight' ? 1 : -1)
            }
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) setLightbox(null)
          }}
        >
          <button
            ref={closeRef}
            type="button"
            className="lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Close expanded view"
          >
            &times;
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const shot = lightbox.gallery[lightbox.index]
              return shot.type === 'video' ? (
                <video key={shot.src} autoPlay loop muted playsInline controls aria-label={shot.alt}>
                  <source src={shot.src} type="video/mp4" />
                </video>
              ) : (
                <img src={shot.src} alt={shot.alt} decoding="async" />
              )
            })()}

            {lightbox.gallery.length > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox-nav lightbox-nav-prev"
                  onClick={() => stepLightbox(-1)}
                  aria-label="Previous image"
                >
                  &#10094;
                </button>
                <button
                  type="button"
                  className="lightbox-nav lightbox-nav-next"
                  onClick={() => stepLightbox(1)}
                  aria-label="Next image"
                >
                  &#10095;
                </button>
                <span className="lightbox-count">
                  {lightbox.index + 1} / {lightbox.gallery.length}
                </span>
              </>
            )}
          </div>
        </dialog>
      )}
    </section>
  )
}

export default Projects
