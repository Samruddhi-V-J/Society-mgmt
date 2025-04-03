// package com.example.model;

// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;

// @Document(collection = "feedbacks")  // MongoDB collection name
// public class Feedback {

//     @Id
//     private String id;
//     private String eventId;
//     private String text;
//     private int rating;

//     // Constructors
//     public Feedback() {}

//     public Feedback(String eventId, String text, int rating) {
//         this.eventId = eventId;
//         this.text = text;
//         this.rating = rating;
//     }

//     // Getters and Setters
//     public String getId() {
//         return id;
//     }

//     public void setId(String id) {
//         this.id = id;
//     }

//     public String getEventId() {
//         return eventId;
//     }

//     public void setEventId(String eventId) {
//         this.eventId = eventId;
//     }

//     public String getText() {
//         return text;
//     }

//     public void setText(String text) {
//         this.text = text;
//     }

//     public int getRating() {
//         return rating;
//     }

//     public void setRating(int rating) {
//         this.rating = rating;
//     }
// }



package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "feedbacks")
public class Feedback {

    @Id
    private String id;
    private String eventId;
    private String username; // ✅ Store username
    private String text;
    private int rating;

    // Constructors
    public Feedback() {}

    public Feedback(String eventId, String username, String text, int rating) {
        this.eventId = eventId;
        this.username = username;
        this.text = text;
        this.rating = rating;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEventId() { return eventId; }
    public void setEventId(String eventId) { this.eventId = eventId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }
}
