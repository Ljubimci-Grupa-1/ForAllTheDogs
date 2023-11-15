package hr.fer.progi.forAllTheDogsbackend.ad.service

import hr.fer.progi.forAllTheDogsbackend.ad.repository.AdRepository
import org.springframework.stereotype.Service

@Service
class AdService(private val adRepository: AdRepository) {
}