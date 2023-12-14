package hr.fer.progi.forAllTheDogsbackend.county.service

import hr.fer.progi.forAllTheDogsbackend.city.repository.CityRepository
import hr.fer.progi.forAllTheDogsbackend.county.controller.dto.AddCountyDTO
import hr.fer.progi.forAllTheDogsbackend.county.controller.dto.CountyDTO
import hr.fer.progi.forAllTheDogsbackend.county.controller.dto.CountyWithCitiesDTO
import hr.fer.progi.forAllTheDogsbackend.county.repository.CountyRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
class CountyService(
    private val countyRepository: CountyRepository,
    private val cityRepository: CityRepository
    ) {
    fun getAllCounties(): List<CountyDTO> = countyRepository.findAll().map { CountyDTO(it) }
    fun getCountyWithCitiesById(id: Long): CountyWithCitiesDTO {
        val countyOptional = countyRepository.findById(id)
        val county = countyOptional.orElseThrow {
            IllegalArgumentException("No county with id: $id")
        }
        val cities = cityRepository.findByCounty(county)
        return CountyWithCitiesDTO(county, cities)
    }

    @Transactional
    fun addCounty(dto: AddCountyDTO): CountyDTO {
        val maxId = countyRepository.findMaxCountyId() ?: 0
        val nextId = maxId + 1
        val newCounty = dto.toCounty(nextId)
        return CountyDTO(countyRepository.save(newCounty))
    }

}