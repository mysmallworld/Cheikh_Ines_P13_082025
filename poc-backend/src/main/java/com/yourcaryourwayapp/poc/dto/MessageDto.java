package com.yourcaryourwayapp.poc.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MessageDto {

    private String titleDto;

    @NotNull
    private String contentDto;

    private WsChatMessageType status;

    @NotNull
    private String usernameDto;

    @NotNull
    private UserRole userRoleDto;
}
