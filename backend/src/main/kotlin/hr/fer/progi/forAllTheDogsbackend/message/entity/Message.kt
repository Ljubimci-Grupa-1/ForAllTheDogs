package hr.fer.progi.forAllTheDogsbackend.message.entity

import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import hr.fer.progi.forAllTheDogsbackend.city.entity.City
import hr.fer.progi.forAllTheDogsbackend.image.entity.Image
import hr.fer.progi.forAllTheDogsbackend.location.entity.Location
import hr.fer.progi.forAllTheDogsbackend.user.entity.User
import jakarta.persistence.*
import org.jetbrains.annotations.NotNull
import java.util.Date

@Entity
class Message(

    @Id
    @Column(name = "messageid")
    var messageId: Long = 0L,

    var text: String? = null,

    @NotNull
    var date: Date,

    @ManyToOne
    @JoinColumn(name = "adid")
    var ad: Ad,

    @ManyToOne
    @JoinColumn(name = "userid")
    var user: User,

    @ManyToOne
    @JoinColumn(name = "locationid")
    var location: Location? = null
)