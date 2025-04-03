package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.model.AdminDetails;
import com.example.service.AdminDetailsService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usersdata")
@CrossOrigin(origins = "http://localhost:5173/") // Adjust for frontend

public class AdminDetailsController {

    @Autowired
    private AdminDetailsService adminDetailsService;

    // Endpoint to Register Admin Details
    @PostMapping("/admin-register")
    public AdminDetails registerAdmin(@RequestBody AdminDetails adminDetails) {
        return adminDetailsService.saveAdminDetails(adminDetails);
    }

    // Endpoint to Get All Admins
    @GetMapping("/admin-all")
    public List<AdminDetails> getAllAdmins() {
        return adminDetailsService.getAllAdminDetails();
    }
    
    @GetMapping("/email/{email}")
    public Optional<AdminDetails> getAdminByEmail(@PathVariable String email) {
        return adminDetailsService.getAdminByEmail(email);
    }
}
