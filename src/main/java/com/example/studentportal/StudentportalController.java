package com.example.studentportal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class StudentportalController{
    @Autowired
    private StudentRepository studentRepository;

    // @RequestMapping("/restapi")
    // public String index() {
    //     return "Greetings from Spring Boot!";
    // }
    @GetMapping("/home")
    public String home() {
        return "/web.html";
    }

    @GetMapping("/getStudents")
    public @ResponseBody Iterable<Student> getStudents() {
        return studentRepository.findAll();
    }

    @PostMapping("/addStudent")
    public @ResponseBody String postMethod(@RequestBody Student student) {
        Student stud = new Student();
        stud.setStudent_ID(student.getStudent_ID());
        stud.setLast_Name(student.getLast_Name());
        stud.setFirst_Name(student.getFirst_Name());
        stud.setMiddle_Name(student.getMiddle_Name());
        stud.setEmail(student.getEmail());
        stud.setContact_Number(student.getContact_Number());
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