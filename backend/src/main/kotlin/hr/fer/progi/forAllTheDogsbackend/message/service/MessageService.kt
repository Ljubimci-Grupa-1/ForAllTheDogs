package hr.fer.progi.forAllTheDogsbackend.message.service

import hr.fer.progi.forAllTheDogsbackend.ad.repository.AdRepository
import hr.fer.progi.forAllTheDogsbackend.city.repository.CityRepository
import hr.fer.progi.forAllTheDogsbackend.location.repository.LocationRepository
import hr.fer.progi.forAllTheDogsbackend.message.controller.dto.AddMessageDTO
import hr.fer.progi.forAllTheDogsbackend.message.repository.MessageRepository
import hr.fer.progi.forAllTheDogsbackend.user.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class MessageService(
    private val messageRepository: MessageRepository,
    private val userRepository: UserRepository,
    private val adRepository: AdRepository,
    private val locationRepository: LocationRepository,
    private val cityRepository: CityRepository
) {

    fun addMessage(dto: AddMessageDTO) {

        val user = userRepository.findByEmail(dto.user.email) ?:
            throw IllegalArgumentException("Ne postoji korisnik s emailom ${dto.user.email}!")

        val ad = adRepository.findById(dto.adId)
            .orElseThrow { IllegalArgumentException("Ad with ID ${dto.adId} not found") }


        val city = dto.location?.let { cityRepository.findByCityName(it.cityName) } ?:
            throw IllegalArgumentException("Ne postoji grad ${dto.location?.cityName}!")

        val location = locationRepository.save(dto.location.toLocation(city))

        messageRepository.save(dto.toMessage(user, ad, location))
    }
}