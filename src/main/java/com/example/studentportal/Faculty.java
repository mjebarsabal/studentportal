package com.example.studentportal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "faculty")

public class Faculty {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

  
    private Long ID;
    private String Name;
    private String Email;
    private String Contact;
    private String Department;
    private String Password;
    public Long getID() {
        return ID;
    }
    private String Faculty_ID;
    public String getFaculty_ID() {
        return Faculty_ID;
    }
    public void setFaculty_ID(String faculty_ID) {
        Faculty_ID = faculty_ID;
    }
    public String getName() {
        return Name;
    }
    public void setName(String name) {
        Name = name;
    }
    public String getEmail() {
        return Email;
    }
    public void setEmail(String email) {
        Email = email;
    }
    public String getContact() {
        return Contact;
    }
    public void setContact(String contact) {
        Contact = contact;
    }
    public String getDepartment() {
        return Department;
    }
    public void setDepartment(String department) {
        Department = department;
    }
    public String getPassword() {
        return Password;
    }
    public void setPassword(String password) {
        Password = password;
    }

}
