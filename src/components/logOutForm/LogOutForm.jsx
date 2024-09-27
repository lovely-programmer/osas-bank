import { IoLogOut } from "react-icons/io5";
import { logout } from "../../app/actions/authActions";
import { useSWRConfig } from "swr";

export default function LogOutForm() {
  const { mutate } = useSWRConfig();
  const handleSubmit = (e) => {
    e.preventDefault();
    logout();
    mutate("/api/session");
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
