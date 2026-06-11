import "../../common/Dashboard.css";
import Navbar from "../../common/Navbar";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin"));

  return (
    <>
  <Navbar title="Admin Dashboard" user={admin} />

  <div className="dashboard-container">

    <div className="welcome-card">
      <h1>⚙️ Admin Control Panel</h1>
      <p>
        Manage Teachers, Students and System Data
      </p>
    </div>

    <div className="card-grid">

      <div className="dashboard-card">
        <h3>👨‍🏫 Add Teacher</h3>
        <p>Create and manage teacher accounts</p>

        <button onClick={() => navigate("/admin/add-teacher")}>
          Add Teacher
        </button>
      </div>

      <div className="dashboard-card">
        <h3>🎓 All Students</h3>
        <p>View registered students</p>

        <button onClick={() => navigate("/admin/students")}>
          View Students
        </button>
      </div>

      <div className="dashboard-card">
        <h3>📚 All Teachers</h3>
        <p>View registered teachers</p>

        <button onClick={() => navigate("/admin/teachers")}>
          View Teachers
        </button>
      </div>

    </div>

  </div>
</>
  );
}

export default AdminDashboard;