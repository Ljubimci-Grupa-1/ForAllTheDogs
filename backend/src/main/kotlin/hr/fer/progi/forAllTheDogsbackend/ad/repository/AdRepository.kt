package hr.fer.progi.forAllTheDogsbackend.ad.repository

import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface AdRepository: JpaRepository<Ad, Long> {

    @Query("SELECT MAX(a.adId) FROM Ad a")
    fun findMaxAdId(): Long?

}