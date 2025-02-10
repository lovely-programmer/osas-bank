"use client";
import { useState } from "react";
import Sidebar from "../../components/dashboardComponents/Sidebar";
import { MdOutlineMenu } from "react-icons/md";
import useSession from "../../lib/use-session";
import { getUser } from "../../lib/requests";
import { toast } from "react-toastify";
import "../admin/admin.css";

export default function Contact() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { session } = useSession();

  const { user } = getUser(session?.username);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        email: user?.email,
        name: user?.name,
        message,
        subject,
      }),
    });

    if (res.ok) {
      e.target.reset();
      toast.success("Message sent successfully");
      setLoading(false);
    } else {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="dashboard__container">
      <div className="dashboard__content">
        <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
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
          <h2 className="main__header">Contact Us Today</h2>
          <div>
            <p style={{ paddingBottom: "10px" }}>
              Firstrustfinance, RSA Lynchwood Park Peterborough PE2 6GG.
            </p>
            <p style={{ paddingBottom: "20px" }}>
              Email: customer_care@firstrustfinance.com
            </p>
          </div>
          <form onSubmit={handleSubmit} className="dashboard__form__group">
            <div className="form__group">
              <input value={user?.name} type="text" required id="name" />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form__group">
              <input value={user?.email} type="text" required id="email" />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form__group">
              <input
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                required
                id="subject"
              />
              <label htmlFor="subject">Subject</label>
            </div>
            <div className="form__group text__group">
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                required
                id=""
              ></textarea>
            </div>

            <div className="register__btn admin__btn">
              <button disabled={loading}>
                {loading ? (
                  <span className="side__loader"></span>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
