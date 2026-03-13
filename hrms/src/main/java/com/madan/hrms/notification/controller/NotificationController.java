package com.madan.hrms.notification.controller;

import com.madan.hrms.notification.dto.NotificationDTO;
import com.madan.hrms.notification.service.NotificationService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins="*")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService){
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<NotificationDTO> getNotifications(){
        return notificationService.getAllNotifications();
    }

    @PostMapping
    public NotificationDTO createNotification(@RequestBody NotificationDTO dto){
        return notificationService.createNotification(dto);
    }

    @DeleteMapping("/{id}")
    public void deleteNotification(@PathVariable Long id){
        notificationService.deleteNotification(id);
    }
}