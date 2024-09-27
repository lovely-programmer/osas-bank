"use client";
import Link from "next/link";
import "./dashboard.css";
import { IoPersonCircle } from "react-icons/io5";
import { Chart as ChartJs, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import sourceData from "../../data/sourceData.json";
import { MdOutlineMenu } from "react-icons/md";
import { useState } from "react";
import Sidebar from "../../components/dashboardComponents/Sidebar";
import useSession from "../../lib/use-session";
// import { redirect } from "next/navigation";
import { getUser } from "../../lib/requests";
import Spinner from "../../components/Spinner/Spinner";
defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export default function Dashboard() {
  const [showSideBar, setShowSideBar] = useState(false);

  const { session, isLoading } = useSession();

  const { user, isLoading: fetchingUser } = getUser(session?.username);

  if (!session?.isLoggedIn) {
    redirect("/");
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const balance = numberWithCommas("" + user?.balance);

  if (isLoading || fetchingUser) {
    return <Spinner />;
  }

  return (
    <div className="dashboard__container">
      <div className="dashboard__content">
        <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <div className="dashboard__right">
          <div className="dashboard__right__content">
            <div className="balance__container">
              <span>Current balance</span>
              <div className="balance">
                <div className="balance__content">
                  <span>$</span> <span>{balance ? balance : 0} </span>
                </div>
              </div>
            </div>

            <div className="dashboard__profile">
              <Link href="/profile">
                <IoPersonCircle />
                {/* <span>Account</span> */}
              </Link>

              <div className="main__menu">
                <div onClick={() => setShowSideBar(true)} className="menu">
                  <MdOutlineMenu />
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard__right__main">
            <div className="dashboard__chart">
              <Line
                data={{
                  labels: sourceData.map((data) => data.label),
                  datasets: [
                    {
                      label: "Income",
                      data: sourceData.map((data) => data.income),
                      backgroundColor: "#BDD4F1",
                      borderColor: "#BDD4F1",
                    },
                    {
                      label: "Expenses",
                      data: sourceData.map((data) => data.expenses),
                      backgroundColor: "#FFB6AE",
                      borderColor: "#FFB6AE",
                    },
                  ],
                }}
                options={{
                  elements: {
                    line: {
                      tension: 0.5,
                    },
                  },
                  plugins: {
                    title: {
                      text: "Finances",
                    },
                  },
                }}
              />
            </div>
            <div className="dashboard__transaction">
              <div className="dashboard__transaction__header">
                <p>Recent Transaction</p>
                <Link href="/transactions">See all</Link>
              </div>
            </div>
            <div className="transactions__container">
              <div className="transaction__list">
                <div className="left__part">
                  <p className="id">WFA/MHUWWOOPHWU-2345</p>
                  <p className="date">2 Sep 2024 6:00 am</p>
                  <p className="reason">Groceries</p>
                </div>
                <div className="center__part">
                  <p>Amount</p>
                  <p>-2,000 USD</p>
                  <p>Completed</p>
                </div>
                <div className="right__part">
                  <p>Debit</p>
                  <div className="button_design right__btn">
                    {/* <button>View Details</button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="transactions__container">
              <div className="transaction__list">
                <div className="left__part">
                  <p className="id">WFA/MHUWWOOPHWU-2345</p>
                  <p className="date">2 Sep 2024 6:00 am</p>
                  <p className="reason">Groceries</p>
                </div>
                <div className="center__part">
                  <p>Amount</p>
                  <p>-2,000 USD</p>
                  <p>Completed</p>
                </div>
                <div className="right__part">
                  <p>Debit</p>
                  <div className="button_design right__btn">
                    {/* <button>View Details</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
