package hr.fer.progi.forAllTheDogsbackend.species.repository

import hr.fer.progi.forAllTheDogsbackend.species.entity.Species
import org.springframework.data.jpa.repository.JpaRepository

interface SpeciesRepository: JpaRepository<Species, Long> {
}