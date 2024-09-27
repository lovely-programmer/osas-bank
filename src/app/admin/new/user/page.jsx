"use client";
import { useState } from "react";
import AdminSidebar from "../../../../components/dashboardComponents/AdminSidebar";
import { MdOutlineMenu } from "react-icons/md";
import "../../admin.css";
import { toast } from "react-toastify";
import { data } from "../../../../components/RegisterDetails/data";
import { useSWRConfig } from "swr";

export default function CreateUser() {
  const [showSideBar, setShowSideBar] = useState(false);
  const { mutate } = useSWRConfig();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [account_type, setAccountType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [occupation, setOccupation] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip_code, setZipCode] = useState("");
  const [social_security, setSocialSecurity] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [account_number, setAccountNumber] = useState(
    Math.floor(Math.random() * 900000000)
  );
  const [routing_number, setRoutingNumber] = useState(
    Math.floor(Math.random() * 90000000)
  );
  const [balance, setBalance] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      name,
      email,
      password,
      address,
      phoneNumber,
      account_type,
      balance,
      country,
      state,
      city,
      zip_code,
      occupation,
      social_security,
      date_of_birth,
      account_number,
      routing_number,
    };

    const res = await fetch("/api/user/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      toast.success("Account created successfully");

      setUsername("");
      setName("");
      setEmail("");
      setAddress("");
      setAccountType("");
      setPhoneNumber("");
      setPassword("");
      setOccupation("");
      setCountry("");
      setCity("");
      setState("");
      setZipCode("");
      setSocialSecurity("");
      setDateOfBirth("");
      setBalance(0);
    }

    mutate("/api/user/allusers");
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
            Create User
          </h2>

          <div style={{ paddingLeft: "20px" }}>
            <form onSubmit={handleSubmit} className="dashboard__form__group">
              <div className="form__group">
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form__group">
                <input
                  type="text"
                  id="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form__group">
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form__group">
                <input
                  type="text"
                  required
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <label htmlFor="address">Address</label>
              </div>
              <div className="form__group">
                <select
                  name="account_type"
                  required
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  <option value="">Select Account</option>
                  <option value="Savings">Savings</option>
                  <option value="Checking">Checking</option>
                  <option value="Investment">Investment</option>
                </select>
              </div>
              <div className="form__group">
                <input
                  type="text"
                  id="phoneNumber"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <label htmlFor="phoneNumber">Phone Number</label>
              </div>
              <div className="form__group">
                <input
                  type="text"
                  id="occupation"
                  required
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
                <label htmlFor="occupation">Occupation</label>
              </div>
              <div className="form__group">
                {/* <input
                  type="text"
                  id="country"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                /> */}
                <select
                  required
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                >
                  <option value="select">Select Country</option>
                  {data.map((d, i) => (
                    <option key={i} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form__group">
                <input
                  type="text"
                  id="city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <label htmlFor="city">City</label>
              </div>
              <div className="form__group">
                <input
                  type="text"
                  id="state"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <label htmlFor="state">State</label>
              </div>
              <div className="form__group">
                <input
                  type="text"
                  id="zip_code"
                  required
                  value={zip_code}
                  onChange={(e) => setZipCode(e.target.value)}
                />
                <label htmlFor="zip_code">Zip Code</label>
              </div>
              <div className="form__group">
                <input
                  type="text"
                  id="SSN"
                  required
                  value={social_security}
                  onChange={(e) => setSocialSecurity(e.target.value)}
                />
                <label htmlFor="SSN">Social Security Number</label>
              </div>
              <div className="form__group">
                <input
                  type="date"
                  id="dob"
                  required
                  value={date_of_birth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <label htmlFor="dob">Date of Birth</label>
              </div>
              <div className="form__group">
                <input
                  type="number"
                  id="accountBalance"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                />
                <label htmlFor="accountBalance">Account Balance</label>
              </div>
              <div className="form__group">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="register__btn">
                <button>Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
