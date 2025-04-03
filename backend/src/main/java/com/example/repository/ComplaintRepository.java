package com.example.repository;

import com.example.model.Complaint;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintRepository extends MongoRepository<Complaint, String> {
     List<Complaint> findByTitle(String title);
}
