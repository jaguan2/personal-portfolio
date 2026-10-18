import cityStroll from '../assets/about-city-stroll.webp'
import portrait from '../assets/about-jason-outdoors.webp'
import riversideWalk from '../assets/about-riverside-walk.webp'
import coffeeBranch from '../assets/coffee-branch.svg'
import coffeeSprig from '../assets/coffee-sprig.svg'
import sparkle from '../assets/sparkle.svg'
import './About.css'

function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="floating-elements" aria-hidden="true">
        <img className="float-icon branch-tl" src={coffeeBranch} alt="" />
        <img className="float-icon sprig-br" src={coffeeSprig} alt="" />
        <img className="float-icon night-decor star-1" src={sparkle} alt="" />
      </div>
      <div className="container">
        <div className="about-journal">
          <div className="about-copy reveal">
            <h1 id="about-heading">About Me</h1>
            <p className="about-lead">
              Hi, I'm Jason Guan.
              I graduated from the University of South Florida with a Bachelor of Science in
              Computer Science in May 2025.
            </p>
            <p className="about-background">
              My background is primarily in full-stack development and data analysis,
              working with tools such as React, Flask, PostgreSQL, and AWS.
              {' '}As a software engineer, I want to affect people's lives in an innovative and
              meaningful way. Let's connect and explore exciting possibilities together.
            </p>
            <p className="about-personal">
              Outside of developing, I enjoy things that keep me grounded, like going to the gym,
              catching up with friends over good food, and trying new caf&#233;s.
            </p>
          </div>

          <div className="about-photo-board reveal" role="group" aria-label="A few moments from my camera roll">
            <figure className="about-photo about-photo-riverside">
              <img src={riversideWalk} alt="A winding path through a grassy hillside overlooking a wide river" width="750" height="1000" loading="lazy" decoding="async" />
              <figcaption><time dateTime="2026-07-05">7.5.2026</time></figcaption>
            </figure>
            <figure className="about-photo about-photo-city">
              <img src={cityStroll} alt="A castle-like building above green gardens beneath bright summer clouds" width="750" height="1000" loading="lazy" decoding="async" />
              <figcaption><time dateTime="2026-07-05">7.5.2026</time></figcaption>
            </figure>
            <figure className="about-photo about-photo-portrait">
              <img src={portrait} alt="Jason relaxing on the grass in his graduation outfit, with a book over his face" width="800" height="1000" loading="lazy" decoding="async" />
            </figure>
          </div>
        </div>

      </div>
    </section>
  )
}

export default About
