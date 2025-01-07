import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"; // Import JwtPayload for type safety
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Safely extract the token from the cookie
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json("Authorization is required!", { status: 401 });
    }

    // Decode the token and assert the type to be JwtPayload
    const decodedToken = jwt.verify(
      token,
      `${process.env.SESSION_SECRET}`
    ) as JwtPayload;

    // Check if decodedToken has the necessary properties
    if (!decodedToken || !decodedToken.id) {
      return NextResponse.json("Authorization is required!", { status: 401 });
    }

    const user = await prisma.member.findFirst({
      where: {
        id: decodedToken.id,
      },
      select: {
        id: true,
        email: true,
        userName: true,
      },
    });

    if (!user) {
      return NextResponse.json("User not found!", { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Server error! ${error}` },
      { status: 500 }
    );
  }
}
