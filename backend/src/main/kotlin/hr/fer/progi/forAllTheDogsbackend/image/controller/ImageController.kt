package hr.fer.progi.forAllTheDogsbackend.image.controller

import hr.fer.progi.forAllTheDogsbackend.image.service.ImageService
import org.springframework.stereotype.Controller

@Controller
class ImageController(private val imageService: ImageService) {
}