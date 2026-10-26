# iPhone Duo viewport verification

Checked October 26, 2026 using Chrome touch/viewport emulation at 3x density.
The website uses CSS viewport dimensions; native iOS SDK layout rules do not
apply to this React site.

| Display | CSS viewport | Density |
| --- | --- | --- |
| Outer portrait | 466 x 678 | 3x |
| Inner portrait | 626 x 890 | 3x |
| Outer landscape | 678 x 466 | 3x |
| Inner landscape | 890 x 626 | 3x |

These are the viewport targets supplied for this device. The inner dimensions
and density are also listed by [iOS Resolution](https://www.ios-resolution.com/iphone-duo-inner/).
[Apple's preparation guide](https://developer.apple.com/iphone-duo/prepare/)
describes dynamically resizing layouts when the device folds or unfolds.

The existing fluid layouts cover these widths. The compact landscape hero now
also applies through 700 CSS pixels of viewport height, keeping the greeting
and portrait together without an excessively tall hero on the inner display.
The rule applies by available space and orientation rather than device name.

Verification:

- All 28 captures passed document and content-container overflow checks.
- Checked Home, About, Experience, Skills, Featured Work, Other Works, and dark
  project galleries at each viewport.
- Mobile navigation opening, navigation, and closing passed at all three
  viewports using the hamburger menu.
- Gallery touch swiping and lightbox focus passed at all four viewport sizes.
- Folding and rotating the same live page preserved the theme and gallery
  selection, with no reload or clipped greeting across five resize steps.
- The production build passed. Physical-device Safari remains unverified.

Representative captures:

- [Outer portrait](duo-outer-home.png)
- [Inner landscape](duo-inner-landscape-home.png)

See `layout-checks.json` and `resize-checks.json` for the saved measurements.
Regenerate using Node 22 or later:

```powershell
npm run screenshots -- --duo
```

To keep captures outside the repository, append `--output=C:/path/to/captures`.
The existing `--responsive` suite remains available for other phones and tablets.
