package hr.fer.progi.forAllTheDogsbackend

import hr.fer.progi.forAllTheDogsbackend.activity.entity.Activity
import hr.fer.progi.forAllTheDogsbackend.activity.repository.ActivityRepository
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
import org.mockito.Mockito.`when`
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import java.time.LocalDateTime
import java.util.*

@SpringBootTest
class AdMessageServiceTest {

    @Autowired
    private lateinit var adService: AdService

    @Autowired
    private lateinit var messageService: MessageService

    @MockBean
    private lateinit var adRepository: AdRepository

    @MockBean
    private lateinit var cityRepository: CityRepository

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
    private lateinit var messageRepository: MessageRepository

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
            activityName = "test",
            pet = AddPetDTO(
                "Pas",
                "Branko",
                2,
                mutableSetOf(AddColorDTO(color1.colorName)),
                LocalDateTime.of(2024, 1, 15, 12, 30),
                "Slatki pas",
                AddLocationDTO(
                    location1.longitude,
                    location1.latitude,
                    city1.cityName,
                    county1.countyName
                )
            ),
            images = mutableListOf("img1", "img2")
        )
    }

    @Test
    fun addNewAd(){
        val addAdDTO = addAdDTO1
        val petMock = mockk<Pet>()
        val userMock = mockk<User>()
        val activityMock = mockk<Activity>()
        val adMock = mockk<Ad>()


        // Mocking repository methods
        every { petRepository.save(any()) } returns petMock
        every { userRepository.findByEmail(any()) } returns userMock
        every { activityRepository.findByActivityCategory(any()) } returns activityMock
        every { adRepository.save(any()) } returns adMock

        // Setting up behavior for the petMock object
        every { petMock.location } returns location1
        every { petMock.species } returns species1
        every { petMock.colors } returns colorsSet

        // Setting up behavior for the userRepository mock
        every { userMock.userId } returns 1L

        // Setting up behavior for the activityRepository mock
        every { activityMock.activityId } returns 1L

        // Setting up behavior for the adRepository mock
        val adSlot = slot<Ad>()
        every { adRepository.save(capture(adSlot)) } answers { adSlot.captured }

        // Calling the service method
        adService.addAd(addAdDTO)

        // Verifying that the save method was called with the expected Ad object
        verify { adRepository.save(any()) }

    }

    @Test
    fun addNewMessage(){

    }


}