package hr.fer.progi.forAllTheDogsbackend.city.controller.dto

import hr.fer.progi.forAllTheDogsbackend.city.entity.City

data class CityDTO (

    val cityId: Long,

    val cityName: String
){
    constructor(city: City): this(
        city.cityId,
        city.cityName
    )
}