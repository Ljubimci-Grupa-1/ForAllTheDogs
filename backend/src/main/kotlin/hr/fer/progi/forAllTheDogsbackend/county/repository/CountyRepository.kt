package hr.fer.progi.forAllTheDogsbackend.county.repository

import hr.fer.progi.forAllTheDogsbackend.county.entity.County
import org.springframework.data.jpa.repository.JpaRepository

interface CountyRepository: JpaRepository<County, Long> {
}