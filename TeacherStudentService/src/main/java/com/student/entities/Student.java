package com.student.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "students")
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"doubts"})
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;

    private Long userId;
    private String studentName;
    private String email;
    private String password;
    private LocalDate admissionDate;

    @JsonIgnore   // ✅ ADD THIS LINE
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Doubt> doubts;

}