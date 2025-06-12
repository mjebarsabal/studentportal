package com.example.studentportal.Controller;

import com.example.studentportal.Entity.Grade;
import com.example.studentportal.Repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/grades")
public class GradeController {
    @Autowired
    private GradeRepository gradeRepository;

    @GetMapping
    public Iterable<Grade> getAllGrades() {
        return gradeRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Grade> getGradeById(@PathVariable Long id) {
        Optional<Grade> grade = gradeRepository.findById(id);
        return grade.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Grade addGrade(@RequestBody Grade grade) {
        return gradeRepository.save(grade);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Grade> updateGrade(@PathVariable Long id, @RequestBody Grade updatedGrade) {
        return gradeRepository.findById(id)
                .map(grade -> {
                    grade.setStudentId(updatedGrade.getStudentId());
                    grade.setCourseCode(updatedGrade.getCourseCode());
                    grade.setFacultyId(updatedGrade.getFacultyId());
                    grade.setGrade(updatedGrade.getGrade());
                    return ResponseEntity.ok(gradeRepository.save(grade));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrade(@PathVariable Long id) {
        if (gradeRepository.existsById(id)) {
            gradeRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
} 