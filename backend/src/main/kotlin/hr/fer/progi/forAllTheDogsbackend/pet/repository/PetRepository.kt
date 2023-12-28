package hr.fer.progi.forAllTheDogsbackend.pet.repository

import hr.fer.progi.forAllTheDogsbackend.pet.entity.Pet
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface PetRepository: JpaRepository<Pet, Long> {

    @Query("SELECT MAX(p.petId) FROM Pet p")
    fun findMaxPetId(): Long?
}