import { useState } from 'react'
import twitterFeelImage from '../assets/TwitterFeel.JPG'
import eduPortalVideo from '../assets/eduPortal.mp4'
import './Projects.css'

const projects = [
  {
    id: 1,
    title: 'Perfect Path',
    technologies: 'Python, Flask, HTML/CSS, JavaScript, PostgreSQL, AWS',
    description: [
      'Developed a class scheduling web application for course planning and sharing schedules, utilizing 28 unique core and elective classes in the Computer Science program at USF.',
      'Implemented user authentication and authorization features, including password validation and admin privileges for secure access control.',
      'Hosted the PostgreSQL database on AWS cloud infrastructure for seamless access and real-time modifications.'
    ],
    media: { type: 'video', src: eduPortalVideo }
  },
  {
    id: 2,
    title: 'TwitterFeel',
    technologies: 'Python, TensorFlow, Pandas, NumPy, Hugging Face',
    description: [
      'Cleaned and filtered a Kaggle dataset of 20,000 tweets by performing lemmatization using Python and Pandas to create a structured dataset for emotion analysis.',
      'Implemented and trained Long Short-Term Memory (LSTM) models with TensorFlow to predict future tweet emotions by leveraging users\' tweet history.',
      'Improved model performance by applying SMOTE and filtering dataset users with extreme tweet counts, achieving accuracy, precision, recall, and F1 score of 0.82.'
    ],
    media: { type: 'image', src: twitterFeelImage, alt: 'TwitterFeel' }
  }
]

function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const currentProject = projects[currentIndex]

  return (
    <section id="projects">
      <h1>My Projects</h1>
      <div className="slider-container">
        <button className="slider-btn prev-btn" onClick={goToPrevious} aria-label="Previous project">
          &#10094;
        </button>

        <div className="slide">
          <h2>{currentProject.title}</h2>
          <p className="technologies">
            <strong>Technologies:</strong> {currentProject.technologies}
          </p>
          <ul className="description">
            {currentProject.description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <div className="media-container">
            {currentProject.media.type === 'video' ? (
              <video autoPlay loop muted playsInline>
                <source src={currentProject.media.src} type="video/mp4" />
              </video>
            ) : (
              <img src={currentProject.media.src} alt={currentProject.media.alt} />
            )}
          </div>
        </div>

        <button className="slider-btn next-btn" onClick={goToNext} aria-label="Next project">
          &#10095;
        </button>
      </div>

      <div className="slider-dots">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Projects
