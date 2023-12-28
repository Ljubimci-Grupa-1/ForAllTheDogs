package hr.fer.progi.forAllTheDogsbackend.image.repository

import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import hr.fer.progi.forAllTheDogsbackend.image.entity.Image
import hr.fer.progi.forAllTheDogsbackend.message.entity.Message
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface ImageRepository: JpaRepository<Image, Long> {

    fun findByAd(ad: Ad): List<Image>
    fun findByMessage(message: Message): Image?
    fun deleteByAd(ad: Ad)
    @Query("SELECT MAX(i.imageId) FROM Image i")
    fun findMaxImageId(): Long?
}