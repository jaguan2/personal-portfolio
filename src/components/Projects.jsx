import { useState, useEffect } from 'react'
import deftechlinkImage from '../assets/deftechlink.png'
import twitterFeelImage from '../assets/TwitterFeel.JPG'
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
    media: { type: 'image', src: deftechlinkImage, alt: 'DefTechLink platform' }
  },
  {
    id: 1,
    eyebrow: 'Sentiment Analysis & Social Media Mining',
    title: 'TwitterFeel',
    technologies: 'Python • TensorFlow • Pandas • NumPy • Hugging Face',
    description: 'TwitterFeel is a machine learning research project focused on identifying early indicators of depression, anxiety, and suicidal ideation through social media activity. Inspired by the growing mental health crisis and the widespread influence of social media, the project explores whether online behavior can reveal signs of emotional distress before they become more severe. By detecting these warning signs early, the goal is to better understand how technology can support awareness, intervention, and access to help for individuals who may be struggling.',
    link: 'https://github.com/jaguan2/twitterFeel',
    linkType: 'github',
    media: { type: 'image', src: twitterFeelImage, alt: 'TwitterFeel sentiment analysis dashboard' }
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

function Projects() {
  const [lightbox, setLightbox] = useState(null)

  // Close on Escape and lock background scroll while the lightbox is open
  useEffect(() => {
    if (!lightbox) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setLightbox(null)
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
          {projects.map((project) => (
            <article className="project-row reveal" key={project.id}>
              <button
                type="button"
                className="project-media"
                onClick={() => setLightbox(project.media)}
                aria-label={`Expand ${project.title} ${project.media.type === 'video' ? 'demo' : 'image'}`}
              >
                {project.media.type === 'video' ? (
                  <video autoPlay loop muted playsInline aria-label={project.media.alt}>
                    <source src={project.media.src} type="video/mp4" />
                  </video>
                ) : (
                  <img src={project.media.src} alt={project.media.alt} />
                )}
                <span className="media-expand-hint" aria-hidden="true">
                  <ExpandIcon />
                </span>
              </button>

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
          ))}
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
            {lightbox.type === 'video' ? (
              <video autoPlay loop muted playsInline controls aria-label={lightbox.alt}>
                <source src={lightbox.src} type="video/mp4" />
              </video>
            ) : (
              <img src={lightbox.src} alt={lightbox.alt} />
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
