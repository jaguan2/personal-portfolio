import './Skills.css'

const skillsData = [
  {
    category: 'Languages',
    skills: ['Python', 'JavaScript', 'Java', 'C++', 'C', 'HTML/CSS', 'SQL']
  },
  {
    category: 'Frameworks',
    skills: ['Flask', 'SQLAlchemy', 'Node.js', 'Docker', 'React', 'Bootstrap']
  },
  {
    category: 'Technologies',
    skills: ['AWS (Lambda, RDS)', 'PostgreSQL', 'SQLite', 'MySQL', 'Linux', 'Hadoop']
  },
  {
    category: 'Development',
    skills: ['Agile Methodologies', 'Scrum', 'Jira', 'Figma', 'Miro', 'UML']
  }
]

function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <h1>My Skills</h1>
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
