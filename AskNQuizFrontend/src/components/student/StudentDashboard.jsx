import "../common/Dashboard.css";
import Navbar from "../common/Navbar";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("student"));

  return (
   <>
  <Navbar title="Student Dashboard" user={student} />

  <div className="dashboard-container">

    <div className="welcome-card">
      <h1>👋 Welcome, {student?.studentName || "Student"}</h1>
      <p>Track your quizzes, notices and doubts.</p>
    </div>

    <div className="card-grid">

  <div className="dashboard-card">
    <h3>📚 Quizzes</h3>
    <p>View and attempt quizzes</p>
    <button onClick={() => navigate("/student/quizzes")}>
      View Quizzes
    </button>
  </div>

  <div className="dashboard-card">
    <h3>📢 Notices</h3>
    <p>Latest announcements</p>
    <button onClick={() => navigate("/notices")}>
      View Notices
    </button>
  </div>

  <div className="dashboard-card">
    <h3>❓ Ask Doubt</h3>
    <p>Ask questions to teachers</p>
    <button onClick={() => navigate("/student/ask-doubt")}>
      Ask Doubt
    </button>
  </div>

  <div className="dashboard-card">
    <h3>💬 View Replies</h3>
    <p>See teacher replies</p>
    <button onClick={() => navigate("/student/my-doubts")}>
      View Replies
    </button>
  </div>

</div>

  </div>
</>
  );
}

export default StudentDashboard;