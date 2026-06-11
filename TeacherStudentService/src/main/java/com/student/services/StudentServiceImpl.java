package com.student.services;

import com.student.dtos.ApiResponse;
import com.student.dtos.StudentDto;
import com.student.entities.Student;
import com.student.repository.StudentRepository;

import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final LoggerClientService logger;
    private final StudentRepository repository;

    // ================= REGISTER =================

    @Override
    public ApiResponse addNewStudent(StudentDto studentDto) {

        if (repository.existsByEmail(studentDto.getEmail())) {
            throw new RuntimeException("Student with this email already exists");
        }

        Student student = new Student();
        student.setStudentName(studentDto.getStudentName());
        student.setEmail(studentDto.getEmail());
        student.setPassword(studentDto.getPassword());
        student.setAdmissionDate(LocalDate.now());

        repository.save(student);

        logger.log("student-service", "Student Added: " + student.getEmail());

        return new ApiResponse("Student added successfully", "SUCCESS");
    }

    // ================= LOGIN =================

    @Override
    public StudentDto loginStudent(String email, String password) {

        Student student = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (!student.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        logger.log("student-service", "Student logged in: " + email);

        // 🔥 RETURN FULL STUDENT DATA
        StudentDto dto = new StudentDto();
        dto.setStudentId(student.getStudentId());
        dto.setStudentName(student.getStudentName());
        dto.setEmail(student.getEmail());
        dto.setAdmissionDate(student.getAdmissionDate());

        return dto;
    }

    // ================= UPDATE =================

    @Override
    public ApiResponse updateStudent(Long studentId, StudentDto studentDto) {

        Student student = repository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        student.setStudentName(studentDto.getStudentName());
        student.setEmail(studentDto.getEmail());

        if(studentDto.getPassword() != null &&
           !studentDto.getPassword().isBlank()) {

            student.setPassword(studentDto.getPassword());
        }

        repository.save(student);

        logger.log("student-service",
                "Student updated: ID=" + studentId);

        return new ApiResponse(
                "Student updated successfully",
                "SUCCESS");
    }
    

    // ================= DELETE =================

    @Override
    public ApiResponse deleteStudent(Long studentId) {

        Student student = repository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        repository.delete(student);

        logger.log("student-service", "Student deleted: ID=" + studentId);

        return new ApiResponse("Student deleted successfully", "SUCCESS");
    }

    // ================= LIST =================

    @Override
    public List<StudentDto> getAllStudents() {

        return repository.findAll()
                .stream()
                .map(student -> {

                    StudentDto dto = new StudentDto();
                    dto.setStudentId(student.getStudentId());
                    dto.setStudentName(student.getStudentName());
                    dto.setEmail(student.getEmail());
                    dto.setAdmissionDate(student.getAdmissionDate());

                    return dto;

                })
                .toList();
    }
}