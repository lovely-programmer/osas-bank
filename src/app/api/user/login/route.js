import { NextResponse } from "next/server";
import prisma from "../../../../utils/connect";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  const { accountNumber, password } = await req.json();
  const number = parseInt(accountNumber);
  try {
    const user = await prisma.user.findFirst({
      where: {
        account_number: number,
      },
    });

    if (user) {
      const checkPassword = bcrypt.compareSync(password, user.password);

      if (!checkPassword) {
        return new NextResponse(
          JSON.stringify({ message: "Wrong password or email" }),
          {
            headers: {
              "Content-Type": "application/json",
            },
            status: 400,
          }
        );
      }

      return new NextResponse(JSON.stringify(user), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 201,
      });
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Incorrect account number or password" }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 400,
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};
