package com.example.studentportal;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import com.example.studentportal.Student;

public interface StudentRepository extends CrudRepository<Student, Long> {

    // Optional<Student> findByStudentID(String studentID);
    
}
 