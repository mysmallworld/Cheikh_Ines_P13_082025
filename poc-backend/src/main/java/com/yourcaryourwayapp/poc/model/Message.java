package com.yourcaryourwayapp.poc.model;

import com.yourcaryourwayapp.poc.dto.UserRole;
import com.yourcaryourwayapp.poc.dto.WsChatMessageType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(length = 30)
    private String title;

    @Column(length = 2000)
    private String content;

    private WsChatMessageType status;

    @CreatedDate
    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Column(length = 20)
    private String user_name;

    private UserRole user_role;
}
