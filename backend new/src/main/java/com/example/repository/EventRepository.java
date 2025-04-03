package com.example.repository;

import com.example.model.Eventdata;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EventRepository extends MongoRepository<Eventdata, String> {
    // Basic CRUD operations are automatically provided by MongoRepository
    // You can add custom query methods here if needed

    Optional<Eventdata> findTopByOrderByDateDesc(); // Find the most recent event

}



// package com.example.repository;


// import com.example.model.Event;
// import org.springframework.data.mongodb.repository.MongoRepository;
// import org.springframework.stereotype.Repository;

// @Repository
// public interface EventsRepository extends MongoRepository<Event, String> {
// }