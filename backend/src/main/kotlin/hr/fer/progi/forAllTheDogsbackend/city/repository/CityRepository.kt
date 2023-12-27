package hr.fer.progi.forAllTheDogsbackend.city.repository

import hr.fer.progi.forAllTheDogsbackend.city.entity.City
import hr.fer.progi.forAllTheDogsbackend.county.entity.County
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface CityRepository: JpaRepository<City, Long> {
    fun findByCounty(county: County): List<City>

    @Query("SELECT MAX(c.cityId) FROM City c")
    fun findMaxCityId(): Long?

    fun findByCityName(cityName: String): City?

    fun findByCityNameAndCounty(cityName: String, county: County): City?
}