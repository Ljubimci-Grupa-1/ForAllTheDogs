package hr.fer.progi.forAllTheDogsbackend.message.entity

import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import hr.fer.progi.forAllTheDogsbackend.city.entity.City
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
    @Column(name = "messageid")
    var messageId: Long,

    var text: String,

    @NotNull
    var date: Date,

    @ManyToOne
    var ad: Ad,

    @ManyToOne
    var user: User,

    @OneToOne
    var image: Image,

    @ManyToOne
    var city: City,

    @NotNull
    var longitude: Double,

    @NotNull
    var latitude: Double
)