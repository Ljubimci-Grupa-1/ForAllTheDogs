package hr.fer.progi.forAllTheDogsbackend.county.controller.dto

import hr.fer.progi.forAllTheDogsbackend.city.controller.dto.CityDTO
import hr.fer.progi.forAllTheDogsbackend.city.entity.City
import hr.fer.progi.forAllTheDogsbackend.county.entity.County

class CountyWithCitiesDTO (

    val countyId: Long,

    val countyName: String,

    val cities: List<CityDTO>
){
    constructor(county: County, cities: List<City>): this(
        county.countyId,
        county.countyName,
        cities.map { CityDTO(it) }
    )
}