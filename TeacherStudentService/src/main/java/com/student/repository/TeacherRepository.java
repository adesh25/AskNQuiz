package com.student.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.student.entities.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Long>{

    boolean existsByEmail(String email);

    Optional<Teacher> findByEmail(String email);   // ✅ ADD THIS

}
