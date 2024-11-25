import { NextResponse } from "next/server";
import prisma from "../../../../../utils/connect";

export const PUT = async (req, { params }) => {
  const { email } = params;

  try {
    await prisma.user.update({
      where: { email },
      data: { verified: true },
    });

    return new NextResponse(
      JSON.stringify({ messag: "updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
