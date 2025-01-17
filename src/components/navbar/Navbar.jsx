"use client";
import Link from "next/link";
import "./navbar.css";
import { MdOutlineMenu } from "react-icons/md";
import { redirect } from "next/navigation";
import useSession from "../../lib/use-session";
import Spinner from "../Spinner/Spinner";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { session, isLoading } = useSession();
  const [show, setShow] = useState(false);

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
              <Link style={{ textDecoration: "none" }} href="/">
                <span>FIRS</span>
                <span style={{ color: "#ffcd41" }}>TRUST</span>
                <span>FINANCE</span>
              </Link>
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
                <Link href="/register/identity/enrollment">
                  <button>Enroll</button>
                </Link>
              </div>
            </div>

            <div className="main__menu">
              {show ? (
                <div className="menu__container" onClick={() => setShow(false)}>
                  <div className="menu">
                    <FaTimes />
                  </div>
                  <span>CLOSE</span>
                </div>
              ) : (
                <div className="menu__container" onClick={() => setShow(true)}>
                  <div className="menu">
                    <MdOutlineMenu />
                  </div>
                  <span>MENU</span>
                </div>
              )}

              {show && (
                <div className="menu__content">
                  <ul>
                    <li className="">
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
                    <li>
                      <a href="">Customer service</a>
                    </li>
                    <li>
                      <a href="">About Us</a>
                    </li>
                  </ul>
                </div>
              )}
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
