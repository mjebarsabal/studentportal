package com.example.studentportal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class FacultyController {
    @Autowired
    private FacultyRepository facultyRepository;

    @GetMapping("/getFaculty")
    public @ResponseBody Iterable<Faculty> getFaculty() {
        return facultyRepository.findAll();
    }

    // @GetMapping(path = "/faculty/count")
    // public ResponseEntity<Long> getFacultyCount() {
    // long count = facultyRepository.count();
    // return ResponseEntity.ok(count);
    // }

    @PostMapping("/faculty/add")
    public @ResponseBody String postMethod(@RequestBody Faculty faculty) {
        Faculty fac = new Faculty();
        fac.setFaculty_ID(faculty.getFaculty_ID());
        fac.setName(faculty.getName());
        fac.setEmail(faculty.getEmail());
        fac.setContact(faculty.getContact());
        fac.setPassword(faculty.getPassword());
        fac.setDepartment(faculty.getDepartment());

        facultyRepository.save(fac);
        return "Faculty added successfully!";
    }

}
