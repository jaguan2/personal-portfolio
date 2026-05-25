import { useState, useEffect } from 'react'
import './Navbar.css'

function Navbar() {
  const [activeSection, setActiveSection] = useState('header')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = ['header', 'about', 'experience', 'skills', 'projects']

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (!section) continue
        const offsetTop = section.offsetTop
        const offsetBottom = offsetTop + section.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          setActiveSection(sectionId)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <div className="navbar">
      <nav>
        <a
          href="#header"
          className="logo"
          onClick={handleNavClick}
          data-tooltip="A place where I document and share my journey, cheers!"
        >rkive.</a>

        <button
          className="menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#header" className={activeSection === 'header' ? 'active' : ''} onClick={handleNavClick}>Home</a></li>
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={handleNavClick}>About</a></li>
          <li><a href="#experience" className={activeSection === 'experience' ? 'active' : ''} onClick={handleNavClick}>Experience</a></li>
          <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''} onClick={handleNavClick}>Skills</a></li>
          <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={handleNavClick}>Projects</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
