package com.example.studentportal.Controller;

import com.example.studentportal.Entity.Student;
import com.example.studentportal.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public Iterable<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentRepository.findById(id);
        return student.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student updatedStudent) {
        return studentRepository.findById(id)
                .map(student -> {
                    // student.setStudent_ID(updatedStudent.getStudent_ID()); // Student ID should not be updated
                    student.setLastName(updatedStudent.getLastName());
                    student.setFirstName(updatedStudent.getFirstName());
                    student.setMiddleInitial(updatedStudent.getMiddleInitial());
                    student.setEmail(updatedStudent.getEmail());
                    student.setContactNumber(updatedStudent.getContactNumber());
                    student.setPassword(updatedStudent.getPassword());
                    student.setProgram(updatedStudent.getProgram());
                    student.setYear(updatedStudent.getYear());
                    student.setSection(updatedStudent.getSection());
                    student.setSex(updatedStudent.getSex());
                    student.setBirthday(updatedStudent.getBirthday());
                    student.setAddress(updatedStudent.getAddress());
                    student.setEnabled(updatedStudent.isEnabled());
                    return ResponseEntity.ok(studentRepository.save(student));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public List<Student> searchStudentsByName(@RequestParam String name) {
        return studentRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(name, name);
    }

    @GetMapping("/count")
    public long countStudents() {
        return studentRepository.count();
    }
}