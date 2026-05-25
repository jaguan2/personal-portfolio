import coffeeBranch from '../assets/coffee-branch.svg'
import coffeeSprig from '../assets/coffee-sprig.svg'
import leafLine from '../assets/leaf-line.svg'
import './Experience.css'

const experiences = [
  {
    title: 'Full Stack Developer Lead',
    company: 'DefTechLink',
    location: 'Tampa, FL',
    period: 'March 2025 – Present',
    description: [
      { bold: 'Architected AWS Lambda pipelines', rest: ' with EventBridge, processing 1,000+ daily contract notices from government sources.' },
      { bold: 'Developed backend services', rest: ' for contract opportunity extraction using RESTful APIs.' },
      { bold: 'Designed PostgreSQL schemas', rest: ' with efficient indexing and relational integrity.' }
    ]
  },
  {
    title: 'Software Engineer Intern',
    company: 'U.S. Department of the Air Force',
    location: 'Warner Robins, GA',
    period: 'June 2024 – July 2024',
    description: [
      { bold: 'Led backend development', rest: ' for a full-stack management application centralizing metrics and sprint tracking for 10+ projects.' },
      { bold: 'Containerized PostgreSQL with Docker', rest: ' for scalable data handling used by 300+ engineers.' },
      { bold: 'Developed 10+ REST APIs', rest: ' using Flask and SQLAlchemy.' }
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
                  <li key={index}><strong>{item.bold}</strong>{item.rest}</li>
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
