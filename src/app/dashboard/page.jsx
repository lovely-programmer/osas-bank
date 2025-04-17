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
import { getUser, getUserTransaction } from "../../lib/requests";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export default function Dashboard() {
  const [showSideBar, setShowSideBar] = useState(false);

  const { session } = useSession();

  const { user } = getUser(session?.username);

  const { userTransaction, isLoading, mutate } = getUserTransaction(user?.id);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const balance = numberWithCommas("" + user?.balance);

  const verifyBalance = balance === "undefined" ? 0 : balance;

  const copiedArray = userTransaction && [...userTransaction];

  const lengthToKeep = 3;

  for (let i = 0; i < copiedArray?.length - lengthToKeep; i++) {
    copiedArray?.pop();
  }

  const dataTransactions = [
    {
      id: "1",
      transactionId: "1e6d4232-84b8-492b-8417-c23844d9ba58",
      date: "Dec 20, 2024 3:00 AM",
      amount: 900000,
      remark: "JULIUS",
      transactionType: "credit",
    },
    {
      id: "2",
      transactionId: "a4ad3b1f-cdb5-4e4c-9dd4-dbf240cd91f7",
      date: "Dec 17, 2024 6:00 PM",
      amount: 200000,
      remark: "Supplies",
      transactionType: "debit",
    },
    {
      id: "3",
      transactionId: "25ba439e-782b-46a0-b055-28c8ff2ce119",
      date: "Dec 14, 2024 10:30 AM",
      amount: 20000,
      remark: "Management",
      transactionType: "debit",
    },
  ];

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
                  <span>$</span> <span>{verifyBalance} </span>
                </div>
              </div>
            </div>

            <div className="dashboard__profile">
              <Link href="/settings">
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
                <Link href="/transactions" onClick={() => mutate()}>
                  See all
                </Link>
              </div>
            </div>
            {isLoading && <p>Loading...</p>}
            {copiedArray?.map((transaction) => (
              <div key={transaction?.id} className="transactions__container">
                <div className="transaction__list">
                  <div className="left__part">
                    <p className="id">{transaction?.transactionId}</p>
                    <p className="date">{transaction?.date}</p>
                    <p className="reason">{transaction?.remark}</p>
                  </div>
                  <div className="center__part">
                    <p>Amount</p>
                    <p
                      style={
                        transaction?.transactionType === "credit"
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    >
                      {transaction?.transactionType === "credit" ? "+" : "-"}
                      {numberWithCommas("" + transaction?.amount)} USD
                    </p>
                    <p>Completed</p>
                  </div>
                  <div className="right__part">
                    <p>{transaction?.transactionType}</p>
                    <div className="button_design right__btn">
                      {/* <button>View Details</button> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Fallback for when copiedArray is empty */}
            {/* This will show the fallback data */}
            {copiedArray?.length < 3 &&
              dataTransactions?.map((transaction) => (
                <div key={transaction?.id} className="transactions__container">
                  <div className="transaction__list">
                    <div className="left__part">
                      <p className="id">{transaction?.transactionId}</p>
                      <p className="date">{transaction?.date}</p>
                      <p className="reason">{transaction?.remark}</p>
                    </div>
                    <div className="center__part">
                      <p>Amount</p>
                      <p
                        style={
                          transaction?.transactionType === "credit"
                            ? { color: "green" }
                            : { color: "red" }
                        }
                      >
                        {transaction?.transactionType === "credit" ? "+" : "-"}
                        {numberWithCommas("" + transaction?.amount)} USD
                      </p>
                      <p>Completed</p>
                    </div>
                    <div className="right__part">
                      <p>{transaction?.transactionType}</p>
                      <div className="button_design right__btn">
                        {/* <button>View Details</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
