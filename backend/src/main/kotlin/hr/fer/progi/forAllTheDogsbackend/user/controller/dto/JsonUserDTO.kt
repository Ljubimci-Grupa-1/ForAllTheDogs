package hr.fer.progi.forAllTheDogsbackend.user.controller.dto

class JsonUserDTO (
    val username: String,
    val email: String,
    val password: String,
    val name: String,
    val telephoneNumber: String,
    val userTypeId: Long
)