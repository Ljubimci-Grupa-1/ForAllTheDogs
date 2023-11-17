package hr.fer.progi.forAllTheDogsbackend.image.service

import hr.fer.progi.forAllTheDogsbackend.image.repository.ImageRepository
import org.springframework.stereotype.Service

@Service
class ImageService(private val imageRepository: ImageRepository) {
}