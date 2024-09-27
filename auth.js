// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Credentials({
//       credentials: {
//         username: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         let user = null;

//         user = {
//           username: "James Brown",
//           password: "123456",
//         };

//         if (!user) {
//           console.log("invalid credentials");
//           return null;
//         }

//         return user;
//       },
//     }),
//   ],
//   callbacks: {
//     authorized({ request: { nextUrl }, auth }) {
//       // note the two exclamation marks in front of the auth is for it to return a boolean value cause that what we need
//       const isLoggedIn = !!auth?.user;
//       const { pathname } = nextUrl;
//       const role = auth?.user.role || "user";

//       if (pathname.startsWith("/auth/login") && isLoggedIn) {
//         console.log(auth?.user);
//         return Response.redirect(new URL("/dashboard", nextUrl));
//       }
//       // if (pathname.startsWith("/page2") && role !== "admin") {
//       //   return Response.redirect(new URL("/", nextUrl));
//       // }
//       return !!auth;
//     },
//   },
//   pages: {
//     signIn: "/auth/login",
//   },
// });
