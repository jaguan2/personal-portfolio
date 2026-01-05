import heroImage from '../assets/hero.jpg'
import resumePdf from '../assets/Jason_Resume.pdf'
import './Header.css'

function Header() {
  return (
    <header id="header">
      <div className="floating-elements">
        <span className="float-icon">☕</span>
        <span className="float-icon">🌙</span>
        <span className="float-icon">⭐</span>
        <span className="float-icon">☕</span>
        <span className="float-icon">⭐</span>
      </div>
      <div className="container">
        <div className="header-content">
          <div className="header-text">
            <h1>Hi, I'm Jason 👋</h1>
            <p>"Passion makes the impossible happen"</p>
            <div className="home-button">
              <a href="https://www.linkedin.com/in/jaguan/" className="button" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="mailto:tpaguan@gmail.com" className="button">
                Email
              </a>
              <a href={resumePdf} className="button" download="Jason_Guan_Resume.pdf">
                Download CV
              </a>
            </div>
          </div>
          <div className="header-image">
            <img src={heroImage} alt="Jason Guan" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
