package hr.fer.progi.forAllTheDogsbackend.pet.repository

import hr.fer.progi.forAllTheDogsbackend.pet.entity.Pet
import org.springframework.data.jpa.repository.JpaRepository

interface PetRepository: JpaRepository<Pet, Long> {
}