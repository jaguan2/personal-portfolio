import './Experience.css'

const experiences = [
  {
    title: 'Full Stack Developer Lead',
    company: 'DefTechLink',
    location: 'Tampa, FL',
    period: 'March 2025 – Present',
    description: [
      'Architected data-ingestion pipelines with AWS Lambda and EventBridge, processing 1,000+ daily contract notices from government sources.',
      'Developed backend services for contract opportunity extraction using RESTful APIs.',
      'Designed and optimized PostgreSQL database schemas with efficient indexing and relational integrity.'
    ]
  },
  {
    title: 'Software Engineer Intern',
    company: 'U.S. Department of the Air Force',
    location: 'Warner Robins, GA',
    period: 'June 2024 – July 2024',
    description: [
      'Led backend development for a full-stack management application centralizing metrics and sprint tracking for 10+ projects.',
      'Containerized PostgreSQL database with Docker for scalable data handling used by 300+ engineers.',
      'Developed 10+ CRUD REST APIs using Flask and SQLAlchemy.'
    ]
  }
]

function Experience() {
  return (
    <section id="experience">
      <div className="floating-elements">
        <span className="float-icon">🌙</span>
        <span className="float-icon">☕</span>
        <span className="float-icon">⭐</span>
      </div>
      <div className="container">
        <h1>Experience</h1>
        <div className="experience-timeline">
          {experiences.map((exp) => (
            <div key={exp.company} className="experience-card">
              <div className="experience-header">
                <div>
                  <h3>{exp.title}</h3>
                  <p className="company">{exp.company}</p>
                </div>
                <div className="experience-meta">
                  <span className="period">{exp.period}</span>
                  <span className="location">{exp.location}</span>
                </div>
              </div>
              <ul className="experience-details">
                {exp.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
