package com.yourcaryourwayapp.poc.controller;

import com.yourcaryourwayapp.poc.model.Message;
import com.yourcaryourwayapp.poc.service.ChatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:4200")
public class ChatRestController {

    private final ChatService chatService;

    public ChatRestController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/messages")
    public List<Message> getMessages() {
        return chatService.getAllMessages();
    }
}
