package hr.fer.progi.forAllTheDogsbackend.message.service

import hr.fer.progi.forAllTheDogsbackend.ad.controller.dto.AdDTO
import hr.fer.progi.forAllTheDogsbackend.ad.repository.AdRepository
import hr.fer.progi.forAllTheDogsbackend.city.repository.CityRepository
import hr.fer.progi.forAllTheDogsbackend.image.controller.dto.ImageDTO
import hr.fer.progi.forAllTheDogsbackend.image.repository.ImageRepository
import hr.fer.progi.forAllTheDogsbackend.location.controller.dto.LocationDTO
import hr.fer.progi.forAllTheDogsbackend.location.repository.LocationRepository
import hr.fer.progi.forAllTheDogsbackend.message.controller.dto.AddMessageDTO
import hr.fer.progi.forAllTheDogsbackend.message.controller.dto.MessageDTO
import hr.fer.progi.forAllTheDogsbackend.message.repository.MessageRepository
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.UserAdDTO
import hr.fer.progi.forAllTheDogsbackend.user.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class MessageService(
    private val messageRepository: MessageRepository,
    private val userRepository: UserRepository,
    private val adRepository: AdRepository,
    private val locationRepository: LocationRepository,
    private val cityRepository: CityRepository,
    private val imageRepository: ImageRepository
) {

    fun addMessage(dto: AddMessageDTO): MessageDTO {

        val user = userRepository.findByEmail(dto.user.email) ?:
            throw IllegalArgumentException("Ne postoji korisnik s emailom ${dto.user.email}!")

        val ad = adRepository.findById(dto.adId)
            .orElseThrow { IllegalArgumentException("Ad with ID ${dto.adId} not found") }


        val city = dto.location?.let { cityRepository.findByCityName(it.cityName) } ?:
            throw IllegalArgumentException("Ne postoji grad ${dto.location?.cityName}!")

        val maxLocationId = locationRepository.findMaxLocationId() ?: 0L
        val nextLocationId = maxLocationId + 1
        val location = locationRepository.save(dto.location.toLocation(city, nextLocationId))

        val maxMessageId = messageRepository.findMaxMessageId() ?: 0L
        val nextMessageId = maxMessageId + 1
        val message = messageRepository.save(dto.toMessage(user, ad, location, nextMessageId))

        val maxImageId = imageRepository.findMaxImageId() ?: 0L
        val nextImageId = maxImageId + 1
        dto.image?.let { dto.toImage(it, null, message, nextImageId) }?.let { imageRepository.save(it) }

        return MessageDTO(
            message, ad.adId,
            UserAdDTO(user),
            LocationDTO(location, city.cityName),
            ImageDTO(dto.toImage(dto.image ?: "", null, message, nextImageId))
        )
    }
}