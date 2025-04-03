package com.example.controller;

import com.example.model.Complaint;
import com.example.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/complaints")
// @RequestMapping("/usersdata")
@CrossOrigin(origins = "http://localhost:5173/") // Adjust for frontend

public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @PostMapping("/add-complaints")
    public Complaint addComplaint(@RequestBody Complaint complaint) {
        return complaintService.saveComplaint(complaint);
    }

    @GetMapping("/all-complaints")
    public List<Complaint> getAllComplaints() {
        return complaintService.getAllComplaints();
    }

    @GetMapping("/title/{title}")
    public List<Complaint> getComplaintsByTitle(@PathVariable String title) {
        return complaintService.getComplaintsByTitle(title);
    }

    @PutMapping("/update/{id}")
    public Complaint updateComplaint(@PathVariable String id, @RequestBody Complaint updatedComplaint) {
        return complaintService.updateComplaint(id, updatedComplaint);
    }
}
