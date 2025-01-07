import { RegisterType } from "<store>/utils/types/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
   
    const data: RegisterType = await request.json();
    console.log(data)
    const user = await prisma.member.findFirst({
      where: {
        email: data.email,
      },
    });
    if (user)
      return NextResponse.json("member already exists !", { status: 400 });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const newMember = await prisma.member.create({
      data: {
        email: data.email,
        password: hashedPassword,
        userName: data.userName,
      },
    });
    console.log(newMember);
    return NextResponse.json("sign up was successfully :)", {
      status: 201,
    });

  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
