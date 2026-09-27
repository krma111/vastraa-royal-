import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limit: 5 requests / 60s per IP.
// Note: resets on redeploy — sufficient for enquiry-only launch.
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 5;
}

function isPlaceholder(v: string | undefined): boolean {
  if (!v) return true;
  return v.includes("XXXX") || v.includes("YOUR_");
}

function cleanWhatsapp(input: string): string {
  return input.trim();
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const { name, whatsapp, city, occasion, budget, consent, website } = body as {
      name?: string;
      whatsapp?: string;
      city?: string;
      occasion?: string;
      budget?: string;
      consent?: boolean;
      website?: string;
    };

    // Honeypot: silently accept but don't store (bot trap)
    if (website && String(website).length > 0) {
      return NextResponse.json({ ok: true });
    }

    // Validation (mirror client)
    if (!name || String(name).trim().length < 2 || String(name).trim().length > 80) {
      return NextResponse.json({ error: "Invalid name." }, { status: 400 });
    }
    const digits = String(whatsapp || "")
      .replace(/\D/g, "")
      .replace(/^91(?=\d{10}$)/, "");
    if (!/^\d{10}$/.test(digits)) {
      return NextResponse.json({ error: "Invalid WhatsApp number." }, { status: 400 });
    }
    if (city && String(city).length > 60) {
      return NextResponse.json({ error: "City too long." }, { status: 400 });
    }
    if (consent !== true) {
      return NextResponse.json({ error: "Consent is required." }, { status: 400 });
    }
    const allowedOccasions = ["", "Wedding", "Festive", "Gifting", "Daily Elegance", "Other"];
    if (occasion && !allowedOccasions.includes(String(occasion))) {
      return NextResponse.json({ error: "Invalid occasion." }, { status: 400 });
    }

    const token = process.env.AIRTABLE_TOKEN;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const table = process.env.AIRTABLE_TABLE_NAME || "Leads";

    // Demo mode: placeholders not yet replaced — log and succeed
    // so the founder can test UI before creating Airtable.
    if (isPlaceholder(token) || isPlaceholder(baseId)) {
      console.log("[Vastraa Royale] DEMO lead (Airtable not configured):", {
        name,
        whatsapp: cleanWhatsapp(String(whatsapp)),
        city,
        occasion,
        budget,
        ip,
      });
      return NextResponse.json({ ok: true, demo: true });
    }

    const resp = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: String(name).trim(),
            WhatsApp: cleanWhatsapp(String(whatsapp)),
            City: city ? String(city).trim() : "",
            Occasion: occasion || "",
            Budget: budget || "",
            Consent: true,
            Source: "Website",
            CreatedAt: new Date().toISOString(),
          },
        }),
      }
    );

    if (!resp.ok) {
      const text = await resp.text();
      console.error("[Vastraa Royale] Airtable error:", resp.status, text);
      return NextResponse.json(
        { error: "Could not save enquiry. Please try again or WhatsApp us directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Vastraa Royale] /api/lead exception:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
