package com.example.studentportal.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "curriculum_content")
public class CurriculumContent {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String yearLevel;
    private String semester;
    private String courseCode;
    private String courseDescription;
    private int lectureHours;
    private int laboratoryHours;
    private int unit;
    private Long curriculumId; // Reference to Curriculum

    // Getters and Setters
    public Long getId() { return id; }
    public String getYearLevel() { return yearLevel; }
    public void setYearLevel(String yearLevel) { this.yearLevel = yearLevel; }
    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }
    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }
    public String getCourseDescription() { return courseDescription; }
    public void setCourseDescription(String courseDescription) { this.courseDescription = courseDescription; }
    public int getLectureHours() { return lectureHours; }
    public void setLectureHours(int lectureHours) { this.lectureHours = lectureHours; }
    public int getLaboratoryHours() { return laboratoryHours; }
    public void setLaboratoryHours(int laboratoryHours) { this.laboratoryHours = laboratoryHours; }
    public int getUnit() { return unit; }
    public void setUnit(int unit) { this.unit = unit; }
    public Long getCurriculumId() { return curriculumId; }
    public void setCurriculumId(Long curriculumId) { this.curriculumId = curriculumId; }
} 