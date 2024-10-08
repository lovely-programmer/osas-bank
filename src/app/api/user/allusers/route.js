import prisma from "../../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const user = await prisma.user.findMany({
      orderBy: [{ email: "desc" }],
    });
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
