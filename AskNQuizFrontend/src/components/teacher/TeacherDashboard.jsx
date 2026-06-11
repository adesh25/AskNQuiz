import "../common/Dashboard.css";
import Navbar from "../common/Navbar";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const navigate = useNavigate();
  const teacher = JSON.parse(localStorage.getItem("teacher"));

  return (
    <>
  <Navbar title="Teacher Dashboard" user={teacher} />

  <div className="dashboard-container">

    <div className="welcome-card">
      <h1>👨‍🏫 Welcome, {teacher?.name || "Teacher"}</h1>

      <p>
        Create quizzes, manage questions,
        publish notices and help students.
      </p>
    </div>

    <div className="card-grid">

      <div className="dashboard-card">
        <h3>📝 Create Quiz</h3>
        <p>Create new quizzes for students</p>

        <button onClick={() => navigate("/teacher/create-quiz")}>
          Create Quiz
        </button>
      </div>

      <div className="dashboard-card">
        <h3>❓ Add Questions</h3>
        <p>Add questions to your quizzes</p>

        <button onClick={() => navigate("/teacher/create-quiz")}>
          Add Questions
        </button>
      </div>

      <div className="dashboard-card">
        <h3>🚀 Release Quiz</h3>
        <p>Publish quizzes for students</p>

        <button onClick={() => navigate("/teacher/release-quiz")}>
          Release Quiz
        </button>
      </div>

      <div className="dashboard-card">
        <h3>📊 View Results</h3>
        <p>Check student performance</p>

        <button onClick={() => navigate("/teacher/results")}>
          View Results
        </button>
      </div>

      <div className="dashboard-card">
        <h3>💬 Reply Doubts</h3>
        <p>Answer student questions</p>

        <button onClick={() => navigate("/teacher/reply-doubt")}>
          Reply Doubts
        </button>
      </div>

      <div className="dashboard-card">
        <h3>📢 Post Notice</h3>
        <p>Share announcements with students</p>

        <button onClick={() => navigate("/teacher/post-notice")}>
          Post Notice
        </button>
      </div>

    </div>

  </div>
</>
  );
}

export default TeacherDashboard;