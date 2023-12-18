package hr.fer.progi.forAllTheDogsbackend.location.service

import hr.fer.progi.forAllTheDogsbackend.location.repository.LocationRepository
import org.springframework.stereotype.Service

@Service
class LocationService(private val locationRepository: LocationRepository) {
}