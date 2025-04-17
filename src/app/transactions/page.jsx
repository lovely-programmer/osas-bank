"use client";
import { useState } from "react";
import Sidebar from "../../components/dashboardComponents/Sidebar";
import "./transactions.css";
import { MdOutlineMenu } from "react-icons/md";
import { getUser, getUserTransaction } from "../../lib/requests";
import useSession from "../../lib/use-session";

export default function Transactions() {
  const [showSideBar, setShowSideBar] = useState(false);
  const { session } = useSession();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const { user } = getUser(session?.username);

  const { userTransaction, isLoading, mutate } = getUserTransaction(user?.id);

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
    {
      id: "4",
      transactionId: "kploiuy-yuio-4ffe-poji-20becc97bb95",
      date: "Dec 14, 2024 6:00 PM",
      amount: 200000,
      remark: "Supplies",
      transactionType: "debit",
    },
    {
      id: "5",
      transactionId: "a7cb328a-5f5a-4ffe-8d8a-20becc97bb95",
      date: "Dec 10, 2024 10:30 AM",
      amount: 2000,
      remark: "Groceries",
      transactionType: "debit",
    },
    {
      id: "6",
      transactionId: "b84998c7-e673-4a51-81ff-83b23e6a7a21",
      date: "Dec 6, 2024 5:33 PM",
      amount: 5600000,
      remark: "Antonio Gonzalo",
      transactionType: "credit",
    },
    {
      id: "7",
      transactionId: "aad3de43-c920-4abd-b3f0-9fe7e9fa3558",
      date: "Dec 3, 2024 2:00 PM",
      amount: 550000,
      remark: "Management",
      transactionType: "debit",
    },
    {
      id: "8",
      transactionId: "f9ff1027-b53d-41fc-bf69-13628eda5bf2",
      date: "Nov 29, 2024 11:00 AM",
      amount: 952000,
      remark: "LAMBERTH",
      transactionType: "credit",
    },
    {
      id: "9",
      transactionId: "da5e298a-0841-4570-b13a-bd657828af26",
      date: "Nov 20, 2024 5:45 PM",
      amount: 6700000,
      remark: "Antonio Gonzalo",
      transactionType: "credit",
    },
  ];

  return (
    <div className="dashboard__container">
      <div className="dashboard__content">
        <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <div className="dashboard__right">
          <nav className="dashboard__navbar">
            <h2>
              <span>FIRS</span>
              <span style={{ color: "#ffcd41" }}>TRUST</span>
              <span>FINANCE</span>
            </h2>
            <div
              className="menu__content menu"
              onClick={() => setShowSideBar(true)}
            >
              <MdOutlineMenu />
            </div>
          </nav>
          <div className="transactions">
            <h2>Transactions</h2>
            {isLoading && <p>Loading...</p>}
            {userTransaction?.map((transaction) => (
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

            {/* Default transactions */}
            {dataTransactions?.map((transaction) => (
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
