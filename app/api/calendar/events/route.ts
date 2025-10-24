import { NextRequest, NextResponse } from "next/server";
import { listUpcomingEvents, createCalendarEvent } from "../../../../server/google-calendar";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const maxParam = searchParams.get("maxResults");
  const maxResults = maxParam ? parseInt(maxParam, 10) : 10;
  const events = await listUpcomingEvents(Number.isFinite(maxResults) ? maxResults : 10);
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  try {
    const { summary, description, location, start, end, timeZone } = await req.json();
    if (!summary || !start || !end) {
      return NextResponse.json({ error: "Missing required fields: summary, start, end" }, { status: 400 });
    }
    const created = await createCalendarEvent({ summary, description, location, start, end, timeZone });
    if (!created) return NextResponse.json({ error: "Failed to create calendar event" }, { status: 500 });
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create calendar event" }, { status: 500 });
  }
}
