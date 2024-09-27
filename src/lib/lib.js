export const sessionOptions = {
  password: process.env.SECRET_KEY,
  cookieName: "wema-session",
  cookieOption: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

export const defaultSession = {
  username: "",
  isLoggedIn: false,
};

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
