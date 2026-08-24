import coffeeBranch from '../assets/coffee-branch.svg'
import coffeeSprig from '../assets/coffee-sprig.svg'
import leafLine from '../assets/leaf-line.svg'
import vine from '../assets/vine.svg'
import './Skills.css'

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const LayersIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)

const CloudIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
)

const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 5v6c0 1.66-4 3-9 3s-9-1.34-9-3V5" />
    <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
  </svg>
)

const ToolIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
)

const ServerIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="20" height="7" rx="2" />
    <rect x="2" y="14" width="20" height="7" rx="2" />
    <line x1="6.5" y1="6.5" x2="6.51" y2="6.5" />
    <line x1="6.5" y1="17.5" x2="6.51" y2="17.5" />
  </svg>
)

const icons = {
  code: CodeIcon,
  layers: LayersIcon,
  server: ServerIcon,
  cloud: CloudIcon,
  database: DatabaseIcon,
  tool: ToolIcon
}

const skillsData = [
  {
    category: 'Languages',
    icon: 'code',
    skills: ['Python', 'JavaScript', 'Java', 'C++', 'C', 'HTML/CSS', 'SQL']
  },
  {
    category: 'Backend & APIs',
    icon: 'server',
    skills: ['REST APIs', 'OpenAI', 'Auth0 (JWT/OAuth)', 'Stripe', 'QuickBooks', 'Mailchimp']
  },
  {
    category: 'Databases',
    icon: 'database',
    skills: ['PostgreSQL', 'MySQL', 'SQLite']
  },
  {
    category: 'Frameworks & Libraries',
    icon: 'layers',
    skills: ['React', 'Flask', 'FastAPI', 'SQLAlchemy', 'Node.js', 'MUI', 'Bootstrap']
  },
  {
    category: 'Cloud & Infrastructure',
    icon: 'cloud',
    skills: ['AWS Lambda', 'EventBridge', 'RDS', 'S3', 'EC2', 'CloudWatch', 'IAM', 'Docker']
  },
  {
    category: 'Developer Tools',
    icon: 'tool',
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
          {skillsData.map((item, index) => {
            const Icon = icons[item.icon]
            return (
              <div
                key={item.category}
                className="skill-card-wrap reveal"
                style={{ '--reveal-delay': `${index * 80}ms` }}
              >
                <div className="skill-card">
                <div className="skill-card-head">
                  <span className="skill-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{item.category}</h3>
                </div>

                <ul className="skill-list">
                  {item.skills.map((skill) => (
                    <li key={skill} className="skill-row">
                      <span className="skill-name">{skill}</span>
                      <span className="skill-dots" aria-hidden="true" />
                      <span className="skill-check" aria-hidden="true">✓</span>
                    </li>
                  ))}
                </ul>

                <div className="skill-summary">
                  <div className="skill-srow">
                    <span>Subtotal</span>
                    <span className="skill-dots" aria-hidden="true" />
                    <span>{item.skills.length}</span>
                  </div>
                  <div className="skill-srow muted">
                    <span>Tax</span>
                    <span className="skill-dots" aria-hidden="true" />
                    <span>…</span>
                  </div>
                  <div className="skill-srow total">
                    <span>Total</span>
                    <span className="skill-dots" aria-hidden="true" />
                    <span>{item.skills.length}</span>
                  </div>
                </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
