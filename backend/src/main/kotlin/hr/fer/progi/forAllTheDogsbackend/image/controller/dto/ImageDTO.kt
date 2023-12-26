package hr.fer.progi.forAllTheDogsbackend.image.controller.dto

import hr.fer.progi.forAllTheDogsbackend.image.entity.Image

data class ImageDTO (
    val imageId: Long,
    val image: String
){
    constructor(image: Image): this(
        image.imageId,
        image.image
    )

}