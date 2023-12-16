package hr.fer.progi.forAllTheDogsbackend.species.controller.dto

import hr.fer.progi.forAllTheDogsbackend.species.entity.Species

data class SpeciesDTO (
    val speciesId: Long,
    val speciesName: String
){
    constructor(species: Species): this(
        species.speciesId,
        species.speciesName
    )
}