import { useEffect, useState } from "react";
import axios from "axios";
import { getAllTeachers } from "../../../api/adminApi";
import "./Table.css";

function TeacherList() {

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {

    getAllTeachers()
      .then((res) => {

        setTeachers(res.data);

      })
      .catch((error) => {

        console.error(error);

      });

  }, []);

  const handleDelete = async (teacherId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(
        `http://localhost:8080/teachers/delete/${teacherId}`
      );

      alert("Teacher deleted successfully");

      setTeachers(
        teachers.filter(
          (teacher) => teacher.teacherId !== teacherId
        )
      );

    } catch (error) {

      console.error(error);

      alert("Failed to delete teacher");

    }

  };

  return (

    <div className="student-list-page">

      <div className="student-list-card">

        <h2>👨‍🏫 All Teachers</h2>

        <table className="student-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {teachers.length > 0 ? (

              teachers.map((t) => (

                <tr key={t.teacherId}>

                  <td>{t.teacherId}</td>

                  <td>{t.name}</td>

                  <td>{t.email}</td>

                  <td>{t.subject}</td>

                  <td>

                    <button
                      onClick={() =>
                        handleDelete(t.teacherId)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="5">
                  No Teachers Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default TeacherList;