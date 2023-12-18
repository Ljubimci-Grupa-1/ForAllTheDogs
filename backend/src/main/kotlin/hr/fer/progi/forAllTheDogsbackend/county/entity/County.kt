package hr.fer.progi.forAllTheDogsbackend.county.entity

import jakarta.persistence.*

@Entity
class County (

    @Id
    @Column(name = "countyid")
    var countyId: Long = 0L,

    @Column(name = "countyname")
    var countyName: String
)