package com.example.studentportal.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "curriculum")
public class Curriculum {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String curriculumCode;
    private String programCode; // Reference to Program
    private int yearStarted;
    private String description;

    // Getters and Setters
    public Long getId() { return id; }
    public String getCurriculumCode() { return curriculumCode; }
    public void setCurriculumCode(String curriculumCode) { this.curriculumCode = curriculumCode; }
    public String getProgramCode() { return programCode; }
    public void setProgramCode(String programCode) { this.programCode = programCode; }
    public int getYearStarted() { return yearStarted; }
    public void setYearStarted(int yearStarted) { this.yearStarted = yearStarted; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
} 