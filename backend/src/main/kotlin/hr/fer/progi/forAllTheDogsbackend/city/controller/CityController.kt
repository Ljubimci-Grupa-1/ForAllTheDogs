package hr.fer.progi.forAllTheDogsbackend.city.controller

import hr.fer.progi.forAllTheDogsbackend.city.controller.dto.AddCityDTO
import hr.fer.progi.forAllTheDogsbackend.city.service.CityService
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping

@RequestMapping("/city")
@Controller
class CityController(private val cityService: CityService) {

    @PostMapping("/add")
    fun addCity(@RequestBody city: AddCityDTO) = ResponseEntity.ok(
        cityService.addCity(city)
    )

    @GetMapping("/all")
    fun getAllCities() = ResponseEntity.ok(
        cityService.getAllCities()
    )
}