import "./global.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Wells Fergo",
  description: "Bank App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        {/* <script defer="../../script/script.js"></script> */}
      </head>

      <body>
        <div>{children}</div>
        <ToastContainer />
      </body>
    </html>
  );
}
