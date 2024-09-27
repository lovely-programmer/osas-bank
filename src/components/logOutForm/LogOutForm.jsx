import { IoLogOut } from "react-icons/io5";
import { logout } from "../../app/actions/authActions";

export default function LogOutForm() {
  return (
    <form action={logout} className="dashboard__logout">
      <button
        style={{
          display: "flex",
          border: "none",
          background: "inherit",
          color: "inherit",
        }}
      >
        <IoLogOut />
      </button>
      <p>Log out</p>
    </form>
  );
}
