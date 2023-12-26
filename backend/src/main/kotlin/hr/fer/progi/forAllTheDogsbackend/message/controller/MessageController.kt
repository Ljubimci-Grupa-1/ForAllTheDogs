package hr.fer.progi.forAllTheDogsbackend.message.controller

import hr.fer.progi.forAllTheDogsbackend.message.controller.dto.AddMessageDTO
import hr.fer.progi.forAllTheDogsbackend.message.service.MessageService
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping

@RequestMapping("/message")
@Controller
class MessageController(private val messageService: MessageService) {
    @PostMapping("/add")
    fun addAd(@RequestBody addMessageDTO: AddMessageDTO) = ResponseEntity.ok(
        messageService.addMessage(addMessageDTO)
    )
}