import { query } from "@/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await query("SELECT NOW()");
    return NextResponse.json({ success: true, time: result.rows[0].now });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
