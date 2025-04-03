package com.example.repository;

import com.example.model.ComplaintList;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintListRepository extends MongoRepository<ComplaintList, String> {
    List<ComplaintList> findByFlatNo(String flatNo);
}
