import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions, sleep } from "../../../lib/lib";
import { cookies } from "next/headers";

export const POST = async (req) => {
  const { username } = await req.json();
  const session = await getIronSession(cookies(), sessionOptions);

  const loginUrl = new URL("/dashboard", req.url);

  session.isLoggedIn = true;
  session.username = username;
  await session.save();

  // simulate looking up the user in db
  await sleep(250);

  return new NextResponse(JSON.stringify(session));
};

export const GET = async (req) => {
  const session = await getIronSession(cookies(), sessionOptions);

  await sleep(250);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return new NextResponse(JSON.stringify(session));
};
