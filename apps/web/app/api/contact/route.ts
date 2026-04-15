import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_MAP = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3;

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const now = Date.now();
  const existing = RATE_LIMIT_MAP.get(ip);

  if (existing && now - existing.timestamp < RATE_LIMIT_WINDOW) {
    if (existing.count >= RATE_LIMIT_MAX) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    existing.count += 1;
  } else {
    RATE_LIMIT_MAP.set(ip, { count: 1, timestamp: now });
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Support both legacy field names (organization/role/enquiryType) and
  // current form field names (company/jobTitle/certificationType)
  const firstName = body.firstName;
  const lastName = body.lastName;
  const email = body.email;
  const organization = body.organization || body.company;
  const role = body.role || body.jobTitle;
  const country = body.country;
  const enquiryType = body.enquiryType || body.certificationType;
  const message = body.message;

  if (!firstName || !lastName || !email || !organization || !role || !country || !enquiryType) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Forward to HQ if configured, otherwise log and return success
  const hqUrl = process.env.HQ_URL;
  if (hqUrl) {
    try {
      const hqRes = await fetch(`${hqUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, organization, role, country, enquiryType, message }),
      });
      if (!hqRes.ok) {
        console.error("HQ contact forward failed:", hqRes.status);
      }
    } catch (err) {
      console.error("HQ contact forward error:", err);
    }
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
