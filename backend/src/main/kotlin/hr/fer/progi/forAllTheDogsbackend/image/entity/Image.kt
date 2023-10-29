package hr.fer.progi.forAllTheDogsbackend.image.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id

@Entity
class Image(

    @Id
    @GeneratedValue
    var imageId: Long,

    var imageUrl: String
)