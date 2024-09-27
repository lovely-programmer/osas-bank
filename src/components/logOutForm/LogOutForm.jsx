import { IoLogOut } from "react-icons/io5";
import { logout } from "../../app/actions/authActions";

export default function LogOutForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <form onSubmit={handleSubmit} className="dashboard__logout">
      <button
        style={{
          display: "flex",
          border: "none",
          background: "inherit",
          color: "inherit",
        }}
      >
        <IoLogOut />
        <p style={{ paddingLeft: "10px" }}>Log out</p>
      </button>
    </form>
  );
}
