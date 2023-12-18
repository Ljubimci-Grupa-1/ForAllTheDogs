package hr.fer.progi.forAllTheDogsbackend.species.entity

import jakarta.persistence.*
import org.jetbrains.annotations.NotNull

@Entity
class Species (

    @Id
    @Column(name = "speciesid")
    var speciesId: Long = 0L,

    @NotNull
    @Column(name = "speciesname")
    var speciesName: String
)