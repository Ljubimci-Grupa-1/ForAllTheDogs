package hr.fer.progi.forAllTheDogsbackend.pet.controller.dto

import hr.fer.progi.forAllTheDogsbackend.color.controller.dto.AddColorDTO
import hr.fer.progi.forAllTheDogsbackend.location.controller.dto.EditLocationDTO
import java.time.LocalDateTime

data class EditPetDTO(
    val speciesName: String? = null,
    val petName: String? = null,
    val age: Int? = null,
    val colors: MutableSet<AddColorDTO>? = null,
    val dateTimeMissing: LocalDateTime? = null,
    val description: String? = null,
    val location: EditLocationDTO? = null
)
