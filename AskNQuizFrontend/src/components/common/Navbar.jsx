import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({ title, user }) {
  const navigate = useNavigate();

  const logout = () => {
    // Remove only auth related items
    localStorage.removeItem("student");
    localStorage.removeItem("teacher");
    localStorage.removeItem("admin");
    localStorage.removeItem("attemptId");

    // Redirect to home page
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>{title}</h2>

      <div className="navbar-right">
        <span>
          {user?.studentName || user?.name || user?.email}
        </span>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;