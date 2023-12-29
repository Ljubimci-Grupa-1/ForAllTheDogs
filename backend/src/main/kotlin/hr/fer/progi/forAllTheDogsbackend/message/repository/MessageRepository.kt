package hr.fer.progi.forAllTheDogsbackend.message.repository

import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import hr.fer.progi.forAllTheDogsbackend.message.entity.Message
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface MessageRepository: JpaRepository<Message, Long> {

    @Query("SELECT MAX(m.messageId) FROM Message m")
    fun findMaxMessageId(): Long?

    fun findByAd(ad: Ad): List<Message>

}