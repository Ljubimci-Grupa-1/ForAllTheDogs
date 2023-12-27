package hr.fer.progi.forAllTheDogsbackend.location.controller.dto

import hr.fer.progi.forAllTheDogsbackend.city.entity.City
import hr.fer.progi.forAllTheDogsbackend.location.entity.Location

data class AddLocationDTO (
    var longitude: Double,
    var latitude: Double,
    var cityName: String,
    var countyName: String
) {
    fun toLocation(city: City) = Location(
        longitude = longitude,
        latitude = latitude,
        city = city
    )
}