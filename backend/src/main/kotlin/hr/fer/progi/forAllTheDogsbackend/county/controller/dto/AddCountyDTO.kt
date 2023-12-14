package hr.fer.progi.forAllTheDogsbackend.county.controller.dto

import hr.fer.progi.forAllTheDogsbackend.county.entity.County

data class AddCountyDTO(
    val countyName: String
) {
    fun toCounty(countyId: Long): County {
        return County(
            countyId = countyId,
            countyName = countyName
        )
    }
}