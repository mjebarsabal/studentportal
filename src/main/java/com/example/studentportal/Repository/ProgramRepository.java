package com.example.studentportal.Repository;

import org.springframework.data.repository.CrudRepository;
import com.example.studentportal.Entity.Program;

public interface ProgramRepository extends CrudRepository<Program, Long> {
} 