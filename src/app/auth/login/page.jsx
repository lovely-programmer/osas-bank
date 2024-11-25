"use client";
import { useRouter } from "next/navigation";
import RegisterNavbar from "../../../components/registerNavbar/Register_navbar";
import "../../register/identity/enrollment/register.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { getUserByAccNo } from "../../../lib/requests";
import { BiHide, BiShow } from "react-icons/bi";
import Spinner from "../../../components/Spinner/Spinner";

export default function Login() {
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const { user } = getUserByAccNo(accountNumber);

  const router = useRouter();

  const handleChange = (e) => {
    const text = e.target.value;
    // // Allow only numbers
    const numericValue = text.replace(/[^0-9]/g, "");
    setAccountNumber(numericValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ accountNumber, password }),
    });

    if (res.ok) {
      localStorage.setItem(
        "verification_email",
        JSON.stringify({ accountNumber })
      );

      const verification_code = Math.floor(Math.random() * 9000 + 1000);

      await fetch("/api/user/verification/registration", {
        method: "POST",
        body: JSON.stringify({ email: user?.email, verification_code }),
      });

      await fetch(`/api/user/updateverification/${user?.email}`, {
        method: "PUT",
        body: JSON.stringify(verification_code),
      });

      router.push("/auth/login/verification");
    } else {
      setLoading(false);
      toast.error("Invalid credentials");
    }
  };

  if (loading) {
    return <Spinner />;
  }

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
                        id="accountNumber"
                        maxLength="10"
                        required
                        value={accountNumber}
                        onChange={handleChange}
                        // onChange={(e) => setAccountNumber(e.target.value)}
                      />
                      <label htmlFor="accountNumber">Account Number</label>
                    </div>

                    <div className="form__group password">
                      <div className="password__field">
                        <input
                          name="password"
                          type={`${hidePassword ? "password" : "text"}`}
                          id="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">password</label>
                      </div>
                      {hidePassword ? (
                        <BiHide onClick={() => setHidePassword(false)} />
                      ) : (
                        <BiShow onClick={() => setHidePassword(true)} />
                      )}
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
