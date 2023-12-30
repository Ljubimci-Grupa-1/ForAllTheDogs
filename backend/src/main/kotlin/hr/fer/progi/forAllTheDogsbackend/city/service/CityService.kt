package hr.fer.progi.forAllTheDogsbackend.city.service

import hr.fer.progi.forAllTheDogsbackend.city.controller.dto.AddCityDTO
import hr.fer.progi.forAllTheDogsbackend.city.controller.dto.CityDTO
import hr.fer.progi.forAllTheDogsbackend.city.entity.City
import hr.fer.progi.forAllTheDogsbackend.city.repository.CityRepository
import hr.fer.progi.forAllTheDogsbackend.county.repository.CountyRepository
import org.springframework.stereotype.Service

@Service
class CityService(
    private val cityRepository: CityRepository,
    private val countyRepository: CountyRepository
) {

    fun addCity(dto: AddCityDTO): CityDTO {
        val maxId = cityRepository.findMaxCityId() ?: 0
        val newId = maxId + 1

        val countyOptional = countyRepository.findById(dto.countyId)
        val county = countyOptional.orElseThrow {
            IllegalArgumentException("No county with id: ${dto.countyId}")
        }

        val newCity = City(cityId = newId, cityName = dto.cityName, county)

        return CityDTO(cityRepository.save(newCity))
    }

    fun getAllCities(): List<CityDTO> {
        return cityRepository.findAll().map { CityDTO(it) }
    }

}