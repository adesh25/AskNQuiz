package com.student.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.student.dtos.ApiResponse;
import com.student.dtos.AttemptResultDto;
import com.student.dtos.QuestionResultDto;
import com.student.dtos.StartQuizDto;
import com.student.dtos.StartQuizResponseDto;
import com.student.dtos.SubmitQuizDto;
import com.student.entities.AttemptAnswer;
import com.student.entities.AttemptStatus;
import com.student.entities.Option;
import com.student.entities.Question;
import com.student.entities.Quiz;
import com.student.entities.QuizAttempt;
import com.student.entities.QuizStatus;
import com.student.repository.AttemptAnswerRepository;
import com.student.repository.OptionRepository;
import com.student.repository.QuestionRepository;
import com.student.repository.QuizAttemptRepository;
import com.student.repository.QuizRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class QuizAttemptServiceImpl implements QuizAttemptService {

    private final QuizAttemptRepository attemptRepository;
    private final LoggerClientService logger;
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final OptionRepository optionRepository;
    private final AttemptAnswerRepository attemptAnswerRepository;

    // ==========================================
    // START QUIZ (Prevent Double Attempt)
    // ==========================================
    @Override
    public StartQuizResponseDto startQuiz(StartQuizDto dto) {

        Quiz quiz = quizRepository.findById(dto.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        if (quiz.getStatus() != QuizStatus.RELEASED) {
            throw new RuntimeException("Quiz is not released yet");
        }

        // 🔥 Prevent double attempt
        boolean alreadyAttempted =
                attemptRepository.existsByStudentIdAndQuiz_QuizId(
                        dto.getStudentId(), dto.getQuizId());

        if (alreadyAttempted) {
            throw new RuntimeException("You have already attempted this quiz");
        }

        QuizAttempt attempt = new QuizAttempt();
        attempt.setStudentId(dto.getStudentId());
        attempt.setQuiz(quiz);
        attempt.setStatus(AttemptStatus.STARTED);
        attempt.setStartTime(LocalDateTime.now());

        QuizAttempt saved = attemptRepository.save(attempt);

        StartQuizResponseDto res = new StartQuizResponseDto();
        res.setAttemptId(saved.getAttemptId());
        res.setStudentId(saved.getStudentId());
        res.setQuizId(saved.getQuiz().getQuizId());
        res.setStatus(saved.getStatus().name());
        res.setStartTime(saved.getStartTime());

        return res;
    }

    // ==========================================
    // SUBMIT QUIZ (Proper Score + Negative Marking)
    // ==========================================
    @Override
    public ApiResponse submitQuiz(SubmitQuizDto dto) {

        QuizAttempt attempt = attemptRepository.findById(dto.getAttemptId())
                .orElseThrow(() -> new RuntimeException("Attempt not found"));

        if (attempt.getStatus() == AttemptStatus.SUBMITTED) {
            throw new RuntimeException("Quiz already submitted");
        }

        int score = 0;

        for (Map.Entry<Long, Long> entry : dto.getAnswers().entrySet()) {

            Long questionId = entry.getKey();
            Long selectedOptionId = entry.getValue();

            Question question = questionRepository.findById(questionId)
                    .orElseThrow(() -> new RuntimeException("Question not found"));

            Option selectedOption = optionRepository.findById(selectedOptionId)
                    .orElseThrow(() -> new RuntimeException("Option not found"));

            Option correctOption = optionRepository.findCorrectOption(questionId)
                    .orElseThrow(() -> new RuntimeException("Correct option not found"));

            boolean isCorrect =
                    selectedOption.getOptionId().equals(correctOption.getOptionId());

            // 🔥 Negative marking logic
            if (isCorrect) {
                score += 5;
            } else {
                score -= 1;
            }

            AttemptAnswer answer = new AttemptAnswer();
            answer.setAttempt(attempt);
            answer.setQuestion(question);
            answer.setSelectedOption(selectedOption);
            answer.setCorrect(isCorrect);

            attemptAnswerRepository.save(answer);
        }

        attempt.setScore(score);
        attempt.setStatus(AttemptStatus.SUBMITTED);
        attempt.setEndTime(LocalDateTime.now());

        attemptRepository.save(attempt);

        return new ApiResponse("Quiz submitted successfully", "SUCCESS");
    }

    // ==========================================
    // GET SINGLE ATTEMPT RESULT
    // ==========================================
    @Override
    @Transactional(readOnly = true)
    public AttemptResultDto getAttemptResult(Long attemptId) {

        QuizAttempt attempt = attemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Attempt not found"));

        if (attempt.getStatus() != AttemptStatus.SUBMITTED) {
            throw new RuntimeException("Result available only after submission");
        }

        List<AttemptAnswer> answers =
                attemptAnswerRepository.findAllByAttemptIdWithDetails(attemptId);

        int total = answers.size();
        int correct = (int) answers.stream().filter(AttemptAnswer::isCorrect).count();
        int wrong = total - correct;

        List<QuestionResultDto> details = new ArrayList<>();

        for (AttemptAnswer aa : answers) {

            Question q = aa.getQuestion();
            Option selected = aa.getSelectedOption();
            Option correctOpt =
                    optionRepository.findCorrectOption(q.getQuestionId()).orElse(null);

            QuestionResultDto d = new QuestionResultDto();
            d.setQuestionId(q.getQuestionId());
            d.setQuestionText(q.getQuestionText());
            d.setSelectedOptionId(selected.getOptionId());
            d.setSelectedOptionText(selected.getOptionText());

            if (correctOpt != null) {
                d.setCorrectOptionId(correctOpt.getOptionId());
                d.setCorrectOptionText(correctOpt.getOptionText());
            }

            d.setCorrect(aa.isCorrect());
            details.add(d);
        }

        AttemptResultDto res = new AttemptResultDto();
        res.setAttemptId(attempt.getAttemptId());
        res.setQuizId(attempt.getQuiz().getQuizId());
        res.setStudentId(attempt.getStudentId());
        res.setScore(attempt.getScore());
        res.setTotalQuestions(total);
        res.setCorrectCount(correct);
        res.setWrongCount(wrong);
        res.setDetails(details);

        return res;
    }

    // ==========================================
    // STUDENT ALL RESULTS
    // ==========================================
    @Override
    @Transactional(readOnly = true)
    public List<AttemptResultDto> getResultsForStudent(Long studentId) {

        List<QuizAttempt> attempts =
                attemptRepository.findByStudentIdOrderByAttemptIdDesc(studentId);

        List<AttemptResultDto> results = new ArrayList<>();

        for (QuizAttempt a : attempts) {
            if (a.getStatus() == AttemptStatus.SUBMITTED) {
                results.add(getAttemptResult(a.getAttemptId()));
            }
        }

        return results;
    }

    // ==========================================
    // TEACHER VIEW RESULTS BY QUIZ
    // ==========================================
    @Override
    @Transactional(readOnly = true)
    public List<AttemptResultDto> getResultsByQuiz(Long quizId) {

        List<QuizAttempt> attempts =
                attemptRepository.findByQuiz_QuizIdOrderByAttemptIdDesc(quizId);

        List<AttemptResultDto> results = new ArrayList<>();

        for (QuizAttempt a : attempts) {
            if (a.getStatus() == AttemptStatus.SUBMITTED) {
                results.add(getAttemptResult(a.getAttemptId()));
            }
        }

        return results;
    }
}