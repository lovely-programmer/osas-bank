import Download_app from "../components/download_app/Download_app";
import Header from "../components/header/Header";
import Footer from "../components/home_footer/Footer";
import Home_section from "../components/home_section/Home_section";
import Home_support from "../components/home_support/Home_support";
import Serve_customer from "../components/serve_customer/Serve_customer";
import Navbar from "../components/navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <Home_section />
      <Home_support />
      <Download_app />
      <Serve_customer />
      <Footer />
    </div>
  );
}
