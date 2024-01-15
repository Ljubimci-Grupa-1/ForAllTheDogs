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

}