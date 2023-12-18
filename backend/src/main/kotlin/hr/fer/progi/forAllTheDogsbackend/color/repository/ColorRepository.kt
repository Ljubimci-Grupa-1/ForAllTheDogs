package hr.fer.progi.forAllTheDogsbackend.color.repository

import hr.fer.progi.forAllTheDogsbackend.color.entity.Color
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface ColorRepository: JpaRepository<Color, Long> {
    @Query("SELECT MAX(c.colorId) FROM Color c")
    fun findMaxColorId(): Long?

    fun findByColorName(colorName: String): Color?
}