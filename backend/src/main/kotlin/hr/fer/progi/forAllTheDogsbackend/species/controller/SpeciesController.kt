package hr.fer.progi.forAllTheDogsbackend.species.controller

import hr.fer.progi.forAllTheDogsbackend.species.service.SpeciesService
import org.springframework.stereotype.Controller

@Controller
class SpeciesController(private val speciesService: SpeciesService) {
}