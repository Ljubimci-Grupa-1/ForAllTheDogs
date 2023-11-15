package hr.fer.progi.forAllTheDogsbackend.species.service

import hr.fer.progi.forAllTheDogsbackend.species.repository.SpeciesRepository
import org.springframework.stereotype.Service

@Service
class SpeciesService(private val speciesRepository: SpeciesRepository) {
}