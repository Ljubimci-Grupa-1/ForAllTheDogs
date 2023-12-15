package hr.fer.progi.forAllTheDogsbackend.city.controller.dto

import hr.fer.progi.forAllTheDogsbackend.city.entity.City
import hr.fer.progi.forAllTheDogsbackend.county.entity.County
import java.util.*

data class AddCityDTO (
    val cityName: String,

    val countyId: Long
){
    fun toCity(countyFetcher: (Long) -> County, cityId: Long, cityName: String): City {
        return City(
            cityId = cityId,
            cityName = cityName,
            county = countyFetcher.invoke(countyId)
        )
    }
}