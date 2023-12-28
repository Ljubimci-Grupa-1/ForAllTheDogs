package hr.fer.progi.forAllTheDogsbackend.location.repository

import hr.fer.progi.forAllTheDogsbackend.location.entity.Location
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface LocationRepository: JpaRepository<Location, Long> {
    @Query("SELECT MAX(l.locationId) FROM Location l")
    fun findMaxLocationId(): Long?

}