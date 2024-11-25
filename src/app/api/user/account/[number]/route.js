import prisma from "../../../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { number } = params;
  const n = parseInt(number);
  try {
    const user = await prisma.user.findFirst({
      where: {
        account_number: n,
      },
    });
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
