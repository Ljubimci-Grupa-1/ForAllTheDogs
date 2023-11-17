package hr.fer.progi.forAllTheDogsbackend.color.repository

import hr.fer.progi.forAllTheDogsbackend.color.entity.Color
import org.springframework.data.jpa.repository.JpaRepository

interface ColorRepository: JpaRepository<Color, Long> {
}