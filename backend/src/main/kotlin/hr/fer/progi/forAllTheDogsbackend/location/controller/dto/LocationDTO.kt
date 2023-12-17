package hr.fer.progi.forAllTheDogsbackend.location.controller.dto

import hr.fer.progi.forAllTheDogsbackend.location.entity.Location


data class LocationDTO (
    var locationId: Long,
    var longitude: Double,
    var latitude: Double,
    var cityName: String
){
    constructor(location: Location, cityName: String): this(
        location.locationId,
        location.longitude,
        location.latitude,
        cityName
    )
}