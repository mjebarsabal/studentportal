package com.example.studentportal.Controller;

import com.example.studentportal.Entity.Curriculum;
import com.example.studentportal.Repository.CurriculumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/curriculums")
public class CurriculumController {
    @Autowired
    private CurriculumRepository curriculumRepository;

    @GetMapping
    public Iterable<Curriculum> getAllCurriculums() {
        return curriculumRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curriculum> getCurriculumById(@PathVariable Long id) {
        Optional<Curriculum> curriculum = curriculumRepository.findById(id);
        return curriculum.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Curriculum addCurriculum(@RequestBody Curriculum curriculum) {
        return curriculumRepository.save(curriculum);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Curriculum> updateCurriculum(@PathVariable Long id, @RequestBody Curriculum updatedCurriculum) {
        return curriculumRepository.findById(id)
                .map(curriculum -> {
                    curriculum.setCurriculumCode(updatedCurriculum.getCurriculumCode());
                    curriculum.setProgramCode(updatedCurriculum.getProgramCode());
                    curriculum.setYearStarted(updatedCurriculum.getYearStarted());
                    curriculum.setDescription(updatedCurriculum.getDescription());
                    return ResponseEntity.ok(curriculumRepository.save(curriculum));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCurriculum(@PathVariable Long id) {
        if (curriculumRepository.existsById(id)) {
            curriculumRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
} 