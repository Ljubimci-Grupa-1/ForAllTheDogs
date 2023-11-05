package hr.fer.progi.forAllTheDogsbackend.city.entity

import hr.fer.progi.forAllTheDogsbackend.county.entity.County
import jakarta.persistence.*

@Entity
class City(

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "city_seq")
    @SequenceGenerator(name = "city_seq", sequenceName = "city_seq", allocationSize = 1)
    var cityId: Long = 0L,

    var cityName: String,

    @ManyToOne
    var county: County
)