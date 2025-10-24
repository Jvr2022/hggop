import { NextRequest, NextResponse } from "next/server";
import { storage } from "../../../server/storage";
import { insertCouncilMemberSchema } from "@shared/schema";

export async function GET() {
  const members = await storage.getAllCouncilMembers();
  return NextResponse.json(members);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = insertCouncilMemberSchema.parse(body);
    const created = await storage.createCouncilMember(data);
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    if (e?.errors) {
      return NextResponse.json({ error: "Invalid council member data", details: e.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create council member" }, { status: 500 });
  }
}
