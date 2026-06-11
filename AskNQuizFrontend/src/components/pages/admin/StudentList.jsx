import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAllStudents } from "../../../api/adminApi";
import "./StudentList.css";

function StudentList() {

  const [students, setStudents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    getAllStudents()
      .then((res) => {

        console.log("Students data:", res.data);

        setStudents(res.data);

      })
      .catch((error) => {

        console.error("Error fetching students:", error);

      });

  }, []);

  const handleDelete = async (studentId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(
        `http://localhost:8080/students/delete/${studentId}`
      );

      alert("Student deleted successfully");

      setStudents(
        students.filter(
          (student) => student.studentId !== studentId
        )
      );

    } catch (error) {

      console.error(error);

      alert("Failed to delete student");

    }

  };

  return (

    <div className="student-list-page">

      <div className="student-list-card">

        <h2>👨‍🎓 All Students</h2>

        <table className="student-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {students.length > 0 ? (

              students.map((s) => (

                <tr key={s.studentId}>

                  <td>{s.studentId}</td>

                  <td>{s.studentName}</td>

                  <td>{s.email}</td>

                  <td>

                    <button
                      style={{
                        marginRight: "10px",
                        background: "#22c55e"
                      }}
                      onClick={() =>
                        navigate(
                          "/admin/edit-student",
                          {
                            state: s
                          }
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(s.studentId)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="4">
                  No Students Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default StudentList;