# ☕ Personal Portfolio

[![Deploy to GitHub Pages](https://github.com/jaguan2/personal-portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/jaguan2/personal-portfolio/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/live-demo-6F8A6C?style=flat)](https://jaguan2.github.io/personal-portfolio/)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![License: ISC](https://img.shields.io/badge/license-ISC-BA8F68)

A warm, cafe-themed personal portfolio for **Jason Guan** — built from scratch with React and Vite, with a "cream cafe / botanical" aesthetic and a few playful touches (a coffee-brewing loader, a cafe-menu projects section, and a little lofi record player).

🔗 **Live site:** [jaguan2.github.io/personal-portfolio](https://jaguan2.github.io/personal-portfolio/)

<p align="center">
  <a href="https://jaguan2.github.io/personal-portfolio/">
    <img src="docs/screenshot.png" alt="Portfolio preview" width="100%">
  </a>
</p>

---

## 👋 About Me

I'm **Jason Guan**, a Computer Science graduate from the University of South Florida and currently a Full Stack Developer Lead at [DefTechLink](https://deftechlink.com). I build backend systems, cloud infrastructure, and data pipelines — and I'm especially interested in where computer science meets cognitive science and social media mining.

[Portfolio](https://jaguan2.github.io/personal-portfolio/) · [LinkedIn](https://www.linkedin.com/in/jaguan/) · [GitHub](https://github.com/jaguan2) · [Email](mailto:tpaguan@gmail.com) · [Résumé](src/assets/Jason_Resume.pdf)

---

## ✨ Features

- **Cafe / lofi aesthetic** — cream palette with sage & caramel accents, hand-drawn botanical motifs, and a subtle paper-grain texture.
- **Coffee-brewing loader** — a CSS-animated cup "brews" on first load before the site fades in.
- **Sticky navbar** — active-section highlighting on scroll, plus a mobile hamburger menu.
- **Hero** — greeting with icon links (LinkedIn, GitHub, Email, Résumé).
- **Experience & Education timeline** — a vertical spine with icon nodes (briefcase for work, cap for education).
- **Skills** — pinned "index cards" with a receipt-style *Subtotal / Tax / Total* summary.
- **Featured Work** — alternating image/text project rows with a click-to-expand lightbox.
- **Other Works** — secondary projects styled like a **printed cafe menu**, each with an illustrated drink.
- **Daily Quote browser** — a "today's pour" that rotates by day and is swipeable (pointer, touch, keyboard, trackpad).
- **Cafe Radio** — a floating turntable that loops a lofi YouTube track (spins & drops the tonearm while playing).
- **Motion & a11y** — scroll-reveal animations, parallax botanicals, `prefers-reduced-motion` support, ARIA labels, and keyboard navigation throughout.
- **Fully responsive** — desktop, tablet, and mobile breakpoints.

---

## 🛠️ Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | [React 19](https://react.dev/) |
| Build tool | [Vite 7](https://vite.dev/) |
| Styling | Plain CSS with custom properties (design tokens) — no CSS framework |
| State / routing | None — single-page scroll layout, `useState`/`useEffect` only |
| Music player | YouTube IFrame Player API |
| Fonts | Google Fonts (Playfair Display, Lora, Montserrat, Fredoka) |
| Deployment | GitHub Pages (GitHub Actions + `gh-pages`) |

---

## 📁 Project Structure

```
personal-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions → GitHub Pages
├── public/
│   └── logo.png                  # favicon / static asset
├── src/
│   ├── assets/                   # images, SVGs, video, résumé PDF
│   │   ├── hero.jpg, about.jpg, deftechlink.png, TwitterFeel.JPG …
│   │   ├── coffee-branch.svg, coffee-sprig.svg, leaf.svg, vine.svg …
│   │   ├── eduPortal.mp4
│   │   └── Jason_Resume.pdf
│   ├── components/               # each component = .jsx + matching .css
│   │   ├── Loader.jsx            # coffee-brewing intro animation
│   │   ├── Navbar.jsx            # sticky nav + active-section tracking
│   │   ├── Header.jsx            # hero / intro + icon links
│   │   ├── About.jsx             # about-me card
│   │   ├── Experience.jsx        # work + education timeline
│   │   ├── Skills.jsx            # pinned skill cards
│   │   ├── Projects.jsx          # "Featured Work" + image lightbox
│   │   ├── OtherWorks.jsx        # cafe-menu of secondary projects
│   │   ├── Quote.jsx             # swipeable daily quote browser
│   │   ├── Footer.jsx            # social links + copyright
│   │   ├── ScrollProgress.jsx    # top progress bar
│   │   ├── BackToTop.jsx         # scroll-to-top button (bottom-right)
│   │   ├── CafeRadio.jsx         # floating lofi turntable (bottom-left)
│   │   └── SectionDivider.jsx    # faint divider between cream sections
│   ├── App.jsx                   # composes all sections + scroll effects
│   ├── App.css                   # global styles & design tokens (:root)
│   └── main.jsx                  # React entry point
├── index.html                    # HTML shell + Google Fonts
├── vite.config.js                # Vite config (base path for GH Pages)
├── package.json
└── README.md
```

---

## 🚀 Getting Started

**Prerequisites:** [Node.js](https://nodejs.org/) 18+ and npm.

```bash
# 1. Clone
git clone https://github.com/jaguan2/personal-portfolio.git
cd personal-portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

> ⚠️ The app is served under a **base path** (`/personal-portfolio/`) for GitHub Pages, so open the full URL Vite prints — e.g. `http://localhost:5173/personal-portfolio/` — not the bare `localhost:5173`.

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server with hot-reload |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Build + publish `dist/` to GitHub Pages via `gh-pages` |

---

## 🌐 Deployment

The site deploys to **GitHub Pages** two ways:

1. **Automatically** — pushing to `main` triggers the workflow in
   [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds and publishes to Pages.
2. **Manually** — run `npm run deploy` to build and push `dist/` with the `gh-pages` package.

The `base` path in [`vite.config.js`](vite.config.js) must match the repository name for asset URLs to resolve on Pages.

---

## 🎨 Customization

Most content lives in the data arrays at the top of each component:

| What | Where |
|------|-------|
| Design tokens (colors, shadows) | `src/App.css` → `:root` |
| Featured projects | `src/components/Projects.jsx` |
| Other Works (cafe menu) | `src/components/OtherWorks.jsx` |
| Skills categories | `src/components/Skills.jsx` |
| Experience & education | `src/components/Experience.jsx` |
| Daily quotes | `src/components/Quote.jsx` |
| Lofi radio track | `src/components/CafeRadio.jsx` → `VIDEO_ID` |

---

## 📄 License

ISC © Jason Guan
