import { NextResponse } from "next/server";
import prisma from "../../../../../../utils/connect";

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: id },
      orderBy: [{ date: "desc" }],
    });
    return new NextResponse(JSON.stringify(transactions), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error }), {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await prisma.transaction.delete({
      where: {
        id,
      },
    });
    return new NextResponse(
      JSON.stringify({ message: "Transaction deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error }), {
      status: 500,
    });
  }
};
