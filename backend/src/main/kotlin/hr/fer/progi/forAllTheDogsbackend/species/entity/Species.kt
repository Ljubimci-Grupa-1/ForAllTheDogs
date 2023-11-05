package hr.fer.progi.forAllTheDogsbackend.species.entity

import jakarta.persistence.*
import org.jetbrains.annotations.NotNull

@Entity
class Species (

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "species_seq")
    @SequenceGenerator(name = "species_seq", sequenceName = "species_seq", allocationSize = 1)
    var speciesId: Long,

    @NotNull
    var speciesName: String
)