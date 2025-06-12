package com.example.studentportal.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.example.studentportal.Entity.Faculty;
import java.util.List;

public interface FacultyRepository extends CrudRepository<Faculty, Long> {
    List<Faculty> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String name, String email);
}
