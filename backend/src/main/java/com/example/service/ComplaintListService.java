package com.example.service;

import com.example.model.ComplaintList;
import com.example.repository.ComplaintListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class ComplaintListService {

    @Autowired
    private ComplaintListRepository complaintListRepository;

    // Fetch all complaints for the admin panel with serial numbers
    public List<ComplaintList> getAllComplaints() {
        List<ComplaintList> complaints = complaintListRepository.findAll();

        // Assign serial numbers dynamically based on insertion order
        return IntStream.range(0, complaints.size())
                .mapToObj(i -> {
                    ComplaintList c = complaints.get(i);
                    c.setId(String.valueOf(i + 1)); // Assign Serial No dynamically
                    return c;
                }).collect(Collectors.toList());
    }

    // Fetch complaints by flat number (for logged-in user)
    public List<ComplaintList> getComplaintsByFlatNo(String flatNo) {
        return complaintListRepository.findByFlatNo(flatNo);
    }

    // Fetch complaint details by ID
    public Optional<ComplaintList> getComplaintById(String id) {
        return complaintListRepository.findById(id);
    }

    // Register a new complaint
    public ComplaintList registerComplaint(ComplaintList complaint) {
        return complaintListRepository.save(complaint);
    }

    // Update complaint status to "CLOSED"
    public ComplaintList updateComplaintStatus(String id) {
        Optional<ComplaintList> complaintOpt = complaintListRepository.findById(id);
        if (complaintOpt.isPresent()) {
            ComplaintList complaint = complaintOpt.get();
            complaint.setStatus("CLOSED");
            return complaintListRepository.save(complaint);
        }
        return null;
    }
}
