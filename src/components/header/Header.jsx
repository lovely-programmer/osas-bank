import "./Header.css";
import Link from "next/link";

function Header() {
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
                <form>
                  <div className="form__group">
                    <input type="text" id="username" required />
                    <label htmlFor="username">Username</label>
                  </div>
                  <div className="form__group">
                    <input type="password" id="password" required />
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
