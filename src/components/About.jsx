import aboutImage from '../assets/about.jpg'
import './About.css'

function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="about-box">
          <div className="row">
            <div className="about-col-1">
              <img src={aboutImage} alt="Jason at USF" />
            </div>
            <div className="about-col-2">
              <h1>About Me</h1>
              <p>
                I'm a Computer Science graduate from the University of South Florida, currently
                serving as a Full Stack Developer Lead at DefTechLink—a startup platform connecting
                defense innovation opportunities with industry, academia, and government partners.
              </p>
              <p>
                My technical background includes full-stack development, cloud technologies (AWS),
                and applied machine learning, shaped by a research project analyzing social media
                data and emotional patterns.
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
