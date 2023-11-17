package hr.fer.progi.forAllTheDogsbackend.city.controller

import hr.fer.progi.forAllTheDogsbackend.city.service.CityService
import org.springframework.stereotype.Controller

@Controller
class CityController(private val cityService: CityService) {
}