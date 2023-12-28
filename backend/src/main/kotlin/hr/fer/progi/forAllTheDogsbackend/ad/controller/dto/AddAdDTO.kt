package hr.fer.progi.forAllTheDogsbackend.ad.controller.dto

import hr.fer.progi.forAllTheDogsbackend.activity.entity.Activity
import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import hr.fer.progi.forAllTheDogsbackend.image.entity.Image
import hr.fer.progi.forAllTheDogsbackend.message.entity.Message
import hr.fer.progi.forAllTheDogsbackend.pet.controller.dto.AddPetDTO
import hr.fer.progi.forAllTheDogsbackend.pet.entity.Pet
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.UserAdDTO
import hr.fer.progi.forAllTheDogsbackend.user.entity.User
import org.springframework.web.multipart.MultipartFile

data class AddAdDTO (
    val inShelter: Int,
    val user: UserAdDTO,
    val activityName: String,
    val pet: AddPetDTO,
    val images: List<String>
) {
    fun toAd(activity: Activity, pet: Pet, user: User, adId: Long) = Ad(
        adId = adId,
        inShelter = inShelter,
        user = user,
        activity = activity,
        pet = pet,
    )

    fun toImage(image: String, ad: Ad?, message: Message?, imageId: Long) = Image(
        imageId = imageId,
        image = image,
        ad = ad,
        message = message
    )

    fun toImage2(image: String, ad: Ad?, message: Message?) = Image(
        image = image,
        ad = ad,
        message = message
    )
}