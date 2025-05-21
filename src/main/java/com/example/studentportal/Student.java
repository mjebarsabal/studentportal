package com.example.studentportal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

  
    private Long ID;
    private String Student_ID;
    private String Last_Name;
    private String First_Name;
    private String Middle_Initial;
    private String Email;
    private String Contact_Number;
    private String Password;
    private String Program;
    private String Year;
    private String Section;
    private String Sex;
    private String Birthday;
    private String Address;

    public Long getID() {
        return ID;
    }
    
    public String getStudent_ID() {
        return Student_ID;
    }
    public void setStudent_ID(String student_ID) {
        Student_ID = student_ID;
    }
    public String getLast_Name() {
        return Last_Name;
    }
    public void setLast_Name(String last_Name) {
        Last_Name = last_Name;
    }
    public String getFirst_Name() {
        return First_Name;
    }
    public void setFirst_Name(String first_Name) {
        First_Name = first_Name;
    }
    public String getMiddle_Name() {
        return Middle_Initial;
    }
    public void setMiddle_Name(String middle_Name) {
        Middle_Initial = middle_Name;
    }
    public String getEmail() {
        return Email;
    }
    public void setEmail(String email) {
        Email = email;
    }
    public String getContact_Number() {
        return Contact_Number;
    }
    public void setContact_Number(String contact_Number) {
        Contact_Number = contact_Number;
    }
    public String getPassword() {
        return Password;
    }
    public void setPassword(String password) {
        Password = password;
    }
    public String getProgram() {
        return Program;
    }
    public void setProgram(String program) {
         Program = program;
    }
    public String getYear() {
        return Year;
    }
    public void setYear(String year) {
        Year = year;
    }
    public String getSection() {
        return Section;
    }
    public void setSection(String section) {
        Section = section;
    }
    public String getSex() {
        return Sex;
    }
    public void setSex(String sex) {
        Sex = sex;
    }
    public String getBirthday() {
        return Birthday;
    }
    public void setBirthday(String birthday) {
        Birthday = birthday;
    }
    public String getAddress() {
        return Address;
    }
    public void setAddress(String address) {
        Address = address;
    }



}
