package com.example.service;

import com.example.model.Notice;
import com.example.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoticeService {

    @Autowired
    private NoticeRepository noticeRepository;

    public Notice saveNotice(Notice notice) {
        return noticeRepository.save(notice);
    }

    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    public Optional<Notice> getNoticeById(String id) {
        return noticeRepository.findById(id);
    }

    public void deleteNotice(String id) {
        noticeRepository.deleteById(id);
    }
} 
