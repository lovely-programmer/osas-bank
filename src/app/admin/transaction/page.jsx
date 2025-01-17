"use client";
import React, { useState } from "react";
import AdminSidebar from "../../../components/dashboardComponents/AdminSidebar";
import { MdDeleteForever, MdOutlineMenu } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import "../admin.css";
import { getUserTransaction } from "../../../lib/requests";

export const getFormatedDateTime = (date) => {
  date = new Date(date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return formattedDateTime;
};

export default function Transaction() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const username = searchParams.get("username");
  const balance = searchParams.get("balance");

  const { userTransaction, isLoading, mutate } = getUserTransaction(userId);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDelete = async (id) => {
    await fetch(`/api/user/transactions/get/${id}`, {
      method: "DELETE",
    });
    mutate();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const date = getFormatedDateTime(formData.date);

    const creditDetails = {
      userId,
      transactionId: uuidv4(),
      transactionType: "credit",
      senderName: formData.senderName,
      senderAccountNumber: formData.senderAccountNumber,
      bankName: formData.bankName,
      amount: formData.amount,
      remark: formData.remark,
      date,
    };

    const debitDetails = {
      userId,
      transactionId: uuidv4(),
      transactionType: "debit",
      receiverName: formData.receiverName,
      receiverAccountNumber: formData.receiverAccountNumber,
      bankName: formData.bankName,
      amount: formData.amount,
      remark: formData.remark,
      date,
    };

    switch (transactionType) {
      case "credit":
        const res1 = await fetch("/api/user/transactions", {
          method: "POST",
          body: JSON.stringify(creditDetails),
        });
        if (res1.ok) {
          // update balance
          await fetch(`/api/user/transactions/credit/${userId}`, {
            method: "PUT",
            body: JSON.stringify({
              amount: formData.amount,
              balance,
            }),
          });

          e.target.reset();
          mutate();
          setLoading(false);
          toast.success("Transaction Successful");
        }
        break;

      case "debit":
        const res = await fetch("/api/user/transactions", {
          method: "POST",
          body: JSON.stringify(debitDetails),
        });

        if (res.ok) {
          // update balance
          await fetch(`/api/user/transactions/debit/${userId}`, {
            method: "PUT",
            body: JSON.stringify({
              amount: formData.amount,
              balance,
            }),
          });

          e.target.reset();
          mutate();
          setLoading(false);
          toast.success("Transaction Successful");
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard__container">
      <div className="dashboard__content">
        <AdminSidebar
          showSideBar={showSideBar}
          setShowSideBar={setShowSideBar}
        />
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

          <h2
            style={{
              paddingLeft: "20px",
              paddingTop: "10px",
              fontWeight: "500",
            }}
            className="main__header"
          >
            Transaction
          </h2>

          <div style={{ paddingLeft: "20px" }}>
            {/* Put Table here */}
            <table style={{ marginBottom: "10px" }}>
              <thead>
                <tr>
                  <td>Transaction</td>
                  <td>Amount</td>
                  <td>remark</td>
                  <td>bankName</td>
                  <td>Delete</td>
                </tr>
              </thead>
              <tbody>
                {userTransaction?.map((transaction) => (
                  <tr key={transaction.transactionId}>
                    <td>{transaction?.transactionType}</td>
                    <td>{transaction?.amount}</td>
                    <td>{transaction?.remark}</td>
                    <td>{transaction?.bankName}</td>
                    <td className="delete__user">
                      <MdDeleteForever
                        onClick={() => handleDelete(transaction?.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {isLoading && (
              <div style={{ marginBottom: "20px" }}>Loading...</div>
            )}

            <form onSubmit={handleSubmit} className="dashboard__form__group">
              <div className="form__group">
                <select onChange={(e) => setTransactionType(e.target.value)}>
                  <option value="">Select transaction type to continue</option>
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </select>
              </div>

              {transactionType === "credit" && (
                <>
                  <div className="form__group">
                    <input
                      type="text"
                      id="senderName"
                      name="senderName"
                      required
                      onChange={handleChange}
                    />
                    <label htmlFor="senderName">Sender Name</label>
                  </div>

                  <div className="form__group">
                    <input
                      type="text"
                      id="senderAccountNumber"
                      name="senderAccountNumber"
                      required
                      onChange={handleChange}
                    />
                    <label htmlFor="senderAccountNumber">
                      Sender Account Number
                    </label>
                  </div>

                  <div className="form__group">
                    <input
                      type="text"
                      id="bankName"
                      name="bankName"
                      required
                      onChange={handleChange}
                    />
                    <label htmlFor="bankName">Bank Name</label>
                  </div>

                  <div className="form__group">
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      required
                      onChange={handleChange}
                    />
                    <label htmlFor="sender Name">Amount</label>
                  </div>

                  <div className="form__group">
                    <input
                      type="text"
                      id="remark"
                      name="remark"
                      required
                      onChange={handleChange}
                    />
                    <label htmlFor="remark">Remark</label>
                  </div>

                  <div className="form__group">
                    <input
                      type="datetime-local"
                      name="date"
                      id="date"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {transactionType === "debit" && (
                <>
                  <div className="form__group">
                    <input
                      type="text"
                      id="receiverName"
                      name="receiverName"
                      required
                      onChange={handleChange}
                    />
                    <label htmlFor="receiverName">Receiver Name</label>
                  </div>

                  <div className="form__group">
                    <input
                      type="text"
                      id="receiverAccountNumber"
                      name="receiverAccountNumber"
                      required
                      onChange={handleChange}
                    />
                    <label htmlFor="receiverAccountNumber">
                      Receiver Account Number
                    </label>
                  </div>

                  <div className="form__group">
                    <input
                      type="text"
                      id="bankName"
                      name="bankName"
                      required
                      onChange={handleChange}
                    />
                    <label htmlFor="bankName">Bank Name</label>
                  </div>

                  <div className="form__group">
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      required
                      onChange={handleChange}
                    />
                    <label htmlFor="sender Name">Amount</label>
                  </div>

                  <div className="form__group">
                    <input
                      type="text"
                      id="remark"
                      name="remark"
                      required
                      onChange={handleChange}
                    />
                    <label htmlFor="remark">Remark</label>
                  </div>

                  <div className="form__group">
                    <input
                      type="datetime-local"
                      name="date"
                      id="date"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <div
                style={{ marginBottom: "20px" }}
                className="register__btn admin__btn"
              >
                <button disabled={loading}>
                  {loading ? <span className="side__loader"></span> : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
