# Vektra Dynamics

> Engineered Digital Systems. Built for Scale.

Marketing and lead-capture site for **Vektra Dynamics**, a technology studio building web
platforms, custom software, and the groundwork for AI systems.

Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Submissions from the contact
form are written straight into a Google Sheet via a service-account-authenticated API route —
no third-party form backend.

---

## Features

- **Landing page** — hero, services, architecture, capabilities, case studies, and contact
  sections, all driven from a single typed data module.
- **Project estimator** — visitors pick service type, timeline, and scale to get a ballpark
  budget range before making contact.
- **Lead capture** — the contact form `POST`s to a Next.js route handler that validates input
  server-side and appends a row to Google Sheets.
- **About page** — founder bio, studio values, and the operating principles behind the work.
- **Design system** — a dark "obsidian" theme with cyan/indigo accents, built on Tailwind
  design tokens in `tailwind.config.ts`.
- **Motion & canvas visuals** — Framer Motion reveals plus a lightweight animated network canvas.
- **Accessible by default** — skip-to-content link, visible focus states, and semantic landmarks
  throughout.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.6 |
| UI | React 18 |
| Styling | Tailwind CSS 3.4 |
| Animation | Framer Motion 11 |
| Icons | Lucide React |
| Integrations | Google Sheets API (`googleapis`) |
| Hosting | Vercel (edge + Node runtime) |

---

## Getting Started

### Prerequisites

- **Node.js 18.17+** (developed against Node 20 / 24)
- **npm 9+**

### Installation

```bash
git clone https://github.com/lakshyagoyal284/Vektra-Dynamics.git
cd Vektra-Dynamics
npm install
```

### Environment variables

The site runs without configuration — the contact form falls back to **demo mode** and accepts
submissions without storing them. To persist leads to Google Sheets, create `.env.local`:

```bash
cp .env.local.example .env.local
```

Fill in:

```bash
LEADS_SHEET_ID=your-spreadsheet-id
LEADS_SHEET_TAB=Leads
GOOGLE_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

| Variable | Required | Description |
| --- | --- | --- |
| `LEADS_SHEET_ID` | For storage | ID from the spreadsheet URL (`docs.google.com/spreadsheets/d/<ID>/edit`) |
| `LEADS_SHEET_TAB` | No | Tab to write to. Defaults to `Leads`, created automatically if missing |
| `GOOGLE_CLIENT_EMAIL` | For storage | Service account email address |
| `GOOGLE_PRIVATE_KEY` | For storage | Full PEM private key, quotes preserved |

> `.env.local` and `*.json` service-account keys are git-ignored and must never be committed.

### Google Sheets setup

1. Create a Google Cloud project and enable the **Google Sheets API**.
2. Create a **service account** and download its JSON key.
3. Share your target spreadsheet with the service account email
   (*Share → add the `<...>@...iam.gserviceaccount.com` address* as an editor).
4. Copy the spreadsheet ID into `LEADS_SHEET_ID`.

On the first submission the route handler creates the target tab if it doesn't exist and writes
the header row, then appends each lead:

| Timestamp | Name | Email | Project Type | Budget | Overview | Source |
| --- | --- | --- | --- | --- | --- | --- |

The route normalizes the literal `\n` sequences in `GOOGLE_PRIVATE_KEY` automatically, so the
value can be pasted straight from a `.env` file.

### Development

```bash
npm run dev     # start the dev server at http://localhost:3000
```

### Other scripts

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint with next lint
npx tsc --noEmit   # typecheck without emitting
```

---

## Project Structure

```
.
├── public/                  # Static assets (founder photo)
├── scripts/                 # Local-only helper scripts (git-ignored)
├── src/
│   ├── app/
│   │   ├── about/page.tsx   # About page
│   │   ├── api/leads/       # Lead capture route handler
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout, fonts, metadata
│   │   └── page.tsx         # Landing page
│   ├── components/
│   │   ├── layout/          # Navbar, Footer
│   │   ├── sections/        # Hero, Services, Architecture, Capabilities,
│   │   │                    #   CaseStudies, Estimator, Contact
│   │   ├── ui/              # Reveal, SectionHeading
│   │   └── visuals/         # MiniRocket, NetworkCanvas
│   └── lib/
│       └── data.ts          # All site content as typed, readonly constants
└── tailwind.config.ts       # Design tokens and theme
```

### Content model

Nearly all copy, service definitions, case studies, and estimator weights live in
`src/lib/data.ts` as typed `readonly` arrays. Updating the site's content — pricing
(`BASE_ESTIMATE`), service tiers, case studies, nav links — means editing that one file,
not hunting through components.

---

## Deployment

The project deploys as-is to **Vercel**:

```bash
vercel
```

Or connect the repository at [vercel.com/new](https://vercel.com/new) and set the four
environment variables under **Project → Settings → Environment Variables** for Production,
Preview, and Development as needed.

For any other Node host, run `npm run build` and start with `npm run start`. The `/api/leads`
route requires the **Node.js runtime** (it uses the `googleapis` client for service-account
auth), which the route declares explicitly.

---

## Security Notes

- Service-account credentials live only in environment variables and git-ignored local files.
- The lead endpoint re-validates every field server-side — the client is never trusted — and
  rejects payloads with an overview under 20 characters or a malformed email address.
- Input is trimmed and length-capped before being written to the sheet.

---

## License

Private and proprietary. All rights reserved.

© Vektra Dynamics