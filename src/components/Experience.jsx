import coffeeBranch from '../assets/coffee-branch.svg'
import coffeeSprig from '../assets/coffee-sprig.svg'
import leafLine from '../assets/leaf-line.svg'
import steamCurl from '../assets/steam-curl.svg'
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
    period: 'March 2025 – Present',
    description: [
      { bold: 'Spearheaded full-stack development of two production B2B SaaS platforms', rest: ' that aggregate and manage global defense contracting opportunities for technology companies.' },
      { bold: 'Engineered an AWS Lambda and EventBridge ingestion pipeline', rest: ' processing 1,000+ defense contract notices daily from global government sources, automatically scoring, tagging, and classifying opportunities.' },
      { bold: 'Engineered AI-powered features using OpenAI', rest: ' for intelligent opportunity matching, executive report generation, and automated content analysis.' },
      { bold: 'Integrated third-party services', rest: ' including Stripe, OpenAI, QuickBooks, AWS S3, and Mailchimp APIs to deliver subscription billing, AI workflows, cloud storage, payment reconciliation, and customer engagement features.' },
      { bold: 'Architected PostgreSQL databases on AWS RDS', rest: ', designing scalable schemas, executing production-safe migrations, and maintaining data integrity across development and production environments.' }
    ]
  },
  {
    title: 'Software Engineer Intern (Secret Clearance)',
    company: 'U.S. Department of the Air Force',
    location: 'Warner Robins, GA',
    period: 'June 2024 – July 2024',
    description: [
      { bold: 'Served as Backend Lead', rest: ' for a full-stack management platform that centralized project metrics and sprint tracking across 10+ engineering projects.' },
      { bold: 'Containerized PostgreSQL with Docker', rest: ' to support scalable deployment for 300+ engineers.' },
      { bold: 'Collaborated in Agile development using Jira and Figma', rest: ', contributing to the successful delivery of three development sprints.' },
      { bold: 'Developed 10+ REST APIs', rest: ' using Flask, SQLAlchemy, and PostgreSQL to support core platform functionality.' }
    ]
  },
  {
    kind: 'Education',
    title: 'B.S. in Computer Science',
    company: 'University of South Florida',
    location: 'Tampa, FL',
    period: 'Aug 2021 — May 2025',
    description: [
      { bold: 'Relevant Coursework:', rest: ' Database Design, Data Storage and Analysis with Hadoop, Automata Theory, Social Media Mining, User Experience Design, Secure Coding, and Operating Systems.' }
    ]
  }
]

function Experience() {
  return (
    <section id="experience">
      <div className="floating-elements">
        <img className="float-icon branch-tr" src={coffeeBranch} alt="" aria-hidden="true" />
        <img className="float-icon sprig-bl" src={coffeeSprig} alt="" aria-hidden="true" />
        <img className="float-icon leaf-1" src={leafLine} alt="" aria-hidden="true" />
        <img className="float-icon steam-tl" src={steamCurl} alt="" aria-hidden="true" />
      </div>
      <div className="container">
        <h1>Experience &amp; Education</h1>
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
                  {exp.description?.length > 0 && (
                    <ul className="experience-details">
                      {exp.description.map((item, i) => (
                        <li key={i}><strong>{item.bold}</strong>{item.rest}</li>
                      ))}
                    </ul>
                  )}
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
