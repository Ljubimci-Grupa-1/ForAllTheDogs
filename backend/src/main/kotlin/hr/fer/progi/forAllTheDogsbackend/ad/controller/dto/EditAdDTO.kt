package hr.fer.progi.forAllTheDogsbackend.ad.controller.dto

import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import hr.fer.progi.forAllTheDogsbackend.image.entity.Image
import hr.fer.progi.forAllTheDogsbackend.message.entity.Message
import hr.fer.progi.forAllTheDogsbackend.pet.controller.dto.EditPetDTO
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.UserAdDTO
import org.springframework.web.multipart.MultipartFile

data class EditAdDTO(
    val inShelter: Int? = null,
    val activityName: String? = null,
    val pet: EditPetDTO? = null,
    val images: List<String>? = null
) {
    fun toImage(image: String, ad: Ad?, message: Message?, imageId: Long) = Image(
        imageId = imageId,
        image = image,
        ad = ad,
        message = message
    )
}
