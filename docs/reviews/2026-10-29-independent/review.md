# Independent portfolio design and UX review

Reviewed October 29, 2026. Requested by the owner and conducted with a separate
Codex reviewer, followed by the primary agent's source and browser checks.

Owner update after review: the coffee photograph has been removed from the hero
and is excluded from future design recommendations. Attached screenshots and
measurements document the earlier review state.

## Overall assessment

The larger name gives the opening a clear identity. The cream/espresso palette,
botanical illustrations and personal portrait form a
recognizable personal site. Keep that character. The main opportunity is to make
the professional story and routes to project evidence as clear as the identity.

This is a critique, not an implementation pass. No application code was changed
for the review. The recommendations below distinguish measured behavior,
content/interaction concerns, and subjective art-direction choices.

## Findings, in priority order

### 1. High: the hero identifies the person but gives little professional direction

**Observed:** the name dominates appropriately, but its only supporting content is
"Full-Stack Developer" and a motivational quotation. There are no links or buttons
inside the hero. The navigation and icon rail provide routes, but visitors must
discover those separately; the resume action has no persistent visible text label.

**Recommendation:** retain the large name, make the role a clear secondary heading,
and replace the quotation with a short statement of actual work. For example:
"I build web applications, APIs, and data pipelines." Place a primary **View
Projects** link and secondary **Download Resume** link immediately below. Keep the
quotation in the existing quote section if desired. This is a recruiter-oriented
content recommendation, not a claim that quotations are universally wrong.

Evidence: [desktop opening](hero-desktop-light.png), [phone opening](hero-phone.png),
[Header.jsx](../../../src/components/Header.jsx),
[SocialLinks.jsx](../../../src/components/SocialLinks.jsx).

### 2. High: fixed mobile controls obscure content while scrolling

**Observed:** the contact dock and record-player button sit over the reading area.
In the phone project capture, text passes behind the dock. Further scrolling can
reveal body text; it does not make every covered paragraph permanently inaccessible.

**Recommendation:** consider moving mobile contact actions into a labeled header
or footer, or collapsing the floating dock during reading. If the dock stays,
reserve sufficient space at section endings and avoid photo placements that end
directly under it. Treat the optional radio as a lower-priority control. Preserve
usable touch targets rather than solving overlap only by shrinking buttons.

Evidence: [small-phone opening](hero-small-phone.png),
[phone project capture](phone-projects.png),
[SocialLinks.css](../../../src/components/SocialLinks.css),
[CafeRadio.css](../../../src/components/CafeRadio.css).

### 3. Medium: project proof appears late in the scroll sequence

**Measured:** Featured Work begins about 4.63 viewport heights from the top at
1440 x 900, 6.88 at 390 x 844, and 8.58 at 320 x 720. These are section positions,
not counts of mandatory swipes; navigation provides a shortcut. About, Experience,
and Skills all precede Featured Work.

**Recommendation:** give projects an earlier route. A hero project link is the
smallest change. A stronger content-order change is to put Featured Work after
the hero or About and move the full Skills inventory later. A compact project
preview can also introduce work without committing to a complete reorder.

Evidence: [measurements.json](measurements.json),
[App.jsx](../../../src/App.jsx).

### 4. Medium: project cards need a clearer contribution-first reading order

**Observed:** lengthy technology strings precede descriptions. TaskNook lists nine
technologies before explaining the product; its explicit room-editor contribution
appears after the general product pitch. DefTechLink communicates backend ownership
and a concrete daily volume more clearly. Project destinations use icons whose
meaning must be inferred visually.

**Recommendation:** present each project as purpose, personal contribution, then a
small selection of relevant technologies. Give TaskNook's interactive editor more
prominence. Add visible destination text such as **View code**, **Visit site**, or
**Read case study**. The existing icon links already have accessible names; the
concern here is visual discoverability, not missing screen-reader labels. Preserve
accurate attribution: describe Jason's APIs, databases, and AWS work without
claiming a teammate's frontend implementations.

Evidence: [desktop projects](desktop-projects.png),
[Projects.jsx](../../../src/components/Projects.jsx),
[Projects.css](../../../src/components/Projects.css).

