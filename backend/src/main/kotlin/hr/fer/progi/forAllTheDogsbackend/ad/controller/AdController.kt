package hr.fer.progi.forAllTheDogsbackend.ad.controller

import hr.fer.progi.forAllTheDogsbackend.ad.controller.dto.AdDTO
import hr.fer.progi.forAllTheDogsbackend.ad.controller.dto.AddAdDTO
import hr.fer.progi.forAllTheDogsbackend.ad.controller.dto.EditAdDTO
import hr.fer.progi.forAllTheDogsbackend.ad.service.AdService
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@RequestMapping("/ad")
@Controller
class AdController(private val adService: AdService) {

    @GetMapping("/all")
    fun getAllAds() = ResponseEntity.ok(
        adService.getAllAds()
    )

    @GetMapping("/all/pageable")
    fun getAllAds(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ResponseEntity<Page<AdDTO>> {
        val pageable: Pageable = PageRequest.of(page, size)
        val ads: Page<AdDTO> = adService.getAllAds(pageable)
        return ResponseEntity.ok(ads)
    }

    @PostMapping("/add")
    fun addAd(@RequestBody addAdDTO: AddAdDTO): ResponseEntity<AdDTO> {
        println("controller")
        return ResponseEntity.ok(adService.addAd(addAdDTO))
    }


    @PutMapping("/edit/{id}")
    fun editAd(@PathVariable id: Long, @RequestBody editAddDTO: EditAdDTO) = ResponseEntity.ok(
        adService.editAd(id, editAddDTO)
    )
}