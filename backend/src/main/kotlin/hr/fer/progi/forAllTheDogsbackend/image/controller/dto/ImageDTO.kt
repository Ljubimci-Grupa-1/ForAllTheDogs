package hr.fer.progi.forAllTheDogsbackend.image.controller.dto

import hr.fer.progi.forAllTheDogsbackend.image.entity.Image

data class ImageDTO (
    val imageId: Long,
    val image: ByteArray
){
    constructor(image: Image): this(
        image.imageId,
        image.image
    )

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as ImageDTO

        if (imageId != other.imageId) return false
        return image.contentEquals(other.image)
    }

    override fun hashCode(): Int {
        var result = imageId.hashCode()
        result = 31 * result + image.contentHashCode()
        return result
    }
}