import { useState } from 'react'
import twitterFeelImage from '../assets/TwitterFeel.JPG'
import eduPortalVideo from '../assets/eduPortal.mp4'
import './Projects.css'

const projects = [
  {
    id: 1,
    title: 'TwitterFeel',
    technologies: 'Python • TensorFlow • Pandas • NumPy • Hugging Face',
    description: 'A machine learning project that predicts emotional sentiment from tweets. Built and trained LSTM neural networks on a cleaned dataset of 20,000 tweets, using lemmatization and SMOTE to handle class imbalance. The model analyzes tweet history to predict future emotional patterns, achieving an F1 score of 0.82 across accuracy, precision, and recall metrics.',
    media: { type: 'image', src: twitterFeelImage, alt: 'TwitterFeel' }
  },
  {
    id: 2,
    title: 'Perfect Path',
    technologies: 'Python • Flask • JavaScript • PostgreSQL • AWS',
    description: 'A class scheduling platform that helps USF Computer Science students plan their academic journey. Students can create, compare, and share course schedules with friends, choosing from 28 core and elective classes. Features secure user authentication with role-based admin privileges, all backed by a PostgreSQL database hosted on AWS for reliable, real-time access.',
    media: { type: 'video', src: eduPortalVideo }
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
      <div className="floating-elements">
        <span className="float-icon">🌙</span>
        <span className="float-icon">☕</span>
        <span className="float-icon">⭐</span>
      </div>
      <h1>Projects</h1>
      <div className="slider-container">
        <button className="slider-btn prev-btn" onClick={goToPrevious} aria-label="Previous project">
          &#10094;
        </button>

        <div className="slide">
          <div className="slide-content">
            <h2>{currentProject.title}</h2>
            <p className="technologies">{currentProject.technologies}</p>
            <div className="description">
              <p>{currentProject.description}</p>
            </div>
          </div>
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

      <div className="slider-navigation">
        <span className="project-count">{currentIndex + 1} / {projects.length}</span>
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
      </div>
    </section>
  )
}

export default Projects
