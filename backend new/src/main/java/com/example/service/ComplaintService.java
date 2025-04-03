package com.example.service;

import com.example.model.Complaint;
import com.example.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    public Complaint saveComplaint(Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    public List<Complaint> getComplaintsByTitle(String title) {
        return complaintRepository.findByTitle(title);
    }

    public Complaint updateComplaint(String id, Complaint updatedComplaint) {
        Optional<Complaint> existingComplaintOpt = complaintRepository.findById(id);
        if (existingComplaintOpt.isPresent()) {
            Complaint existingComplaint = existingComplaintOpt.get();
            existingComplaint.setTitle(updatedComplaint.getTitle());
            existingComplaint.setDescription(updatedComplaint.getDescription());
            existingComplaint.setStatus(updatedComplaint.getStatus());
            return complaintRepository.save(existingComplaint);
        }
        return null;
    }
}
