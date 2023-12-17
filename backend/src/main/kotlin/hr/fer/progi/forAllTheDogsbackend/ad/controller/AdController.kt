package hr.fer.progi.forAllTheDogsbackend.ad.controller

import hr.fer.progi.forAllTheDogsbackend.ad.controller.dto.AddAdDTO
import hr.fer.progi.forAllTheDogsbackend.ad.service.AdService
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping

@RequestMapping("/ad")
@Controller
class AdController(private val adService: AdService) {

    @GetMapping("/all")
    fun getAllAds() = ResponseEntity.ok(
        adService.getAllAds()
    )

    @PostMapping("/add")
    fun addAd(@RequestBody addAdDTO: AddAdDTO) = ResponseEntity.ok(
        adService.addAd(addAdDTO)
    )
}