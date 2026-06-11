import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";

/* ===== Student Auth ===== */
import StudentRegister from "./components/pages/auth/StudentRegister";
import StudentLogin from "./components/pages/auth/StudentLogin";

/* ===== Student Pages ===== */
import StudentDashboard from "./components/student/StudentDashboard";
import QuizList from "./components/student/QuizList";
import QuizAttemptStart from "./components/student/QuizAttemptStart";
import QuizQuestions from "./components/student/QuizQuestions";
import QuizResult from "./components/student/QuizResult";

/* ===== Admin Pages ===== */
import AdminLogin from "./components/pages/admin/AdminLogin";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import AddTeacher from "./components/pages/admin/AddTeacher";
import StudentList from "./components/pages/admin/StudentList";
import TeacherList from "./components/pages/admin/TeacherList";
import EditStudent from "./components/pages/admin/EditStudent";

/* ===== Notice Pages ===== */
import PostNotice from "./components/pages/notice/PostNotice";
import NoticeList from "./components/pages/notice/NoticeList";

/* ===== Doubt Pages ===== */
import AskDoubt from "./components/pages/doubt/AskDoubt";
import StudentDoubts from "./components/pages/doubt/StudentDoubts";
import ReplyDoubt from "./components/pages/doubt/ReplyDoubt";

/* ===== Teacher Pages ===== */
import TeacherLogin from "./components/teacher/TeacherLogin";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import TeacherResults from "./components/teacher/TeacherResults";

/* ===== Teacher Quiz Pages ===== */
import CreateQuiz from "./components/pages/quiz/CreateQuiz";
import AddQuestions from "./components/pages/quiz/AddQuestions";
import ReleaseQuiz from "./components/pages/quiz/ReleaseQuiz";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="glass-card">

        <div className="left-panel">
          <h1>WELCOME!</h1>

          <p>
  Master Your Learning Journey.
  Attempt Quizzes, Ask Doubts,
  Track Progress and Achieve Success.
</p>
        </div>

        <div className="right-panel">
          <h2>AskNQuiz</h2>

          <button
            className="home-btn"
            onClick={() => navigate("/student/login")}
          >
            🎓 Student Login
          </button>

          <button
            className="home-btn"
            onClick={() => navigate("/student/register")}
          >
            📝 Student Register
          </button>

          <button
            className="home-btn"
            onClick={() => navigate("/teacher/login")}
          >
            👨‍🏫 Teacher Login
          </button>

          <button
            className="home-btn"
            onClick={() => navigate("/admin/login")}
          >
            ⚙️ Admin Login
          </button>
        </div>

      </div>
    </div>
  );
}

/* ===== APP ===== */
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* ===== Student Auth ===== */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />

        {/* ===== Student Protected ===== */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/quizzes"
          element={
            <ProtectedRoute role="student">
              <QuizList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/result/:attemptId"
          element={
            <ProtectedRoute role="student">
              <QuizResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/attempt/:quizId"
          element={
            <ProtectedRoute role="student">
              <QuizAttemptStart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/attempt/:quizId/questions"
          element={
            <ProtectedRoute role="student">
              <QuizQuestions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/ask-doubt"
          element={
            <ProtectedRoute role="student">
              <AskDoubt />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/my-doubts"
          element={
            <ProtectedRoute role="student">
              <StudentDoubts />
            </ProtectedRoute>
          }
        />

        {/* ===== Admin ===== */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-teacher"
          element={
            <ProtectedRoute role="admin">
              <AddTeacher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute role="admin">
              <StudentList />
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/edit-student"
  element={
    <ProtectedRoute role="admin">
      <EditStudent />
    </ProtectedRoute>
  }
/>
        <Route
          path="/admin/teachers"
          element={
            <ProtectedRoute role="admin">
              <TeacherList />
            </ProtectedRoute>
          }
        />

        {/* ===== Notices ===== */}
        <Route path="/notices" element={<NoticeList />} />
        <Route
          path="/teacher/post-notice"
          element={
            <ProtectedRoute role="teacher">
              <PostNotice />
            </ProtectedRoute>
          }
        />

        {/* ===== Teacher ===== */}
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute role="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/create-quiz"
          element={
            <ProtectedRoute role="teacher">
              <CreateQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/add-question/:quizId"
          element={
            <ProtectedRoute role="teacher">
              <AddQuestions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/release-quiz"
          element={
            <ProtectedRoute role="teacher">
              <ReleaseQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/reply-doubt"
          element={
            <ProtectedRoute role="teacher">
              <ReplyDoubt />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/results"
          element={
            <ProtectedRoute role="teacher">
              <TeacherResults />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<h2>Page Not Found</h2>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;