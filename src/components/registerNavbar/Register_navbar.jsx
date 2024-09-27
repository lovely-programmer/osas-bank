"use client";
import { redirect, usePathname } from "next/navigation";
import "../navbar/navbar.css";
import Link from "next/link";
import useSession from "../../lib/use-session";
import Spinner from "../Spinner/Spinner";

export default function RegisterNavbar() {
  const pathname = usePathname();
  const { session, isLoading } = useSession();

  if (session.isLoggedIn) {
    redirect("/dashboard");
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="navbar">
      <div className="navbar__container container">
        <div className="navbar__container-second__section">
          <h1 className="register__header">
            <Link href="/">WELLS FARGO</Link>
          </h1>

          {pathname == "/register/identity/enrollment" ? (
            <div className="navbar__container-third__section">
              <div className="button_design signin_btn">
                <Link href="/auth/login">
                  <button>Sign On</button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="navbar__container-third__section">
              <div className="button_design signin_btn">
                <Link href="/register/identity/enrollment">
                  <button>Enroll</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
