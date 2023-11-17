package hr.fer.progi.forAllTheDogsbackend.city.service

import hr.fer.progi.forAllTheDogsbackend.city.repository.CityRepository
import org.springframework.stereotype.Service

@Service
class CityService(private val cityRepository: CityRepository) {
}