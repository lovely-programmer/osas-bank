import { NextResponse } from "next/server";
import prisma from "../../../../utils/connect";

export const POST = async (req) => {
  const {
    sendBy,
    amount,
    remark,
    accountName,
    accountNumber,
    transactionId,
    date,
  } = await req.json();

  const transaction = await prisma.create.transaction({
    data: {
      amount,
      remark,
      accountName,
      accountNumber,
      transactionId,
      userEmail: sendBy,
    },
  });

  return new NextResponse(JSON.stringify(transaction, { status: 201 }));
};
