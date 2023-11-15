package hr.fer.progi.forAllTheDogsbackend.color.service

import hr.fer.progi.forAllTheDogsbackend.color.repository.ColorRepository
import org.springframework.stereotype.Service

@Service
class ColorService(private val colorRepository: ColorRepository) {
}