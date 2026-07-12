import aboutImage from '../assets/about.jpg'
import coffeeBranch from '../assets/coffee-branch.svg'
import coffeeSprig from '../assets/coffee-sprig.svg'
import leafLine from '../assets/leaf-line.svg'
import vine from '../assets/vine.svg'
import steamCurl from '../assets/steam-curl.svg'
import './About.css'

function About() {
  return (
    <section id="about">
      <div className="floating-elements">
        <img className="float-icon branch-tl" src={coffeeBranch} alt="" aria-hidden="true" />
        <img className="float-icon sprig-br" src={coffeeSprig} alt="" aria-hidden="true" />
        <img className="float-icon leaf-1" src={leafLine} alt="" aria-hidden="true" />
        <img className="float-icon vine-tr" src={vine} alt="" aria-hidden="true" />
        <img className="float-icon steam-bl" src={steamCurl} alt="" aria-hidden="true" />
      </div>
      <div className="container">
        <div className="about-box reveal">
          <div className="row">
            <div className="about-col-1">
              <img src={aboutImage} alt="Jason at USF" />
            </div>
            <div className="about-col-2">
              <h1>About Me</h1>
              <p className="about-lead">
                I'm a Comp Sci alum from the University of South Florida, currently
                serving as a Full Stack Developer Lead at DefTechLink, a startup that intends
                to bridge the gap between the defense industry, academia, and government.
              </p>
              <p>
                My technical background includes full-stack development, database management,
                cloud technologies, and applied machine learning. Beyond work, I am particularly
                interested in how computer science intersects with cognitive science and social media mining.
              </p>
              <p>
                As a software engineer, I want to affect people's lives in an innovative and
                meaningful way. Let's connect and explore exciting possibilities together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
