package com.student.dtos;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentDto {

    private Long studentId;   // ✅ ADD THIS

    @NotBlank(message = "Student name is required")
    private String studentName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String password;

    @PastOrPresent(message = "Admission date cannot be in future")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate admissionDate;
}