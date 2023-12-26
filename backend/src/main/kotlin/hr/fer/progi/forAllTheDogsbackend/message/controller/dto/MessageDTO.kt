package hr.fer.progi.forAllTheDogsbackend.message.controller.dto

import hr.fer.progi.forAllTheDogsbackend.ad.controller.dto.AdDTO
import hr.fer.progi.forAllTheDogsbackend.image.controller.dto.ImageDTO
import hr.fer.progi.forAllTheDogsbackend.location.controller.dto.LocationDTO
import hr.fer.progi.forAllTheDogsbackend.message.entity.Message
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.UserAdDTO
import java.util.Date

data class MessageDTO(
    val messageId: Long,
    val text: String?,
    val date: Date,
    val ad: AdDTO,
    val user: UserAdDTO,
    val location: LocationDTO,
    val image: ImageDTO?
){
    constructor(
        message: Message,
        ad: AdDTO,
        user: UserAdDTO,
        location: LocationDTO,
        image: ImageDTO
    ): this(
        message.messageId,
        message.text,
        message.date,
        ad,
        user,
        location,
        image
    )
}