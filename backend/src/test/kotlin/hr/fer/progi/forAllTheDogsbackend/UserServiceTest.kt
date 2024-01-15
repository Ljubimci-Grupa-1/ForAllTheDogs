package hr.fer.progi.forAllTheDogsbackend

import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.JsonUserDTO
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.LoginUserDTO
import hr.fer.progi.forAllTheDogsbackend.user.entity.User
import hr.fer.progi.forAllTheDogsbackend.user.repository.UserRepository
import hr.fer.progi.forAllTheDogsbackend.user.service.UserService
import hr.fer.progi.forAllTheDogsbackend.userType.entity.UserType
import hr.fer.progi.forAllTheDogsbackend.userType.repository.UserTypeRepository
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.assertThrows
import org.mockito.ArgumentMatchers.any
import org.mockito.Mockito.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import java.lang.IllegalArgumentException

@SpringBootTest
class UserServiceTest {

    @MockBean
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var userService: UserService

    @MockBean
    private lateinit var userTypeRepository: UserTypeRepository

    @Test
    fun loginValidTest(){

        val newUser = User(
            userId = 1L,
            username = "username",
            email = "us.us@us.us",
            password = "ususus123",
            name = "user",
            telephoneNumber = "1234567899",
            userType = UserType(1L, "Osoba")
        )

        val login = LoginUserDTO(
            newUser.email,
            newUser.password
        )

        `when`(userRepository.findByEmail(newUser.email)).thenReturn(newUser)

        val savedUser: User = userService.authorizeUser(login).toUser()

        assertNotNull(savedUser)
        assertEquals(newUser, savedUser)
    }

    @Test
    fun loginInvalidTest(){

        val newUser = User(
            userId = 1L,
            username = "username",
            email = "us.us@us.us",
            password = "ususus123",
            name = "user",
            telephoneNumber = "1234567899",
            userType = UserType(1L, "Osoba")
        )

        val login = LoginUserDTO(
            newUser.email,
            "krivi password"
        )

        `when`(userRepository.findByEmail(newUser.email)).thenReturn(null)

        assertThrows<IllegalArgumentException> {
            userService.authorizeUser(login)
        }
    }

    @Test
    fun registerValidTest(){

        val jsonUserDTO = JsonUserDTO(
            username = "username",
            email = "us.us@us.us",
            password = "ususus123",
            name = "user",
            telephoneNumber = "1234567899",
            userTypeId = 1L
        )

        val userType = UserType(1L, "Osoba")

        `when`(userTypeRepository.findByUserTypeId(jsonUserDTO.userTypeId)).thenReturn(userType)
        `when`(userRepository.findMaxUserId()).thenReturn(0L)

        val savedUser = User(
            userId = 1L,
            username = jsonUserDTO.username,
            email = jsonUserDTO.email,
            password = jsonUserDTO.password,
            name = jsonUserDTO.name,
            telephoneNumber = jsonUserDTO.telephoneNumber,
            userType = userType
        )

        `when`(userRepository.save(any(User::class.java))).thenReturn(savedUser)

        val result = userService.addUser(jsonUserDTO).toJsonUser()

        assertEquals(jsonUserDTO, result)

        // Verify that userRepository.save was called with a non-null argument
        verify(userRepository, times(1)).save(any(User::class.java))
    }

    @Test
    fun registerInvalidTest(){

        val jsonUserDTO = JsonUserDTO(
            username = "username",
            email = "us.us@us.us",
            password = "ususus123",
            name = "user",
            telephoneNumber = "1234567899",
            userTypeId = 1L
        )

        `when`(userRepository.findByEmail(jsonUserDTO.email)).thenReturn(null)

        assertThrows<IllegalArgumentException> {
            userService.addUser(jsonUserDTO)
        }

    }

    @Test
    fun getAllSheltersTest(){
        val shelterUserType = UserType(2L, "Sklonište")

        val shelter1 = User(
            userId = 1L,
            username = "username1",
            email = "email1",
            password = "password1",
            name = "name1",
            telephoneNumber = "telephoneNumber1",
            userType = shelterUserType
        )

        val shelter2 = User(
            userId = 2L,
            username = "username2",
            email = "email2",
            password = "password2",
            name = "name2",
            telephoneNumber = "telephoneNumber2",
            userType = shelterUserType
        )

        val shelter3 = User(
            userId = 3L,
            username = "username3",
            email = "email3",
            password = "password3",
            name = "name3",
            telephoneNumber = "telephoneNumber3",
            userType = shelterUserType
        )

        val shelters = listOf(shelter1, shelter2, shelter3)

        `when`(userTypeRepository.findByUserTypeId(2L)).thenReturn(shelterUserType)
        `when`(userRepository.findAllByUserType(shelterUserType)).thenReturn(shelters)

        val result = userService.getAllShelters().map { it.toUser() }

        assertEquals(shelters, result)
        assertEquals(shelters, result)
    }

}