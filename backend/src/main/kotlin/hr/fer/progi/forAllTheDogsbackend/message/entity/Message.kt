package hr.fer.progi.forAllTheDogsbackend.message.entity

import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import hr.fer.progi.forAllTheDogsbackend.image.entity.Image
import hr.fer.progi.forAllTheDogsbackend.user.entity.User
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne
import org.jetbrains.annotations.NotNull
import java.util.Date

@Entity
class Message(

    @Id
    @GeneratedValue
    var messageId: Long,

    @NotNull
    var text: String,

    var date: Date,

    var location: String,

    @ManyToOne
    var ad: Ad,

    @ManyToOne
    var user: User,

    @ManyToOne
    var image: Image
)