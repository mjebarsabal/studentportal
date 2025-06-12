package com.example.studentportal.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "program")
public class Program {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.AUTO)
    private Long ID;
    private String Program_code;
    private String Program_description;

    //Getters and Setters 
    public Long getID() {
        return ID;
    }
  
    public String getProgram_code() {
        return Program_code;
    }

    public void setProgram_code(String program_code) {
        Program_code = program_code;
    }

    public String getProgram_description() {
        return Program_description;
    }

    public void setProgram_description(String program_description) {
        Program_description = program_description;
    }

    
}
