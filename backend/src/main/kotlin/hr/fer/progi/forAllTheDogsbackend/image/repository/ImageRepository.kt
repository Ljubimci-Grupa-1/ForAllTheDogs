package hr.fer.progi.forAllTheDogsbackend.image.repository

import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import hr.fer.progi.forAllTheDogsbackend.image.entity.Image
import hr.fer.progi.forAllTheDogsbackend.message.entity.Message
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional

interface ImageRepository: JpaRepository<Image, Long> {

    fun findByAd(ad: Ad): List<Image>
    fun findByMessage(message: Message): Image?

    @Modifying
    @Transactional
    fun deleteByAd(ad: Ad)

    @Query("SELECT MAX(i.imageId) FROM Image i")
    fun findMaxImageId(): Long?
}