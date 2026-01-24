import heroImage from '../assets/hero.jpg'
import resumePdf from '../assets/Jason_Resume.pdf'
import iceCube from '../assets/ice-576352_1280.webp'
import './Header.css'

function Header() {
  return (
    <header id="header">
      <div className="floating-elements">
        <img className="float-icon" src={iceCube} alt="" aria-hidden="true" />
        <img className="float-icon" src={iceCube} alt="" aria-hidden="true" />
        <img className="float-icon" src={iceCube} alt="" aria-hidden="true" />
        <img className="float-icon" src={iceCube} alt="" aria-hidden="true" />
      </div>
      <div className="container">
        <div className="header-content">
          <div className="header-text">
            <h1>Hi, I'm Jason 👋</h1>
            <p>"Passion makes the impossible happen"</p>
            <div className="home-button">
              <a href={resumePdf} className="button button-secondary" download="Jason_Guan_Resume.pdf">
                Download CV
              </a>
              <a href="https://www.linkedin.com/in/jaguan/" className="button button-secondary" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="mailto:tpaguan@gmail.com" className="button button-secondary">
                Email
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
