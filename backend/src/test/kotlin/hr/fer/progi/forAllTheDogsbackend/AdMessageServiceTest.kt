package hr.fer.progi.forAllTheDogsbackend

import hr.fer.progi.forAllTheDogsbackend.activity.entity.Activity
import hr.fer.progi.forAllTheDogsbackend.activity.repository.ActivityRepository
import hr.fer.progi.forAllTheDogsbackend.ad.controller.dto.AdDTO
import io.mockk.mockk
import hr.fer.progi.forAllTheDogsbackend.ad.controller.dto.AddAdDTO
import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import hr.fer.progi.forAllTheDogsbackend.ad.repository.AdRepository
import hr.fer.progi.forAllTheDogsbackend.ad.service.AdService
import hr.fer.progi.forAllTheDogsbackend.city.entity.City
import hr.fer.progi.forAllTheDogsbackend.city.repository.CityRepository
import hr.fer.progi.forAllTheDogsbackend.color.controller.dto.AddColorDTO
import hr.fer.progi.forAllTheDogsbackend.color.entity.Color
import hr.fer.progi.forAllTheDogsbackend.color.repository.ColorRepository
import hr.fer.progi.forAllTheDogsbackend.county.entity.County
import hr.fer.progi.forAllTheDogsbackend.county.repository.CountyRepository
import hr.fer.progi.forAllTheDogsbackend.image.entity.Image
import hr.fer.progi.forAllTheDogsbackend.image.repository.ImageRepository
import hr.fer.progi.forAllTheDogsbackend.location.controller.dto.AddLocationDTO
import hr.fer.progi.forAllTheDogsbackend.location.entity.Location
import hr.fer.progi.forAllTheDogsbackend.location.repository.LocationRepository
import hr.fer.progi.forAllTheDogsbackend.message.repository.MessageRepository
import hr.fer.progi.forAllTheDogsbackend.message.service.MessageService
import hr.fer.progi.forAllTheDogsbackend.pet.controller.dto.AddPetDTO
import hr.fer.progi.forAllTheDogsbackend.pet.entity.Pet
import hr.fer.progi.forAllTheDogsbackend.pet.repository.PetRepository
import hr.fer.progi.forAllTheDogsbackend.species.entity.Species
import hr.fer.progi.forAllTheDogsbackend.species.repository.SpeciesRepository
import hr.fer.progi.forAllTheDogsbackend.user.entity.User
import hr.fer.progi.forAllTheDogsbackend.user.repository.UserRepository
import hr.fer.progi.forAllTheDogsbackend.userType.entity.UserType
import io.mockk.every
import io.mockk.slot
import io.mockk.verify
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers.any
import org.mockito.Mockito.`when`
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.mockito.Mockito.mock
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextHolder
import java.time.LocalDateTime
import java.util.*

@SpringBootTest
class AdMessageServiceTest {

    @Autowired
    private lateinit var adService: AdService

//    @Autowired
//    private lateinit var messageService: MessageService

    @MockBean
    private lateinit var adRepository: AdRepository

    @MockBean
    private lateinit var cityRepository: CityRepository

    @MockBean
    private lateinit var countyRepository: CountyRepository

    @MockBean
    private lateinit var userRepository: UserRepository

    @MockBean
    private lateinit var activityRepository: ActivityRepository

    @MockBean
    private lateinit var colorRepository: ColorRepository

    @MockBean
    private lateinit var speciesRepository: SpeciesRepository

    @MockBean
    private lateinit var locationRepository: LocationRepository

    @MockBean
    private lateinit var petRepository: PetRepository

    @MockBean
    private lateinit var imageRepository: ImageRepository

//    @MockBean
//    private lateinit var messageRepository: MessageRepository

    private lateinit var county1: County
    private lateinit var city1: City
    private lateinit var location1: Location
    private lateinit var species1: Species
    private lateinit var color1: Color
    private lateinit var colorsSet: MutableSet<Color>
    private lateinit var pet1: Pet
    private lateinit var user1: User
    private lateinit var addAdDTO1: AddAdDTO
    private lateinit var activity1: Activity
    private lateinit var addLocationDTO1: AddLocationDTO
    private lateinit var ad1: Ad
    private lateinit var image1: Image


