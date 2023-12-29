package hr.fer.progi.forAllTheDogsbackend.location.controller.dto

import hr.fer.progi.forAllTheDogsbackend.location.entity.Location


data class LocationDTO (
    var locationId: Long?,
    var longitude: Double?,
    var latitude: Double?,
    var cityName: String?,
    var countyName: String?
){
    constructor(location: Location?, cityName: String?, countyName: String?): this(
        location?.locationId,
        location?.longitude,
        location?.latitude,
        cityName,
        countyName
    )
}