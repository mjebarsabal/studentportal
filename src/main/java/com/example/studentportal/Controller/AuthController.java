package com.example.studentportal.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");
        Map<String, Object> response = new HashMap<>();

        // Hardcoded admin credentials
        if ("admin@s-tech.com".equals(email) && "adminstu".equals(password)) {
            response.put("success", true);
            response.put("role", "ADMIN");
            response.put("email", email);
            response.put("firstName", "Admin");
            response.put("lastName", "User");
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Invalid credentials");
            return ResponseEntity.status(401).body(response);
        }
    }
} 