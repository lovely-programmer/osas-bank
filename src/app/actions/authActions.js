"use server";

import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions } from "../../lib/lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

let username = "johnson";
let password = "12345";

export const getSession = async () => {
  const session = await getIronSession(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};

export const authorizeUser = async (userData) => {
  const session = await getSession();

  session.username = userData.username;
  session.name = userData.name;
  session.email = userData.email;
  session.address = userData.address;
  session.phoneNumber = userData.phoneNumber;
  session.account_type = userData.account_type;
  session.country = userData.country;
  session.state = userData.state;
  session.city = userData.city;
  session.zip_code = userData.zip_code;
  session.occupation = userData.occupation;
  session.social_security = userData.social_security;
  session.date_of_birth = userData.date_of_birth;
  session.account_number = userData.account_number;
  session.routing_number = userData.routing_number;
  session.isLoggedIn = true;

  await session.save();
  redirect("/dashboard");
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};

// export const sessionComponents = async () {
//   const session = await getSession();
//    if (session.isLoggedIn) {
//     redirect("/dashboard");
//   }
// }
