package com.example.service;

import com.example.model.ResidentDetails;
import com.example.repository.ResidentDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ResidentDetailsService {

    @Autowired
    private ResidentDetailsRepository residentDetailsRepository;

    // Add new resident
    // public ResidentDetails addResident(ResidentDetails resident) {
    //     return residentDetailsRepository.save(resident);
    // }

    public String addResident(ResidentDetails resident) {
        residentDetailsRepository.save(resident);
        return "Resident details added successfully";
    }

    public Optional<ResidentDetails> findByEmail(String email) {
        return residentDetailsRepository.findByEmail(email);
    }
    
    // Get all residents
    public List<ResidentDetails> getAllResidents() {
        return residentDetailsRepository.findAll();
    }

    // Get residents by society name
    public List<ResidentDetails> getResidentsBySociety(String societyName) {
        return residentDetailsRepository.findBySocietyName(societyName);
    }

    // Get resident by ID
    public Optional<ResidentDetails> getResidentById(String id) {
        return residentDetailsRepository.findById(id);
    }
}
