package hr.fer.progi.forAllTheDogsbackend.ad.controller.dto

import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import hr.fer.progi.forAllTheDogsbackend.image.controller.dto.ImageDTO
import hr.fer.progi.forAllTheDogsbackend.pet.controller.dto.PetDTO
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.UserAdDTO

data class AdDTO (
    val adId: Long,
    val inShelter: Int,
    val user: UserAdDTO,
    val activityName: String,
    val pet: PetDTO,
    val images: List<ImageDTO>
){
    constructor(
        ad: Ad,
        user: UserAdDTO,
        activityName: String,
        pet: PetDTO,
        images: List<ImageDTO>
    ): this(
        ad.adId,
        ad.inShelter,
        user,
        activityName,
        pet,
        images
    )

}