package hr.fer.progi.forAllTheDogsbackend.species.service

import hr.fer.progi.forAllTheDogsbackend.species.controller.dto.SpeciesDTO
import hr.fer.progi.forAllTheDogsbackend.species.repository.SpeciesRepository
import org.springframework.stereotype.Service

@Service
class SpeciesService(private val speciesRepository: SpeciesRepository) {

    fun getAllSpecies(): List<SpeciesDTO> = speciesRepository.findAll().map { SpeciesDTO(it) }
}