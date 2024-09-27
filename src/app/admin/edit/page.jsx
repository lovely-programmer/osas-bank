"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/dashboardComponents/AdminSidebar";
import { MdOutlineMenu } from "react-icons/md";
import "../admin.css";
import { getUser } from "../../../lib/requests";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import Spinner from "../../../components/Spinner/Spinner";

export default function EditUser() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { mutate } = useSWRConfig();

  const { user, isLoading } = getUser(email);
  const [showSideBar, setShowSideBar] = useState(false);

  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [balance, setBalance] = useState();

  useEffect(() => {
    setName(user?.name);
    setUsername(user?.username);
    setBalance(user?.balance);
  }, [email, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, username, balance: parseInt(balance) };

    const res = await fetch(`/api/user/${email}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      toast.success("Account updated successfully");
      mutate("/api/user/allusers");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="dashboard__container">
      <div className="dashboard__content">
        <AdminSidebar
          showSideBar={showSideBar}
          setShowSideBar={setShowSideBar}
        />
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
            Edit User
          </h2>

          <div style={{ paddingLeft: "20px" }}>
            <form onSubmit={handleSubmit} className="dashboard__form__group">
              <div className="form__group">
                <input
                  type="text"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form__group">
                <input
                  type="text"
                  value={username}
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form__group">
                <input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  id="accountBalance"
                />
                <label htmlFor="accountBalance">Account Balance</label>
              </div>
              <div className="register__btn">
                <button>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
