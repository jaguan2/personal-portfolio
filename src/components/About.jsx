import aboutImage from '../assets/about.jpg'
import './About.css'

function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="row">
          <div className="about-col-1">
            <img src={aboutImage} alt="Jason at USF" />
          </div>
          <div className="about-col-2">
            <h1>About Me</h1>
            <p>
              I'm a recent Computer Science graduate from the University of South Florida (GPA: 3.6)
              and currently a Full Stack Developer Lead at DefTechLink, where I architect data pipelines
              with AWS Lambda and design PostgreSQL database schemas.
            </p>
            <p>
              Previously, I interned as a Software Engineer at the U.S. Department of the Air Force,
              leading backend development for a full-stack management application used by 300+ engineers.
              I hold a Secret Level security clearance from the Department of Defense.
            </p>
            <p>
              My expertise spans full-stack development, cloud technologies (AWS), and machine learning.
              I'm passionate about building scalable applications and solving complex problems through code.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
