package hr.fer.progi.forAllTheDogsbackend.ad.repository

import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import org.springframework.data.jpa.repository.JpaRepository

interface AdRepository: JpaRepository<Ad, Long> {
}