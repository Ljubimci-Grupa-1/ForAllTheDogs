package hr.fer.progi.forAllTheDogsbackend.county.repository

import hr.fer.progi.forAllTheDogsbackend.county.entity.County
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.*

interface CountyRepository: JpaRepository<County, Long> {
    @Query("SELECT MAX(c.countyId) FROM County c")
    fun findMaxCountyId(): Long?
}