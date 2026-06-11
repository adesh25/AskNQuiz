package com.student.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.student.dtos.ApiResponse;
import com.student.dtos.TeacherDto;
import com.student.services.TeacherService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/teachers")
@AllArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;


    // ✅ REGISTER TEACHER
    @PostMapping("/addTeacher")
    public ResponseEntity<?> addTeacher(@RequestBody @Valid TeacherDto teacherDto) {

        try {

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(teacherService.addNewTeacher(teacherDto));

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(e.getMessage(), "FAILED"));
        }
    }


    // ✅ LOGIN TEACHER
    @PostMapping("/login")
    public ResponseEntity<?> loginTeacher(@RequestBody TeacherDto dto) {

        try {

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(teacherService.loginTeacher(dto));

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(e.getMessage(), "FAILED"));
        }
    }


    // ✅ GET ALL TEACHERS
    @GetMapping("/list")
    public ResponseEntity<?> listTeachers() {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(teacherService.getAllTeachers());
    }


    // ✅ UPDATE TEACHER
    @PutMapping("/edit/{teacherId}")
    public ResponseEntity<?> updateTeacher(
            @PathVariable Long teacherId,
            @RequestBody @Valid TeacherDto dto) {

        try {

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(teacherService.updateTeacher(teacherId, dto));

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(e.getMessage(), "FAILED"));
        }
    }


    // ✅ DELETE TEACHER
    @DeleteMapping("/delete/{teacherId}")
    public ResponseEntity<?> deleteTeacher(@PathVariable Long teacherId) {

        try {

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(teacherService.deleteTeacher(teacherId));

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(e.getMessage(), "FAILED"));
        }
    }

}
