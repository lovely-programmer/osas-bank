"use client";
import { usePathname } from "next/navigation";
import { AiFillMessage } from "react-icons/ai";
import { FaTachometerAlt, FaHourglass } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";
import { MdSettings } from "react-icons/md";
import "../../app/dashboard/dashboard.css";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import LogOutForm from "../logOutForm/LogOutForm";
import { logout } from "../../app/actions/authActions";

export default function AdminSidebar({ showSideBar, setShowSideBar }) {
  const pathname = usePathname();

  return (
    <div
      className={`dashboard__left__content ${
        showSideBar && "view__dashboard_sidebar"
      }`}
    >
      <div className="dashboard__logo">
        <h2>
          <Link href="/admin/dashboard">WELLS FARGO</Link>
        </h2>

        <div onClick={() => setShowSideBar(false)} className="close__menu">
          <FaLongArrowAltLeft />
        </div>
      </div>

      <div className="dashboard__items">
        <ul>
          <li className={`${pathname === "/admin/dashboard" ? "active" : ""}`}>
            <FaTachometerAlt />
            <Link href="/admin/dashboard">Dashboard</Link>
          </li>
          <li className={`${pathname === "admin/new/user" ? "active" : ""}`}>
            <FaHourglass />
            <Link href="/admin/new/user">Create User</Link>
          </li>
          <li
            className={`${pathname === "/admin/generate/code" ? "active" : ""}`}
          >
            <MdSettings />
            <Link href="/admin/generate/code">Generate Code</Link>
          </li>
          {/* <li className={`${pathname === "/deposit" ? "active" : ""}`}>
            <GiPayMoney />
            <Link href="/deposit">Manage User</Link>
          </li> */}
          {/* <li className={`${pathname === "/transfer" ? "active" : ""}`}>
            <img src="/transfer.svg" alt="" />
            <Link href="/transfer">Transfer</Link>
          </li> */}
          {/* <li className={`${pathname === "/contact" ? "active" : ""}`}>
            <AiFillMessage />
            <Link href="/contact">Contact</Link>
          </li> */}
        </ul>

        <div onClick={logout} className="dashboard__logout">
          <IoLogOut />
          <p>Log out</p>
        </div>
      </div>
    </div>
  );
}
