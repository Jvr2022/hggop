import { NextRequest, NextResponse } from "next/server";
import { storage } from "../../../../server/storage";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : 3;
  const news = await storage.getLatestNews(Number.isFinite(limit) ? limit : 3);
  return NextResponse.json(news);
}
