package com.example.studentportal.Controller;

import com.example.studentportal.Entity.Faculty;
import com.example.studentportal.Repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/faculty")
public class FacultyController {
    @Autowired
    private FacultyRepository facultyRepository;

    @GetMapping
    public Iterable<Faculty> getAllFaculty() {
        return facultyRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Faculty> getFacultyById(@PathVariable Long id) {
        Optional<Faculty> faculty = facultyRepository.findById(id);
        return faculty.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Faculty addFaculty(@RequestBody Faculty faculty) {
        return facultyRepository.save(faculty);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Faculty> updateFaculty(@PathVariable Long id, @RequestBody Faculty updatedFaculty) {
        return facultyRepository.findById(id)
                .map(faculty -> {
                    faculty.setFaculty_ID(updatedFaculty.getFaculty_ID());
                    faculty.setName(updatedFaculty.getName());
                    faculty.setEmail(updatedFaculty.getEmail());
                    faculty.setContact(updatedFaculty.getContact());
                    faculty.setDepartment(updatedFaculty.getDepartment());
                    faculty.setPassword(updatedFaculty.getPassword());
                    return ResponseEntity.ok(facultyRepository.save(faculty));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFaculty(@PathVariable Long id) {
        if (facultyRepository.existsById(id)) {
            facultyRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public List<Faculty> searchFacultyByNameOrEmail(@RequestParam String query) {
        return facultyRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(query, query);
    }

    @GetMapping("/count")
    public long countFaculty() {
        return facultyRepository.count();
    }
}
