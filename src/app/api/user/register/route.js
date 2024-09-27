import { NextResponse } from "next/server";
import prisma from "../../../../utils/connect";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  const {
    username,
    name,
    email,
    password,
    address,
    phoneNumber,
    account_type,
    country,
    state,
    city,
    zip_code,
    occupation,
    social_security,
    date_of_birth,
    balance,
    account_number,
    routing_number,
  } = await req.json();

  // @Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExists) {
    return new NextResponse(
      JSON.stringify({ message: "User already exist" }, { status: 500 })
    );
  }

  await prisma.user.create({
    data: {
      username,
      name,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      account_type,
      account_number,
      routing_number,
      country,
      state,
      city,
      zip_code,
      occupation,
      balance: parseInt(balance),
      social_security,
      date_of_birth,
    },
  });

  return new NextResponse(
    JSON.stringify({ message: "account created" }, { status: 201 })
  );
};

export const config = {
  api: {
    // disable nextjs's body parser while deployed
    // (as body parsing is handled by `https.onRequest()`),
    // but enable it for local development using `next dev`
    bodyParser: process.env.NODE_ENV !== "production",
  },
};
