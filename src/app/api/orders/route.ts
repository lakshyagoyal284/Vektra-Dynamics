import { NextResponse } from "next/server";
import { google } from "googleapis";
import { PACKAGES } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ----------------------------- configuration ----------------------------- */

const SHEET_ID = process.env.LEADS_SHEET_ID ?? "";
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL ?? "";
// Real keys contain literal \n sequences; .env files don't unescape them.
const PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n");
const ORDERS_TAB = process.env.ORDERS_SHEET_TAB || "Orders";

/** Are the Google credentials present and plausible? */
function isConfigured(): boolean {
  return Boolean(SHEET_ID && CLIENT_EMAIL && PRIVATE_KEY.includes("PRIVATE KEY"));
}

/** Column headers for the orders sheet (row 1). */
const HEADERS: string[] = [
  "Timestamp",
  "Order Ref",
  "Package",
  "Package ID",
  "Amount (INR)",
  "Name",
  "Email",
  "Timeline",
  "Notes",
  "Source",
];

/** Create the Orders tab (if missing) so appends never fail on a fresh sheet. */
async function ensureTab(
  sheets: ReturnType<typeof google.sheets>
): Promise<void> {
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  const tabs = (meta.data.sheets ?? [])
    .map((s) => s.properties?.title)
    .filter((t): t is string => Boolean(t));

  if (!tabs.includes(ORDERS_TAB)) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: ORDERS_TAB,
                gridProperties: { rowCount: 2000, columnCount: 10 },
              },
            },
          },
        ],
      },
    });
  }

  // Write the header row (idempotent — overwrites A1:J1 with the same values)
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: `${ORDERS_TAB}!A1:J1`,
    valueInputOption: "RAW",
    requestBody: { values: [HEADERS] },
  });
}

/* --------------------------------- route --------------------------------- */

type OrderPayload = {
  packageId?: unknown;
  name?: unknown;
  email?: unknown;
  timeline?: unknown;
  notes?: unknown;
};

const asString = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

/** Human-readable order reference, e.g. VKT-7F3K2Q. */
function orderRef(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `VKT-${out}`;
}

export async function POST(req: Request) {
  let body: OrderPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const packageId = asString(body.packageId, 60);
  const name = asString(body.name, 120);
  const email = asString(body.email, 200);
  const timeline = asString(body.timeline, 60);
  const notes = asString(body.notes, 2000);

  // Resolve the package server-side — never trust a client-supplied price.
  const pkg = PACKAGES.find((p) => p.id === packageId);
  if (!pkg) {
    return NextResponse.json({ ok: false, error: "Unknown package." }, { status: 422 });
  }

  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: "Name and email are required." },
      { status: 422 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 422 });
  }

  const ref = orderRef();

  const row = [
    new Date().toISOString(),
    ref,
    pkg.name,
    pkg.id,
    pkg.priceFrom,
    name,
    email,
    timeline || pkg.timeline,
    notes,
    "instant-buy",
  ];

  // Demo mode: credentials not configured yet → accept without writing.
  if (!isConfigured()) {
    console.warn("[orders] Sheets not configured — accepted in demo mode:", ref, name, email);
    return NextResponse.json({
      ok: true,
      demo: true,
      ref,
      message:
        "Set GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY and LEADS_SHEET_ID to store orders.",
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
      range: `${ORDERS_TAB}!A1`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    });

    return NextResponse.json({ ok: true, ref });
  } catch (err) {
    console.error("[orders] Google Sheets append failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not record your order. Please email us directly." },
      { status: 500 }
    );
  }
}