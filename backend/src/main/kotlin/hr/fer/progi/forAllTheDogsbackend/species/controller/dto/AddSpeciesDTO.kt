package hr.fer.progi.forAllTheDogsbackend.species.controller.dto

import hr.fer.progi.forAllTheDogsbackend.species.entity.Species

data class AddSpeciesDTO(
    val speciesName: String
) {
    fun toSpecies(speciesId: Long): Species {
        return Species(
            speciesId = speciesId,
            speciesName = speciesName
        )
    }
}