// package com.example.controller;

// import com.example.model.Feedback;
// import com.example.repository.FeedbackRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Optional;

// @RestController
// @RequestMapping("/feedbacks")
// @CrossOrigin(origins = "http://localhost:5173")  // Allow frontend access
// public class FeedbackController {

//     @Autowired
//     private FeedbackRepository feedbackRepository;

//     // ✅ Get all feedback
//     @GetMapping
//     public ResponseEntity<List<Feedback>> getAllFeedbacks() {
//         return ResponseEntity.ok(feedbackRepository.findAll());
//     }

//     // ✅ Get feedback for a specific event
//     @GetMapping("/event/{eventId}")
//     public ResponseEntity<List<Feedback>> getFeedbackByEventId(@PathVariable String eventId) {
//         List<Feedback> feedbacks = feedbackRepository.findByEventId(eventId);
//         return ResponseEntity.ok(feedbacks);
//     }

//     // ✅ Get a specific feedback by ID
//     @GetMapping("/{id}")
//     public ResponseEntity<Feedback> getFeedbackById(@PathVariable String id) {
//         Optional<Feedback> feedback = feedbackRepository.findById(id);
//         return feedback.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//     }

//     // ✅ Post new feedback
//     @PostMapping
//     public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
//         Feedback savedFeedback = feedbackRepository.save(feedback);
//         return ResponseEntity.ok(savedFeedback);
//     }

//     // ✅ Delete feedback by ID
//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deleteFeedback(@PathVariable String id) {
//         if (feedbackRepository.existsById(id)) {
//             feedbackRepository.deleteById(id);
//             return ResponseEntity.noContent().build();
//         }
//         return ResponseEntity.notFound().build();
//     }
// }



package com.example.controller;

import com.example.model.Feedback;
import com.example.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/feedbacks")
@CrossOrigin(origins = "http://localhost:5173")  // Allow frontend access
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // ✅ Get all feedback
    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        return ResponseEntity.ok(feedbackRepository.findAll());
    }

    // ✅ Get feedback for a specific event
    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Feedback>> getFeedbackByEventId(@PathVariable String eventId) {
        List<Feedback> feedbacks = feedbackRepository.findByEventId(eventId);
        return ResponseEntity.ok(feedbacks);
    }

    // ✅ Get a specific feedback by ID
    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable String id) {
        Optional<Feedback> feedback = feedbackRepository.findById(id);
        return feedback.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Post new feedback (includes username)
    @PostMapping
    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
        Feedback savedFeedback = feedbackRepository.save(feedback);
        return ResponseEntity.ok(savedFeedback);
    }

    // ✅ Delete feedback by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable String id) {
        if (feedbackRepository.existsById(id)) {
            feedbackRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
