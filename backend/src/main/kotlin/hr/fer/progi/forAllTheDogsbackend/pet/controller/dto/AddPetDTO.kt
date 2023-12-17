package hr.fer.progi.forAllTheDogsbackend.pet.controller.dto

import hr.fer.progi.forAllTheDogsbackend.color.controller.dto.AddColorDTO
import hr.fer.progi.forAllTheDogsbackend.color.entity.Color
import hr.fer.progi.forAllTheDogsbackend.location.controller.dto.AddLocationDTO
import hr.fer.progi.forAllTheDogsbackend.location.entity.Location
import hr.fer.progi.forAllTheDogsbackend.pet.entity.Pet
import hr.fer.progi.forAllTheDogsbackend.species.entity.Species
import java.time.LocalDateTime

data class AddPetDTO (
    val speciesName: String,
    val petName: String,
    val age: Int,
    val colors: MutableSet<AddColorDTO>,
    val dateTimeMissing: LocalDateTime,
    val description: String,
    val location: AddLocationDTO
) {
    fun toPet(location: Location, species: Species, colors: MutableSet<Color>) = Pet(
        species = species,
        petName = petName,
        age = age,
        colors = colors,
        dateTimeMissing = dateTimeMissing,
        description = description,
        location = location
    )
}