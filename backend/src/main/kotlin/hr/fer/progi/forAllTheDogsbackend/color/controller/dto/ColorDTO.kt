package hr.fer.progi.forAllTheDogsbackend.color.controller.dto
import hr.fer.progi.forAllTheDogsbackend.color.entity.Color

data class ColorDTO(
    val colorId: Long,
    val colorName: String
){
    constructor(color: Color): this (
        color.colorId,
        color.colorName
    )
}