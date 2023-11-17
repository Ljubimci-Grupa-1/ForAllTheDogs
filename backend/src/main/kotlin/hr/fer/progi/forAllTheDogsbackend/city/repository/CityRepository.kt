package hr.fer.progi.forAllTheDogsbackend.city.repository

import hr.fer.progi.forAllTheDogsbackend.city.entity.City
import org.springframework.data.jpa.repository.JpaRepository

interface CityRepository: JpaRepository<City, Long> {
}