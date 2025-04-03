// Controller - NoticeController.java
package com.example.controller;

import com.example.model.Notice;
import com.example.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/notices")
@CrossOrigin(origins = "http://localhost:5173/") // Adjust for frontend


public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    // Create Notice
    @PostMapping
    public ResponseEntity<Notice> createNotice(@RequestBody Notice notice) {
        Notice savedNotice = noticeService.saveNotice(notice);
        return ResponseEntity.ok(savedNotice);
    }

    // Get All Notices
    @GetMapping
    public ResponseEntity<List<Notice>> getAllNotices() {
        List<Notice> notices = noticeService.getAllNotices();
        return ResponseEntity.ok(notices);
    }

    // Get Notice by ID
    @GetMapping("/{id}")
    public ResponseEntity<Notice> getNoticeById(@PathVariable String id) {
        Optional<Notice> notice = noticeService.getNoticeById(id);
        return notice.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete Notice by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNotice(@PathVariable String id) {
        noticeService.deleteNotice(id);
        return ResponseEntity.ok("Notice deleted successfully.");
    }
}
