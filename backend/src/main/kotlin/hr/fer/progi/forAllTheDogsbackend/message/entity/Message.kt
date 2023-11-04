package hr.fer.progi.forAllTheDogsbackend.message.entity

import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import hr.fer.progi.forAllTheDogsbackend.image.entity.Image
import hr.fer.progi.forAllTheDogsbackend.user.entity.User
import jakarta.persistence.*
import org.jetbrains.annotations.NotNull
import java.util.Date

@Entity
class Message(

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "message_seq")
    @SequenceGenerator(name = "message_seq", sequenceName = "message_seq", allocationSize = 1)
    var messageId: Long,

    var text: String,

    @NotNull
    var date: Date,

    var location: String,

    @ManyToOne
    var ad: Ad,

    @ManyToOne
    var user: User,

    @OneToOne
    var image: Image
)