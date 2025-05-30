package com.example.studentportal;

import jakarta.persistence.Column;
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

    @Column(name = "ID")
    private Long ID;

    @Column(name = "Student_ID")
    private String StudentID;

    @Column(name = "Last_Name")
    private String LastName;

    @Column(name = "First_Name")
    private String FirstName;

    @Column(name = "Middle_Initial")
    private String MiddleInitial;

    @Column(name = "Email")
    private String Email;

    @Column(name = "Contact_Number")
    private String ContactNumber;

    @Column(name = "Password")
    private String Password;

    @Column(name = "Program")
    private String Program;

    @Column(name = "Year")
    private String Year;

    @Column(name = "Section")
    private String Section;

    @Column(name = "Sex")
    private String Sex;

    @Column(name = "Birthday")
    private String Birthday;

    @Column(name = "Address")
    private String Address;

    public Long getID() {
        return ID;
    }
    
    public String getStudent_ID() {
        return StudentID;
    }
    public void setStudent_ID(String student_ID) {
        StudentID = student_ID;
    }
    public String getLastName() {
        return LastName;
    }
    public void setLastName(String lastName) {
        LastName = lastName;
    }
    public String getFirstName() {
        return FirstName;
    }
    public void setFirstName(String firstName) {
        FirstName = firstName;
    }
    public String getMiddleInitial() {
        return MiddleInitial;
    }
    public void setMiddleInitial(String middleInitial) {
        MiddleInitial = middleInitial;
    }
    public String getEmail() {
        return Email;
    }
    public void setEmail(String email) {
        Email = email;
    }
    public String getContactNumber() {
        return ContactNumber;
    }
    public void setContactNumber(String contactNumber) {
        ContactNumber = contactNumber;
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
