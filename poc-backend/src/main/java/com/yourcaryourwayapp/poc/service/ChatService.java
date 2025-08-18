package com.yourcaryourwayapp.poc.service;

import com.yourcaryourwayapp.poc.dto.MessageDto;
import com.yourcaryourwayapp.poc.mapper.MessageMapper;
import com.yourcaryourwayapp.poc.model.Message;
import com.yourcaryourwayapp.poc.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    private final MessageRepository messageRepository;

    @Autowired
    MessageMapper messageMapper;

    public ChatService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public Message saveMessage(MessageDto messageDTO) {
        Message message = messageMapper.toEntity(messageDTO);
        return messageRepository.save(message);
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }
}
