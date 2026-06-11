package com.student.repository;

import com.student.entities.Student;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
    boolean existsByEmail(String email);
    
    Optional<Student> findByEmail(String email);
}
