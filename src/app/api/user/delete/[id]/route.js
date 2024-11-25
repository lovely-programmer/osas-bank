import { NextResponse } from "next/server";
import prisma from "../../../../../utils/connect";

export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await prisma.user.delete({
      where: { id },
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
