package hr.fer.progi.forAllTheDogsbackend.ad.controller.dto

import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import hr.fer.progi.forAllTheDogsbackend.image.entity.Image
import hr.fer.progi.forAllTheDogsbackend.message.entity.Message
import hr.fer.progi.forAllTheDogsbackend.pet.controller.dto.EditPetDTO
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.UserAdDTO
import org.springframework.web.multipart.MultipartFile

data class EditAdDTO(
    val inShelter: Int? = null,
    val user: UserAdDTO,
    val activityName: String? = null,
    val pet: EditPetDTO? = null,
    val images: List<MultipartFile>? = null
) {
    fun toImage(image: ByteArray, ad: Ad?, message: Message?) = Image(
        image = image,
        ad = ad,
        message = message
    )
}
