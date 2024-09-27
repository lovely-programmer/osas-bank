"use client";
import { useState } from "react";
import AdminSidebar from "../../../../components/dashboardComponents/AdminSidebar";
import { MdOutlineMenu } from "react-icons/md";
import "../../admin.css";
import { getAllUsers } from "../../../../lib/requests";
import { toast } from "react-toastify";
import Spinner from "../../../../components/Spinner/Spinner";

export default function GenerateCode() {
  const [showSideBar, setShowSideBar] = useState(false);
  const { allUsers, isLoading, mutate } = getAllUsers();

  const [codePrice, setCodePrice] = useState(0);
  const [codeType, setCodeType] = useState("");
  const [id, setId] = useState("");

  console.log(id);

  const generateCode = async (e) => {
    e.preventDefault();

    if (id == "") {
      toast.error("Please select the user");
      return;
    }

    const userData = {
      codePrice,
      codeType,
    };

    await fetch(`/api/user/generate/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });

    // setId("");
    setCodePrice(0);
    setCodeType("");
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
            Generate Code
          </h2>

          <div style={{ paddingLeft: "20px" }}>
            <table>
              <thead>
                <tr>
                  <td>Select</td>
                  <td>Name</td>
                  <td>Account Number</td>
                  <td>Tcc Code</td>
                  <td>Tcc Code Cost</td>
                  <td>Imf Code</td>
                  <td>Imf Code Cost</td>
                  <td>Tax Code</td>
                  <td>Tax Code Cost</td>
                </tr>
              </thead>
              <tbody>
                {!!allUsers &&
                  allUsers?.map((users) => (
                    <tr key={users?.id}>
                      <td>
                        <input
                          onChange={() => setId(users?.email)}
                          type="checkbox"
                          name=""
                          id=""
                        />
                      </td>
                      <td>{users?.name}</td>
                      <td>{users?.account_number}</td>
                      <td>{users?.tcc_code}</td>
                      <td>{users?.tcc_code_price}</td>
                      <td>{users?.imf_code}</td>
                      <td>{users?.imf_code_price}</td>
                      <td>{users?.tax_code}</td>
                      <td>{users?.tax_code_price}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <form
              style={{ marginTop: "20px" }}
              className="dashboard__form__group"
              onSubmit={generateCode}
            >
              <div className="form__group">
                <input
                  onChange={(e) => setCodePrice(e.target.value)}
                  type="number"
                  placeholder="Enter Cost"
                  required
                />
              </div>
              <div className="form__group">
                <select
                  value={codeType}
                  onChange={(e) => setCodeType(e.target.value)}
                  name=""
                  id=""
                  required
                >
                  <option value="">Select Code</option>
                  <option value="tcc_code">tcc</option>
                  <option value="imf_code">imf</option>
                  <option value="tax_code">tax</option>
                </select>
              </div>
              <div className="register__btn">
                <button>Generate Code</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
