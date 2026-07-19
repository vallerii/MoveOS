import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function isValidPhone(phone: string) {
  const digits = phone.replace(/[^\d]/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const data = body as {
    name?: string;
    phone?: string;
    message?: string;
    consent?: boolean;
    source?: string;
  };
  const name = String(data?.name ?? "").trim().slice(0, 200);
  const phone = String(data?.phone ?? "").trim();
  const message = String(data?.message ?? "").trim().slice(0, 2000);
  const consent = Boolean(data?.consent);

  if (!isValidPhone(phone)) {
    return NextResponse.json({ ok: false, error: "Invalid phone number" }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ ok: false, error: "Consent is required" }, { status: 400 });
  }

  const lead = {
    name: name || undefined,
    phone,
    message: message || undefined,
    consent,
    source: data?.source ?? "unknown",
    page: req.headers.get("referer") ?? "unknown",
    userAgent: req.headers.get("user-agent") ?? "unknown",
    createdAt: new Date().toISOString(),
  };

  // Always log server-side, so leads are visible even without a webhook configured.
  console.log("[MoveOS lead]", lead);

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      // Don't fail the request just because the webhook is unreachable —
      // the lead is already logged above.
      console.error("[MoveOS lead] webhook delivery failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
