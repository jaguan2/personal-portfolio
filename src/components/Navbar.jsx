import { useState, useEffect, useRef } from 'react'
import './Navbar.css'

function Navbar() {
  const [activeSection, setActiveSection] = useState('header')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuBtnRef = useRef(null)

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

  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        menuBtnRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <div className="navbar">
      <nav>
        <a
          href="#header"
          className="logo"
          onClick={handleNavClick}
          data-tooltip="A space where I archive and share my journey, wherever it takes me."
        >rkive.</a>

        <button
          ref={menuBtnRef}
          className="menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          onClick={() => setMenuOpen(v => !v)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <ul id="nav-menu" className={`nav-links ${menuOpen ? 'open' : ''}`}>
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
