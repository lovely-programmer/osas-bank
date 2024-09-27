"use client";
import { useState } from "react";
import AdminSidebar from "../../../components/dashboardComponents/AdminSidebar";
import { getAllUsers } from "../../../lib/requests";
import { MdOutlineMenu } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Link from "next/link";
import "../admin.css";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";

export default function AdminDashboard() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [id, setId] = useState("");
  const [numberOfRestriction, setNumberOfRestriction] = useState("");

  const handleChange = (e) => {
    setNumberOfRestriction(e.target.value);
  };

  const { allUsers, mutate, isLoading } = getAllUsers();

  const getId = (id) => {
    setId(id);
  };

  const restrictUser = async (e) => {
    e.preventDefault();

    if (id == "") {
      toast.error("Please select the user");
      return;
    }

    await fetch(`/api/user/restrict/${id}`, {
      method: "PUT",
      body: JSON.stringify(numberOfRestriction),
    });

    setNumberOfRestriction("");
    mutate();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/user/${id}`, {
      method: "DELETE",
    });
    mutate();
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
            Transfer
          </h2>

          <div style={{ paddingLeft: "20px" }}>
            {/* Restrict user */}
            <form
              style={{ marginBottom: "20px" }}
              className="dashboard__form__group"
              onSubmit={restrictUser}
            >
              <div className="form__group">
                <select
                  value={numberOfRestriction}
                  onChange={handleChange}
                  name=""
                  id=""
                  required
                >
                  <option value="">Set Total Number of Request</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="register__btn">
                <button>RESTRICT SELECTED USER FUND TRANSFER</button>
              </div>
            </form>

            <table>
              <thead>
                <tr>
                  <td>Select</td>
                  <td>Name</td>
                  <td>Account Number</td>
                  <td>Account Balance</td>
                  <td>Account Type</td>
                  <td>Edit</td>
                  <td>Delete</td>
                </tr>
              </thead>
              <tbody>
                {!!allUsers &&
                  allUsers?.map((users) => (
                    <tr key={users?.id}>
                      <td>
                        <input
                          type="checkbox"
                          name=""
                          value={users?.email}
                          id="checkbox"
                          onClick={() => getId(users?.email)}
                        />
                      </td>
                      <td>{users?.name}</td>
                      <td>{users?.account_number}</td>
                      <td>{users?.balance}</td>
                      <td>{users?.account_type}</td>
                      <td className="edit__user">
                        <Link href={`/admin/edit?username=${users?.username}`}>
                          <FaUserEdit />
                        </Link>
                      </td>
                      <td className="delete__user">
                        <MdDeleteForever
                          onClick={() => handleDelete(users?.email)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
