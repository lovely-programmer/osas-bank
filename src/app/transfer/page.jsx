"use client";
import { useState } from "react";
import Sidebar from "../../components/dashboardComponents/Sidebar";
import { MdOutlineMenu } from "react-icons/md";
import useSession from "../../lib/use-session";
import { getUser } from "../../lib/requests";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../../components/Spinner/Spinner";
import { zodTransferConfig } from "../../hooks/zod";
import Link from "next/link";
import { getFormatedDateTime } from "../admin/transaction/page";

export default function Transfer() {
  const [showSideBar, setShowSideBar] = useState(false);
  const router = useRouter();

  const { register, errors, handleSubmit, setValue } = zodTransferConfig();

  const { session } = useSession();

  const { user, isLoading } = getUser(session?.username);

  const getFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem("transferData")
        ? JSON.parse(localStorage.getItem("transferData"))
        : {};

      return value;
    }
  };

  const transferData = getFromLocalStorage();

  const [amount, setAmount] = useState(transferData?.amount);

  const [remark, setRemark] = useState(transferData?.remark);
  const [accountNumber, setAccountNumber] = useState(
    transferData?.accountNumber
  );
  const [accountName, setAccountName] = useState(transferData?.accountName);
  const [bankName, setBankName] = useState(transferData?.bankName);
  const [routingTransit, setRouterTransit] = useState(
    transferData?.routingTransit
  );
  const [ifsc, setIfsc] = useState(transferData?.ifsc);
  const [accountType, setAccountType] = useState(transferData?.accountType);

  const transferDetails = {
    amount,
    remark,
    accountName,
    accountNumber,
    bankName,
    routingTransit,
    ifsc,
    accountType,
  };

  const handleChange = (e) => {
    const text = e.target.value;
    // Allow only numbers
    const numericValue = text.replace(/[^0-9]/g, "");
    setAccountNumber(numericValue);
    setValue("accountNumber", text);
  };

  const handleRoutingChange = (e) => {
    const text = e.target.value;
    // Allow only numbers
    const numericValue = text.replace(/[^0-9]/g, "");
    setRouterTransit(numericValue);
    setValue("routingNumber", text);
  };

  const handleAmountChange = (e) => {
    const text = e.target.value;
    // Allow only numbers
    const numericValue = text.replace(/[^0-9]/g, "");
    setAmount(parseInt(numericValue));
    setValue("amount", parseInt(numericValue));
  };

  const submit = async () => {
    localStorage.setItem("transferData", JSON.stringify(transferDetails));

    if (user?.tcc_code_need === true) {
      router.push("/request/tcc");
    } else if (user?.imf_code_need === true) {
      router.push("/request/imf");
    } else if (user?.tax_code_need === true) {
      router.push("/request/tax");
    } else {
      if (user?.balance - transferData?.amount < 0) {
        toast.error("Transaction Failed not enough funds");
      } else {
        // dispatch(updateBalance(userData));
        await fetch(`/api/user/transactions/${user?.username}`, {
          method: "PUT",
          body: JSON.stringify({
            amount: transferData?.amount,
            balance: user?.balance,
          }),
        });

        const now = new Date();
        const date = getFormatedDateTime(now);

        const res = await fetch("/api/user/transactions", {
          method: "POST",
          body: JSON.stringify({
            userId: user?._id,
            receiverName: accountName,
            receiverAccountNumber: accountNumber,
            bankName,
            amount,
            date,
            remark,
            transactionType: "debit",
            transactionId: uuidv4(),
          }),
        });
        if (res.ok) {
          toast.success("Transaction Successful");
        }
        setTimeout(() => {
          router.push("/transactions");
        }, 1000);
        localStorage.removeItem("transferData");
      }
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
            <Link href="/dashboard">
              <h2>
                <span>FIRS</span>
                <span style={{ color: "#ffcd41" }}>TRUST</span>
                <span>FINANCE</span>
              </h2>
            </Link>
            <div
              className="menu__content menu"
              onClick={() => setShowSideBar(true)}
            >
              <MdOutlineMenu />
            </div>
          </nav>
          <h2 className="main__header transfer__header">Transfer</h2>
          <form
            onSubmit={handleSubmit(submit)}
            className="dashboard__form__group transfer__form"
          >
            <div className="form__group">
              <input
                {...register("accountNumber")}
                value={accountNumber}
                type="text"
                required
                maxLength="10"
                id="account_number"
                onChange={handleChange}
              />
              <label htmlFor="account_number">Account Number</label>
            </div>
            {errors.accountNumber && (
              <div className="form_error">{errors.accountNumber.message}</div>
            )}

            <div className="form__group">
              <input
                {...register("accountName")}
                onChange={(e) => {
                  setAccountName(e.target.value);
                  setValue("accountName", e.target.value);
                }}
                value={accountName}
                type="text"
                required
                id="account_name"
              />
              <label htmlFor="account_name">Account Name</label>
            </div>
            {errors.accountName && (
              <div className="form_error">{errors.accountName.message}</div>
            )}

            <div className="form__group">
              <input
                {...register("bankName")}
                onChange={(e) => {
                  setBankName(e.target.value);
                  setValue("bankName", e.target.value);
                }}
                type="text"
                required
                value={bankName}
                id="bank_name"
              />
              <label htmlFor="bank_name">Bank Name</label>
            </div>
            {errors.bankName && (
              <div className="form_error">{errors.bankName.message}</div>
            )}

            <div className="form__group">
              <input
                {...register("routingNumber")}
                value={routingTransit}
                type="text"
                required
                maxLength="9"
                id="routing"
                onChange={handleRoutingChange}
              />
              <label htmlFor="routing">Routing Transit Number(RTN)/IBAN</label>
            </div>
            {errors.routingNumber && (
              <div className="form_error">{errors.routingNumber.message}</div>
            )}

            <div className="form__group">
              <input
                {...register("swift_code")}
                onChange={(e) => {
                  setIfsc(e.target.value);
                  setValue("swift_code", e.target.value);
                }}
                value={ifsc}
                type="text"
                required
                id="swift_code"
              />
              <label htmlFor="swift_code">IFSC/SWIFT CODE</label>
            </div>
            {errors.swift_code && (
              <div className="form_error">{errors.swift_code.message}</div>
            )}

            <div className="form__group">
              <input
                {...register("amount")}
                onChange={handleAmountChange}
                value={amount}
                type="text"
                required
                id="amount"
              />
              <label htmlFor="amount">Amount</label>
            </div>
            {errors.amount && (
              <div className="form_error">{errors.amount.message}</div>
            )}

            <div className="form__group">
              <input
                {...register("remark")}
                onChange={(e) => {
                  setRemark(e.target.value);
                  setValue("remark", e.target.value);
                }}
                value={remark}
                type="text"
                required
                id="remark"
              />
              <label htmlFor="remark">Remarks</label>
            </div>
            {errors.remark && (
              <div className="form_error">{errors.remark.message}</div>
            )}

            <div className="form__group">
              <select
                onChange={(e) => setAccountType(e.target.value)}
                name="account_type"
                id=""
                value={accountType}
                required
              >
                <option value="">Account type</option>
                <option value="Savings">Savings</option>
                <option value="Checking">Checking</option>
              </select>
            </div>
            <div className="register__btn">
              <button>Verify and Transfer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
