package hr.fer.progi.forAllTheDogsbackend.color.controller

import hr.fer.progi.forAllTheDogsbackend.color.service.ColorService
import org.springframework.stereotype.Controller

@Controller
class ColorController(private val colorService: ColorService) {
}