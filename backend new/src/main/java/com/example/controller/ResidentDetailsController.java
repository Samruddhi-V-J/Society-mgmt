package com.example.controller;

import com.example.model.ResidentDetails;
import com.example.repository.ResidentDetailsRepository;
import com.example.service.ResidentDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usersdata")
@CrossOrigin(origins = "http://localhost:5173/") // Adjust for frontend

public class ResidentDetailsController {

    @Autowired
    private ResidentDetailsService residentDetailsService;
    @Autowired
    private ResidentDetailsRepository residentDetailsRepository;

    // Add new resident
    @PostMapping("/add-resident")
     public ResponseEntity<?> addResident(@RequestBody ResidentDetails residentDetails) {
        try {
            ResidentDetails savedResident = residentDetailsRepository.save(residentDetails);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedResident);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving resident details.");
        }
    }

    // ✅ Get Resident Details by Email
    @GetMapping("/by-email")
    public ResponseEntity<?> getResidentByEmail(@RequestParam String email) {
        Optional<ResidentDetails> resident = residentDetailsRepository.findByEmail(email);
        if (resident.isPresent()) {
            return ResponseEntity.ok(resident.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resident not found for email: " + email);
        }
    }

     // ✅ Update Resident Details
     @PutMapping("/update/{id}")
     public ResponseEntity<?> updateResident(@PathVariable String id, @RequestBody ResidentDetails updatedResident) {
         Optional<ResidentDetails> existingResident = residentDetailsRepository.findById(id);
         if (existingResident.isPresent()) {
             ResidentDetails resident = existingResident.get();
             resident.setName(updatedResident.getName());
             resident.setPhone(updatedResident.getPhone());
             resident.setSocietyName(updatedResident.getSocietyName());
             resident.setFlatNo(updatedResident.getFlatNo());
             resident.setPostal(updatedResident.getPostal());
 
             residentDetailsRepository.save(resident);
             return ResponseEntity.ok(resident);
         } else {
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resident not found with ID: " + id);
         }
     }
 
     // ✅ Delete Resident by ID
     @DeleteMapping("/delete/{id}")
     public ResponseEntity<?> deleteResident(@PathVariable String id) {
         if (residentDetailsRepository.existsById(id)) {
             residentDetailsRepository.deleteById(id);
             return ResponseEntity.ok("Resident deleted successfully.");
         } else {
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resident not found with ID: " + id);
         }
     }

    // Get all residents
    @GetMapping("/resident-all")
    public List<ResidentDetails> getAllResidents() {
        return residentDetailsService.getAllResidents();
    }

    // Get residents by society name
    @GetMapping("/society/{societyName}")
    public List<ResidentDetails> getResidentsBySociety(@PathVariable String societyName) {
        return residentDetailsService.getResidentsBySociety(societyName);
    }

    // Get resident by ID
    @GetMapping("/{id}")
    public Optional<ResidentDetails> getResidentById(@PathVariable String id) {
        return residentDetailsService.getResidentById(id);
    }
}









// package com.example.controller;

// import com.example.model.ResidentDetails;
// import com.example.service.ResidentDetailsService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Optional;

// @RestController
// @RequestMapping("/usersdata")
// @CrossOrigin(origins = "http://localhost:5173/") // Adjust for frontend

// public class ResidentDetailsController {

//     @Autowired
//     private ResidentDetailsService residentDetailsService;

//     // Add new resident
//     @PostMapping("/add-resident")
//     public ResidentDetails addResident(@RequestBody ResidentDetails resident) {
//         return residentDetailsService.addResident(resident);
//     }

//     // Get all residents
//     @GetMapping("/resident-all")
//     public List<ResidentDetails> getAllResidents() {
//         return residentDetailsService.getAllResidents();
//     }

//     // Get residents by society name
//     @GetMapping("/society/{societyName}")
//     public List<ResidentDetails> getResidentsBySociety(@PathVariable String societyName) {
//         return residentDetailsService.getResidentsBySociety(societyName);
//     }

//     // Get resident by ID
//     @GetMapping("/{id}")
//     public Optional<ResidentDetails> getResidentById(@PathVariable String id) {
//         return residentDetailsService.getResidentById(id);
//     }
// }

