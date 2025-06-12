package com.example.studentportal.Repository;

import org.springframework.data.repository.CrudRepository;
import com.example.studentportal.Entity.Grade;

public interface GradeRepository extends CrudRepository<Grade, Long> {
} 