import { NextRequest, NextResponse } from "next/server";
import { storage } from "../../../server/storage";
import { insertNewsSchema } from "@shared/schema";

export async function GET() {
  const news = await storage.getAllNews();
  return NextResponse.json(news);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = insertNewsSchema.parse(body);
    const created = await storage.createNews(data);
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    if (e?.errors) {
      return NextResponse.json({ error: "Invalid news data", details: e.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 });
  }
}
