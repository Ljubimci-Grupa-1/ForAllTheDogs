package hr.fer.progi.forAllTheDogsbackend.color.controller

import hr.fer.progi.forAllTheDogsbackend.color.controller.dto.AddColorDTO
import hr.fer.progi.forAllTheDogsbackend.color.service.ColorService
import hr.fer.progi.forAllTheDogsbackend.species.controller.dto.AddSpeciesDTO
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping

@RequestMapping("/color")
@Controller
class ColorController(private val colorService: ColorService) {

    @GetMapping("/all")
    fun getAllColors() = ResponseEntity.ok(
        colorService.getAllColors()
    )

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    fun addSpecies(@RequestBody color: AddColorDTO) = ResponseEntity.ok(
        colorService.addColor(color)
    )
}