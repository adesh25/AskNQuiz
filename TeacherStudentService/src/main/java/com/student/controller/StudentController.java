package com.student.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.student.dtos.ApiResponse;
import com.student.dtos.StudentDto;
import com.student.services.StudentService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/students")
@AllArgsConstructor
public class StudentController {

    private final StudentService service;

    // ================= REGISTER =================

    @PostMapping("/register")
    public ResponseEntity<?> addNewStudent(@RequestBody @Valid StudentDto studentDto) {

        try {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(service.addNewStudent(studentDto));

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(e.getMessage(), "FAILED"));
        }
    }

    // ================= LOGIN =================

    @PostMapping("/login")
    public ResponseEntity<?> loginStudent(@RequestBody StudentDto studentDto) {

        try {
            return ResponseEntity.ok(
                    service.loginStudent(
                            studentDto.getEmail(),
                            studentDto.getPassword()
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(e.getMessage(), "FAILED"));
        }
    }

    // ================= UPDATE =================

    @PutMapping("/update/{studentId}")
    public ResponseEntity<?> updateStudent(
            @PathVariable Long studentId,
            @RequestBody @Valid StudentDto studentDto) {

        try {
            return ResponseEntity.ok(
                    service.updateStudent(studentId, studentDto)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(e.getMessage(), "FAILED"));
        }
    }

    // ================= DELETE =================

    @DeleteMapping("/delete/{studentId}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long studentId) {

        try {
            return ResponseEntity.ok(
                    service.deleteStudent(studentId)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(e.getMessage(), "FAILED"));
        }
    }

    // ================= LIST =================

    @GetMapping("/list")
    public ResponseEntity<?> listStudents() {
        return ResponseEntity.ok(service.getAllStudents());
    }
}