package com.example.studentportal.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.example.studentportal.Entity.Course;

public interface CourseRepository extends CrudRepository<Course, Long> {
}