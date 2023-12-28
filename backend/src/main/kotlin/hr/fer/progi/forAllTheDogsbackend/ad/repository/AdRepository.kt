package hr.fer.progi.forAllTheDogsbackend.ad.repository

import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import org.springframework.data.domain.Page
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.awt.print.Pageable

interface AdRepository: JpaRepository<Ad, Long> {

    @Query("SELECT MAX(a.adId) FROM Ad a")
    fun findMaxAdId(): Long?

    fun findAllByDeletedFalse(): List<Ad>

}