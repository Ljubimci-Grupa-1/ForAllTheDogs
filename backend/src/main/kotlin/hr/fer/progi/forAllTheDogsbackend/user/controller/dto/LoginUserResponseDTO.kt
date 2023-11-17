package hr.fer.progi.forAllTheDogsbackend.user.controller.dto

data class LoginUserResponseDTO(
    var email: String,
    var token: String
)