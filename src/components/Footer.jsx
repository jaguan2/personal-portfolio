import './Footer.css'

function Footer() {
  return (
    <footer id="footer">
      <p className="closing-message">Thanks for scrolling — feel free to reach out.</p>
      <div className="footer-links">
        <a href="https://www.linkedin.com/in/jaguan/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <span className="divider">•</span>
        <a href="https://github.com/jaguan2" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <span className="divider">•</span>
        <a href="mailto:tpaguan@gmail.com">
          Email
        </a>
      </div>
    </footer>
  )
}

export default Footer
