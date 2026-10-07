# Personal Portfolio Development Guide

## Project

- React 19 single-page portfolio built with Vite 7 and plain CSS.
- Preserve the warm café / botanical visual language: cream surfaces, espresso text, caramel accents, and sage details.
- Components live in `src/components`; keep component-specific CSS beside each JSX file.
- The production target is GitHub Pages under the `/personal-portfolio/` base path.

## Component Library

This project uses [React Bits](https://reactbits.dev/get-started/index) as a source for selected interactive components and animation patterns. React Bits components are copied into the repository and adapted; this is not an installed all-in-one component package.

Current adaptations:

- `DepthCarousel.jsx`: based on the React Bits DepthCarousel concept and customized for landscape project screenshots, the existing lightbox, and the café palette.
- `Skills.jsx`: uses a custom pin-drop entrance inspired by React Bits' staggered BubbleMenu animation rather than embedding BubbleMenu itself.

Animation dependency:

- `gsap` is installed for coordinated motion and interaction timelines.
- Import only the GSAP features a component uses. Do not add plugins such as `ScrollTrigger` when an existing `IntersectionObserver` is sufficient.

When considering another React Bits component:

1. Treat the supplied component as a starting point, not a drop-in requirement.
2. Adapt colors, typography, proportions, and interaction patterns to the established design system in `src/App.css`.
3. Prefer transform and opacity animation. Avoid continuously animating blur, large shadows, or backdrop filters.
4. Trigger entrance animation once as content approaches the viewport. Pause or stop perpetual animation while it is offscreen.
5. Respect `prefers-reduced-motion`; reduced motion should show content immediately rather than merely shortening elaborate 3D movement.
6. Preserve semantic HTML, keyboard controls, visible focus states, and accurate accessible names.
7. Test narrow phones as well as desktop. Complex 3D effects should simplify to a conventional interaction where space is limited.
8. Run `npm run build` after integration.

## Motion Direction

- Motion should reinforce a physical metaphor already present in the interface: pinned receipts, stacked screenshots, turning records, drifting leaves, or printed café materials.
- Use one prominent motion idea per section. Avoid animating every line, word, control, and decoration simultaneously.
- Entrance effects should generally finish within 400–700 ms, with short stagger intervals around 60–90 ms.
- Do not use autoplay for content that visitors need time to read or inspect.
- Avoid permanent `will-change` on large elements; apply it only while an interaction is active when practical.

## Performance

- Keep scroll work consolidated and scheduled with `requestAnimationFrame` or use `IntersectionObserver` for section state.
- Avoid React state updates for purely visual scroll progress when a direct DOM/CSS variable update is sufficient.
- Be conservative with `backdrop-filter`, animated CSS `filter`, fixed full-page textures, and multiple simultaneous infinite animations, especially on mobile.
- Prefer the production preview (`npm run build` then `npm run preview`) when judging animation smoothness; React development mode and hot reload add overhead.
- Optimize new raster assets before committing them and lazy-load below-the-fold images where appropriate.

## Existing Conventions

- Global design tokens and shared reveal styles are in `src/App.css`.
- Honor the existing `.reveal` one-time entrance behavior unless a section owns a specialized GSAP entrance.
- Do not combine `.reveal` transforms with another transform animation on the same element; use a wrapper or opt that section out of `.reveal`.
- Project media must keep descriptive alt text and remain accessible through the lightbox by mouse and keyboard.
- Preserve unrelated working-tree changes.
