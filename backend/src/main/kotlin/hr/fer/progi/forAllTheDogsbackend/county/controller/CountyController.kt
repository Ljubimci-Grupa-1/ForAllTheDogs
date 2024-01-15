package hr.fer.progi.forAllTheDogsbackend.county.controller

import hr.fer.progi.forAllTheDogsbackend.county.controller.dto.AddCountyDTO
import hr.fer.progi.forAllTheDogsbackend.county.entity.County
import hr.fer.progi.forAllTheDogsbackend.county.service.CountyService
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping

@RequestMapping("/county")
@Controller
class CountyController(private val countyService: CountyService) {
    @GetMapping("/all")
    fun getAllCounties() = ResponseEntity.ok(
        countyService.getAllCounties()
    )
    @GetMapping("/{id}")
    fun getCountyById(@PathVariable id: Long) = ResponseEntity.ok(
        countyService.getCountyWithCitiesById(id)
    )

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    fun addCounty(@RequestBody county: AddCountyDTO) = ResponseEntity.ok(
        countyService.addCounty(county)
    )
}