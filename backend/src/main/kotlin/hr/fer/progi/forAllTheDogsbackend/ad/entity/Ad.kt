package hr.fer.progi.forAllTheDogsbackend.ad.entity

import hr.fer.progi.forAllTheDogsbackend.activity.entity.Activity
import hr.fer.progi.forAllTheDogsbackend.image.entity.Image
import hr.fer.progi.forAllTheDogsbackend.pet.entity.Pet
import hr.fer.progi.forAllTheDogsbackend.user.entity.User
import jakarta.persistence.*

@Entity
class Ad(

    @Id
    @Column(name = "adid")
    var adId: Long = 0L,

    @Column(name = "inshelter")
    var inShelter: Int,

    @Column(name = "deleted")
    var deleted: Boolean = false,

    @JoinColumn(name = "userid")
    @ManyToOne
    var user: User,

    @JoinColumn(name = "activityid")
    @ManyToOne
    var activity: Activity,

    @JoinColumn(name = "petid")
    @OneToOne
    var pet: Pet
)