package hr.fer.progi.forAllTheDogsbackend.species.service

import hr.fer.progi.forAllTheDogsbackend.species.controller.dto.AddSpeciesDTO
import hr.fer.progi.forAllTheDogsbackend.species.controller.dto.SpeciesDTO
import hr.fer.progi.forAllTheDogsbackend.species.repository.SpeciesRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class SpeciesService(private val speciesRepository: SpeciesRepository) {

    fun getAllSpecies(): List<SpeciesDTO> = speciesRepository.findAll().map { SpeciesDTO(it) }

    @Transactional
    fun addSpecies(dto: AddSpeciesDTO): SpeciesDTO {
        val maxId = speciesRepository.findMaxSpeciesId() ?: 0
        val nextId = maxId + 1
        val newSpecies = dto.toSpecies(nextId)
        return SpeciesDTO(speciesRepository.save(newSpecies))
    }
}