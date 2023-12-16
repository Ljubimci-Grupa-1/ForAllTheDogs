package hr.fer.progi.forAllTheDogsbackend.city.entity

import hr.fer.progi.forAllTheDogsbackend.county.entity.County
import jakarta.persistence.*

@Entity
class City(

    @Id
    @Column(name = "cityid")
    var cityId: Long = 0L,

    @Column(name = "cityname")
    var cityName: String,

    @ManyToOne
    @JoinColumn(name = "countyid")
    var county: County
)