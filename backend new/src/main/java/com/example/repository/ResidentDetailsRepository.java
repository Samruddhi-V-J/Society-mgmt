package com.example.repository;

import com.example.model.ResidentDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface ResidentDetailsRepository extends MongoRepository<ResidentDetails, String> {
    List<ResidentDetails> findBySocietyName(String societyName);
    Optional<ResidentDetails> findByName(String name); // Fetch ResidentDetails by name
   Optional<ResidentDetails> findByEmail(String email);
}