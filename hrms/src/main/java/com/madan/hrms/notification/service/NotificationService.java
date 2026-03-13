package com.madan.hrms.notification.service;

import com.madan.hrms.notification.dto.NotificationDTO;
import com.madan.hrms.notification.entity.Notification;
import com.madan.hrms.notification.repository.NotificationRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository){
        this.notificationRepository = notificationRepository;
    }

    public List<NotificationDTO> getAllNotifications(){

        return notificationRepository.findAll()
                .stream()
                .map(n -> new NotificationDTO(
                        n.getId(),
                        n.getTitle(),
                        n.getMessage(),
                        n.getRecipient(),
                        n.getStatus()))
                .collect(Collectors.toList());
    }

    public NotificationDTO createNotification(NotificationDTO dto){

        Notification notification = new Notification();

        notification.setTitle(dto.getTitle());
        notification.setMessage(dto.getMessage());
        notification.setRecipient(dto.getRecipient());
        notification.setStatus(dto.getStatus());

        Notification saved = notificationRepository.save(notification);

        return new NotificationDTO(
                saved.getId(),
                saved.getTitle(),
                saved.getMessage(),
                saved.getRecipient(),
                saved.getStatus());
    }

    public void deleteNotification(Long id){
        notificationRepository.deleteById(id);
    }
}