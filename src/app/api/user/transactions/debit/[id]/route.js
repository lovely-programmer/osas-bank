import { NextResponse } from "next/server";
import prisma from "../../../../../../utils/connect";

export const PUT = async (req, { params }) => {
  const { id } = params;
  const { amount, balance } = await req.json();

  const newBalance = parseInt(balance) - parseInt(amount);

  await prisma.user.update({
    where: { id },
    data: { balance: newBalance },
  });

  return new NextResponse(
    JSON.stringify({ message: "updated successfully" }, { status: 201 })
  );
};
