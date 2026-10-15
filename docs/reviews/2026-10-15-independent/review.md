# Portfolio design and implementation review

Reviewed October 15, 2026, with a second Codex instance independently examining
the source and then the freshly rendered screenshots. No application code was
changed for this review.

## Overall judgment

The strongest direction is a personal working archive with cafe details. The
photographs, warm palette, TaskNook scenes, and optional record player give this
portfolio an identifiable author. Preserve those. Improve how quickly visitors
understand Jason's work, how clearly projects demonstrate engineering decisions,
and how comfortably the long page reads on a phone.

The problem is emphasis. A large skills inventory and generous introductory
sections receive more space than the explanation of what Jason built. The site
currently communicates atmosphere more immediately than capability.

## 1. Put meaningful work in the first part of the visit

**High priority.** At 1440 x 900, Featured Work begins approximately 4,134px down
the document. At 390 x 844 it begins around 5,910px down. Direct navigation helps,
but the natural scrolling path passes About, Experience, and all Skills first.
The experience cards provide credible evidence, but tangible project work is
still delayed.

The hero has a name, role, quote, and photograph. It does not explain the kind of
problems Jason solves or provide a visibly labeled next step. An icon rail is
useful as a persistent shortcut, but its document icon is less explicit than
the word "Resume."

Suggested opening copy: "I build full-stack products and the pipelines behind
them." A more personal alternative: "Thoughtful tools, from production data
pipelines to cozy desktop apps." Follow with "Explore my work" and a labeled
resume link. The existing quote could become a smaller personal note later.

Suggested order: Hero -> Selected Work -> About -> Experience -> compact Skills
-> More Projects -> a clear contact close. A smaller intervention would retain
About immediately after the hero but move Featured Work ahead of Experience and
Skills.

Sources: [App.jsx](../../../src/App.jsx),
[Header.jsx](../../../src/components/Header.jsx).

## 2. Make each featured project show engineering judgment

**High priority.** Current rows combine a long stack and a paragraph. Visitors
learn what a product is, but not consistently what Jason owned or why the work
was difficult.

Use a brief product description, a labeled contribution, and one decision or
verified result. Allow an optional expanded builder's note for detail.

- **DefTechLink:** make "1,000+ notices processed daily" easy to scan. Explain
  ownership of APIs, ingestion, or cloud infrastructure. The landing-page
  screenshot shows the product but does little to explain the backend work;
  include a small pipeline diagram or annotated dashboard alongside it.
- **TaskNook:** its scenes are excellent evidence of distinctive product taste.
  Pair them with the actual system: task workflows, the SVG room editor,
  SQLite migrations with backups, and desktop packaging. Current text reads
  like promotional copy and includes "intends to provide" and social-feature
  promises. Verify implemented social behavior against the repository before
  retaining those claims.
- **TwitterFeel:** replace the dense four-panel matrix as the main visual with
  a readable explanation of the experiment and a carefully labeled finding.
  Keep the full matrix available on expansion. The current image contains
  historical metrics while the copy describes user-disjoint evaluation; verify
  that the displayed results represent the same experiment. The repository
  explicitly distinguishes older and newer evaluation workflows, so avoid
  silently pairing an old score with the latest method.

Show roughly four important technologies per row. The nine-item TaskNook stack
currently takes prominent space before the contribution is explained.

Sources: [Projects.jsx](../../../src/components/Projects.jsx),
[current featured-work screenshot](desktop-projects.png). TwitterFeel's local
README and the existing resume were also inspected during this conversation.

## 3. Redesign the phone gallery; fix its markers immediately

**Confirmed bug.** Mobile carousel markers measure 21 x 58px, appearing as tall
ovals. `App.css` sets a 44px minimum height on most buttons but exempts only the
old `.dot` and `.media-dot` classes. The new `.depth-carousel-dot` is missed.
Content-box sizing and padding increase the rendered height further.

The active marker's `background:` shorthand also resets `background-clip`,
which makes it fill the padded hit area. On desktop the active visual therefore
fills a 21 x 21px target rather than matching the other small markers.

Give controls a deliberate hit area with a separate visual dot, and avoid global
button rules that encode exceptions for individual components. Use
`background-color` when only the color should change.

**Design improvement:** keep the depth stack on desktop, where it is expressive.
On phones, use a full-width active screenshot with simple swipe/arrow controls
and a small count. The current stack spends scarce screen width showing
repeated edges while making the actual interface smaller.

Sources: [App.css](../../../src/App.css),
[DepthCarousel.css](../../../src/components/DepthCarousel.css),
[phone gallery screenshot](mobile-projects.png).

## 4. Keep the menu idea; let the projects have identities

**High priority on mobile.** Other Works measures about 2,578px tall at 390px
width. A thumbnail gutter and internal padding leave a narrow reading column.
The repeated drinks are attractive, but they make very different projects feel
interchangeable.

On phones, put a small thumbnail, title, and action in one row, then let the
description span the full content width underneath. Shorten the default
description to one or two sentences. Make the title a link.

Keep the menu's dotted rules and warm paper. Use a few project-specific visuals:
a SQL editor detail, the restaurant identity, or a small robot photograph.
Consider promoting PokeSQL to Featured Work for roles where TypeScript, SQL,
WebAssembly, offline persistence, and desktop delivery are relevant. The current
portfolio-self entry could move to a footer "Built with" note.

Rename "Other Works" to "More Projects" or "From the Workbench" if you want the
section to feel intentionally selected rather than leftover.

