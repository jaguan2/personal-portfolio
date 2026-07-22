# ☕ Background & Animation Research — Cafe Portfolio

Research notes for making the site's background feel more alive, staying true to the warm cafe / botanical theme. Focus: **ambient background motion** and **improvising on the existing floating plants**.

> **Where we are today:** the site already has a good foundation — floating botanical SVGs (`leaf`, `coffee-branch`, `coffee-sprig`, `vine`, `steam-curl`) placed per-section via `.float-icon`, a few keyframes (`floatUp`, `twinkle`, `steamDrift`), a scroll-driven **sway** on the branch elements (`--sway` set from `Math.sin(scrollY)` in `App.jsx`), a global paper-grain overlay, and wave seams between the warm sections. It respects `prefers-reduced-motion`. So we're extending a solid base, not starting over.

---

## 1. What the best cafe & botanical sites are doing (2025–2026)

- **Atmosphere over decoration.** The 2025 cafe site is treated as "a sensory extension of the place" — motion is used to convey mood (roasting, steam, warmth), not to show off.
- **Earthy palette + soft motion.** Beige / brown / cream / terracotta / muted green with *slow, subtle* animation is the dominant formula — exactly the lane this site is already in.
- **Botanical + beans as hero texture.** Scattered beans and botanical leaves in flat-lay hero imagery ("everything starts from the ground") — botanical motifs are a recognized cafe trope, which validates leaning into the plants.
- **Ambient, not attention-grabbing.** The prevailing trend is **ambient animation**: "subtle, slow-moving details that add atmosphere without stealing the show" (Smashing Magazine). Think drift, breathe, parallax — never bounce or spin.
- **Award-winners use restraint + one signature effect.** Awwwards cafe sites typically pick *one* memorable motion idea (steam, a scroll-triggered pour, anti-gravity beans) and keep everything else calm.

---

## 2. The ambient-animation playbook (techniques worth borrowing)

Ranked roughly by "fits our site + payoff":

| Technique | What it is | Fit for us |
|-----------|-----------|-----------|
| **Cursor parallax** | Background elements shift a few px toward/away from the mouse, layered by "depth" | ⭐ High — we already compute per-element offsets for scroll sway; add a mouse vector |
| **Drifting particles** | Tiny translucent circles slowly float up with horizontal wander (dust motes / pollen / sunbeam dust) | ⭐ High — reads as "sunlit cafe air," very cheap |
| **Breeze on all leaves** | Extend the sway so *every* botanical gently rocks at its own phase | ⭐ High — one-line-ish extension of the existing sway |
| **Occasional falling leaf** | A leaf drifts diagonally across a section now and then (infrequent, staggered) | Med — on-theme, must stay rare so it's not busy |
| **Growing / self-drawing vine** | An SVG vine "draws" via `stroke-dashoffset` as you scroll into a section | Med — botanical, but needs a nice vine path |
| **Parallax depth layers** | Background botanicals scroll slower than foreground → depth | Med — pairs well with cursor parallax |
| **Ambient gradient "breathe"** | Section background warms/cools by a hair on a slow loop | Low-key — subtle warmth, easy |
| **Enhanced steam** | More organic, multi-wisp steam near cups (loader, back-to-top, quote) | Nice-to-have — we already have `steamDrift` |

**Implementation notes that keep it smooth (from perf research):**
- Animate **`transform` and `opacity` only** — never `top/left/width/height/box-shadow` (those trigger layout/paint). This is the single most important rule for 60fps.
- Drive everything through **one shared `requestAnimationFrame` loop** (we already have one for sway) and set CSS custom properties — don't attach a listener per element.
- Randomize `animation-duration` / `animation-delay` per element for **organic** (non-synchronized) motion.
- Keep the **element count low** (dozens, not hundreds) and prefer CSS keyframes over JS/canvas where possible.

---

## 3. Tailored ideas for *this* site (improvising on the plants)

Concrete moves, ordered by impact-for-effort. All reuse the existing `.float-icon` layer and rAF loop.

