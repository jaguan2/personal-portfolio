import coffeeSprig from '../assets/coffee-sprig.svg'
import coffeeBranch from '../assets/coffee-branch.svg'
import leaf from '../assets/leaf.svg'
import steamCurl from '../assets/steam-curl.svg'
import './OtherWorks.css'

/*
 * "Other Works" — a cafe-menu styled list of secondary projects.
 * Group projects under a `category` (the menu heading), then list `items`.
 * Each item: title, ingredients (tech stack), description, optional link,
 * and a `drink` key that picks the illustrated thumbnail
 * (latte | coldbrew | espresso | matcha).
 */
const menu = [
  {
    category: 'Full Stack Development',
    items: [
      {
        title: 'Purrfect Path',
        ingredients: 'Python • Flask • React • PostgreSQL • AWS',
        description:
          'A cat-themed class scheduling platform that helps USF Computer Science students plan their academic journey. Students can create, compare, and share course schedules with friends, choosing from 28 core and elective classes.',
        link: 'https://github.com/jaguan2/PurrfectPath',
        drink: 'latte'
      }
    ]
  },
  {
    category: 'Web',
    items: [
      {
        title: 'Personal Portfolio',
        ingredients: 'React • Vite • JavaScript • CSS • GitHub Pages',
        description:
          'A place where I document and share my journey in computer science and more. Cheers!',
        link: 'https://github.com/jaguan2/personal-portfolio',
        drink: 'matcha'
      },
      {
        title: 'Study with Soobin',
        ingredients: 'React • TypeScript • Vite • Tailwind CSS • YouTube IFrame API',
        description:
          'A LifeAt-style Pomodoro study app featuring the K-pop idol Soobin from TXT (Tomorrow x Together). Originating from me watching his vlogs / livestreams while studying for finals.',
        link: 'https://github.com/jaguan2/studywithsoobin',
        drink: 'coldbrew'
      }
    ]
  },
  {
    category: 'Robotics',
    items: [
      {
        title: 'Autonomous Robot',
        ingredients: 'Arduino • C++ • TinkerCAD • Ultrasonic Sensors • 3D Printing',
        description:
          'A Thomas the Train-themed autonomous robot prototype built as an affordable STEM toy for K-12 students. Designed to navigate obstacle courses using ultrasonic sensors on a $30 budget, the robot was modeled in TinkerCAD, then 3D printed and assembled by hand.',
        link: 'https://github.com/jaguan2/Autonomous-Robot',
        drink: 'espresso'
      }
    ]
  }
]

const CoffeeCupIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8.5 2.6c-.5.7-.5 1.4 0 2.1M12 2.2c-.5.7-.5 1.4 0 2.1M15.5 2.6c-.5.7-.5 1.4 0 2.1" />
    <path d="M3.5 8h13v4.5a5 5 0 0 1-5 5H8.5a5 5 0 0 1-5-5z" />
    <path d="M16.5 9.2h2.3a2.4 2.4 0 0 1 0 4.8h-2.3" />
    <path d="M3 20.5h14" />
  </svg>
)

/* === Illustrated drink thumbnails — one per project, for menu variety === */

const DrinkLatte = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
    <path d="M27 13c-2.4-2.6 1.6-4.6-.8-7.2M37 13c-2.4-2.6 1.6-4.6-.8-7.2"
      fill="none" stroke="#5C3D24" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
    <ellipse cx="32" cy="53" rx="19" ry="3.6" fill="#5C3D24" opacity="0.16" />
    <path d="M17 24h30l-2.6 20.5a5 5 0 0 1-5 4.5H24.6a5 5 0 0 1-5-4.5L17 24z"
      fill="#FFFDF8" stroke="#5C3D24" strokeWidth="2.4" strokeLinejoin="round" />
    <ellipse cx="32" cy="24.5" rx="13" ry="3.4" fill="#7C4A28" />
    <ellipse cx="32" cy="24.5" rx="8" ry="2" fill="#C9A57C" opacity="0.7" />
    <path d="M47 28h4.5a5.5 5.5 0 0 1 0 11H46"
      fill="none" stroke="#5C3D24" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
)

const DrinkColdBrew = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
    {/* glass */}
    <path d="M21 15h22l-2.4 33a4.5 4.5 0 0 1-4.5 4H27.9a4.5 4.5 0 0 1-4.5-4L21 15z"
      fill="#FFFDF8" stroke="#5C3D24" strokeWidth="2.4" strokeLinejoin="round" />
    {/* coffee fill */}
    <path d="M22.7 25h18.6l-1.7 22.4a3.5 3.5 0 0 1-3.5 3.2H27.9a3.5 3.5 0 0 1-3.5-3.2L22.7 25z"
      fill="#7C4A28" />
    {/* ice cubes */}
    <rect x="25.5" y="27" width="8" height="8" rx="1.6" transform="rotate(14 29.5 31)" fill="#FFFDF8" opacity="0.45" />
    <rect x="32.5" y="33" width="7" height="7" rx="1.6" transform="rotate(-12 36 36.5)" fill="#FFFDF8" opacity="0.4" />
    {/* straw */}
    <path d="M39 9 34 45" stroke="#4F6F52" strokeWidth="3" strokeLinecap="round" />
  </svg>
)

