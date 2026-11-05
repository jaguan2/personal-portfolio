# Project description drafts

Reviewed November 4, 2026. These drafts pair the intention behind each project
with a concrete implementation detail. They have not been applied to the site.

The local GitHub folder contains six of the ten listed projects (DefTechLink spans
several folders). Purrfect Path, Dopamine, Pok?SQL, and Autonomous Robot were checked
through their public GitHub READMEs and selected implementation files.
This was source review, not a runtime or deployment verification.

## DefTechLink

DefTechLink helps technology companies find relevant government contracting opportunities without searching across disconnected sources. My work focused on backend APIs, PostgreSQL data models, and AWS Lambda pipelines that collect, filter, and score procurement notices for two production B2B SaaS platforms.

Evidence: [pipeline overview](../../DataPipeline/README.md),
[SAM.gov ingestion](../../DataPipeline/dtl_data/sam_gov/insertSamLambda.py),
[opportunity model](../../dtl-frontend/DTL/backend/models/opportunity.py),
[second platform](../../deftechdash/README.md).
The two-platform scope and personal ownership also reflect the owner's account.
Do not imply sole ownership of the frontend or all platform features.

## TaskNook

Inspired by Virtual Cottage, TaskNook brings tasks, focus sessions, and a customizable room together to make studying feel more inviting. I connected its React interface to Flask APIs and SQLite models for tasks, session history, and room settings, and packaged the app for desktop use.

Evidence: [overview and inspiration](../../TaskNook/README.md),
[app configuration](../../TaskNook/backend/app.py),
[data models](../../TaskNook/backend/models.py),
[focus-session routes](../../TaskNook/backend/routes/sessions.py).
The shared spaces include simulated neighbors; do not present them as evidence of
an established live multiplayer community.

## TwitterFeel ? Sentiment Analysis

TwitterFeel began as an exploration of emotional patterns in social media and has evolved into a local sentiment and emotion analysis workbench. I built workflows to import and version datasets, run pretrained transformer models, and compare their predictions with human-reviewed labels while preserving the evidence behind each analysis.

Evidence: [current overview](../../twitterFeel/README.md),
[inference engine](../../twitterFeel/src/twitterfeel/inference/engine.py),
[workspace persistence](../../twitterFeel/src/twitterfeel/workspace/workbench_data.py),
[architecture](../../twitterFeel/docs/ARCHITECTURE.md).
The current supported application labels existing posts; next-post forecasting is
preserved historical research. The project does not establish a causal effect of
social media on mental health. Current stack suggestions: Python, Pandas, PyTorch,
Hugging Face Transformers, SQLite, pywebview; TensorFlow belongs to the historical
forecasting work. Existing gallery media shows historical evaluation results.

## Purrfect Path

Purrfect Path is a cat-themed course planner that helps USF students organize their classes and compare schedules with friends. The Flask application uses SQLAlchemy and PostgreSQL to model students, courses, instructors, and friendships, with server-rendered pages for planning and sharing schedules.

