package hr.fer.progi.forAllTheDogsbackend.image.entity

import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import hr.fer.progi.forAllTheDogsbackend.message.entity.Message
import jakarta.persistence.*
import org.jetbrains.annotations.NotNull

@Entity
class Image(

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "image_seq")
    @SequenceGenerator(name = "image_seq", sequenceName = "image_seq", allocationSize = 1)
    @Column(name = "imageid")
    var imageId: Long = 0,

    @NotNull
    @Column(name = "imageurl")
    var image: String,

    @JoinColumn(name = "adid")
    @ManyToOne
    var ad: Ad? = null,

    @JoinColumn(name = "messageid")
    @OneToOne
    var message: Message? = null
)