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

  return (
    <div className="dashboard__container">
      <div className="dashboard__content">
        <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <div className="dashboard__right">
          <nav className="dashboard__navbar">
            <h2>WELLS FARGO</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
}
