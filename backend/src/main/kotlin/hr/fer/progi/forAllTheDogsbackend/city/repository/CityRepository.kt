package hr.fer.progi.forAllTheDogsbackend.city.repository

import hr.fer.progi.forAllTheDogsbackend.city.entity.City
import hr.fer.progi.forAllTheDogsbackend.county.entity.County
import org.springframework.data.jpa.repository.JpaRepository

interface CityRepository: JpaRepository<City, Long> {
    fun findByCounty(county: County): List<City>
}