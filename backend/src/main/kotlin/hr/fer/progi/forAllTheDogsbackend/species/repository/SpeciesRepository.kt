package hr.fer.progi.forAllTheDogsbackend.species.repository

import hr.fer.progi.forAllTheDogsbackend.species.entity.Species
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface SpeciesRepository: JpaRepository<Species, Long> {

    @Query("SELECT MAX(s.speciesId) FROM Species s")
    fun findMaxSpeciesId(): Long?
}