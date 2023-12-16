package hr.fer.progi.forAllTheDogsbackend.message.service

import hr.fer.progi.forAllTheDogsbackend.message.repository.MessageRepository
import org.springframework.stereotype.Service

@Service
class MessageService(private val messageRepository: MessageRepository) {
}