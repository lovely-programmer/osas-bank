import { NextResponse } from "next/server";
import prisma from "../../../../utils/connect";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  const { username, password } = await req.json();
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword)
      return new NextResponse(
        JSON.stringify({ message: "Wrong password or email" }, { status: 400 })
      );

    return new NextResponse(JSON.stringify(user, { status: 200 }));
  } catch (error) {
    console.log(error);
  }
};
