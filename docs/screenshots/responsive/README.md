# Responsive verification

Checked October 15, 2026 using Chrome viewport emulation. Layout captures use
reduced motion. The production build passed.

| View | Resolution |
| --- | --- |
| Small phone | 320 x 720 |
| Phone | 390 x 844 |
| Wide phone / narrow tablet | 600 x 900 |
| Phone landscape | 844 x 390 |
| iPad mini portrait | 768 x 1024 |
| iPad portrait | 820 x 1180 |
| iPad Pro portrait | 1024 x 1366 |
| iPad landscape | 1180 x 820 |
| iPad Pro landscape | 1366 x 1024 |

Changes:

- Compact tablet and landscape hero spacing; social dock moves below the content
  on tablets instead of covering the greeting.
- Larger phone screenshots, circular gallery markers with separate hit areas,
  and stacked tablet project rows.
- Skill labels wrap inside cards; narrow screens use one column.
- Phone menu descriptions span the available width below the title row.
- Smaller phone timeline gutter and a scrollable navigation menu for short windows.
- Tablet footer clearance accommodates the fixed social dock.

All checked content containers passed internal-overflow checks. Phone menu
opening/navigation/closing, gallery touch swiping, and lightbox focus passed.
The phone project gallery was also captured in dark mode.

Representative captures:

- [Phone projects](phone-projects.png)
- [Phone project menu](phone-menu.png)
- [Phone experience](phone-experience.png)
- [iPad opening](ipad-home.png)
- [iPad projects](ipad-projects.png)
- [iPad landscape opening](ipad-landscape-home.png)
- [Phone dark mode](phone-dark-projects.png)

Regenerate with `npm.cmd run screenshots -- --responsive` from the repository
root. See `layout-checks.json` for per-capture overflow results. These checks
cover Chrome emulation; physical-device Safari testing remains unverified.
