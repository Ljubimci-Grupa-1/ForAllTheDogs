package hr.fer.progi.forAllTheDogsbackend.color.controller.dto

import hr.fer.progi.forAllTheDogsbackend.color.entity.Color

data class AddColorDTO(
    val colorName: String
) {
    fun toColor(colorId: Long): Color {
        return Color(
            colorId = colorId,
            colorName = colorName
        )
    }
}