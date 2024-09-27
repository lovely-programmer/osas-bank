"use client";
import { useState } from "react";
import Sidebar from "../../components/dashboardComponents/Sidebar";
import "./transactions.css";
import { MdOutlineMenu } from "react-icons/md";

export default function Transactions() {
  const [showSideBar, setShowSideBar] = useState(false);
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
                    <button>View Details</button>
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
                    <button>View Details</button>
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
                    <button>View Details</button>
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
