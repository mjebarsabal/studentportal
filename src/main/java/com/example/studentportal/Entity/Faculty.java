package com.example.studentportal.Entity;

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
    private String name;
    private String email;
    private String Contact;
    private String Department;
    private String Password;
    private boolean enabled = true;
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
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
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
    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }

}
