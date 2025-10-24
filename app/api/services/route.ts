import { NextRequest, NextResponse } from "next/server";
import { storage } from "../../../server/storage";
import { insertServiceSchema } from "@shared/schema";

export async function GET() {
  const services = await storage.getAllServices();
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = insertServiceSchema.parse(body);
    const created = await storage.createService(data);
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    if (e?.errors) {
      return NextResponse.json({ error: "Invalid service data", details: e.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
