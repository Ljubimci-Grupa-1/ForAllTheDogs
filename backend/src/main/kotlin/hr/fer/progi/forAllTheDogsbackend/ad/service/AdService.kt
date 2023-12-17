package hr.fer.progi.forAllTheDogsbackend.ad.service

import hr.fer.progi.forAllTheDogsbackend.activity.repository.ActivityRepository
import hr.fer.progi.forAllTheDogsbackend.ad.controller.dto.AdDTO
import hr.fer.progi.forAllTheDogsbackend.ad.controller.dto.AddAdDTO
import hr.fer.progi.forAllTheDogsbackend.ad.repository.AdRepository
import hr.fer.progi.forAllTheDogsbackend.city.repository.CityRepository
import hr.fer.progi.forAllTheDogsbackend.color.entity.Color
import hr.fer.progi.forAllTheDogsbackend.color.repository.ColorRepository
import hr.fer.progi.forAllTheDogsbackend.image.entity.Image
import hr.fer.progi.forAllTheDogsbackend.image.repository.ImageRepository
import hr.fer.progi.forAllTheDogsbackend.location.repository.LocationRepository
import hr.fer.progi.forAllTheDogsbackend.pet.repository.PetRepository
import hr.fer.progi.forAllTheDogsbackend.species.repository.SpeciesRepository
import hr.fer.progi.forAllTheDogsbackend.user.repository.UserRepository
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
    fun addAd(dto: AddAdDTO): String {
        val activity = activityRepository.findByActivityCategory(dto.activityName) ?:
            throw IllegalArgumentException("Ne postoji kategorija s imenom ${dto.activityName}!")

        val user = userRepository.findByEmail(dto.user.email) ?:
            throw IllegalArgumentException("Ne postoji korisnik s emailom ${dto.user.email}!")

        val city = cityRepository.findByCityName(dto.pet.location.cityName) ?:
        throw IllegalArgumentException("Ne postoji grad ${dto.pet.location.cityName}!")

        val location = locationRepository.save(dto.pet.location.toLocation(city))

        val colors = dto.pet.colors.map { color ->
            colorRepository.findByColorName(color.colorName)
                ?: throw IllegalArgumentException("Ne postoji boja ${color.colorName}!")
        }.toMutableSet()

        val species = speciesRepository.findBySpeciesName(dto.pet.speciesName) ?:
            throw IllegalArgumentException("Ne postoji vrsta životinje ${dto.pet.speciesName}!")


        val pet = petRepository.save(dto.pet.toPet(location, species, colors))

        val ad = adRepository.save(dto.toAd(activity, pet, user))

        for(image in dto.images) {
            imageRepository.save(dto.toImage(compressImage(image), ad, null))
        }

        return "Uspjeh"
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