import { IoLogOut } from "react-icons/io5";
import { logout } from "../../app/actions/authActions";
import { useSWRConfig } from "swr";

export default function LogOutForm() {
  const { mutate } = useSWRConfig();

  const handleSubmit = async () => {
    await logout();
    mutate("/api/session");
  };

  return (
    <form className="dashboard__logout">
      <button
        onClick={handleSubmit}
        type="button"
        style={{
          display: "flex",
          border: "none",
          background: "inherit",
          color: "inherit",
          cursor: "pointer",
        }}
      >
        <IoLogOut />
        <p style={{ paddingLeft: "10px" }}>Log out</p>
      </button>
    </form>
  );
}
