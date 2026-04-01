import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    api: "Plant Disease Detection API",
    version: "1.0.0",
    features: ["Image analysis", "Disease detection", "Treatment recommendations"],
    timestamp: new Date().toISOString(),
  });
}
