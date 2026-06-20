import heroImage from '../assets/hero.jpg'
import resumePdf from '../assets/Jason_Resume.pdf'
import coffeeBranch from '../assets/coffee-branch.svg'
import coffeeSprig from '../assets/coffee-sprig.svg'
import leafLine from '../assets/leaf-line.svg'
import vine from '../assets/vine.svg'
import moonCrescent from '../assets/moon-crescent.svg'
import sparkle from '../assets/sparkle.svg'
import './Header.css'

function Header() {
  return (
    <header id="header">
      <div className="hero-panel">
        <div className="floating-elements">
          <img className="float-icon branch-tl" src={coffeeBranch} alt="" aria-hidden="true" />
          <img className="float-icon branch-br" src={coffeeBranch} alt="" aria-hidden="true" />
          <img className="float-icon sprig-tr" src={coffeeSprig} alt="" aria-hidden="true" />
          <img className="float-icon sprig-bl" src={coffeeSprig} alt="" aria-hidden="true" />
          <img className="float-icon leaf-1" src={leafLine} alt="" aria-hidden="true" />
          <img className="float-icon leaf-2" src={leafLine} alt="" aria-hidden="true" />
          <img className="float-icon leaf-3" src={leafLine} alt="" aria-hidden="true" />
          <img className="float-icon vine-r" src={vine} alt="" aria-hidden="true" />
          <img className="float-icon night-decor moon-tr" src={moonCrescent} alt="" aria-hidden="true" />
          <img className="float-icon night-decor star-1" src={sparkle} alt="" aria-hidden="true" />
          <img className="float-icon night-decor star-2" src={sparkle} alt="" aria-hidden="true" />
        </div>
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1>Hi, I'm <em>Jason</em> <span className="wave">👋</span></h1>
              <p>"Passion makes the impossible happen"</p>
              <div className="home-button">
                <a href={resumePdf} className="button button-primary" download="Jason_Guan_Resume.pdf">
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
      </div>
    </header>
  )
}

export default Header
