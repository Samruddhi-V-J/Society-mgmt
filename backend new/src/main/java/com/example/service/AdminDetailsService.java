package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.model.AdminDetails;
import com.example.repository.AdminDetailsRepository;
import java.util.List;
import java.util.Optional;

@Service
public class AdminDetailsService {

    @Autowired
    private AdminDetailsRepository adminDetailsRepository;

    // Save Admin Details
    public AdminDetails saveAdminDetails(AdminDetails adminDetails) {
        return adminDetailsRepository.save(adminDetails);
    }

    // Get all Admin Details
    public List<AdminDetails> getAllAdminDetails() {
        return adminDetailsRepository.findAll();
    }
    
    // Get Admin by Email
    public Optional<AdminDetails> getAdminByEmail(String email) {
        return adminDetailsRepository.findByEmail(email);
    }
    

}
