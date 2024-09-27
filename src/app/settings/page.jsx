"use client";
import { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import Sidebar from "../../components/dashboardComponents/Sidebar";
import "./settings.css";
import useSession from "../../lib/use-session";
import Spinner from "../../components/Spinner/Spinner";

export default function Settings() {
  const { session, isLoading } = useSession();
  const [showSideBar, setShowSideBar] = useState(false);

  if (isLoading) return <Spinner />;
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

          <div className="settings">
            {/* <h2 className="main__header">Account Details</h2> */}

            <div className="account__content">
              <div className="account__profile__details">
                <IoPersonCircle />
                <h3>{session?.name}</h3>
                <p>{session?.username}</p>
                <p>{session?.account_number}</p>
              </div>
            </div>

            <form className="account__edit dashboard__form__group">
              <div className="left">
                <div className="item">
                  <span>Username</span>
                  <div className="form__group">
                    <input type="text" value={session?.username} readOnly />
                  </div>
                </div>
                <div className="item">
                  <span>Address</span>
                  <div className="form__group">
                    <input type="text" value={session?.address} readOnly />
                  </div>
                </div>
                <div className="item">
                  <span>Date of Birth</span>
                  <div className="form__group">
                    <input
                      type="date"
                      value={session?.date_of_birth}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="right">
                <div className="item">
                  <span>Account name</span>
                  <div className="form__group">
                    <input type="text" value={session?.name} readOnly />
                  </div>
                </div>
                <div className="item">
                  <span>Phone Number</span>
                  <div className="form__group">
                    <input type="text" value={session?.phoneNumber} readOnly />
                  </div>
                </div>
                <div className="item">
                  <span>Occupation</span>
                  <div className="form__group">
                    <input type="text" value={session?.occupation} readOnly />
                  </div>
                </div>
              </div>
            </form>
            {/* <div className="register__btn hide__btn">
              <button>Update</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