Evidence: [README](https://github.com/jaguan2/PurrfectPath/blob/HEAD/README.md),
[models](https://github.com/jaguan2/PurrfectPath/blob/HEAD/website/models.py),
[routes and templates](https://github.com/jaguan2/PurrfectPath/blob/HEAD/website/views.py).
The repository uses Flask templates, HTML/CSS, and JavaScript rather than React.
PostgreSQL and AWS RDS are supported by the app configuration.

## Dopamine

Inspired by my family's Japanese restaurant and the Korean ?dopamine site? trend, Dopamine turns menu browsing into a complete ordering experience. Its React frontend connects to Flask and SQLAlchemy for carts, pickup and delivery orders, and a kitchen dashboard, with server-calculated prices and controlled order-status transitions.

Evidence: [README](https://github.com/jaguan2/dopamine/blob/HEAD/README.md),
[order routes](https://github.com/jaguan2/dopamine/blob/HEAD/backend/routes/order_routes.py).
The current README lists 288 menu items rather than the site's 282. Online payment
is not integrated; avoid language implying payment processing or a live restaurant
launch. Family connection comes from the owner's existing site description.

## Personal Portfolio

I designed this portfolio as a personal space to share my engineering work, with a warm cafe theme that reflects my interests outside development. Built with React, Vite, and custom CSS, it includes responsive layouts, interactive project galleries, dark mode, and keyboard-accessible controls.

Evidence: [project guide](../CLAUDE.md),
[gallery and native dialog](../src/components/Projects.jsx),
[theme and layout tokens](../src/App.css),
[navigation](../src/components/Navbar.jsx).
The live host is Vercel; the site's technology line still lists GitHub Pages.

## Soob Corner

Soob Corner grew out of watching Soobin's vlogs and livestreams while studying for finals. I turned that routine into a React and TypeScript study app, combining the YouTube IFrame API with Pomodoro timers, task checklists, and locally saved study progress.

Evidence: [overview](../../studywithsoobin/README.md),
[video integration](../../studywithsoobin/src/components/VideoBackground.tsx),
[timer](../../studywithsoobin/src/hooks/useTimer.ts),
[progress persistence](../../studywithsoobin/src/hooks/useProgression.ts).
The origin comes from the owner's existing description. Browser storage is local
persistence, not a hosted user database or cross-device sync.

## Pok?SQL

Pok?SQL makes SQL practice more approachable by turning Pok?mon data into a database you can explore through queries and guided challenges. I transformed PokeAPI data into a relational SQLite dataset and built a React interface that runs SQL locally through WebAssembly in a Web Worker, keeping query execution off the main UI thread.

Evidence: [README](https://github.com/jaguan2/poke-sql/blob/HEAD/README.md),
[dataset builder](https://github.com/jaguan2/poke-sql/blob/HEAD/scripts/build_db.py),
[query worker](https://github.com/jaguan2/poke-sql/blob/HEAD/web/src/db.worker.ts).
Use the site's existing spelling ?Pok?SQL? and ?Pok?mon? when applying.
The current README specifies 1,025 Pok?mon species; avoid counting variants as
additional species without checking the schema. No hosted backend is required.

## Media Grabber

I built Media Grabber to offer a straightforward alternative to download sites filled with ads and misleading buttons. Its React interface connects to an Express API that resolves media links and runs yt-dlp and FFmpeg download jobs, with progress tracking, format selection, and batch photo downloads.

Evidence: [local overview](../../web-scrapper/README.md),
[job manager](../../web-scrapper/server/lib/jobs.js),
[platform resolution](../../web-scrapper/server/lib/resolve.js).
The local project is named Media Scraper under web-scrapper; the portfolio labels
it Media Grabber and links to a different repository name. Keep naming separate
from verified behavior until the intended public link is confirmed.

## Autonomous Robot

A Thomas the Train-themed robot prototype designed to make hands-on STEM learning accessible on a $30 budget. The project paired a TinkerCAD-designed, 3D-printed body with Arduino motor control that responds to sensor input to steer the robot.

Evidence: [README](https://github.com/jaguan2/Autonomous-Robot/blob/HEAD/README.md),
[Arduino code](https://github.com/jaguan2/Autonomous-Robot/blob/HEAD/Foundations_Engineering_Final_Code.txt).
The README describes obstacle-course navigation with ultrasonic sensors, but the
text code uses digital IRL/IRR inputs. Use ?sensor input? until the final hardware
and code version are confirmed. Keep this framed as a prototype, not a deployed
educational product.

## Applying the drafts

Keep purpose first, then select one implementation detail that distinguishes the
project. Data modeling is particularly concrete in Purrfect Path's relationships,
Dopamine's order and price snapshots, and Pok?SQL's learner-facing relational
schema. TwitterFeel provides evidence of data preparation, model evaluation, and
reproducible analysis; these are different activities from relational data modeling.

Descriptions should not claim improved focus, learning outcomes, model accuracy,
or increased business revenue without results supporting those claims.
