import { NextRequest, NextResponse } from "next/server";
import { query } from "@/db/db";
import { comparePw, signToken } from "@/lib";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    console.log(username, password, "----------- helll");

    if (!username || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const result = await query('SELECT * FROM "Users" WHERE username = $1', [
      username,
    ]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = result.rows[0];

    const isValid = await comparePw(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
