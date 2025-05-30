package com.example.studentportal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import com.example.studentportal.Course;

public interface CourseRepository extends CrudRepository<Course, Long> {
}