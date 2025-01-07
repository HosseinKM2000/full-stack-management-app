import { RegisterType } from "<store>/utils/types/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data: RegisterType = await request.json();
    console.log(data);
    const user = await prisma.member.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!user)
      return NextResponse.json("member does not found !", { status: 400 });

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid)
      return NextResponse.json("password does not valid !", { status: 400 });

    const tokenData = {
      id: user.id,
    };
    const token = await jwt.sign(tokenData, `${process.env.SESSION_SECRET}`, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "sign in was successfully :)", status: 201 },
      {
        status: 201,
      }
    );

    response.cookies.set("auth_token", token, {
      httpOnly: true, // Prevent access from JavaScript (for security)
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Prevent cross-site request forgery
      maxAge: 24 * 60 * 60, // 1 day in seconds
      path: "/", // Cookie available across the entire site
    });

    return response;
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
