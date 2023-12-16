package hr.fer.progi.forAllTheDogsbackend.message.controller

import hr.fer.progi.forAllTheDogsbackend.message.service.MessageService
import org.springframework.stereotype.Controller

@Controller
class MessageController(private val messageService: MessageService) {
}