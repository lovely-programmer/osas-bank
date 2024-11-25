import { NextResponse } from "next/server";
import prisma from "../../../../../utils/connect";

export const PUT = async (req, { params }) => {
  const { id } = params;

  const { name, username: user, balance } = await req.json();

  try {
    await prisma.user.update({
      where: { id },
      data: { name, username: user, balance },
    });

    return new NextResponse(
      JSON.stringify({ message: "updated successfully" }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error }), {
      status: 500,
    });
  }
};
