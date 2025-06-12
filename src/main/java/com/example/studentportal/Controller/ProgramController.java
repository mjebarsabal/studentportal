package com.example.studentportal.Controller;

import com.example.studentportal.Entity.Program;
import com.example.studentportal.Repository.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/programs")
public class ProgramController {
    @Autowired
    private ProgramRepository programRepository;

    @GetMapping
    public Iterable<Program> getAllPrograms() {
        return programRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Program> getProgramById(@PathVariable Long id) {
        Optional<Program> program = programRepository.findById(id);
        return program.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Program addProgram(@RequestBody Program program) {
        return programRepository.save(program);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Program> updateProgram(@PathVariable Long id, @RequestBody Program updatedProgram) {
        return programRepository.findById(id)
                .map(program -> {
                    program.setProgram_code(updatedProgram.getProgram_code());
                    program.setProgram_description(updatedProgram.getProgram_description());
                    return ResponseEntity.ok(programRepository.save(program));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProgram(@PathVariable Long id) {
        if (programRepository.existsById(id)) {
            programRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/count")
    public long countPrograms() {
        return programRepository.count();
    }
} 