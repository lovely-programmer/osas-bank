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

export const PUT = async (req, { params }) => {
  const { email } = params;
  const { name, username, balance } = await req.json();

  try {
    await prisma.user.update({
      where: { email },
      data: { name, username, balance },
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

export const DELETE = async (req, { params }) => {
  const { email } = params;

  try {
    await prisma.user.delete({
      where: { email },
    });
    return new NextResponse(
      JSON.stringify({ message: "User deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
};
