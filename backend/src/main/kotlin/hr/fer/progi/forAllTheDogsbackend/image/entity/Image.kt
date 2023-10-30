package hr.fer.progi.forAllTheDogsbackend.image.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import org.jetbrains.annotations.NotNull

@Entity
class Image(

    @Id
    @GeneratedValue
    var imageId: Long,

    @NotNull
    var imageUrl: String
)