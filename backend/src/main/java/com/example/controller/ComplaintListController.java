package com.example.controller;

import com.example.model.ComplaintList;
import com.example.service.ComplaintListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/complaintlist")
@CrossOrigin(origins = "http://localhost:5173/") // Adjust frontend URL if needed
public class ComplaintListController {

    @Autowired
    private ComplaintListService complaintListService;

    // Fetch complaints for Admin Panel (with Serial No)
    @GetMapping("/admin-allcomplaints")
    public List<ComplaintList> getAllComplaints() {
        return complaintListService.getAllComplaints();
    }

    // Fetch complaints by flat number (User View)
    @GetMapping("/flat/{flatNo}")
    public List<ComplaintList> getComplaintsByFlatNo(@PathVariable String flatNo) {
        return complaintListService.getComplaintsByFlatNo(flatNo);
    }

    // Fetch full details of a complaint
    @GetMapping("/{id}")
    public Optional<ComplaintList> getComplaintById(@PathVariable String id) {
        return complaintListService.getComplaintById(id);
    }

    // Register a new complaint
    @PostMapping("/register-complaints")
    public ComplaintList registerComplaint(@RequestBody ComplaintList complaint) {
        return complaintListService.registerComplaint(complaint);
    }

    // Update status to CLOSED when admin clicks "Close"
    @PutMapping("/close/{id}")
    public ComplaintList closeComplaint(@PathVariable String id) {
        return complaintListService.updateComplaintStatus(id);
    }
}
