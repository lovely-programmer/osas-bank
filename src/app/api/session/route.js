import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions } from "../../../lib/lib";
import { cookies } from "next/headers";

// export async function POST(req) {
//   const session = await getIronSession<SessionData>(cookies(), sessionOptions);

//   const formData = await req.formData();

//   session.isLoggedIn = true;
//   session.username = (formData.get("username") as string) ?? "No username";
//   await session.save();

//   // simulate looking up the user in db
//   await sleep(250);

//   // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303
//   // not using redirect() yet: https://github.com/vercel/next.js/issues/51592#issuecomment-1810212676
//   return Response.redirect(
//     `${request.nextUrl.origin}/app-router-client-component-redirect-route-handler-fetch`,
//     303,
//   );
// }

export const GET = async (req) => {
  const session = await getIronSession(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return new NextResponse(JSON.stringify(session));
};
