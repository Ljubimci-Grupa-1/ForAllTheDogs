package hr.fer.progi.forAllTheDogsbackend.ad.controller

import hr.fer.progi.forAllTheDogsbackend.ad.controller.dto.AdDTO
import hr.fer.progi.forAllTheDogsbackend.ad.controller.dto.AddAdDTO
import hr.fer.progi.forAllTheDogsbackend.ad.controller.dto.EditAdDTO
import hr.fer.progi.forAllTheDogsbackend.ad.service.AdService
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
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
    @PreAuthorize("hasRole('ROLE_SHELTER') || hasRole('ROLE_USER')")
    fun addAd(@RequestBody addAdDTO: AddAdDTO): ResponseEntity<AdDTO> {
        return ResponseEntity.ok(adService.addAd(addAdDTO))
    }


    @PutMapping("/edit/{id}")
    @PreAuthorize("hasRole('ROLE_SHELTER') || hasRole('ROLE_USER')")
    fun editAd(@PathVariable id: Long, @RequestBody editAddDTO: EditAdDTO) = ResponseEntity.ok(
        adService.editAd(id, editAddDTO)
    )

    @PutMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_SHELTER') || hasRole('ROLE_USER')")
    fun deleteAd(@PathVariable id: Long) = ResponseEntity.ok(
        adService.deleteAd(id)
    )

    @GetMapping("/{id}/messages")
    fun getAdMessages(@PathVariable id: Long) = ResponseEntity.ok(
        adService.getAdWithMessages(id)
    )
}