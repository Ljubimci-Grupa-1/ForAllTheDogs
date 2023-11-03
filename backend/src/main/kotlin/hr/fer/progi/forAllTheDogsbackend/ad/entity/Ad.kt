package hr.fer.progi.forAllTheDogsbackend.ad.entity

import hr.fer.progi.forAllTheDogsbackend.activity.entity.Activity
import hr.fer.progi.forAllTheDogsbackend.image.entity.Image
import hr.fer.progi.forAllTheDogsbackend.pet.entity.Pet
import hr.fer.progi.forAllTheDogsbackend.user.entity.User
import jakarta.persistence.*
import java.util.Date

@Entity
class Ad(

    @Id
    @GeneratedValue
    var adId: Long = 0L,

    var inShelter: Int,

    @ManyToOne
    var user: User,

    @ManyToOne
    var activity: Activity,

    @OneToOne
    var image1: Image,

    @OneToOne
    var image2: Image,

    @OneToOne
    var image3: Image,

    @OneToOne
    var pet: Pet
)