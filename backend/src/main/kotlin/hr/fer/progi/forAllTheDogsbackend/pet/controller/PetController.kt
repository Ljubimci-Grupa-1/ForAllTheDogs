package hr.fer.progi.forAllTheDogsbackend.pet.controller

import hr.fer.progi.forAllTheDogsbackend.pet.service.PetService
import org.springframework.stereotype.Controller

@Controller
class PetController(private val petService: PetService) {
}