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
      <body>
        <div>{children}</div>
        <ToastContainer />
      </body>
    </html>
  );
}
