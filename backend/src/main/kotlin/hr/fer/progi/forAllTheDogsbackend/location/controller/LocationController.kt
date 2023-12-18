package hr.fer.progi.forAllTheDogsbackend.location.controller

import hr.fer.progi.forAllTheDogsbackend.location.service.LocationService
import org.springframework.stereotype.Controller

@Controller
class LocationController(private val locationService: LocationService) {
}