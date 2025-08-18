package com.yourcaryourwayapp.poc.repository;

import com.yourcaryourwayapp.poc.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface MessageRepository extends JpaRepository<Message, UUID> {
}
