import { useState, useEffect } from 'react'
import './Navbar.css'

function Navbar() {
  const [activeSection, setActiveSection] = useState('header')

  useEffect(() => {
    const sections = ['header', 'about', 'experience', 'skills', 'projects']

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section) {
          const offsetTop = section.offsetTop
          const offsetHeight = section.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="navbar">
      <nav>
        <a href="#header" className="logo">rkive.</a>
        <ul>
          <li><a href="#header" className={activeSection === 'header' ? 'active' : ''}>Home</a></li>
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a></li>
          <li><a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>Experience</a></li>
          <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
          <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
