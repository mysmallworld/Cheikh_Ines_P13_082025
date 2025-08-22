package com.yourcaryourwayapp.poc.mapper;

import com.yourcaryourwayapp.poc.dto.MessageDto;
import com.yourcaryourwayapp.poc.dto.WsChatMessageType;
import com.yourcaryourwayapp.poc.model.Message;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class MessageMapper {
    public Message toEntity(MessageDto messageDto) {
        if (messageDto.getContentDto() == null) {
            return null;
        }

        return Message.builder()
                .title(messageDto.getTitleDto())
                .content(messageDto.getContentDto())
                .status(WsChatMessageType.SENT)
                .user_name(messageDto.getUsernameDto())
                .user_role(messageDto.getUserRoleDto())
                .createdAt(LocalDateTime.now())
                .build();
    }
}
