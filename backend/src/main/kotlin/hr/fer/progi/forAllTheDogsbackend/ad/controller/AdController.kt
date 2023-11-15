package hr.fer.progi.forAllTheDogsbackend.ad.controller

import hr.fer.progi.forAllTheDogsbackend.ad.service.AdService
import org.springframework.stereotype.Controller

@Controller
class AdController(private val adService: AdService) {
}