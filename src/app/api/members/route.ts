import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const username = searchParams.get("username");

    const members = await prisma.member.findMany({
      where: username ? { userName: { contains: username } } : {},
    });
    return NextResponse.json(members, { status: 200 });

  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newMember = await prisma.member.create({ data });
    return NextResponse.json(newMember, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
