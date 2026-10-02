# Images for the redesigned site

The new layout reserves image slots. Until files are added, each slot shows a
labelled placeholder so the page never looks broken. Drop the files below into
`public/` at these exact paths and they appear automatically — no code changes.

## Hero

| Path | Notes |
| --- | --- |
| `public/hero-studio.webp` | Portrait, roughly 4:5 or 3:4. Your workspace, a system diagram, or an abstract render. |

## Services — one per service row

| Path | Service |
| --- | --- |
| `public/work/web-platform.webp` | Web Engineering & Architecture |
| `public/work/custom-systems.webp` | Custom Software & Systems |
| `public/work/ai-integration.webp` | Intelligent Automation & AI Integration |
| `public/work/design-systems.webp` | UI/UX Design Systems |

Displayed in a tall left-hand rail, so portrait or square crops work best.
Minimum 560 × 720.

## Case studies — one per case study

| Path | Case study |
| --- | --- |
| `public/work/case-diptis.webp` | DIPTIS Fitness Website |
| `public/work/case-helios.webp` | Helios Commerce Replatform |
| `public/work/case-atlas.webp` | Atlas Ops Copilot |
| `public/work/case-nordwind.webp` | Nordwind Booking Engine |
| `public/work/case-quantum.webp` | Quantum Metrics Platform |
| `public/work/case-lumen.webp` | Lumen Health Portal |
| `public/work/case-vector.webp` | Vector Grid Auto-Scaler |

Displayed at 16:10. Minimum 1200 × 750.

## Notes

- `.webp` gives the best compression. `.jpg` and `.png` work fine too — just
  change the extension in the component.
- Keep files under ~300 KB each. They are served through `next/image`, which
  generates responsive sizes on demand.
- The case study filenames come from the `id` field in `CASE_STUDIES`
  (`src/lib/data.ts`), so they must match those ids exactly.