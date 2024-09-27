import { NextResponse } from "next/server";
import prisma from "../../../../../utils/connect";

export const PUT = async (req, { params }) => {
  const { email } = params;
  const { amount, balance } = await req.json();

  const newBalance = balance - parseInt(amount);

  await prisma.user.update({
    where: { email },
    data: { balance: newBalance },
  });

  return new NextResponse(
    JSON.stringify({ message: "updated successfully" }, { status: 201 })
  );
};
