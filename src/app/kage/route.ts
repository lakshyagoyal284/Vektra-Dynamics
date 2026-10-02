import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Serves the standalone "Kage" WebGL page.
 *
 * The file lives in public/kage/index.html, but Next does not perform
 * directory-index resolution for /kage -> /kage/index.html, so we serve it
 * explicitly here. The page is a self-contained export with its own <html>,
 * <head> and <body>, so it must NOT be wrapped in the site layout.
 */
export async function GET() {
  const file = path.join(process.cwd(), "public", "kage", "index.html");

  try {
    const html = await readFile(file, "utf8");
    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Kage page not found at public/kage/index.html" },
      { status: 500 }
    );
  }
}