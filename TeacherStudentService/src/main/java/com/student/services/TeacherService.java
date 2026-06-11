package com.student.services;

import java.util.List;

import com.student.dtos.ApiResponse;
import com.student.dtos.TeacherDto;

public interface TeacherService {

    ApiResponse addNewTeacher(TeacherDto teacherDto);

    List<TeacherDto> getAllTeachers();

    ApiResponse updateTeacher(Long teacherId, TeacherDto dto);

    ApiResponse deleteTeacher(Long teacherId);

    // 🔥 IMPORTANT: Must return TeacherDto
    TeacherDto loginTeacher(TeacherDto dto);
}