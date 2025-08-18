package com.yourcaryourwayapp.poc.controller;

import com.yourcaryourwayapp.poc.dto.MessageDto;
import com.yourcaryourwayapp.poc.dto.WsChatMessageType;
import com.yourcaryourwayapp.poc.service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WsChatController {

    private ChatService chatService;

    public WsChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public MessageDto broadcastMessage(MessageDto chatMessage) {
        if (chatMessage.getStatus() == WsChatMessageType.SENT) {
            chatService.saveMessage(chatMessage);
        }
        return chatMessage;
    }
}
