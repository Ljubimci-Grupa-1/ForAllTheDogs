package hr.fer.progi.forAllTheDogsbackend.ad.service

import hr.fer.progi.forAllTheDogsbackend.activity.repository.ActivityRepository
import hr.fer.progi.forAllTheDogsbackend.ad.controller.dto.AdDTO
import hr.fer.progi.forAllTheDogsbackend.ad.controller.dto.AddAdDTO
import hr.fer.progi.forAllTheDogsbackend.ad.controller.dto.EditAdDTO
import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import hr.fer.progi.forAllTheDogsbackend.ad.repository.AdRepository
import hr.fer.progi.forAllTheDogsbackend.city.repository.CityRepository
import hr.fer.progi.forAllTheDogsbackend.color.repository.ColorRepository
import hr.fer.progi.forAllTheDogsbackend.county.repository.CountyRepository
import hr.fer.progi.forAllTheDogsbackend.image.controller.dto.ImageDTO
import hr.fer.progi.forAllTheDogsbackend.image.repository.ImageRepository
import hr.fer.progi.forAllTheDogsbackend.location.controller.dto.LocationDTO
import hr.fer.progi.forAllTheDogsbackend.location.repository.LocationRepository
import hr.fer.progi.forAllTheDogsbackend.message.controller.dto.MessageDTO
import hr.fer.progi.forAllTheDogsbackend.message.repository.MessageRepository
import hr.fer.progi.forAllTheDogsbackend.pet.controller.dto.EditPetDTO
import hr.fer.progi.forAllTheDogsbackend.pet.controller.dto.PetDTO
import hr.fer.progi.forAllTheDogsbackend.pet.entity.Pet
import hr.fer.progi.forAllTheDogsbackend.pet.repository.PetRepository
import hr.fer.progi.forAllTheDogsbackend.species.repository.SpeciesRepository
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.UserAdDTO
import hr.fer.progi.forAllTheDogsbackend.user.repository.UserRepository
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service

