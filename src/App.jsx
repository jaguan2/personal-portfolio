import Navbar from './components/Navbar'
import Header from './components/Header'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Quote from './components/Quote'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main">
        <Header />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Quote />
      </main>
      <Footer />
    </>
  )
}

export default App
