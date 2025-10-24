import { NextResponse } from "next/server";
import { storage } from "../../../server/storage";

export async function GET() {
  const content = await storage.getAboutContent();
  return NextResponse.json(content);
}
