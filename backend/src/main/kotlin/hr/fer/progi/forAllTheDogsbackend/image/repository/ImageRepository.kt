package hr.fer.progi.forAllTheDogsbackend.image.repository

import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import hr.fer.progi.forAllTheDogsbackend.image.entity.Image
import org.springframework.data.jpa.repository.JpaRepository

interface ImageRepository: JpaRepository<Image, Long> {

    fun findByAd(ad: Ad): List<Image>

    fun deleteByAd(ad: Ad)

}