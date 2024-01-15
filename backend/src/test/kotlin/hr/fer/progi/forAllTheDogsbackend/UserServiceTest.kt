package hr.fer.progi.forAllTheDogsbackend

import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.LoginUserDTO
import hr.fer.progi.forAllTheDogsbackend.user.entity.User
import hr.fer.progi.forAllTheDogsbackend.user.repository.UserRepository
import hr.fer.progi.forAllTheDogsbackend.user.service.UserService
import hr.fer.progi.forAllTheDogsbackend.userType.entity.UserType
import org.junit.jupiter.api.Test
import org.mockito.Mockito.`when`
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.assertThrows
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


}