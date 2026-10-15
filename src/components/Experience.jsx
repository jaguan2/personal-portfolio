import coffeeBranch from '../assets/coffee-branch.svg'
import coffeeSprig from '../assets/coffee-sprig.svg'
import leafLine from '../assets/leaf-line.svg'
import sparkle from '../assets/sparkle.svg'
import './Experience.css'

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M2 13h20" />
  </svg>
)

const GradCapIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 10 12 5 2 10l10 5 10-5z" />
    <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    <line x1="22" y1="10" x2="22" y2="15.5" />
  </svg>
)

const experiences = [
  {
    title: 'Full-Stack Developer Lead',
    company: 'DefTechLink',
    location: 'Tampa, FL',
    period: 'March 2025 – July 2026',
    details: [
      'Led full-stack development of two defense-tech SaaS platforms, building backend APIs and PostgreSQL databases to help companies discover government contracting opportunities.',
      'Built AWS Lambda and EventBridge pipelines processing 1,000+ contract notices daily, with automated scoring, tagging, and classification.',
      'Developed AI-powered opportunity matching and reports with OpenAI, alongside integrations for subscription billing, cloud storage, and customer engagement.'
    ]
  },
  {
    title: 'Software Engineer Intern',
    company: 'U.S. Department of the Air Force',
    location: 'Warner Robins, GA',
    period: 'June 2024 – July 2024',
    details: [
      'Served as Backend Lead for a management platform centralizing project metrics and sprint tracking across 10+ engineering projects.',
      'Developed 10+ REST APIs with Flask and SQLAlchemy, and containerized PostgreSQL with Docker to support deployment for 300+ engineers.'
    ],
    credential: { label: 'Secret security clearance', date: 'Granted: July 2024' }
  },
  {
    kind: 'Education',
    title: 'B.S. in Computer Science',
    company: 'University of South Florida',
    location: 'Tampa, FL',
    period: 'Aug 2021 – May 2025',
    details: [
      'Studied database design, secure coding, operating systems, and user experience design, with additional coursework in social media mining and data analysis with Hadoop.'
    ],
    credential: { label: 'AWS Certified Cloud Practitioner', date: 'Issued: October 2026' }
  }
]

function Experience() {
  return (
    <section id="experience">
      <div className="floating-elements">
        <img className="float-icon branch-tr" src={coffeeBranch} alt="" aria-hidden="true" />
        <img className="float-icon sprig-bl" src={coffeeSprig} alt="" aria-hidden="true" />
        <img className="float-icon leaf-1" src={leafLine} alt="" aria-hidden="true" />
        <img className="float-icon night-decor star-1" src={sparkle} alt="" aria-hidden="true" />
        <img className="float-icon night-decor star-2" src={sparkle} alt="" aria-hidden="true" />
      </div>
      <div className="container">
        <h1>Education &amp; Experiences</h1>
        <div className="experience-timeline">
          {experiences.map((exp, index) => {
            const isEducation = exp.kind === 'Education'
            const NodeIcon = isEducation ? GradCapIcon : BriefcaseIcon
            return (
              <div
                key={exp.company}
                className={`timeline-item reveal${isEducation ? ' is-education' : ''}`}
                style={{ '--reveal-delay': `${index * 100}ms` }}
              >
                <span className="timeline-node" aria-hidden="true">
                  <NodeIcon />
                </span>
                <div className="experience-card">
                  <div className="experience-header">
                    <div>
                      {exp.kind && <span className="card-kind">{exp.kind}</span>}
                      <h3>{exp.title}</h3>
                      <p className="company">{exp.company}</p>
                    </div>
                    <div className="experience-meta">
                      <span className="period">{exp.period}</span>
                      <span className="location">{exp.location}</span>
                    </div>
                  </div>
                  <ul className="experience-details">
                    {exp.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                    {exp.credential && (
                      <li>
                        <strong>{exp.credential.label}</strong>
                        <span> · {exp.credential.date}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Experience
