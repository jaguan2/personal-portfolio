import coffeeBranch from '../assets/coffee-branch.svg'
import coffeeSprig from '../assets/coffee-sprig.svg'
import leafLine from '../assets/leaf-line.svg'
import vine from '../assets/vine.svg'
import './Skills.css'

const skillsData = [
  {
    category: 'Languages',
    skills: ['Python', 'JavaScript', 'Java', 'C++', 'C', 'HTML/CSS', 'SQL']
  },
  {
    category: 'Frameworks',
    skills: ['Flask', 'SQLAlchemy', 'Node.js', 'React', 'MUI', 'Bootstrap']
  },
  {
    category: 'Backend & Cloud',
    skills: ['REST APIs', 'AWS (Lambda, EventBridge, RDS, S3, EC2, SNS)', 'Auth0 (JWT/OAuth)', 'Stripe', 'Docker']
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
        <img className="float-icon branch-bl" src={coffeeBranch} alt="" aria-hidden="true" />
        <img className="float-icon sprig-tr" src={coffeeSprig} alt="" aria-hidden="true" />
        <img className="float-icon leaf-1" src={leafLine} alt="" aria-hidden="true" />
        <img className="float-icon vine-bl" src={vine} alt="" aria-hidden="true" />
      </div>
      <div className="container">
        <h1>Skills</h1>
        <div className="skills-grid">
          {skillsData.map((item, index) => (
            <div
              key={item.category}
              className="skill-card reveal"
              style={{ '--reveal-delay': `${index * 80}ms` }}
            >
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
