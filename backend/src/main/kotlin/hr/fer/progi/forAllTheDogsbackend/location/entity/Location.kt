package hr.fer.progi.forAllTheDogsbackend.location.entity

import hr.fer.progi.forAllTheDogsbackend.city.entity.City
import hr.fer.progi.forAllTheDogsbackend.message.entity.Message
import jakarta.persistence.*
import jakarta.validation.constraints.NotNull

@Entity
class Location (

    @Id
    @Column(name = "locationid")
    var locationId: Long = 0L,

    @NotNull
    var longitude: Double,

    @NotNull
    var latitude: Double,

    @JoinColumn(name = "cityid")
    @ManyToOne
    var city: City,
)