package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.Binary;
import java.util.Base64;

@Document(collection = "EventData") // MongoDB collection name
public class Eventdata {

    @Id
    private String id;
    private String name;
    private String date;
    private String description;
    private Binary image;

    // ✅ No-Args Constructor (Needed for Spring & MongoDB)
    public Eventdata() {}

    // ✅ Parameterized Constructor (With All Fields)
    public Eventdata(String name, String date, String description, Binary image) {
        this.name = name;
        this.date = date;
        this.description = description;
        this.image = image;
    }

    // ✅ Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Binary getImage() { return image; }
    public void setImage(Binary image) { this.image = image; }

    public String getImageBase64() {
        return (this.image != null && this.image.getData().length > 0) 
            ? Base64.getEncoder().encodeToString(this.image.getData()) 
            : "";
    }
}
