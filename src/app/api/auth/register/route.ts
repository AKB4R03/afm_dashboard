import { z } from "zod";
import { NextResponse } from "next/server";
import { hashPw } from "@/lib";
import { insertUser, getUserByName } from "@/model/users";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const registerSchema = z.object({
      email: z.string().email("Invalid email format"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      name: z.string().nonempty("Name is required"),
      role: z.enum(["parent", "admin", "pamong", "humas"]),
    });

    const parsedData = registerSchema.safeParse(data);

    if (!parsedData.success) {
      const issue = parsedData.error.issues[0];
      const errorFinal = `${issue.path[0]} - ${issue.message}`;
      return NextResponse.json({
        statusCode: 400,
        message: errorFinal,
      });
    }

    const { email, password, name, role } = parsedData.data;

    const existingUser = await getUserByName(name);
    if (existingUser) {
      return NextResponse.json({
        statusCode: 409,
        message: "Email is already registered",
      });
    }

    const hashedPassword = hashPw(password); // pastikan hashPw kamu async

    await insertUser({
      email,
      password: hashedPassword,
      name,
      role,
    });

    return NextResponse.json({
      statusCode: 201,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error, "==== register err");
    return NextResponse.json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
}
