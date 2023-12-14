package hr.fer.progi.forAllTheDogsbackend.city.entity

import hr.fer.progi.forAllTheDogsbackend.county.entity.County
import jakarta.persistence.*

@Entity
class City(

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "city_seq")
    @SequenceGenerator(name = "city_seq", sequenceName = "city_seq", allocationSize = 1)
    @Column(name = "cityid")
    var cityId: Long = 0L,

    @Column(name = "cityname")
    var cityName: String,

    @ManyToOne
    @JoinColumn(name = "countyid")
    var county: County
)