### A. Cursor parallax on the botanicals ⭐ *(recommended first)*
Right now the plants only react to **scroll**. Add a **mouse-move** component: as the cursor moves, nudge each floating icon a few pixels (`translate`), with far/small icons moving less than near/large ones (depth). Because we already loop per-element for `--sway`, this is mostly adding a `--mx/--my` vector to the same transform. Effect: the whole botanical layer feels like it has depth and "notices" you — very premium, still calm.

### B. Sunlit dust / pollen drift ⭐
Add a thin layer of ~8–14 tiny, semi-transparent circles that **drift slowly upward with a gentle horizontal wander** and fade in/out. Reads as dust floating in a warm cafe window-light. Pure CSS keyframes, staggered delays, `transform`+`opacity` only. Cheap, atmospheric, and distinctly "cafe."

### C. "Breeze" — make every leaf sway, not just branches ⭐
Extend the existing `--sway` so all leaf/sprig icons rock gently (each with a slightly different amplitude/phase from its index). The botanical layer goes from "a few branches move" to "the whole garden breathes." Basically free given the current setup.

### D. An occasional falling leaf
Every ~15–30s, release **one** leaf that drifts diagonally down across a section and fades out (rotation + translate). Rare on purpose — a delightful "did I just see that?" moment, not a leaf-storm. Great for the cream sections that currently have no motion between them.

### E. Growing vine on scroll (signature moment)
Pick one section (e.g., the About card edge or a section seam) and have a **vine self-draw** using `stroke-dashoffset` tied to scroll progress — the plant literally grows as you read. This is the "one signature effect" award sites use. Higher effort (needs a good vine path) but memorable.

### F. Depth parallax on background plants
Give the corner botanicals a slower scroll rate than the content (translateY a fraction of `scrollY`). Combined with **A**, it sells real depth. Reuses the scroll handler.

---

## 4. Guardrails (don't break what's good)

- **Respect `prefers-reduced-motion`.** We already do this for the current animations — every new layer must gate on it too (freeze particles, disable drift/parallax, keep static positions).
- **Stay ambient.** Slow (multi-second loops), low-opacity, low-contrast. If a visitor *notices* the animation consciously, it's too much.
- **Mobile:** reduce or drop the particle layer and cursor parallax on touch/small screens — bandwidth + no cursor. Fewer elements on phones.
- **One signature, many whispers.** At most one "look at me" effect (e.g., the growing vine); everything else stays a whisper.
- **Measure:** target 60fps; if the particle count or parallax math causes jank, cut element count first.

---

## 5. Suggested first pass

If we want the biggest atmosphere gain for the least risk, do **A + B + C** together:
- Cursor parallax on the existing plants (depth + responsiveness),
- a faint dust-mote layer (sunlit-air feel),
- breeze on all leaves (the garden breathes).

That trio is all `transform`/`opacity`, all reduced-motion-gated, and reuses the current rAF loop — high payoff, low risk. We can add the **falling leaf (D)** and **growing vine (E)** later as signature touches.

---

## Sources

- [Top 30 best coffee shop websites — Elias Studio](https://www.elias.studio/en/blog/post/top-30-des-meilleurs-site-internet-de-coffee-shop)
- [Cafe & Coffee Shop Websites: 43 Inspiring Examples — SiteBuilderReport](https://www.sitebuilderreport.com/inspiration/cafe-coffee-shop-websites)
- [30 Coffee Websites — Awwwards](https://www.awwwards.com/30-coffee-websites.html)
- [Ambient Animations In Web Design (Part 2) — Smashing Magazine](https://www.smashingmagazine.com/2025/10/ambient-animations-web-design-practical-applications-part2/)
- [Stunning Ambient Animations to Elevate UX — ThemeSelection](https://themeselection.com/blog/ambient-animations-in-web-design/)
- [The Best-Looking CSS Animated Background Examples — Slider Revolution](https://www.sliderrevolution.com/resources/css-animated-background/)
- [CSS-Only Fullscreen Leaf Falling Effect — CSS Script](https://www.cssscript.com/leaf-falling-effect/)
- [Falling Leaves with CSS Animations and Transforms — WebKit](https://webkit.org/blog-files/leaves/)
- [31 Website Animation Examples & Effects — SVGator](https://www.svgator.com/blog/website-animation-examples-and-effects/)
- [prefers-reduced-motion — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- [Animation performance guide — Motion.dev](https://motion.dev/docs/performance)
