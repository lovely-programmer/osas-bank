"use client";
import { useState } from "react";
import Sidebar from "../../components/dashboardComponents/Sidebar";
import { MdOutlineMenu } from "react-icons/md";

export default function Contact() {
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
          <h2 className="main__header">Contact Us Today</h2>
          <div>
            <p style={{ paddingBottom: "10px" }}>
              Wells Fargo Bank, RSA Lynchwood Park Peterborough PE2 6GG.
            </p>
            <p style={{ paddingBottom: "20px" }}>
              Email: customer_care@wellsfargo.com
            </p>
          </div>
          <form className="dashboard__form__group">
            <div className="form__group">
              <input type="text" required id="name" />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form__group">
              <input type="text" required id="email" />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form__group">
              <input type="text" required id="subject" />
              <label htmlFor="subject">Subject</label>
            </div>
            <div className="form__group text__group">
              <textarea name="" id=""></textarea>
            </div>

            <div className="register__btn">
              <button>Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
