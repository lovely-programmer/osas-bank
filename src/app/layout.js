import "./global.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "FirstrustFinance",
  description:
    "FirstrustFinance is a diversified financial service holding company that offers retail and wholesale banking, and wealth management services to individuals, businesses, high-net-worth individuals, and institutions through its subsidiaries.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>

      <body>
        <div>{children}</div>
        <ToastContainer />
      </body>
    </html>
  );
}
