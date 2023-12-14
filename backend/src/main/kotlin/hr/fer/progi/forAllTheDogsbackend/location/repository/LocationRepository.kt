package hr.fer.progi.forAllTheDogsbackend.location.repository

import hr.fer.progi.forAllTheDogsbackend.location.entity.Location
import org.springframework.data.jpa.repository.JpaRepository

interface LocationRepository: JpaRepository<Location, Long> {
}