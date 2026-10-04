# Images for the redesigned site

The new layout reserves image slots. Until files are added, each slot shows a
labelled placeholder so the page never looks broken. Drop the files below into
`public/` at these exact paths and they appear automatically — no code changes.

## Hero

| Path | Notes |
| --- | --- |
| `public/hero-studio.png` | **Done.** Vektra Foundation Core v1.0 render (397 × 447).

## Services — one per service row

| Path | Service |
| --- | --- |
| `public/work/web-platform.png` | Web Engineering & Architecture |
| `public/work/custom-systems.png` | Custom Software & Systems |
| `public/work/ai-integration.png` | Intelligent Automation & AI Integration |
| `public/work/design-systems.png` | UI/UX Design Systems |

Displayed in a tall left-hand rail, so portrait or square crops work best.
Minimum 560 × 720.

## Case studies — one per case study

| Path | Case study |
| --- | --- |
| `public/work/case-diptis.png` | DIPTIS Fitness Website |
| `public/work/case-helios.png` | Helios Commerce Replatform |
| `public/work/case-atlas.png` | Atlas Ops Copilot |
| `public/work/case-nordwind.png` | Nordwind Booking Engine |
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
- A case study with a `gallery` array in `CASE_STUDIES` becomes clickable and
  opens a full-screen viewer (`src/components/ui/CaseGallery.tsx`). The first
  entry is the card thumbnail. Add more entries and the viewer's arrows,
  counter and paging appear automatically; cases without a gallery stay
  non-interactive and show their placeholder.
- `case-diptis-2.png` … `-5.png` are on disk but unreferenced — leftovers from
  the five-screenshot slideshow. Add them back to the `gallery` array to use.