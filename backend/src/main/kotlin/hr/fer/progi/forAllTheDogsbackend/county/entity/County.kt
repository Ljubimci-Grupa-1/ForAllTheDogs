package hr.fer.progi.forAllTheDogsbackend.county.entity

import jakarta.persistence.*

@Entity
class County (

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "county_seq")
    @SequenceGenerator(name = "county_seq", sequenceName = "county_seq", allocationSize = 1)
    var countyId: Long = 0L,

    var countyName: String
)