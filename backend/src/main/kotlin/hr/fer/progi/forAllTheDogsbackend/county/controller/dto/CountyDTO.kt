package hr.fer.progi.forAllTheDogsbackend.county.controller.dto

import hr.fer.progi.forAllTheDogsbackend.county.entity.County

data class CountyDTO (

    val countyId:Long,

    val countyName: String
){
    constructor(county: County): this(
        county.countyId,
        county.countyName
    )
}