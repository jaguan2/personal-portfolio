import { useState, useEffect } from 'react'
import deftechlinkCover from '../assets/deftechlink.png'
import dtlDashboardImage from '../assets/dtldashboard.png'
import dtlOpportunitiesImage from '../assets/dtlopportunities.png'
import deftechlearnImage from '../assets/deftechlearn.png'
import deftechpodImage from '../assets/deftechpod.png'
import dtlOrganizationsImage from '../assets/dtlorganizations.png'
import twitterFeelImage from '../assets/TwitterFeel.JPG'
import tasknookLoft from '../assets/tasknook-loft.webp'
import tasknookCafe from '../assets/tasknook-cafe.webp'
import tasknookGarden from '../assets/tasknook-garden.webp'
import tasknookCabin from '../assets/tasknook-cabin.webp'
import tasknookDecorating from '../assets/tasknook-decorating.webp'
import tasknookProgress from '../assets/tasknook-progress.webp'
import coffeeBranch from '../assets/coffee-branch.svg'
import coffeeSprig from '../assets/coffee-sprig.svg'
import leafLine from '../assets/leaf-line.svg'
import steamCurl from '../assets/steam-curl.svg'
import './Projects.css'

const projects = [
  {
    id: 0,
    eyebrow: 'Professional Work',
    title: 'DefTechLink',
    technologies: 'Python • Flask • SQLAlchemy • PostgreSQL • AWS Lambda • Auth0 • Stripe',
    description: 'DefTechLink is a defense-tech startup focused on helping innovative companies navigate government contracting and defense markets. I build the backend systems, cloud infrastructure, and data pipelines that aggregate thousands of defense opportunities, making them easier for companies to discover.',
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
    eyebrow: 'Sentiment Analysis & Social Media Mining',
    title: 'TwitterFeel',
    technologies: 'Python • TensorFlow • PyTorch • Pandas • Hugging Face',
    description: 'TwitterFeel is a machine learning research project focused on identifying early indicators of depression, anxiety, and suicidal ideation through social media activity. Inspired by the growing mental health crisis and the widespread influence of social media, the project explores whether online behavior can reveal signs of emotional distress before they become more severe. By detecting these warning signs early, the goal is to better understand how technology can support awareness, intervention, and access to help for individuals who may be struggling.',
    link: 'https://github.com/jaguan2/twitterFeel',
    linkType: 'github',
    media: { type: 'image', src: twitterFeelImage, alt: 'TwitterFeel sentiment analysis dashboard' }
  },
  {
    id: 2,
    eyebrow: 'Cozy Full-Stack Task Tracker',
    title: 'TaskNook',
    technologies: 'React • Vite • Tailwind CSS • Framer Motion • Flask • SQLAlchemy • Web Audio API',
    description: 'TaskNook is a cozy task tracker inspired by the game and improved on by Virtual Cottage. Customize your work environment, from a rainy window to sunny day. Get work done with our task manager. Adjust the music, from our preset lofi playlist to your custom linked playlist. Connect with friends, share your activity and stay motivated together.',
    link: 'https://github.com/jaguan2/TaskNook',
    linkType: 'github',
    media: [
      { type: 'image', src: tasknookLoft, alt: 'TaskNook loft room at night, an L-shaped attic with a resident on the sofa and a cat on the floor' },
      { type: 'image', src: tasknookCafe, alt: 'TaskNook corner cafe preset with a bar, chalkboard menu, bookshelves and patrons at the tables' },
      { type: 'image', src: tasknookGarden, alt: 'TaskNook secret garden preset, open air with grass, a pond and trees' },
      { type: 'image', src: tasknookCabin, alt: 'TaskNook cozy cabin preset with a hearth wall while it snows outside' },
      { type: 'image', src: tasknookDecorating, alt: 'TaskNook decorating mode, drawing the floor plan on a grid and arranging furniture' },
      { type: 'image', src: tasknookProgress, alt: 'TaskNook progress panel with daily goal, streak and productivity garden' }
    ]
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
  const [slides, setSlides] = useState({})

  const step = (projectId, length, dir) =>
    setSlides((prev) => {
      const current = prev[projectId] ?? 0
      return { ...prev, [projectId]: (current + dir + length) % length }
    })

  const stepLightbox = (dir) =>
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index + dir + lb.gallery.length) % lb.gallery.length } : lb
    )

  // Close on Escape, arrow-key through the gallery, lock background scroll
  useEffect(() => {
    if (!lightbox) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      else if (e.key === 'ArrowRight') stepLightbox(1)
      else if (e.key === 'ArrowLeft') stepLightbox(-1)
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [lightbox])

  return (
    <section id="projects">
      <div className="floating-elements">
        <img className="float-icon branch-br" src={coffeeBranch} alt="" aria-hidden="true" />
        <img className="float-icon sprig-tl" src={coffeeSprig} alt="" aria-hidden="true" />
        <img className="float-icon leaf-1" src={leafLine} alt="" aria-hidden="true" />
        <img className="float-icon steam-tr" src={steamCurl} alt="" aria-hidden="true" />
      </div>
      <div className="container">
        <h1>Featured Work</h1>
        <div className="projects-list">
          {projects.map((project) => {
            const gallery = galleryOf(project)
            const index = slides[project.id] ?? 0
            const current = gallery[index]
            return (
            <article className="project-row reveal" key={project.id}>
              <div className="project-media">
                <button
                  type="button"
                  className="media-frame"
                  onClick={() => setLightbox({ gallery, index })}
                  aria-label={`Expand ${project.title} ${current.type === 'video' ? 'demo' : 'image'}`}
                >
                  {current.type === 'video' ? (
                    <video key={current.src} autoPlay loop muted playsInline aria-label={current.alt}>
                      <source src={current.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={current.src} alt={current.alt} />
                  )}
                  <span className="media-expand-hint" aria-hidden="true">
                    <ExpandIcon />
                  </span>
                </button>

                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="media-nav media-nav-prev"
                      onClick={() => step(project.id, gallery.length, -1)}
                      aria-label={`Previous ${project.title} image`}
                    >
                      &#10094;
                    </button>
                    <button
                      type="button"
                      className="media-nav media-nav-next"
                      onClick={() => step(project.id, gallery.length, 1)}
                      aria-label={`Next ${project.title} image`}
                    >
                      &#10095;
                    </button>
                    <div className="media-dots">
                      {gallery.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`media-dot ${i === index ? 'active' : ''}`}
                          onClick={() => setSlides((prev) => ({ ...prev, [project.id]: i }))}
                          aria-label={`Show ${project.title} image ${i + 1}`}
                          aria-current={i === index}
                        />
                      ))}
                    </div>
                  </>
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
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded project media"
          onClick={() => setLightbox(null)}
        >
          <button
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
                <img src={shot.src} alt={shot.alt} />
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
        </div>
      )}
    </section>
  )
}

export default Projects
