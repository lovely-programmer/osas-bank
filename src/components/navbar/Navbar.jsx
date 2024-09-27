"use client";
import Link from "next/link";
import "./navbar.css";
import { MdOutlineMenu } from "react-icons/md";
import { redirect } from "next/navigation";
import useSession from "../../lib/use-session";
import Spinner from "../Spinner/Spinner";

export default function Navbar() {
  const { session, isLoading } = useSession();

  if (session?.isLoggedIn) {
    redirect("/dashboard");
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="navbar">
        <div className="navbar__container container">
          <div className="navbar__container-second__section">
            <h1>
              <Link href="/">WELLS FARGO</Link>
            </h1>

            <div className="navbar__container-third__section">
              <span className="link">
                <Link href="">ATMs/Locations</Link>
              </span>
              <span className="link">
                <Link href="">Help</Link>
              </span>
              <span className="link">
                <Link href="">About Us</Link>
              </span>
              <div className="button_design signin_btn">
                <Link href="/auth/login">
                  <button>Sign On</button>
                </Link>
              </div>
            </div>

            <div className="main__menu">
              <div className="menu">
                <MdOutlineMenu />
              </div>
              <span>MENU</span>
            </div>
          </div>
        </div>
      </div>

      <div className="navbar__second">
        <div className="navbar__second-container">
          <div className="navbar__container-first__section">
            <ul>
              <li className="active">
                <a href="">Personal</a>
              </li>
              <li>
                <a href="">Investing & Wealth Management</a>
              </li>
              <li>
                <a href="">Small Business</a>
              </li>
              <li>
                <a href="">Commercial Banking</a>
              </li>
              <li>
                <a href="">Corporate & Investment Banking</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="navbar__second-section">
        <div className="navbar__second-container">
          <div className="navbar__container-first__section">
            <ul>
              <li>
                <a href="">Checking</a>
              </li>
              <li>
                <a href="">Savings & CDs</a>
              </li>
              <li>
                <a href="">Credit Cards</a>
              </li>
              <li>
                <a href="">Auto Loans</a>
              </li>
              <li>
                <a href="">Premier</a>
              </li>
              <li>
                <a href="">Education & Tools</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
