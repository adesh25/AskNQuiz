package com.student.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.student.dtos.ApiResponse;
import com.student.dtos.QuizDto;
import com.student.dtos.QuizResponseDto;
import com.student.entities.Quiz;
import com.student.entities.QuizStatus;
import com.student.entities.Teacher;
import com.student.repository.QuizRepository;
import com.student.repository.TeacherRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final TeacherRepository teacherRepository;

    // =============================
    // CREATE QUIZ
    // =============================
    @Override
    public QuizResponseDto createQuiz(QuizDto quizDto) {

        Teacher teacher = teacherRepository.findById(quizDto.getTeacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        Quiz quiz = new Quiz();
        quiz.setTitle(quizDto.getTitle());
        quiz.setSubject(quizDto.getSubject());
        quiz.setTimeLimit(quizDto.getTimeLimit());
        quiz.setTotalMarks(quizDto.getTotalMarks());
        quiz.setTeacher(teacher);
        quiz.setStatus(QuizStatus.DRAFT);

        Quiz saved = quizRepository.save(quiz);

        QuizResponseDto res = new QuizResponseDto();
        res.setQuizId(saved.getQuizId());
        res.setTitle(saved.getTitle());
        res.setSubject(saved.getSubject());
        res.setTimeLimit(saved.getTimeLimit());
        res.setTotalMarks(saved.getTotalMarks());
        res.setStatus(saved.getStatus().name());
        res.setTeacherId(saved.getTeacher().getTeacherId());
        res.setTeacherName(saved.getTeacher().getName());

        return res;
    }

    // =============================
    // GET ALL QUIZZES
    // =============================
    @Override
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    // =============================
    // GET QUIZ BY ID
    // =============================
    @Override
    public ApiResponse getQuizById(Long quizId) {

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        return new ApiResponse(
                "Quiz fetched successfully: " + quiz.getTitle(),
                "SUCCESS"
        );
    }

    // =============================
    // RELEASE QUIZ
    // =============================
    @Override
    public ApiResponse releaseQuiz(Long quizId, Long teacherId) {

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        if (!quiz.getTeacher().getTeacherId().equals(teacherId)) {
            throw new RuntimeException("You are not allowed to release this quiz");
        }

        if (quiz.getStatus() == QuizStatus.RELEASED) {
            throw new RuntimeException("Quiz already released");
        }

        quiz.setStatus(QuizStatus.RELEASED);
        quizRepository.save(quiz);

        return new ApiResponse("Quiz released successfully", "SUCCESS");
    }

    // =============================
    // GET RELEASED QUIZZES (STUDENT)
    // =============================
    @Override
    public List<QuizResponseDto> getReleasedQuizzes() {

        return quizRepository.findByStatus(QuizStatus.RELEASED)
                .stream()
                .map(q -> {
                    QuizResponseDto dto = new QuizResponseDto();
                    dto.setQuizId(q.getQuizId());
                    dto.setTitle(q.getTitle());
                    dto.setSubject(q.getSubject());
                    dto.setTimeLimit(q.getTimeLimit());
                    dto.setTotalMarks(q.getTotalMarks());
                    dto.setStatus(q.getStatus().name());
                    dto.setTeacherId(q.getTeacher().getTeacherId());
                    dto.setTeacherName(q.getTeacher().getName());
                    return dto;
                })
                .toList();
    }

    // =============================
    // PUBLISH QUIZ
    // =============================
    @Override
    public ApiResponse publishQuiz(Long quizId) {

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        if (quiz.getStatus() != QuizStatus.DRAFT) {
            throw new RuntimeException("Quiz is already published");
        }

        quiz.setStatus(QuizStatus.RELEASED);
        quizRepository.save(quiz);

        return new ApiResponse("Quiz published successfully", "SUCCESS");
    }

    // =============================
    // GET QUIZZES BY TEACHER
    // =============================
    @Override
    public List<QuizResponseDto> getQuizzesByTeacher(Long teacherId) {

        return quizRepository.findByTeacher_TeacherId(teacherId)
                .stream()
                .map(q -> {
                    QuizResponseDto dto = new QuizResponseDto();
                    dto.setQuizId(q.getQuizId());
                    dto.setTitle(q.getTitle());
                    dto.setSubject(q.getSubject());
                    dto.setTimeLimit(q.getTimeLimit());
                    dto.setTotalMarks(q.getTotalMarks());
                    dto.setStatus(q.getStatus().name());
                    return dto;
                })
                .toList();
    }
}