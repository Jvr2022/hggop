import { NextResponse } from "next/server";
import { storage } from "../../../../server/storage";

export async function GET() {
  const services = await storage.getUpcomingServices();
  return NextResponse.json(services);
}
