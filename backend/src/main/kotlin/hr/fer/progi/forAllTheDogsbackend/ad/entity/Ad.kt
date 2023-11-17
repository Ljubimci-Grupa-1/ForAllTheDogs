package hr.fer.progi.forAllTheDogsbackend.ad.entity

import hr.fer.progi.forAllTheDogsbackend.activity.entity.Activity
import hr.fer.progi.forAllTheDogsbackend.image.entity.Image
import hr.fer.progi.forAllTheDogsbackend.pet.entity.Pet
import hr.fer.progi.forAllTheDogsbackend.user.entity.User
import jakarta.persistence.*

@Entity
class Ad(

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ad_seq")
    @SequenceGenerator(name = "ad_seq", sequenceName = "ad_seq", allocationSize = 1)
    @Column(name = "adid")
    var adId: Long = 0L,

    @Column(name = "inshelter")
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