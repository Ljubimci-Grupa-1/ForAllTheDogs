package hr.fer.progi.forAllTheDogsbackend.species.controller

import hr.fer.progi.forAllTheDogsbackend.species.service.SpeciesService
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping

@RequestMapping("/species")
@Controller
class SpeciesController(private val speciesService: SpeciesService) {

    @GetMapping("/all")
    fun getAllSpecies() = ResponseEntity.ok(
        speciesService.getAllSpecies()
    )
}