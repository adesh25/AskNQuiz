package com.student.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.student.dtos.ApiResponse;
import com.student.dtos.QuizDto;
import com.student.services.QuizService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/quiz")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class QuizController {

    private final QuizService quizService;

    // =========================
    // CREATE QUIZ
    // =========================
    @PostMapping("/add")
    public ResponseEntity<?> addNewQuiz(@RequestBody @Valid QuizDto quizDto) {
        try {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(quizService.createQuiz(quizDto));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(e.getMessage(), "FAILED"));
        }
    }

    // =========================
    // GET QUIZ BY ID
    // =========================
    @GetMapping("/{quizId}")
    public ResponseEntity<?> getQuizById(@PathVariable Long quizId) {
        try {
            return ResponseEntity.ok(quizService.getQuizById(quizId));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(e.getMessage(), "FAILED"));
        }
    }

    // =========================
    // RELEASE QUIZ
    // =========================
    @PutMapping("/release/{quizId}/{teacherId}")
    public ResponseEntity<?> releaseQuiz(
            @PathVariable Long quizId,
            @PathVariable Long teacherId) {

        try {
            return ResponseEntity.ok(
                    quizService.releaseQuiz(quizId, teacherId));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(e.getMessage(), "FAILED"));
        }
    }

    // =========================
    // GET RELEASED QUIZZES (FOR STUDENT)
    // =========================
    @GetMapping("/available")
    public ResponseEntity<?> getAvailableQuizzes() {
        return ResponseEntity.ok(
                quizService.getReleasedQuizzes());
    }

    // =========================
    // 🔥 GET QUIZZES BY TEACHER (FOR RELEASE PAGE)
    // =========================
    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<?> getQuizzesByTeacher(
            @PathVariable Long teacherId) {

        return ResponseEntity.ok(
                quizService.getQuizzesByTeacher(teacherId));
    }

    // =========================
    // PUBLISH QUIZ (OPTIONAL)
    // =========================
    @PutMapping("/publish/{quizId}")
    public ResponseEntity<?> publishQuiz(
            @PathVariable Long quizId) {

        try {
            return ResponseEntity.ok(
                    quizService.publishQuiz(quizId));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(e.getMessage(), "FAILED"));
        }
    }
}