import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

function getContentType(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".svg":
      return "image/svg+xml";
    case ".pdf":
      return "application/pdf";
    case ".txt":
      return "text/plain; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  try {
    const baseDir = path.join(process.cwd(), "attached_assets");
    const { path: pathSegments } = await ctx.params;
    const unsafePath = path.join(baseDir, ...pathSegments);
    const safePath = path.normalize(unsafePath);

    if (!safePath.startsWith(baseDir)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const data = await fs.readFile(safePath);
    const contentType = getContentType(safePath);

    // Convert Buffer to ArrayBuffer slice for Web Response API
    const ab = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
    return new NextResponse(ab as ArrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (e: any) {
    if (e?.code === "ENOENT") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to serve asset" }, { status: 500 });
  }
}
