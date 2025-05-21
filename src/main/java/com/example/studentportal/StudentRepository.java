package com.example.studentportal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import com.example.studentportal.Student;

public interface StudentRepository extends CrudRepository<Student, Long> {
    
}
 