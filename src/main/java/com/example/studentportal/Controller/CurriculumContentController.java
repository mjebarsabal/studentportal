package com.example.studentportal.Controller;

import com.example.studentportal.Entity.CurriculumContent;
import com.example.studentportal.Repository.CurriculumContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/curriculum-contents")
public class CurriculumContentController {
    @Autowired
    private CurriculumContentRepository curriculumContentRepository;

    @GetMapping
    public Iterable<CurriculumContent> getAllCurriculumContents() {
        return curriculumContentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CurriculumContent> getCurriculumContentById(@PathVariable Long id) {
        Optional<CurriculumContent> content = curriculumContentRepository.findById(id);
        return content.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public CurriculumContent addCurriculumContent(@RequestBody CurriculumContent content) {
        return curriculumContentRepository.save(content);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CurriculumContent> updateCurriculumContent(@PathVariable Long id, @RequestBody CurriculumContent updatedContent) {
        return curriculumContentRepository.findById(id)
                .map(content -> {
                    content.setYearLevel(updatedContent.getYearLevel());
                    content.setSemester(updatedContent.getSemester());
                    content.setCourseCode(updatedContent.getCourseCode());
                    content.setCourseDescription(updatedContent.getCourseDescription());
                    content.setLectureHours(updatedContent.getLectureHours());
                    content.setLaboratoryHours(updatedContent.getLaboratoryHours());
                    content.setUnit(updatedContent.getUnit());
                    content.setCurriculumId(updatedContent.getCurriculumId());
                    return ResponseEntity.ok(curriculumContentRepository.save(content));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCurriculumContent(@PathVariable Long id) {
        if (curriculumContentRepository.existsById(id)) {
            curriculumContentRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
} 