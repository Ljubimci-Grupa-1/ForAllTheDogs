package hr.fer.progi.forAllTheDogsbackend.pet.controller.dto

import hr.fer.progi.forAllTheDogsbackend.color.entity.Color
import hr.fer.progi.forAllTheDogsbackend.location.controller.dto.LocationDTO
import hr.fer.progi.forAllTheDogsbackend.pet.entity.Pet
import hr.fer.progi.forAllTheDogsbackend.species.entity.Species
import java.time.LocalDateTime

data class PetDTO (
    val petId: Long,
    val speciesName: String,
    val petName: String,
    val age: Int,
    val colors: MutableSet<Color>,
    val dateTimeMissing: LocalDateTime,
    val description: String,
    val location: LocationDTO
) {
    constructor(pet: Pet, species: Species, location: LocationDTO): this(
        pet.petId,
        species.speciesName,
        pet.petName,
        pet.age,
        pet.colors,
        pet.dateTimeMissing,
        pet.description,
        location
    )
}