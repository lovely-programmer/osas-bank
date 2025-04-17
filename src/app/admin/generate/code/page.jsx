"use client";
import { useState } from "react";
import AdminSidebar from "../../../../components/dashboardComponents/AdminSidebar";
import { MdOutlineMenu } from "react-icons/md";
import "../../admin.css";
import { getAllUsers, getUser } from "../../../../lib/requests";
import { toast } from "react-toastify";
import Spinner from "../../../../components/Spinner/Spinner";
import useSession from "../../../../lib/use-session";
import { redirect } from "next/navigation";

export default function GenerateCode() {
  const { session } = useSession();
  // const { user } = getUser(session?.username);

  // if (!user?.isAdmin) {
  //   redirect("/dashboard");
  // }

  const [showSideBar, setShowSideBar] = useState(false);
  const { allUsers, isLoading, mutate } = getAllUsers();
  const [loading, setLoading] = useState(false);

  const [codePrice, setCodePrice] = useState(0);
  const [codeType, setCodeType] = useState("");
  const [id, setId] = useState("");

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

    setLoading(true);

    const res = await fetch(`/api/user/generate/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      setCodePrice(0);
      setCodeType("");
      mutate();
      setLoading(false);
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
                  value={codePrice}
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
              <div className="register__btn admin__btn">
                {/* <button disabled>{`${
                  loading ? <span className="loader"></span> : "Generate Code"
                }`}</button> */}
                <button disabled={loading}>
                  {loading ? (
                    <span className="side__loader"></span>
                  ) : (
                    "Generate"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
