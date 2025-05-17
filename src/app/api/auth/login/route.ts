import { z } from "zod";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { comparePw, signToken } from "@/lib";
import { getUserByName } from "@/model/users";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Received login data:", data); // Add this debug log

    const loginSchema = z.object({
      name: z.string().nonempty("Name is required"), // name dari form UI
      password: z.string().nonempty("Password is required"),
      role: z.enum(["parent", "admin", "pamong", "humas"]),
    });

    const parsedData = loginSchema.safeParse(data);

    if (!parsedData.success) {
      const issue = parsedData.error.issues[0];
      const errorFinal = `${issue.path[0]} - ${issue.message}`;
      return NextResponse.json({
        statusCode: 400,
        message: errorFinal,
      });
    }

    const { name, password, role } = parsedData.data;

    const user = await getUserByName(name);

    console.log(password, "=========== ini ");

    if (!user || !comparePw(password, user.password)) {
      return NextResponse.json({
        statusCode: 401,
        message: "Invalid credentials iniiii",
      });
    }

    // Opsional: Validasi role juga kalau kamu simpan role di database
    if (user.role !== role) {
      return NextResponse.json({
        statusCode: 403,
        message: "Unauthorized role access",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = signToken(payload);

    const cookieStore = cookies();
    (await cookieStore).set("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    console.log("Token set in cookies:", token);

    return NextResponse.json({
      statusCode: 200,
      message: "Success login",
      token: token,
    });
  } catch (error) {
    console.log(error, "==== login err");
    return NextResponse.json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
}
