import iceCube from '../assets/ice-576352_1280.webp'
import './Skills.css'

const skillsData = [
  {
    category: 'Languages',
    skills: ['Python', 'JavaScript', 'Java', 'C++', 'C', 'HTML/CSS', 'SQL']
  },
  {
    category: 'Frameworks',
    skills: ['Flask', 'SQLAlchemy', 'Node.js', 'React', 'Bootstrap']
  },
  {
    category: 'Backend & Cloud',
    skills: ['REST APIs', 'AWS (Lambda, EventBridge, RDS, S3, EC2)', 'Auth0 (JWT/OAuth)', 'Stripe', 'Docker']
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'SQLite']
  },
  {
    category: 'Tools',
    skills: ['Git/GitHub', 'Linux', 'Jira', 'Figma', 'Notion']
  }
]

function Skills() {
  return (
    <section id="skills">
      <div className="floating-elements">
        <img className="float-icon" src={iceCube} alt="" aria-hidden="true" />
        <img className="float-icon" src={iceCube} alt="" aria-hidden="true" />
      </div>
      <div className="container">
        <h1>Skills</h1>
        <div className="skills-grid">
          {skillsData.map((item) => (
            <div key={item.category} className="skill-card">
              <h3>{item.category}</h3>
              <ul>
                {item.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
