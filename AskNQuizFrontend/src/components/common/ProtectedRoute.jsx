import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

  const student = JSON.parse(localStorage.getItem("student"));
  const teacher = JSON.parse(localStorage.getItem("teacher"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  // Student route protection
  if (role === "student" && !student) {
    return <Navigate to="/student/login" />;
  }

  // Teacher route protection
  if (role === "teacher" && !teacher) {
    return <Navigate to="/teacher/login" />;
  }

  // Admin route protection
  if (role === "admin" && !admin) {
    return <Navigate to="/admin/login" />;
  }

  return children;
}

export default ProtectedRoute;