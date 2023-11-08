package hr.fer.progi.forAllTheDogsbackend.image.repository

import org.springframework.data.jpa.repository.JpaRepository
import java.awt.Image

interface ImageRepository: JpaRepository<Image, Long> {
}