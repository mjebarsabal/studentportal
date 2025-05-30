package com.example.studentportal;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;



@Controller
public class StudentController{
    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/login")
    public String login() {
        return "/index.html";
    }

    @GetMapping("/getStudents")
    public @ResponseBody Iterable<Student> getStudents() {
        return studentRepository.findAll();
    }

    @GetMapping(path = "/student/count")
    public ResponseEntity<Long> getStudentCount() {
    long count = studentRepository.count();
    return ResponseEntity.ok(count);
    }

    // @GetMapping("/student/{studentID}")
    // public ResponseEntity<Student> getStudentById(@PathVariable String studentID) {
    // Optional<Student> student = studentRepository.findByStudentID(studentID);
    // if (student.isPresent()) {
    //     return ResponseEntity.ok(student.get());
    // } else {
    //     return ResponseEntity.notFound().build();
    // }
    // }


    @PostMapping("/student/add")
    public @ResponseBody String postMethod(@RequestBody Student student) {
        Student stud = new Student();
        stud.setStudent_ID(student.getStudent_ID());
        stud.setLastName(student.getLastName());
        stud.setFirstName(student.getFirstName());
        stud.setMiddleInitial(student.getMiddleInitial());
        stud.setEmail(student.getEmail());
        stud.setContactNumber(student.getContactNumber());
        stud.setPassword(student.getPassword());
        stud.setProgram(student.getProgram());
        stud.setYear(student.getYear());
        stud.setSection(student.getSection());
        stud.setSex(student.getSex());
        stud.setBirthday(student.getBirthday());
        stud.setAddress(student.getAddress());
    

        studentRepository.save(stud);
        return "Student added successfully!";
    }
    

}