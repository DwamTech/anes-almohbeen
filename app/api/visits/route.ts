import { NextResponse } from "next/server";
import { getVisitorCount, registerPageLoad } from "@/lib/visitorCounter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStoreHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
};

export async function GET() {
  return NextResponse.json(
    { count: getVisitorCount() },
    { headers: noStoreHeaders },
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { requestId?: unknown };
    const requestId =
      typeof body.requestId === "string" ? body.requestId.trim() : "";

    if (!requestId || requestId.length > 120) {
      return NextResponse.json(
        { error: "Invalid page-load identifier" },
        { status: 400, headers: noStoreHeaders },
      );
    }

    return NextResponse.json(
      { count: registerPageLoad(requestId) },
      { headers: noStoreHeaders },
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to update visitor count" },
      { status: 500, headers: noStoreHeaders },
    );
  }
}
