package com.example.studentportal.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "course")
public class Course {
    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ID;
    private String Course_code;
    private String Course_description;
    private String Lec;
    private String Lab;
    private String Units;

    

    // Getters and Setters
    public Long getID() {
        return ID;
    }

    public String getCourse_code() {
        return Course_code;
    }

    public void setCourse_code(String course_code) {
        Course_code = course_code;
    }

    public String getCourse_description() {
        return Course_description;
    }

    public void setCourse_description(String course_description) {
        Course_description = course_description;
    }

    public String getLec() {
        return Lec;
    }

    public void setLec(String lec) {
        Lec = lec;
    }

    public String getLab() {
        return Lab;
    }

    public void setLab(String lab) {
        Lab = lab;
    }

    public String getUnits() {
        return Units;
    }

    public void setUnits(String units) {
        Units = units;
    }


}
