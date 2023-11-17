package hr.fer.progi.forAllTheDogsbackend.message.repository

import hr.fer.progi.forAllTheDogsbackend.message.entity.Message
import org.springframework.data.jpa.repository.JpaRepository

interface MessageRepository: JpaRepository<Message, Long> {
}