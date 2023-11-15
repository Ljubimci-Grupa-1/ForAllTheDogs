package hr.fer.progi.forAllTheDogsbackend.pet.service

import hr.fer.progi.forAllTheDogsbackend.pet.repository.PetRepository
import org.springframework.stereotype.Service

@Service
class PetService(private val petRepository: PetRepository) {
}