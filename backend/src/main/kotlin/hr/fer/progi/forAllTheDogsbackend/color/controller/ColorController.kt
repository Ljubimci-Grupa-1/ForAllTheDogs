package hr.fer.progi.forAllTheDogsbackend.color.controller

import hr.fer.progi.forAllTheDogsbackend.color.service.ColorService
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping

@RequestMapping("/colors")
@Controller
class ColorController(private val colorService: ColorService) {

    @GetMapping
    fun getAllColors() = ResponseEntity.ok(
        colorService.getAllColors()
    )



}