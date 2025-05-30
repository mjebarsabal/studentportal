package com.example.studentportal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CourseController {
    @Autowired
    private CourseRepository courseRepository;

    // Method to get all courses
    @GetMapping("/getCourses")
    public @ResponseBody Iterable<Course> getCourses() {
        return courseRepository.findAll();
    }

}
