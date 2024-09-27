"use client";
import { useState } from "react";
import "./deposit.css";
import Sidebar from "../../components/dashboardComponents/Sidebar";
import { MdOutlineMenu } from "react-icons/md";

export default function Deposit() {
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

          <div className="deposit">
            <h3>Deposit</h3>
            <p>
              Use the details below to send money to your Wells Fargo account
              from any bank or through internet banking
            </p>

            <div className="deposit__container">
              <div className="deposit_box">
                <span>Bank</span>
                <div className="deposit_column">Wells Fargo Bank</div>
              </div>
              <div className="deposit_box">
                <span>Account Number</span>
                <div className="deposit_column">5290394039</div>
              </div>
              <div className="deposit_box">
                <span>Account Name</span>
                <div className="deposit_column">Christian Rose</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
