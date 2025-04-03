package com.example.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import com.example.model.AdminDetails;
import java.util.Optional;

public interface AdminDetailsRepository extends MongoRepository<AdminDetails, String> {

    @Query("{ 'email' : ?0 }")  // Ensure field name matches the model
    Optional<AdminDetails> findByEmail(String email);
}
