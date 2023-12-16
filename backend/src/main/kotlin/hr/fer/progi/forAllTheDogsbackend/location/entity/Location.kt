package hr.fer.progi.forAllTheDogsbackend.location.entity

import hr.fer.progi.forAllTheDogsbackend.city.entity.City
import hr.fer.progi.forAllTheDogsbackend.message.entity.Message
import jakarta.persistence.*
import jakarta.validation.constraints.NotNull

@Entity
class Location (

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "location_seq")
    @SequenceGenerator(name = "location_seq", sequenceName = "location_seq", allocationSize = 1)
    @Column(name = "locationid")
    var locationId: Long = 0L,

    @NotNull
    var longitude: Double,

    @NotNull
    var latitude: Double,

    @ManyToOne
    var city: City,
)