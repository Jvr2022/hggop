import { NextResponse } from "next/server";
import { storage } from "../../../server/storage";

export async function GET() {
  const info = await storage.getChurchInfo();
  return NextResponse.json(info);
}