const DrinkEspresso = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
    <path d="M28 18c-2-2.2 1.4-3.8-.6-6M36 18c-2-2.2 1.4-3.8-.6-6"
      fill="none" stroke="#5C3D24" strokeWidth="1.8" strokeLinecap="round" opacity="0.4" />
    <ellipse cx="32" cy="49" rx="17" ry="3.4" fill="#5C3D24" opacity="0.15" />
    <path d="M16 47.5h32" stroke="#5C3D24" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
    <path d="M23 25h18v7a9 9 0 0 1-18 0z" fill="#FFFDF8" stroke="#5C3D24" strokeWidth="2.4" strokeLinejoin="round" />
    <ellipse cx="32" cy="25" rx="9" ry="2.4" fill="#5A3318" />
    <path d="M41 27.5h3.5a4.2 4.2 0 0 1 0 8.4H41" fill="none" stroke="#5C3D24" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
)

const DrinkMatcha = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
    <path d="M27 13c-2.4-2.6 1.6-4.6-.8-7.2M37 13c-2.4-2.6 1.6-4.6-.8-7.2"
      fill="none" stroke="#4F6F52" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    <ellipse cx="32" cy="53" rx="19" ry="3.6" fill="#5C3D24" opacity="0.16" />
    <path d="M17 24h30l-2.6 20.5a5 5 0 0 1-5 4.5H24.6a5 5 0 0 1-5-4.5L17 24z"
      fill="#FFFDF8" stroke="#5C3D24" strokeWidth="2.4" strokeLinejoin="round" />
    <ellipse cx="32" cy="24.5" rx="13" ry="3.4" fill="#6F8A6C" />
    <ellipse cx="32" cy="24.5" rx="8" ry="2" fill="#A9C29E" opacity="0.8" />
    <path d="M47 28h4.5a5.5 5.5 0 0 1 0 11H46"
      fill="none" stroke="#5C3D24" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
)

const drinks = {
  latte: DrinkLatte,
  coldbrew: DrinkColdBrew,
  espresso: DrinkEspresso,
  matcha: DrinkMatcha
}

function OtherWorks() {
  return (
    <section id="other-works">
      <div className="floating-elements">
        <img className="float-icon branch-bl" src={coffeeBranch} alt="" aria-hidden="true" />
        <img className="float-icon sprig-tr" src={coffeeSprig} alt="" aria-hidden="true" />
        <img className="float-icon leaf-1" src={leaf} alt="" aria-hidden="true" />
        <img className="float-icon steam-bl" src={steamCurl} alt="" aria-hidden="true" />
      </div>

      <div className="container">
        <div className="menu-card reveal">
          {/* Decorative cups, like a printed menu */}
          <img className="menu-deco cups" src={coffeeSprig} alt="" aria-hidden="true" />
          <img className="menu-deco sprig" src={leaf} alt="" aria-hidden="true" />

          <header className="menu-header">
            <h2 className="menu-title">
              <span className="menu-title-a">Other</span>{' '}
              <span className="menu-title-b">Works</span>
            </h2>
            <p className="menu-subtitle">A few more things off the menu</p>
          </header>

          <div className="menu-body">
            {menu.map((group) => (
              <div className="menu-category" key={group.category}>
                <h3 className="menu-category-title">{group.category}</h3>

                <ul className="menu-items">
                  {group.items.map((item) => {
                    const Drink = drinks[item.drink] || DrinkLatte
                    return (
                      <li className="menu-item" key={item.title}>
                        <span className="menu-item-thumb" aria-hidden="true">
                          <Drink />
                        </span>
                        <div className="menu-item-body">
                          <div className="menu-item-head">
                            <span className="menu-item-title">{item.title}</span>
                            <span className="menu-item-dots" aria-hidden="true" />
                            {item.link && (
                              <a
                                className="menu-item-link"
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View on GitHub"
                                aria-label={`View ${item.title} on GitHub`}
                              >
                                <CoffeeCupIcon />
                              </a>
                            )}
                          </div>
                          <p className="menu-item-ingredients">{item.ingredients}</p>
                          <p className="menu-item-desc">{item.description}</p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OtherWorks
