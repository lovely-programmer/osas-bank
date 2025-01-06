import { NextResponse } from "next/server";
import prisma from "../../../../utils/connect";

export const POST = async (req) => {
  const {
    userId,
    receiverName,
    receiverAccountNumber,
    senderAccountNumber,
    senderName,
    bankName,
    amount,
    remark,
    transactionType,
    transactionId,
    date,
  } = await req.json();

  switch (transactionType) {
    case "credit":
      const creditTransactions = await prisma.transaction.create({
        data: {
          userId,
          senderAccountNumber,
          senderName,
          bankName,
          amount,
          remark,
          transactionType,
          transactionId,
          date,
        },
      });

      return new NextResponse(JSON.stringify(creditTransactions), {
        status: 201,
      });

    case "debit":
      const debitTransactions = await prisma.transaction.create({
        data: {
          userId,
          receiverName,
          receiverAccountNumber,
          bankName,
          amount,
          remark,
          transactionType,
          transactionId,
          date,
        },
      });

      return new NextResponse(JSON.stringify(debitTransactions), {
        status: 201,
      });

    default:
      break;
  }
};
