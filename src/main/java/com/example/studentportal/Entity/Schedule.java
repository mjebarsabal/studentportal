package com.example.studentportal.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "schedule")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String schoolYear;
    private String semester;
    private String programCode;
    private String section;
    private String courseCode;
    private String description;
    private int lectureHours;
    private int laboratoryHours;
    private int units;
    private String day;
    private String time;
    private String room;
    private String facultyName;

    // Getters and Setters
    public Long getId() { return id; }
    public String getSchoolYear() { return schoolYear; }
    public void setSchoolYear(String schoolYear) { this.schoolYear = schoolYear; }
    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }
    public String getProgramCode() { return programCode; }
    public void setProgramCode(String programCode) { this.programCode = programCode; }
    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }
    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public int getLectureHours() { return lectureHours; }
    public void setLectureHours(int lectureHours) { this.lectureHours = lectureHours; }
    public int getLaboratoryHours() { return laboratoryHours; }
    public void setLaboratoryHours(int laboratoryHours) { this.laboratoryHours = laboratoryHours; }
    public int getUnits() { return units; }
    public void setUnits(int units) { this.units = units; }
    public String getDay() { return day; }
    public void setDay(String day) { this.day = day; }
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    public String getRoom() { return room; }
    public void setRoom(String room) { this.room = room; }
    public String getFacultyName() { return facultyName; }
    public void setFacultyName(String facultyName) { this.facultyName = facultyName; }
} 