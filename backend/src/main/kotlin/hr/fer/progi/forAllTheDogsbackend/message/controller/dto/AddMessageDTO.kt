package hr.fer.progi.forAllTheDogsbackend.message.controller.dto

import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import hr.fer.progi.forAllTheDogsbackend.image.entity.Image
import hr.fer.progi.forAllTheDogsbackend.location.controller.dto.AddLocationDTO
import hr.fer.progi.forAllTheDogsbackend.location.entity.Location
import hr.fer.progi.forAllTheDogsbackend.message.entity.Message
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.UserAdDTO
import hr.fer.progi.forAllTheDogsbackend.user.entity.User
import java.util.Date

data class AddMessageDTO (
    val text: String?,
    val date: Date,
    val adId: Long,
    val location: AddLocationDTO?,
    val image: String?
){

    fun toMessage(user: User, ad: Ad, location: Location, messageId: Long) = Message(
        messageId = messageId,
        text = text,
        date = date,
        ad = ad,
        user = user,
        location = location
    )

    fun toImage(image: String, ad: Ad?, message: Message?, imageId: Long) = Image(
        imageId = imageId,
        image = image,
        ad = ad,
        message = message
    )
}