@Service
class AdService(
    private val adRepository: AdRepository,
    private val imageRepository: ImageRepository,
    private val activityRepository: ActivityRepository,
    private val userRepository: UserRepository,
    private val petRepository: PetRepository,
    private val locationRepository: LocationRepository,
    private val cityRepository: CityRepository,
    private val colorRepository: ColorRepository,
    private val speciesRepository: SpeciesRepository,
    private val countyRepository: CountyRepository,
    private val messageRepository: MessageRepository
) {

    fun getAllAds() = adRepository.findAllByDeletedFalse().map { ad -> createAdDTO(ad) }

    fun getAllAds(pageable: Pageable) = adRepository.findAllByDeletedFalse(pageable).map { ad -> createAdDTO(ad) }

    fun addAd(dto: AddAdDTO): AdDTO {
        // getting all the necessary data from the DTO
        val activity = activityRepository.findByActivityCategory(dto.activityName) ?:
            throw IllegalArgumentException("Ne postoji kategorija s imenom ${dto.activityName}!")

        val user = userRepository.findByEmail(dto.user.email) ?:
            throw IllegalArgumentException("Ne postoji korisnik s emailom ${dto.user.email}!")


        val city = if (dto.pet.location.cityName == "Ostalo") {
            // if the city is "Ostalo", we need to check which county it belongs to
            val county = countyRepository.findByCountyName(dto.pet.location.countyName)
                ?: throw IllegalArgumentException("Ne postoji županija ${dto.pet.location.countyName}!")

            cityRepository.findByCityNameAndCounty(dto.pet.location.cityName, county)
                ?: throw IllegalArgumentException("Ne postoji grad ${dto.pet.location.cityName}!")
        } else {
            // else we just find the city by its name
            cityRepository.findByCityName(dto.pet.location.cityName)
                ?: throw IllegalArgumentException("Ne postoji grad ${dto.pet.location.cityName}!")
        }

        val colors = dto.pet.colors.map { color ->
            colorRepository.findByColorName(color.colorName)
                ?: throw IllegalArgumentException("Ne postoji boja ${color.colorName}!")
        }.toMutableSet()

        val species = speciesRepository.findBySpeciesName(dto.pet.speciesName) ?:
            throw IllegalArgumentException("Ne postoji vrsta životinje ${dto.pet.speciesName}!")

        // saving the pet, location and ad to the database
        val maxLocationId = locationRepository.findMaxLocationId() ?: 0L
        val nextLocationId = maxLocationId + 1
        val location = locationRepository.save(dto.pet.location.toLocation(city, nextLocationId))

        val maxPetId = petRepository.findMaxPetId() ?: 0L
        val nextPetId = maxPetId + 1
        val pet = petRepository.save(dto.pet.toPet(location, species, colors, nextPetId))

        val maxAdId = adRepository.findMaxAdId() ?: 0L
        val nextAdId = maxAdId + 1
        val ad = adRepository.save(dto.toAd(activity, pet, user, nextAdId))

        // saving the compressed images to the database
        dto.images.forEach { image ->
            val maxImageId = imageRepository.findMaxImageId() ?: 0L
            val nextImageId = maxImageId + 1
            imageRepository.save(dto.toImage(image, ad, null, nextImageId))
        }

        // returning the DTO with the saved data
        return AdDTO(ad, UserAdDTO(user),
            activity.activityCategory,
            PetDTO(pet,
                dto.pet.colors.map { color -> color.colorName }.toMutableSet(), // map the colors to a set of strings
                species,
                LocationDTO(location, city.cityName, city.county.countyName)
            ),
            // map the images to a list of ImageDTOs
            dto.images.map { image -> ImageDTO(dto.toImage2(image, ad, null)) }
        )
    }

    fun editAd(id: Long, editAddDTO: EditAdDTO): AdDTO {
        val ad = adRepository.findById(id).get()
        val pet = petRepository.findById(ad.pet.petId).get()

        editPetDetails(pet, editAddDTO.pet ?: EditPetDTO())
        petRepository.save(pet)

        editAdDetails(ad, editAddDTO)
        adRepository.save(ad)

        return createAdDTO(ad)
    }

    fun deleteAd(id: Long) {
        val ad = adRepository.findById(id).get()
        ad.deleted = true
        adRepository.save(ad)
    }

    fun getAdWithMessages(id: Long): List<MessageDTO> {
        val ad = adRepository.findById(id).get()
        val messages = messageRepository.findByAd(ad)
        return messages.map { message ->

            MessageDTO(
                message,
                ad.adId,
                UserAdDTO(message.user),
                LocationDTO(
                    message.location,
                    message.location?.city?.cityName,
                    message.location?.city?.county?.countyName
                ),
                ImageDTO(imageRepository.findByMessage(message))
            )
        }
    }


//    HELPER FUNCTIONS

    private fun createAdDTO(ad: Ad): AdDTO {
        // getting all the necessary data from the database
        val user = userRepository.findById(ad.user.userId)
        val activity = activityRepository.findById(ad.activity.activityId)
        val pet = petRepository.findById(ad.pet.petId)
        val city = cityRepository.findById(pet.get().location.city.cityId)
        val location = locationRepository.findById(pet.get().location.locationId)
        val species = speciesRepository.findById(pet.get().species.speciesId)

        // mapping the colors to a set of strings with the color names
        val colors = ad.pet.colors.map { color ->
            color.colorName
        }.toMutableSet()

        // mapping the images to a list of ImageDTOs
        val images = imageRepository.findByAd(ad).toList().map { image ->
            ImageDTO(image)
        }

        // returning the DTO
        return AdDTO(ad, UserAdDTO(user.get()),
            activity.get().activityCategory,
            PetDTO(pet.get(), colors, species.get(),
                LocationDTO(location.get(), city.get().cityName, city.get().county.countyName)
            ),
            images
        )
    }

    private fun editPetDetails(pet: Pet, editPetDTO: EditPetDTO) {
        pet.species = editPetDTO.speciesName?.let { speciesRepository.findBySpeciesName(it) } ?: pet.species
        if(editPetDTO.location != null) {
            val location = locationRepository.findById(pet.location.locationId).get()
            location.longitude = editPetDTO.location.longitude ?: location.longitude
            location.latitude = editPetDTO.location.latitude ?: location.latitude
            location.city = if (editPetDTO.location.cityName != null) {  // if the city is not null, it means it was changed
                if (editPetDTO.location.cityName == "Ostalo") {
                    // if the city is "Ostalo", we need to check which county it belongs to
                    val county = editPetDTO.location.countyName?.let { countyRepository.findByCountyName(it) }
                        ?: throw IllegalArgumentException("Ne postoji županija ${editPetDTO.location.countyName}!")

                    cityRepository.findByCityNameAndCounty(editPetDTO.location.cityName!!, county)
                        ?: throw IllegalArgumentException("Ne postoji grad ${editPetDTO.location.cityName}!")
                } else {
                    // else we just find the city by its name
                    cityRepository.findByCityName(editPetDTO.location.cityName!!)
                        ?: throw IllegalArgumentException("Ne postoji grad ${editPetDTO.location.cityName}!")
                }
            } else {  // else we just keep the old city
                pet.location.city
            }
            locationRepository.save(location)
            pet.location = location
        }
        if(editPetDTO.colors != null) {
            val colors = editPetDTO.colors.map { color ->
                colorRepository.findByColorName(color.colorName)
                    ?: throw IllegalArgumentException("Ne postoji boja ${color.colorName}!")
            }.toMutableSet()
            pet.colors = colors
        }
        pet.petName = editPetDTO.petName ?: pet.petName
        pet.age = editPetDTO.age ?: pet.age
        pet.dateTimeMissing = editPetDTO.dateTimeMissing ?: pet.dateTimeMissing
        pet.description = editPetDTO.description ?: pet.description
    }

    private fun editAdDetails(ad: Ad, editAdDTO: EditAdDTO) {
        ad.inShelter = editAdDTO.inShelter ?: ad.inShelter
        ad.activity = editAdDTO.activityName?.let { activityRepository.findByActivityCategory(it) } ?: ad.activity
        if (editAdDTO.images != null) {
            imageRepository.deleteByAd(ad)  // delete all the images from the database

            editAdDTO.images.forEach { image ->
                val maxImageId = imageRepository.findMaxImageId() ?: 0L
                val nextImageId = maxImageId + 1
                imageRepository.save(editAdDTO.toImage(image, ad, null, nextImageId))
            }
        }
    }
}