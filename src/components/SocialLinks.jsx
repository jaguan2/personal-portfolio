import resumePdf from '../assets/Jason_Resume.pdf'
import './SocialLinks.css'

const ResumeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="16" y2="17" />
    <line x1="8" y1="9" x2="10" y2="9" />
  </svg>
)

function SocialLinks() {
  return (
    <aside className="social-links" aria-label="Social links and resume">
      <a
        href="https://www.linkedin.com/in/jaguan/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Jason Guan on LinkedIn"
        title="LinkedIn"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z" />
        </svg>
      </a>
      <a
        href="https://github.com/jaguan2"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Jason Guan on GitHub"
        title="GitHub"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.16.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.7-4.04-1.58-4.04-1.58-.55-1.36-1.34-1.72-1.34-1.72-1.09-.73.08-.71.08-.71 1.2.08 1.84 1.21 1.84 1.21 1.07 1.79 2.81 1.27 3.49.97.11-.76.42-1.27.76-1.56-2.67-.3-5.47-1.31-5.47-5.81 0-1.28.47-2.33 1.24-3.15-.13-.3-.54-1.51.11-3.15 0 0 1.01-.32 3.3 1.2.96-.26 1.98-.39 3-.4 1.02.01 2.05.14 3.01.4 2.28-1.52 3.29-1.2 3.29-1.2.65 1.64.24 2.85.12 3.15.77.82 1.23 1.87 1.23 3.15 0 4.51-2.81 5.5-5.49 5.79.43.36.81 1.08.81 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.21.68.83.56C20.56 21.88 24 17.49 24 12.29 24 5.78 18.63.5 12 .5z" />
        </svg>
      </a>
      <a href="mailto:tpaguan@gmail.com" aria-label="Email Jason Guan" title="Email">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <polyline points="3 7 12 13 21 7" />
        </svg>
      </a>
      <a href={resumePdf} download="Jason_Guan_Resume.pdf" aria-label="Download resume" title="Download resume">
        <ResumeIcon />
      </a>
    </aside>
  )
}

export default SocialLinks
