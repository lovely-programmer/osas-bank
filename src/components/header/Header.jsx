"use client";
import { toast } from "react-toastify";
import "./Header.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import { getUserByAccNo } from "../../lib/requests";
import { useRouter } from "next/navigation";

function Header() {
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [greeting, setGreeting] = useState("");

  const { user } = getUserByAccNo(accountNumber);

  const router = useRouter();

  const today = new Date();
  const curHr = today.getHours();

  useEffect(() => {
    if (curHr < 12) {
      setGreeting("Good morning");
    } else if (curHr < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, [curHr]);

  const handleChange = (e) => {
    const text = e.target.value;
    // Allow only numbers
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
    <div className="header">
      <div className="header__container">
        <div className="header__section">
          <img src="./home_banner.avif" alt="" />

          <div className="header__section-content">
            <div className="header__section-first__content">
              <div className="top">
                <div className="header__content">
                  <h3>{greeting}</h3>
                  <p>Sign in to manage your accounts.</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form__group">
                    <input
                      type="text"
                      id="accountNumber"
                      maxLength="10"
                      required
                      value={accountNumber}
                      onChange={handleChange}
                    />
                    <label htmlFor="accountNumber">Account Number</label>
                  </div>
                  <div className="form__group">
                    <input
                      type="password"
                      id="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                  </div>

                  <div className="button_design form__button header__btn">
                    <button>Sign In</button>
                    <Link href="/register/identity/enrollment">Enroll</Link>
                  </div>
                </form>
              </div>

              <div className="bottom">
                <a href="">Forget username or password?</a>
                <a href="">Security Center</a>
                <a href="">Privacy, Cookies, and Legal</a>
              </div>
            </div>

            <div className="header__section--second__content checking">
              <h1>Say hello to convenient checking</h1>
              <p>
                Explore our checking options and choose the right account for
                you
              </p>
              <div className="button_design form__button">
                <Link href="/register/identity/enrollment">
                  <button className="header__btn">Get Started</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
