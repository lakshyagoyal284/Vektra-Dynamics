import { NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ----------------------------- configuration ----------------------------- */

const SHEET_ID = process.env.LEADS_SHEET_ID ?? "";
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL ?? "";
// Real keys contain literal \n sequences; .env files don't unescape them.
const PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n");
const SHEET_TAB = process.env.LEADS_SHEET_TAB || "Leads";

/** Are the Google credentials present and plausible? */
function isConfigured(): boolean {
  return Boolean(SHEET_ID && CLIENT_EMAIL && PRIVATE_KEY.includes("PRIVATE KEY"));
}

/** Create the Leads tab (if missing) so appends never fail on a fresh sheet. */
async function ensureTab(
  sheets: ReturnType<typeof google.sheets>
): Promise<void> {
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  const tabs = (meta.data.sheets ?? [])
    .map((s) => s.properties?.title)
    .filter((t): t is string => Boolean(t));

  if (!tabs.includes(SHEET_TAB)) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: SHEET_TAB,
                gridProperties: { rowCount: 2000, columnCount: 10 },
              },
            },
          },
        ],
      },
    });
  }

  // Write the header row (idempotent — overwrites A1:G1 with the same values)
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_TAB}!A1:G1`,
    valueInputOption: "RAW",
    requestBody: { values: [HEADERS] },
  });
}

/** Column headers for the sheet (row 1). */
const HEADERS: string[] = [
  "Timestamp",
  "Name",
  "Email",
  "Project Type",
  "Budget",
  "Overview",
  "Source",
];

/* --------------------------------- route --------------------------------- */

type LeadPayload = {
  name?: unknown;
  email?: unknown;
  projectType?: unknown;
  budget?: unknown;
  overview?: unknown;
};

const asString = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = asString(body.name, 120);
  const email = asString(body.email, 200);
  const projectType = asString(body.projectType, 60);
  const budget = asString(body.budget, 60);
  const overview = asString(body.overview, 2000);

  // server-side validation — never trust the client
  if (!name || !email || !projectType || !budget || overview.length < 20) {
    return NextResponse.json(
      { ok: false, error: "All fields are required (overview min 20 chars)." },
      { status: 422 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 422 });
  }

  const row = [
    new Date().toISOString(),
    name,
    email,
    projectType,
    budget,
    overview,
    "vektra-website",
  ];

  // Demo mode: credentials not configured yet → accept without writing.
  if (!isConfigured()) {
    console.warn(
      "[leads] Sheets not configured — accepted in demo mode:",
      name,
      email
    );
    return NextResponse.json({
      ok: true,
      demo: true,
      message:
        "Set GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY and LEADS_SHEET_ID to store submissions.",
    });
  }

  try {
    const auth = new google.auth.JWT({
      email: CLIENT_EMAIL,
      key: PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    await ensureTab(sheets);

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_TAB}!A1`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[leads] Google Sheets append failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not store your inquiry. Please email us directly." },
      { status: 500 }
    );
  }
}
