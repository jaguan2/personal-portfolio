# Resume source and project bank

`Jason_Guan_Master_Resume.tex` is the full resume bank: the existing work experience,
education, certification, and skills, followed by ten selectable project entries.
Its PDF is three pages. The original `Jason_Guan_Resume.tex`, its PDF, and the
website's downloadable resume are preserved.

## Make a tailored resume

1. Open `Jason_Guan_Tailored_Resume.tex`.
2. Add, remove, or reorder the project commands inside `\SelectedProjects`.
3. Compile that file. It imports the shared content from the master.
4. Review the resulting PDF and trim bullets or skills to match the job and your
   preferred page count. The included two-project example fits on one page;
   this bank does not force every selection onto one page.

For example:

```tex
\newcommand{\SelectedProjects}{
  \projectPokeSQL
  \projectDopamine
}
\input{Jason_Guan_Master_Resume.tex}
```

Edit a project's bullets in its `\newcommand` definition in the master. Changes
then carry into every tailored version that selects it. To save a job-specific
version, copy the small tailored entry file under a new name in the same folder.
Experience and skills remain shared; copy the master too if you want independent
versions of those sections.

The master uses separate title and technology lines. Tailored versions use compact,
wrapping headings. TwitterFeel's third bullet is included only in the master by
default; remove its surrounding `\ifMasterResume` / `\fi` to use it in tailored
versions too.

## Project menu

| Command | Project | Evidence to highlight |
| --- | --- | --- |
| `\projectTaskNook` | TaskNook | Full stack, desktop delivery, interactive SVG, migrations, CI |
| `\projectPokeSQL` | PokeSQL | TypeScript, SQL, WebAssembly, workers, persistence, offline desktop |
| `\projectTwitterFeel` | TwitterFeel | NLP, sequence models, data preparation, evaluation methodology |
| `\projectPurrfectPath` | Purrfect Path | Full-stack scheduling, PostgreSQL, AWS |
| `\projectSERAPH` | SERAPH | Flask APIs, PostgreSQL, Docker, engineering management |
| `\projectDopamine` | Dopamine | Ordering APIs, pricing integrity, state transitions, API tests |
| `\projectMediaGrabber` | Media Grabber | Node/Express, background jobs, streaming, native-tool integration |
| `\projectStudyWithSoobin` | Study with Soobin | React/TypeScript, media APIs, timer state, procedural audio |
| `\projectPortfolio` | Personal Portfolio | Responsive UI, accessible dialogs, motion, automated deployment |
| `\projectAutonomousRobot` | Autonomous Robot | Embedded C++, sensors, CAD, physical prototyping |

Possible starting combinations:

- Full-stack roles: TaskNook + Dopamine or Purrfect Path.
- Backend roles: Dopamine + Media Grabber.
- Frontend roles: PokeSQL + Study with Soobin.
- Data/ML roles: TwitterFeel + PokeSQL.
- Embedded roles: Autonomous Robot + one software project.

SERAPH overlaps the Air Force experience entry. Shorten that experience entry if
you select SERAPH so the application does not repeat the same accomplishments.
DefTechLink's production platforms and ingestion pipeline remain under work
experience for the same reason.

## Compile

In this directory, use either:

```powershell
tectonic Jason_Guan_Master_Resume.tex
tectonic Jason_Guan_Tailored_Resume.tex
```

or a standard LaTeX installation:

```powershell
pdflatex -interaction=nonstopmode -halt-on-error Jason_Guan_Master_Resume.tex
pdflatex -interaction=nonstopmode -halt-on-error Jason_Guan_Tailored_Resume.tex
```

For Overleaf, upload the master and tailored `.tex` files to the same project.
Choose the master as the main document for the full bank, or the tailored file
for a selected version. No external images or custom fonts are needed.

## Content sources and maintenance

- Work history, education, credentials, and original project bullets come from
  the existing LaTeX resume. Its contact information is preserved.
- Added bullets use the portfolio's `Projects.jsx` / `OtherWorks.jsx` and local
  project READMEs for TaskNook, PokeSQL, TwitterFeel, Dopamine (`oec`), Media
  Grabber, Study with Soobin, SERAPH, and this portfolio.
- Purrfect Path and Autonomous Robot use the portfolio descriptions, since local
  project repositories were not available. Those entries are intentionally short.
- Project dates and unverified performance, revenue, or user-count claims are
  omitted. TwitterFeel describes evaluation methods without promoting historical
  model scores whose interpretation differs across experiment versions.
- Dopamine's local README and portfolio disagree on menu size, so the resume
  avoids that count. It does not claim live online payment processing.
- Recheck contact details, credentials, links, and each bullet before applying;
  revise entries as the underlying projects change.
