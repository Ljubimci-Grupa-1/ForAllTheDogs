package hr.fer.progi.forAllTheDogsbackend.ad.service

import hr.fer.progi.forAllTheDogsbackend.activity.repository.ActivityRepository
import hr.fer.progi.forAllTheDogsbackend.ad.controller.dto.AdDTO
import hr.fer.progi.forAllTheDogsbackend.ad.controller.dto.AddAdDTO
import hr.fer.progi.forAllTheDogsbackend.ad.controller.dto.EditAdDTO
import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import hr.fer.progi.forAllTheDogsbackend.ad.repository.AdRepository
import hr.fer.progi.forAllTheDogsbackend.city.repository.CityRepository
import hr.fer.progi.forAllTheDogsbackend.color.repository.ColorRepository
import hr.fer.progi.forAllTheDogsbackend.image.controller.dto.ImageDTO
import hr.fer.progi.forAllTheDogsbackend.image.repository.ImageRepository
import hr.fer.progi.forAllTheDogsbackend.location.controller.dto.LocationDTO
import hr.fer.progi.forAllTheDogsbackend.location.repository.LocationRepository
import hr.fer.progi.forAllTheDogsbackend.pet.controller.dto.EditPetDTO
import hr.fer.progi.forAllTheDogsbackend.pet.controller.dto.PetDTO
import hr.fer.progi.forAllTheDogsbackend.pet.entity.Pet
import hr.fer.progi.forAllTheDogsbackend.pet.repository.PetRepository
import hr.fer.progi.forAllTheDogsbackend.species.repository.SpeciesRepository
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.UserAdDTO
import hr.fer.progi.forAllTheDogsbackend.user.repository.UserRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.awt.image.BufferedImage
import java.io.ByteArrayOutputStream
import java.io.InputStream
import java.util.*
import javax.imageio.IIOImage
import javax.imageio.ImageIO
import javax.imageio.ImageWriteParam
import javax.imageio.ImageWriter
import javax.imageio.stream.ImageOutputStream

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
    private val speciesRepository: SpeciesRepository
) {

    fun getAllAds() = adRepository.findAll().map { ad -> createAdDTO(ad) }

    fun getAllAds(pageable: Pageable) = adRepository.findAll(pageable).map { ad -> createAdDTO(ad) }

    fun addAd(dto: AddAdDTO): AdDTO {
        // getting all the necessary data from the DTO
        val activity = activityRepository.findByActivityCategory(dto.activityName) ?:
            throw IllegalArgumentException("Ne postoji kategorija s imenom ${dto.activityName}!")

        val user = userRepository.findByEmail(dto.user.email) ?:
            throw IllegalArgumentException("Ne postoji korisnik s emailom ${dto.user.email}!")

        val city = cityRepository.findByCityName(dto.pet.location.cityName) ?:
            throw IllegalArgumentException("Ne postoji grad ${dto.pet.location.cityName}!")

        val colors = dto.pet.colors.map { color ->
            colorRepository.findByColorName(color.colorName)
                ?: throw IllegalArgumentException("Ne postoji boja ${color.colorName}!")
        }.toMutableSet()

        val species = speciesRepository.findBySpeciesName(dto.pet.speciesName) ?:
            throw IllegalArgumentException("Ne postoji vrsta životinje ${dto.pet.speciesName}!")

        // saving the pet, location and ad to the database
        val location = locationRepository.save(dto.pet.location.toLocation(city))

        val pet = petRepository.save(dto.pet.toPet(location, species, colors))

        val ad = adRepository.save(dto.toAd(activity, pet, user))

        // saving the compressed images to the database
        dto.images.forEach { image ->
            imageRepository.save(dto.toImage(compressImage(image), ad, null))
        }

        // returning the DTO with the saved data
        return AdDTO(ad, UserAdDTO(user),
            activity.activityCategory,
            PetDTO(pet,
                dto.pet.colors.map { color -> color.colorName }.toMutableSet(), // map the colors to a set of strings
                species,
                LocationDTO(location, city.cityName)
            ),
            // map the images to a list of ImageDTOs
            dto.images.map { image -> ImageDTO(dto.toImage(compressImage(image), ad, null)) }
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
                LocationDTO(location.get(), city.get().cityName)
            ),
            images
        )
    }

    private fun editPetDetails(pet: Pet, editPetDTO: EditPetDTO) {
        pet.species = editPetDTO.speciesName?.let { speciesRepository.findBySpeciesName(it) } ?: pet.species
        if(editPetDTO.location != null) {
            val longitude = editPetDTO.location.longitude ?: pet.location.longitude
            val latitude = editPetDTO.location.latitude ?: pet.location.latitude
            val city = editPetDTO.location.cityName?.let { cityRepository.findByCityName(it) } ?: pet.location.city
            val location = locationRepository.save(editPetDTO.location.toLocation(city, longitude, latitude))
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
            editAdDTO.images.forEach { image ->
                imageRepository.save(editAdDTO.toImage(compressImage(image), ad, null))
            }
        }
    }

    private fun compressImage(photo: MultipartFile): ByteArray {
        val MAX_SIZE: Long = 5 * 1024 * 1024 // 5 MB
        val compressionQuality = if (photo.size > MAX_SIZE) 0.5f else 0.75f // More compression if larger than 5MB

        // Read the MultipartFile into a BufferedImage
        val inputFileStream: InputStream = photo.inputStream
        val inputImage: BufferedImage = ImageIO.read(inputFileStream)

        // Compress the image
        val compressedOutputStream = ByteArrayOutputStream()
        val formatName = Objects.requireNonNull(photo.contentType)?.split("/")?.get(1)
        val writers: Iterator<ImageWriter> = ImageIO.getImageWritersByFormatName(formatName ?: "unknown")

        if (formatName == null) {
            throw IllegalArgumentException("Invalid or missing content type for the photo. Cannot determine image format.")
        }

        val writer: ImageWriter = writers.next()
        val imageOutputStream: ImageOutputStream = ImageIO.createImageOutputStream(compressedOutputStream)
        writer.output = imageOutputStream
        val params: ImageWriteParam = writer.defaultWriteParam
        params.compressionMode = ImageWriteParam.MODE_EXPLICIT
        params.compressionQuality = compressionQuality // Adjust the compression quality
        writer.write(null, IIOImage(inputImage, null, null), params)
        writer.dispose()
        imageOutputStream.close()

        // Convert the compressed image to a byte array
        return compressedOutputStream.toByteArray()
    }

}