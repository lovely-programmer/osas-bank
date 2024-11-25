import { NextResponse } from "next/server";
import prisma from "../../../../utils/connect";

export const GET = async (req, { params }) => {
  const { username } = params;
  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};

export const DELETE = async (req, { params }) => {
  const { username } = params;

  try {
    await prisma.user.delete({
      where: { username },
    });
    return new NextResponse(
      JSON.stringify({ message: "User deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error }), {
      status: 500,
    });
  }
};
