package com.student.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.student.dtos.ApiResponse;
import com.student.dtos.StartQuizDto;
import com.student.dtos.SubmitQuizDto;
import com.student.services.QuizAttemptService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/attempts")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class QuizAttemptController {

    private final QuizAttemptService service;

    @PostMapping("/start")
    public ResponseEntity<?> startQuiz(@RequestBody StartQuizDto dto) {
        try {
            return ResponseEntity.ok(service.startQuiz(dto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(e.getMessage(), "FAILED"));
        }
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitQuiz(@RequestBody SubmitQuizDto dto) {
        try {
            return ResponseEntity.ok(service.submitQuiz(dto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(e.getMessage(), "FAILED"));
        }
    }

    @GetMapping("/result/{attemptId}")
    public ResponseEntity<?> getResult(@PathVariable Long attemptId) {
        try {
            return ResponseEntity.ok(service.getAttemptResult(attemptId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(e.getMessage(), "FAILED"));
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> getStudentResults(@PathVariable Long studentId) {
        try {
            return ResponseEntity.ok(service.getResultsForStudent(studentId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(e.getMessage(), "FAILED"));
        }
    }

    // 🔥 NEW → Teacher View Results by Quiz
    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<?> getResultsByQuiz(@PathVariable Long quizId) {
        try {
            return ResponseEntity.ok(service.getResultsByQuiz(quizId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(e.getMessage(), "FAILED"));
        }
    }
}