package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "complaint_list")
public class ComplaintList {

    @Id
    private String id;
    private String name;
    private String flatNo;
    private String complaintTitle;
    private String complaintDetails;
    private String status;

    public ComplaintList() {
        this.status = "OPEN"; // Default status when complaint is registered
    }

    public ComplaintList(String name, String flatNo, String complaintTitle, String complaintDetails) {
        this.name = name;
        this.flatNo = flatNo;
        this.complaintTitle = complaintTitle;
        this.complaintDetails = complaintDetails;
        this.status = "OPEN";
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFlatNo() {
        return flatNo;
    }

    public void setFlatNo(String flatNo) {
        this.flatNo = flatNo;
    }

    public String getComplaintTitle() {
        return complaintTitle;
    }

    public void setComplaintTitle(String complaintTitle) {
        this.complaintTitle = complaintTitle;
    }

    public String getComplaintDetails() {
        return complaintDetails;
    }

    public void setComplaintDetails(String complaintDetails) {
        this.complaintDetails = complaintDetails;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
