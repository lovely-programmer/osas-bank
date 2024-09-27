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

export default function Transfer() {
  const [showSideBar, setShowSideBar] = useState(false);
  const router = useRouter();

  const { session } = useSession();

  const { user, isLoading } = getUser(session?.email);

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

  const userEmail = session?.email;

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        await fetch(`/api/user/transaction/${userEmail}`, {
          method: "PUT",
          body: JSON.stringify({
            amount: transferData?.amount,
            balance: user?.balance,
          }),
        });

        const res = await fetch("/api/user/transaction", {
          method: "POST",
          body: JSON.stringify({
            sendBy: userEmail,
            amount,
            accountName,
            accountNumber,
            date: Date.now(),
            remark,
            transactionId: uuidv4(),
          }),
        });
        if (res.ok) {
          toast.success("You have Successfully Deposited");
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
            <h2>WELLS FARGO</h2>
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
            Transfer
          </h2>
          <form
            onSubmit={handleSubmit}
            style={{ paddingLeft: "20px" }}
            className="dashboard__form__group"
          >
            <div className="form__group">
              <input
                value={accountNumber}
                type="text"
                required
                maxLength="10"
                id="account_number"
                onChange={handleChange}
              />
              <label htmlFor="account_number">Account Number</label>
            </div>
            <div className="form__group">
              <input
                onChange={(e) => setAccountName(e.target.value)}
                value={accountName}
                type="text"
                required
                id="account_name"
              />
              <label htmlFor="account_name">Account Name</label>
            </div>
            <div className="form__group">
              <input
                onChange={(e) => setBankName(e.target.value)}
                type="text"
                required
                value={bankName}
                id="bank_name"
              />
              <label htmlFor="bank_name">Bank Name</label>
            </div>
            <div className="form__group">
              <input
                onChange={(e) => setRouterTransit(e.target.value)}
                value={routingTransit}
                type="text"
                required
                id="routing"
              />
              <label htmlFor="routing">Routing Transit Number(RTN)/IBAN</label>
            </div>
            <div className="form__group">
              <input
                onChange={(e) => setIfsc(e.target.value)}
                value={ifsc}
                type="text"
                required
                id="swift_code"
              />
              <label htmlFor="swift_code">IFSC/SWIFT CODE</label>
            </div>
            <div className="form__group">
              <input
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                type="text"
                required
                id="amount"
              />
              <label htmlFor="amount">Amount</label>
            </div>
            <div className="form__group">
              <input
                onChange={(e) => setRemark(e.target.value)}
                value={remark}
                type="text"
                required
                id="remark"
              />
              <label htmlFor="remark">Remarks</label>
            </div>
            <div className="form__group">
              <select
                onChange={(e) => setAccountType(e.target.value)}
                name="account_type"
                id=""
                value={accountType}
              >
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
