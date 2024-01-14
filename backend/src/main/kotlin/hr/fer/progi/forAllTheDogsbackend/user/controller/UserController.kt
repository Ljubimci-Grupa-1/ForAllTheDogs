package hr.fer.progi.forAllTheDogsbackend.user.controller

import hr.fer.progi.forAllTheDogsbackend.security.auth.JwtUtil
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.JsonUserDTO
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.LoginUserDTO
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.LoginUserResponseDTO
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.UserDTO
import hr.fer.progi.forAllTheDogsbackend.user.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.security.access.annotation.Secured
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.*

@RequestMapping("/user")
@RestController
class UserController(
    private val userService: UserService,
    private val authenticationManager: AuthenticationManager,
    private val jwtUtil: JwtUtil,
    private val passwordEncoder: BCryptPasswordEncoder
) {
    @PostMapping("/register")
    fun addUser(@RequestBody user: JsonUserDTO): ResponseEntity<UserDTO> {
        user.password = passwordEncoder.encode(user.password)
        val registeredUser = userService.addUser(user)
        return ResponseEntity.ok(registeredUser)
    }

    @PostMapping("/login")
    fun authorizeUser(@RequestBody user: LoginUserDTO): ResponseEntity<LoginUserResponseDTO> {
        try {
            val authentication = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                    user.email,
                    user.password
                )
            )

            val authorizedUser = userService.authorizeUser(user)
            SecurityContextHolder.getContext().authentication = authentication

            val token = jwtUtil.createToken(authorizedUser)
            val response = LoginUserResponseDTO(authorizedUser.email, token)

            return ResponseEntity.ok(response)
        } catch (e: Exception) {
            throw IllegalArgumentException("Wrong credentials!")
        }
    }

    @GetMapping("/shelter/all")
    fun getAllShelters() = ResponseEntity.ok(
        userService.getAllShelters()
    )

    @GetMapping("/test")
//    @PreAuthorize("hasRole('USER')")
    fun test() = ResponseEntity.ok("BIG BOMBOCLAAT")

}