### 5. Medium: phone gallery images show breadth but little inspectable detail

**Observed:** full desktop marketing-page screenshots are fitted into narrow phone
cards. The image communicates the existence and look of a product, but much of its
internal text is too small to assess without opening the lightbox. A dashboard
image also does not explain which backend systems Jason implemented.

**Recommendation:** lead with a deliberate, representative screenshot or meaningful
crop, retain the full-size image in the lightbox, and add a short caption explaining
the feature and contribution. Backend projects could include a concise architecture
or data-flow view alongside product screenshots. This should complement the existing
gallery, not require visitors to infer ownership from someone else's interface.

Evidence: [phone project capture](phone-projects.png),
[desktop projects](desktop-projects.png),
[DepthCarousel.jsx](../../../src/components/DepthCarousel.jsx).

### 6. Lower: unify the hero's photographic and decorative treatments

**Art-direction judgment:** the organic portrait mask, botanical illustrations,
and layered shadows introduce several competing treatments.

**Recommendation:** retain the portrait as the main visual and reduce illustrations
immediately behind text or photo edges. Validate choices with side-by-side previews
rather than treating one framing style as a universal rule.

Evidence: [light hero](hero-desktop-light.png),
[dark hero](hero-desktop-dark.png),
[small-phone hero](hero-small-phone.png),
[Header.css](../../../src/components/Header.css).

### 7. Lower: complete the semantic navigation and heading hierarchy

**Source observations:** active navigation is marked by a CSS class, without
`aria-current`. The name and multiple major section titles are all H1 elements;
some subsection labels are H3. This does not mean the site is unusable, but its
document outline can be clearer.

**Recommendation:** retain the name as the page H1, use H2 for major sections, and
H3 for contained cards where appropriate. Add `aria-current="location"` to the
active in-page navigation link. Preserve existing skip navigation, explicit icon
labels, keyboard controls, reduced-motion behavior, and modal focus handling.

Evidence: [Navbar.jsx](../../../src/components/Navbar.jsx),
[About.jsx](../../../src/components/About.jsx),
[Experience.jsx](../../../src/components/Experience.jsx),
[Skills.jsx](../../../src/components/Skills.jsx),
[Projects.jsx](../../../src/components/Projects.jsx).

## What to preserve

- The prominent full name and recognizable cream/espresso/sage identity.
- The personal portrait.
- The distinction between featured projects and the secondary cafe-menu list.
- Concrete engineering evidence such as DefTechLink's daily ingestion volume and
  TaskNook's interactive SVG editor.
- Both light and dark themes, labeled icon controls, reduced-motion support, and
  the existing native-dialog lightbox with focus restoration.

## Suggested next pass

1. Refine the hero role/summary and add labeled project/resume actions.
2. Resolve fixed-control overlap on phones.
3. Make project contributions and gallery captions easier to scan.
4. Decide whether to move Featured Work earlier.
5. Refine the image composition and semantic outline as focused follow-ups.

## Verification and limits

The primary agent made eight fresh Chrome viewport captures: 1440 x 900 light and
dark, 390 x 844 light and dark, 320 x 720 light and dark, 820 x 1180, and 844 x 390.
All eight passed the existing document/container overflow checks. Those checks do
not cover every overlap: the mobile dock/photo issue is documented above.

Current full project and phone-section captures were also inspected, together with
the JSX/CSS. The independent reviewer inspected source and rendered screenshots;
the primary agent cross-checked the high-priority findings using browser geometry.
This was not a moderated recruiter study or a complete accessibility audit.

Sampled computed role, quote, and project-technology colors had contrast above
4.5:1 against their declared background colors in both themes. The phone project
technology line is approximately 12.16 CSS pixels and its eyebrow 11.52 pixels;
size/legibility remains a judgment to evaluate, not a measured contrast failure.
The contrast sampling does not certify all gradients, images, or interface states.

No physical-device Safari tests, screen-reader session, performance benchmark,
external-link audit, or backend behavior tests were performed for this critique.
The shared toolkit skills referenced by the repository were not installed in the
available discovery paths, so local project rules were used without claiming a
shared-toolkit verification result.
