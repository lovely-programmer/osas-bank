"use client";
import RegisterNavbar from "../../../components/registerNavbar/Register_navbar";
import "../../register/identity/enrollment/register.css";
// import { useFormState } from "react-dom";
import { authorizeUser } from "../../actions/authActions";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  // const { state, formAction } = useFormState(login, undefined);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const userData = await res.json();
      authorizeUser(userData);
    } else {
      toast.error("Username or Password incorrect");
    }
  };

  return (
    <div>
      <RegisterNavbar />
      <div className="register__container">
        <div
          style={{ backgroundImage: "url(/login_img.jpg)" }}
          className="register__content"
        >
          <div className="register">
            <div className="register__main">
              <div className="register__details">
                <h1>Let's set up your online access</h1>
                <span>First, we need some information from you.</span>

                <div className="register__form">
                  <form onSubmit={handleSubmit}>
                    <div className="form__group">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label htmlFor="username">Username</label>
                    </div>

                    <div className="form__group">
                      <input
                        name="password"
                        type="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label htmlFor="password">password</label>
                    </div>
                    <div className="create__account-btn">
                      <div style={{ width: "100%" }} className="register__btn">
                        <button type="submit">Sign On</button>
                      </div>
                    </div>
                    {/* {state?.error && <p>{state.error}</p>} */}
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="register">
            <div className="register__main">
              <div className="register__details">
                <div className="register__bottom">
                  <strong>Investment and Insurance Products are:</strong>
                  <ul>
                    <li>
                      Not Insured by the FDIC or Any Federal Government Agency
                    </li>
                    <li>
                      Not a Deposit or Other Obligation of, or Guaranteed by,
                      the Bank or Any Bank Affiliate
                    </li>
                    <li>
                      Subject to Investment Risks, Including Possible Loss of
                      the Principal Amount Invested
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="register__footer">
          <div className="register__footercontent">
            <div className="register__footerfirst">
              <div>
                <p>Privacy, Cookies, Security & Legal</p>
              </div>
              <div>
                <p>Notice of Data Collection</p>
              </div>
              <div>
                <p>Ad Choices </p>
              </div>
            </div>
            <div className="register__footersecond">
              © 1999 - 2024 Wells Fargo. All rights reserved. NMLSR ID 399801
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