    @BeforeEach
    fun initData() {

        county1 = County(
            countyId = 1L,
            countyName = "County"
        )

        city1 = City(
            cityId = 1L,
            cityName = "City",
            county = county1
        )

        location1 = Location(
            locationId = 1L,
            longitude = 19.12,
            latitude = 26.02,
            city = city1
        )

        species1 = Species(
            speciesId = 1L,
            speciesName = "Species"
        )

        color1 = Color(
            colorId = 1L,
            colorName = "Color"
        )

        colorsSet = mutableSetOf()
        colorsSet.add(color1)

        pet1 = Pet(
            petId = 1L,
            species = species1,
            petName = "PetName",
            age = 1,
            colors = colorsSet,
            dateTimeMissing = LocalDateTime.of(2024, 1, 15, 12, 30),
            description = "Pet",
            location = location1
        )

        user1 = User(
            userId = 1L,
            username = "username",
            email = "us.us@us.us",
            password = "ususus123",
            name = "user",
            telephoneNumber = "1234567899",
            userType = UserType(1L, "Osoba")
        )

        activity1 = Activity(
            activityId = 1L,
            activityCategory = "Za ljubimcem se traga"
        )

        addAdDTO1 = AddAdDTO(
            inShelter = 0,
            activityName = "Za ljubimcem se traga",
            pet = AddPetDTO(
                "Species",
                "PetName",
                1,
                mutableSetOf(AddColorDTO(color1.colorName)),
                LocalDateTime.of(2024, 1, 15, 12, 30),
                "Pet",
                AddLocationDTO(
                    location1.longitude,
                    location1.latitude,
                    city1.cityName,
                    county1.countyName
                )
            ),
            images = mutableListOf("img1", "img2")
        )

        addLocationDTO1 = AddLocationDTO(
            longitude = 19.12,
            latitude = 26.02,
            cityName = "City",
            countyName = "County"
        )

        ad1 = Ad(
            adId = 1L,
            inShelter = 0,
            user = user1,
            activity = activity1,
            pet = pet1,
        )

        image1 = Image(
            imageId = 1L,
            image = "img1",
            ad = ad1,
            message = null
        )

    }

    @Test
    fun addNewAd() {
        // mocking SecurityContextHolder and SecurityContext for spring security authentication
        val authentication = mock(Authentication::class.java)
        val securityContext = mock(SecurityContext::class.java)
        SecurityContextHolder.setContext(securityContext)

        // defining behavior of mocked repositories
        `when`(activityRepository.findByActivityCategory("Za ljubimcem se traga")).thenReturn(activity1)
        `when`(securityContext.authentication).thenReturn(authentication)
        `when`(authentication.name).thenReturn("us.us@us.us")
        `when`(userRepository.findByEmail(authentication.name)).thenReturn(user1)
        `when`(countyRepository.findByCountyName("County")).thenReturn(county1)
        `when`(cityRepository.findByCityName("City")).thenReturn(city1)
        `when`(cityRepository.findByCityNameAndCounty("City", county1)).thenReturn(city1)
        `when`(colorRepository.findByColorName("Color")).thenReturn(color1)
        `when`(speciesRepository.findBySpeciesName("Species")).thenReturn(species1)
        `when`(locationRepository.findMaxLocationId()).thenReturn(0L)
        `when`(locationRepository.save(any<Location>())).thenReturn(location1)
        `when`(petRepository.findMaxPetId()).thenReturn(0L)
        `when`(petRepository.save(any<Pet>())).thenReturn(pet1)
        `when`(adRepository.findMaxAdId()).thenReturn(0L)
        `when`(adRepository.save(any<Ad>())).thenReturn(ad1)
        `when`(imageRepository.findMaxImageId()).thenReturn(0L)
        `when`(imageRepository.save(image1)).thenReturn(image1)

        val result = adService.addAd(addAdDTO1)

        assertNotNull(result)
        checkIfEqual(addAdDTO1, result)

        SecurityContextHolder.clearContext()

    }

    fun checkIfEqual(addAdDTO: AddAdDTO, result: AdDTO) {
        assertEquals(addAdDTO1.inShelter, result.inShelter)
        assertEquals(addAdDTO1.activityName, result.activityName)
        assertEquals(addAdDTO1.pet.speciesName, result.pet.speciesName)
        assertEquals(addAdDTO1.pet.petName, result.pet.petName)
        assertEquals(addAdDTO1.pet.age, result.pet.age)
        assertEquals(
            addAdDTO1.pet.colors.map { it.colorName }.toList(),
            result.pet.colors.map { it }.toList()
        )
        assertEquals(addAdDTO1.pet.dateTimeMissing, result.pet.dateTimeMissing)
        assertEquals(addAdDTO1.pet.description, result.pet.description)
        assertEquals(addAdDTO1.pet.location.longitude, result.pet.location.longitude)
        assertEquals(addAdDTO1.pet.location.latitude, result.pet.location.latitude)
        assertEquals(addAdDTO1.pet.location.cityName, result.pet.location.cityName)
        assertEquals(addAdDTO1.pet.location.countyName, result.pet.location.countyName)
        assertEquals(addAdDTO1.images, result.images.map { it.image })
    }

    @Test
    fun addNewMessage(){

    }


}