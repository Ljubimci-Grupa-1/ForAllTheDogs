package hr.fer.progi.forAllTheDogsbackend.image.entity

import jakarta.persistence.*
import org.jetbrains.annotations.NotNull

@Entity
class Image(

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "image_seq")
    @SequenceGenerator(name = "image_seq", sequenceName = "image_seq", allocationSize = 1)
    @Column(name = "imageid")
    var imageId: Long,

    @NotNull
    @Column(name = "imageurl")
    var imageUrl: String
)