package hr.fer.progi.forAllTheDogsbackend.user.controller.dto

// objekt koji se šalje na backend pri registraciji korisnika
data class JsonUserDTO (
    val username: String,
    val email: String,
    var password: String,
    val name: String,
    val telephoneNumber: String,
    val userTypeId: Long
)