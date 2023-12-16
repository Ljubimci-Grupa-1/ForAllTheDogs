package hr.fer.progi.forAllTheDogsbackend.user.controller.dto

// objekt koji se šalje na backend pri prijavi korisnika
data class LoginUserDTO (
    val email: String,
    val password: String,
)