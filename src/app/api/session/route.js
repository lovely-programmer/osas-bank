import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions, sleep } from "../../../lib/lib";
import { cookies } from "next/headers";

export const POST = async (req) => {
  const username = await req.json();
  const session = await getIronSession(cookies(), sessionOptions);

  session.isLoggedIn = true;
  session.username = username;
  await session.save();

  return new NextResponse(JSON.stringify(session), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
};

export const GET = async (req) => {
  const session = await getIronSession(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return new NextResponse(JSON.stringify(session), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
};
