"use client";
import { redirect, usePathname } from "next/navigation";
import { AiFillMessage } from "react-icons/ai";
import { FaTachometerAlt, FaHourglass } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";
import { MdSettings } from "react-icons/md";
import "../../app/dashboard/dashboard.css";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import LogOutForm from "../logOutForm/LogOutForm";
import useSession from "../../lib/use-session";

export default function Sidebar({ showSideBar, setShowSideBar }) {
  const pathname = usePathname();
  const { session } = useSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }

  return (
    <div
      className={`dashboard__left__content ${
        showSideBar && "view__dashboard_sidebar"
      }`}
    >
      <div className="dashboard__logo">
        <h2>
          <Link href="/dashboard">WELLS FARGO</Link>
        </h2>

        <div onClick={() => setShowSideBar(false)} className="close__menu">
          <FaLongArrowAltLeft />
        </div>
      </div>

      <div className="dashboard__items">
        <ul>
          <li className={`${pathname === "/dashboard" ? "active" : ""}`}>
            <FaTachometerAlt />
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className={`${pathname === "/transactions" ? "active" : ""}`}>
            <FaHourglass />
            <Link href="/transactions">Transactions</Link>
          </li>
          <li className={`${pathname === "/deposit" ? "active" : ""}`}>
            <GiPayMoney />
            <Link href="/deposit">Deposit</Link>
          </li>
          <li className={`${pathname === "/transfer" ? "active" : ""}`}>
            <img src="/transfer.svg" alt="" />
            <Link href="/transfer">Transfer</Link>
          </li>
          <li className={`${pathname === "/settings" ? "active" : ""}`}>
            <MdSettings />
            <Link href="/settings">Settings</Link>
          </li>
          <li className={`${pathname === "/contact" ? "active" : ""}`}>
            <AiFillMessage />
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        <LogOutForm />

        {/* <form className="dashboard__logout" action={logout}>
          <IoLogOut />
          <p>Log out</p>
        </form> */}
      </div>
    </div>
  );
}
