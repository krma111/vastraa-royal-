import { NextResponse } from "next/server";

export const revalidate = 60; // cache for 60s

function isPlaceholder(v: string | undefined): boolean {
  if (!v) return true;
  return v.includes("XXXX") || v.includes("YOUR_");
}

export async function GET() {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_NAME || "Leads";

  if (isPlaceholder(token) || isPlaceholder(baseId)) {
    // Honest fallback: no fake count. Frontend shows generic copy.
    return NextResponse.json({ count: null, demo: true });
  }

  try {
    // Fetch minimal payload; paginate up to ~500 for launch phase.
    // For scale, replace with a rollup in "Daily Metrics" table.
    let count = 0;
    let offset: string | undefined = undefined;
    for (let i = 0; i < 5; i++) {
      const url = new URL(
        `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`
      );
      url.searchParams.set("pageSize", "100");
      url.searchParams.set("fields[]", "Name");
      if (offset) url.searchParams.set("offset", offset);
      const resp = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 60 },
      });
      if (!resp.ok) throw new Error(`Airtable ${resp.status}`);
      const data = await resp.json();
      count += (data?.records || []).length;
      offset = data?.offset;
      if (!offset) break;
    }
    return NextResponse.json(
      { count },
      { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=30" } }
    );
  } catch (err) {
    console.error("[Vastraa Royale] interest-count error:", err);
    return NextResponse.json({ count: null });
  }
}
