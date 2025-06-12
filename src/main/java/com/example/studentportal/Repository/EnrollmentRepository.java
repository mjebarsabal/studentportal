package com.example.studentportal.Repository;

import org.springframework.data.repository.CrudRepository;
import com.example.studentportal.Entity.Enrollment;

public interface EnrollmentRepository extends CrudRepository<Enrollment, Long> {
} 