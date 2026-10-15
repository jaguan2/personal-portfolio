# Portfolio improvement proposals — October 15, 2026

Reviewed jointly by two Codex instances. This is a proposal, not an implementation plan already approved for execution. The application files were left unchanged.

## Recommendation

Start with the About Me photos, then tighten the opening message and featured-project copy. Keep the café colors, personal interests, dates on the photos, social rail, record player, and stacked footer identity. The site already has personality; clearer hierarchy will make it easier to take in.

## About Me: why the photos feel out of place

The sky photo is 74% of the photo board's width, while the portrait is 62%. It starts above the board, and the river photo hangs below it. Large white frames, shadows, and three different rotations make all three photographs compete for attention. The scenery has become the strongest visual, even though this section introduces Jason.

The photographs are also positioned independently of the paragraphs. On desktop, the text and photos have different visual starting points; on a phone, the entire collage comes after the text and occupies another substantial block of scrolling. This is a composition issue, not a reason to remove the personal photos.

Evidence: [About layout](../../src/components/About.css:92), [photo sizes and positions](../../src/components/About.css:132), [About content](../../src/components/About.jsx:20).

### Preferred direction: Portrait-led album

- Keep the biography on the left, with one compact photo group on the right.
- Inside that group, place the portrait on the left spanning two rows. Place the sky and river photos in a narrower column on its right.
- Give the photos a consistent gap and a shared visual boundary. Use a small stagger and at most 2–3 degrees of rotation.
- Make the portrait the main image. The March 1 sky photo can remain substantial without being the largest object in the section.
- Keep the paper texture and dates, but reduce frame thickness and shadow strength.
- Use a normal responsive grid on phones, with dates unobstructed and no hard-coded offsets.

This keeps all three photos and the handmade feel while making their placement deliberate.

### Alternative: Portrait and photo strip

Put one portrait beside the biography and a two-photo strip beneath that row. Crop the scenery photos as landscape snapshots. This is the calmest option, with the clearest introduction and the least overlapping paper. The tradeoff is less of the original full-height scenery being visible.

### Alternative: Personal journal

Pair the professional introduction with the portrait in the first row. Place the personal-interest paragraph beside the two scenery photos in a second row. This ties nature photography directly to the text about nature walks and the sky. It is more editorial and taller than the compact album.

The accompanying comparison uses the existing photographs and shortened preview copy to compare placement. It does not change the site's wording or bring back the removed “memories” section, captions, or “Outside of work” subheading.

## Other suggested upgrades

| Priority | Suggested change | Reason and concrete direction |
| --- | --- | --- |
| High | Say what you do in the hero. | The opening currently shows your name and a quote, but your profession appears later. Add a short line such as “Software engineer building full-stack products and data pipelines.” Keep the quote quieter beneath it. Keep the social links in the side rail. |
| High | Reconcile the TwitterFeel descriptions. | The website describes identifying mental-health warning signs; the résumé describes predicting next-tweet emotions and evaluating held-out users. These might describe different phases, but the relationship is not explained. Confirm the current scope, distinguish motivation from what was implemented, and align the site, résumé, and repository. Do not add claims of validated health detection. |
| High | Update DefTechLink to reflect completed work. | Experience ends in July 2026, but Featured Work says “I build.” Use past tense for your contribution, while the company/product description can remain present tense. |
| Medium | Give each featured project a clearer contribution. | Use a short product description, one sentence about what you built, and one demonstrated result. Existing figures such as 1,000+ daily contract notices can support DefTechLink. For TaskNook, foreground the task workflows, customizable rooms, and engineering you implemented. Confirm current social features before promising them in the copy. |
| Medium | Shorten the visible technology lists. | TaskNook currently shows nine technologies before its description. Lead with four or five that explain the work; put the full stack in the repository or optional expanded details. |
| Medium | Condense Skills without losing the receipt motif. | Six receipts each repeat Subtotal, Tax, and Total. The accounting rows count list items rather than demonstrate skill. Keep the receipt headings and dotted rules; remove those rows or replace them with a single relevant “Used in…” project reference. |
| Medium | Let visitors reach the site sooner. | The brewing loader enforces approximately 2.9 seconds on each mount, independently of readiness. Consider a shorter first visit and immediate repeat visits, while retaining the coffee animation as a small brand detail. Reduced-motion users should not need to wait for a decorative sequence. |
| Medium | Label project actions visibly. | Coffee-cup icons fit the theme, but “View code” and “Visit site” say what will happen. Keep a small coffee icon beside the label if desired. |
| Lower | Give the footer a clear contact action. | Preserve “Jason Guan” and “Software Engineer.” Add a quiet email or “Get in touch” link so the page has an explicit next step, alongside the persistent rail. |
| Lower | Review mobile fixed controls in use. | The social dock and record player are intentionally always available. During scrolling they cover a portion of the content. Keep their 44px targets, and consider a more compact combined presentation or reserving space near critical controls. Verify while scrolling, not only with full-section screenshots. |

Evidence: [hero](../../src/components/Header.jsx:30), [featured-project copy](../../src/components/Projects.jsx:23), [experience dates](../../src/components/Experience.jsx:26), [résumé project description](../resume/Jason_Guan_Resume.tex), [receipt details](../../src/components/Skills.jsx:133), [loader timing](../../src/components/Loader.jsx:5), [fixed social dock](../../src/components/SocialLinks.css:58), [footer](../../src/components/Footer.jsx).

## Interaction fixes found during the review

These are functional improvements worth doing regardless of which About layout is chosen.

1. **Gallery arrow activation opens the image instead of advancing it.** Focusing the “Next DefTechLink image” button and pressing Enter opened the lightbox. The parent carousel's keyboard handler catches Enter/Space bubbling from its nested buttons and prevents their normal activation. Restrict the parent shortcut to events targeting the carousel itself. Verify Enter and Space on arrows and dots independently of the image button. Source: [DepthCarousel.jsx](../../src/components/DepthCarousel.jsx:104).
2. **The lightbox leaves keyboard focus behind the modal.** After opening an image, the active element remains outside the dialog. Move focus into the lightbox, contain Tab navigation while it is open, and return focus to the opener after closing. Also prevent carousel shortcuts from running behind the open modal. Source: [Projects.jsx](../../src/components/Projects.jsx:114).

## Review scope and verification

- Production build passed.
- Viewed the current hero, About, Experience, Skills, Featured Work, Other Works, and quote section at desktop size.
- Reviewed About at 1440px in light and dark themes, and at 390px and 320px in light mode. No document-wide horizontal overflow was observed at those checked sizes.
- The desktop About section measured about 820px tall; the phone version about 1160–1180px. Those figures are observations of the current copy and layout, not performance measurements or proposed targets.
- Both gallery keyboard findings above were reproduced in the browser.
- The review did not verify every external destination, project feature, quote attribution, or security-clearance status. Treat content inconsistencies as items to resolve, not as proof that one version is correct.

## Suggested order for the next iteration

1. Choose an About composition and implement it with the existing photos and text.
2. Correct the two gallery keyboard issues.
3. Add the short professional introduction and reconcile project descriptions.
4. Simplify Skills and make project actions easier to recognize.
5. Reassess the loader and mobile controls after those changes.

Avoid bundling all of these into one visual redesign. Review the About change first, then decide how much of the remaining list to adopt.
