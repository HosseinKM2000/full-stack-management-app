import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Get the cookie name you want to delete
    const token = req.cookies.get("auth_token");

    if (!token) {
      return NextResponse.json("No token found to delete!", { status: 404 });
    }

    // Create a response to delete the cookie
    const response = NextResponse.json("Token deleted successfully", {
      status: 200,
    });

    // Set the cookie expiration date to a past date to delete it
    response.cookies.set("auth_token", "", { expires: new Date(0), path: "/" });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: `Server error! ${error}` },
      { status: 500 }
    );
  }
}
