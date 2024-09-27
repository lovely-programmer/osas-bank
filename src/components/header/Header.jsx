"use client";
import { toast } from "react-toastify";
import "./Header.css";
import Link from "next/link";
import { useState } from "react";
import { authorizeUser } from "../../app/actions/authActions";

function Header() {
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
    <div className="header">
      <div className="header__container">
        <div className="header__section">
          <img src="./home_banner.avif" alt="" />

          <div className="header__section-content">
            <div className="header__section-first__content">
              <div className="top">
                <div className="header__content">
                  {/* <h3>Good Day</h3> */}
                  <h3>Sign in to manage your accounts.</h3>
                </div>
                <form onSubmit={handleSubmit}>
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
                      type="password"
                      id="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                  </div>

                  <div className="button_design form__button">
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

            <div className="header__section--second__content">
              <h1>Say hello to convenient checking</h1>
              <p>
                Explore our checking options and choose the right account for
                you
              </p>
              <div className="button_design form__button">
                <button className="header__btn">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
