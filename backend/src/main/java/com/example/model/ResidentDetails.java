
package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "residents")
public class ResidentDetails {
    @Id
    private String id;
    private String email;
    private String name;
    private String phone;
    private String societyName;
    private String flatNo;
    private String postal;

    // Default Constructor
    public ResidentDetails() {}

    // Parameterized Constructor
    public ResidentDetails(String id, String email, String name, String phone, String societyName, String flatNo, String postal) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.societyName = societyName;
        this.flatNo = flatNo;
        this.postal = postal;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSocietyName() {
        return societyName;
    }

    public void setSocietyName(String societyName) {
        this.societyName = societyName;
    }

    public String getFlatNo() {
        return flatNo;
    }

    public void setFlatNo(String flatNo) {
        this.flatNo = flatNo;
    }

    public String getPostal() {
        return postal;
    }

    public void setPostal(String postal) {
        this.postal = postal;
    }
}


// package com.example.model;

// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;

// @Document(collection = "residents") // MongoDB Collection Name
// public class ResidentDetails {

//     @Id
//     private String id;
//     private String name;
//     private String phone;
//     private String societyName;
//     private String flatNo;
//     private String postal;

//     // Constructors
//     public ResidentDetails() {}

//     public ResidentDetails(String name, String phone, String societyName, String flatNo, String postal) {
//         this.name = name;
//         this.phone = phone;
//         this.societyName = societyName;
//         this.flatNo = flatNo;
//         this.postal = postal;
//     }

//     // Getters and Setters
//     public String getId() { return id; }
//     public void setId(String id) { this.id = id; }
    
//     public String getName() { return name; }
//     public void setName(String name) { this.name = name; }
    
//     public String getPhone() { return phone; }
//     public void setPhone(String phone) { this.phone = phone; }

//     public String getSocietyName() { return societyName; }
//     public void setSocietyName(String societyName) { this.societyName = societyName; }

//     public String getFlatNo() { return flatNo; }
//     public void setFlatNo(String flatNo) { this.flatNo = flatNo; }

//     public String getPostal() { return postal; }
//     public void setPostal(String postal) { this.postal = postal; }
// }
