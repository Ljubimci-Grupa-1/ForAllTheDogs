package hr.fer.progi.forAllTheDogsbackend.ad.entity

import hr.fer.progi.forAllTheDogsbackend.activity.entity.Activity
import hr.fer.progi.forAllTheDogsbackend.user.entity.User
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne
import jakarta.persistence.OneToOne
import org.aspectj.weaver.IntMap
import java.util.Date

@Entity
class Ad(

    @Id
    @GeneratedValue
    var adid: Long,

    var inShelter: Int,

    @ManyToOne
    var user: User,

    @ManyToOne
    var activity: Activity,

    var image1Id: Long,

    var image2Id: Long,

    var image3Id: Long,

    var species: String,

    var petName: String,

    var age: Int,

    var color: String,

    var dateMissing: Date,

    var hourMissing: Int,

    var description: String
)