package hr.fer.progi.forAllTheDogsbackend.location.controller.dto

import hr.fer.progi.forAllTheDogsbackend.city.entity.City
import hr.fer.progi.forAllTheDogsbackend.location.entity.Location

data class EditLocationDTO(
    var longitude: Double? = null,
    var latitude: Double? = null,
    var cityName: String? = null,
    var countyName: String? = null
) {
    fun toLocation(city: City, longitude: Double, latitude: Double) = Location(
        longitude = longitude,
        latitude = latitude,
        city = city
    )
}