Sources: [OtherWorks.jsx](../../../src/components/OtherWorks.jsx),
[OtherWorks.css](../../../src/components/OtherWorks.css),
[phone menu screenshot](mobile-other.png).

## 5. Preserve the personal photos; edit the surrounding prose

Both reviewers found About among the strongest visual sections. The candid
graduation portrait and travel photographs feel specific to Jason. The paper
frames, dates, and asymmetry make sense for an archive.

The professional paragraphs are less distinctive: "meaningful," "innovative,"
and "makes a difference" could describe almost any developer. Replace one of
those sentences with a concrete preference or example: the kinds of tools you
enjoy making, a problem you enjoyed untangling, or why cozy software matters to
you. Keep the personal-interest paragraph.

On mobile this section is around 1,163px tall. Some height is appropriate for an
album, but less introductory repetition would improve the pace. The recent
garden hover is pleasant; if viewing the photograph in detail becomes an
intended feature, provide a tap/click route too.

Sources: [About.jsx](../../../src/components/About.jsx),
[About.css](../../../src/components/About.css), [About screenshot](desktop-about.png).

## 6. Reduce equal-weight inventory and heavy visual repetition

The skills pinboard is charming, but more than 30 checked tools receive equal
visual importance. Checkmarks demonstrate presence in a list, not depth of use.
Keep the pinned-paper treatment for three smaller capability groups, each with a
concrete project reference: backend/data systems, product interfaces, delivery
and reliability. Put the longer technology inventory in the resume.

The repeated warm backgrounds and deep shadows also make a very long page feel
similar from section to section. Retain the yellow warmth in the opening and
personal sections; experiment with near-white reading surfaces and quieter
shadows around case studies. Let the photographs and gallery keep the strongest
depth effects. Dark mode has an appealing evening atmosphere and should remain.

Sources: [Skills.jsx](../../../src/components/Skills.jsx),
[Skills.css](../../../src/components/Skills.css), [skills screenshot](desktop-skills.png).

## 7. Make actions clear and typography intentional

Coffee cups currently function as GitHub links. Accessible labels are present,
but sighted visitors have no clear reason to interpret a cup as source code.
Use visible "Code," "Visit site," or "Read notes" text. Keep cups as decoration
or beside the label.

The hero's mixed type is partly a CSS bug: the greeting computes to Playfair
Display, while the nested word "Jason" computes to Montserrat. The universal
font rule gives the child its own face. Make nested emphasis inherit the
heading's family, then evaluate the intended composition.

There are four main text families plus an emoji family. They can be reduced or
assigned clearer roles. Fredoka can still supply playfulness; it does not have
to carry every major heading. Also connect the unexplained `rkive.` identity to
Jason more explicitly. Its desktop tooltip should not carry the whole meaning
of the brand.

Sources: [Header.css](../../../src/components/Header.css),
[App.css](../../../src/App.css), [Navbar.jsx](../../../src/components/Navbar.jsx).

## 8. Finish the visit with a clear next step

The quote browser adds personality, but the closing thank-you does not give a
clear contact action. Keep a small quote or personal note and follow it with
"Want to build something together?" or a similarly natural contact line, plus
a visible email link. The record player works as an optional atmospheric detail;
avoid adding more permanently floating controls. Review the existing social dock
and player during mobile scrolling because they cover content as it passes.

Source: [Footer.jsx](../../../src/components/Footer.jsx).

## Implementation strengths and follow-up work

Preserve the native dialog, focus restoration, reduced-motion handling, lazy
lower-page images, theme tokens, and deferred YouTube player initialization.
The gallery's earlier keyboard problems were not reproduced in the current
version: Enter on Next advanced to image 2 without opening the modal; Enter on
the active image opened it with focus inside; Escape closed it and restored
focus to the image.

Further maintenance items:

- Use one page `h1`, section `h2` headings, and project/card `h3` headings.
- Add `aria-current="location"` to the current navigation link.
- Use an absolute public URL and a purposeful share image for Open Graph
  metadata; the current `/logo.png` does not encode the repository subpath.
- Remove unused old `.media-nav` and related carousel CSS after confirming its
  selectors are no longer rendered.
- Scope component-specific minimum sizes to avoid the confirmed button cascade
  problem recurring.
- Optimize larger project PNGs and the hero image, and review font delivery.
  These are payload opportunities, not a measured claim that the site is slow.

## Recommended sequence

1. Fix marker sizing and the accidental hero font mismatch.
2. Improve hero copy and actions; move selected work earlier.
3. Rewrite the three featured entries around ownership and decisions.
4. Redesign mobile galleries and the mobile project menu.
5. Condense Skills and tune section colors, shadows, and the closing contact.

This retains the author's spark while making the engineering easier to assess.

## Scope and evidence

- Source review by two Codex instances, plus fresh Chrome renders at 1440 x 900,
  390 x 844, and a 320 x 720 opening viewport.
- Light mode sections and dark-mode opening/gallery renders inspected.
- Screenshots use reduced motion to make layout comparisons deterministic.
- No document-wide horizontal overflow was reported at the checked viewports;
  global overflow hiding means this alone does not prove every element fits.
- Gallery keyboard activation and lightbox focus/close restoration checked.
- Full-section captures composite content beyond the viewport. Fixed controls
  appear once at the current viewport position; image painting beyond that
  viewport can be incomplete. A blank offscreen image in a capture is not
  classified as an application defect without separate reproduction.
- External project features, all outgoing links, screen-reader output, real
  device behavior, non-reduced-motion animation, and production performance
  were not exhaustively tested.
- Earlier review notes in the parent directory describe a different revision;
  this report does not repeat their resolved defects as current findings.
