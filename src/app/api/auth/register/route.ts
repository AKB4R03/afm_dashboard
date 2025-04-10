import { NextRequest, NextResponse } from "next/server";
import { query } from "@/db/db";
import { hashPw } from "@/lib";

export async function POST(req: NextRequest) {
  try {
    const { username, password, role } = await req.json();

    if (!username || !password || !role) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Optional: check if user already exists
    const existing = await query('SELECT * FROM "Users" WHERE username = $1', [
      username,
    ]);

    if (existing.rowCount ?? 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    let newPw = hashPw(password);

    const result = await query(
      'INSERT INTO "Users" (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role',
      [username, newPw, role]
    );

    return NextResponse.json({ success: true, user: result.rows[0] });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
