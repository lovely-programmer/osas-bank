import "./footer.css";
import { BsPinterest, BsYoutube } from "react-icons/bs";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillInstagram,
  AiFillTwitterSquare,
} from "react-icons/ai";

export default function Footer() {
  return (
    <div className="footer__container">
      <div className="footer_upper_section">
        <div className="main_section">
          <div>
            <p>Privacy, Cookies, Security & Legal</p>
          </div>
          <div>
            <p>Notice of Data Collection</p>
          </div>
          <div>
            <p>General Terms of Use </p>
          </div>
          <div>
            <p>Online Access Agreement</p>
          </div>
          <div>
            <p>Ad Choices</p>
          </div>
          <div>
            <p>Report Fraud</p>
          </div>
          <div className="about_wells">
            <p>About Wells Fargo</p>
          </div>
          <div>
            <p>Careers</p>
          </div>
          <div>
            <p>Diversity and Accessibility</p>
          </div>
          <div>
            <p>Sitemap</p>
          </div>
        </div>
      </div>

      <div className="footer__account">
        <span>
          <AiFillFacebook />
        </span>
        <span>
          <AiFillLinkedin />
        </span>
        <span>
          <AiFillInstagram />
        </span>
        <span>
          <BsPinterest />
        </span>
        <span>
          <BsYoutube />
        </span>
        <span>
          <AiFillTwitterSquare />
        </span>
      </div>

      <div className="footer_note">
        <p className="footer_mb">
          1. You must be the primary account holder of an eligible Wells Fargo
          consumer account with a FICO® Score available, and enrolled in Wells
          Fargo Online®. Eligible Wells Fargo consumer accounts include
          deposit, loan, and credit accounts, but other consumer accounts may
          also be eligible. Contact Wells Fargo for details. Availability may be
          affected by your mobile carrier’s coverage area. Your mobile carrier's
          message and data rates may apply.
        </p>

        <p className="footer_mb">
          Please note that the score provided under this service is for
          educational purposes and may not be the score used by Wells Fargo to
          make credit decisions. Wells Fargo looks at many factors to determine
          your credit options; therefore, a specific FICO® Score or Wells Fargo
          credit rating does not guarantee a specific loan rate, approval of a
          loan, or an upgrade on a credit card.
        </p>

        <p className="footer_mb">
          2. Enrollment with Zelle® through Wells Fargo Online® or Wells Fargo
          Business Online® is required. Terms and conditions apply. U.S.
          checking or savings account required to use Zelle®. Transactions
          between enrolled users typically occur in minutes. For your
          protection, Zelle® should only be used for sending money to friends,
          family, or others you trust. Neither Wells Fargo nor Zelle® offers
          purchase protection for payments made with Zelle® - for example, if
          you do not receive the item you paid for or the item is not described
          or as you expected. The Request feature within Zelle® is only
          available through Wells Fargo using a smartphone. Payment requests to
          persons not already enrolled with Zelle® must be sent to an email
          address. To send or receive money with a small business, both parties
          must be enrolled with Zelle® directly through their financial
          institution’s online or mobile banking experience. For more
          information, view the Zelle® Transfer Service Addendum to the Wells
          Fargo Online Access Agreement. Your mobile carrier's message and data
          rates may apply. Account fees (e.g., monthly service, overdraft) may
          apply to Wells Fargo account(s) with which you use Zelle®.
        </p>
      </div>

      <div className="footer_box footer_mb">
        <p>Investment and Insurance Products are:</p>
        <ul>
          <li>Not Insured by the FDIC or Any Federal Government Agency</li>
          <li>
            Not a Deposit or Other Obligation of, or Guaranteed by, the Bank or
            Any Bank Affiliate
          </li>
          <li>
            Subject to Investment Risks, Including Possible Loss of the
            Principal Amount Invested
          </li>
        </ul>
      </div>

      <div className="footer_note">
        <p className="footer_mb">
          Investment products and services are offered through Wells Fargo
          Advisors. Wells Fargo Advisors is a trade name used by Wells Fargo
          Clearing Services, LLC (WFCS) and Wells Fargo Advisors Financial
          Network, LLC, Members SIPC, separate registered broker-dealers and
          non-bank affiliates of Wells Fargo & Company.
        </p>

        <div className="footer_mb">
          Android, Chrome, Google Pay, Google Pixel, Google Play, Wear OS by
          Google, and the Google Logo are trademarks of Google LLC.
        </div>

        <div className="footer_mb">
          Apple, the Apple logo, Apple Pay, Apple Watch, Face ID, iCloud
          Keychain, iPad, iPad Pro, iPhone, iTunes, Mac, Safari, and Touch ID
          are trademarks of Apple Inc., registered in the U.S. and other
          countries. Apple Wallet is a trademark of Apple Inc. App Store is a
          service mark of Apple Inc.
        </div>

        <div className="footer_mb">
          Deposit products offered by Wells Fargo Bank, N.A. Member FDIC.
        </div>

        <div className="equal_housing footer_mb">
          <img src="./equal_housing.png" alt="" />
          <p> Equal Housing Lender</p>
        </div>

        <div className="footer_mb">
          FICO is a registered trademark of Fair Isaac Corporation in the United
          States and other countries.
        </div>

        <div className="footer_mb">
          Zelle® and the Zelle® related marks are wholly owned by Early
          Warning Services, LLC and are used herein under license.
        </div>

        <div className="footer_mb">PM-08262025-6425362.1.1</div>

        <div className="footer_mb">LRC-0224</div>

        <div className="">© 1999 - 2024 Wells Fargo. NMLSR ID 399801</div>
      </div>
    </div>
  );
}
