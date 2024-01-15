package hr.fer.progi.forAllTheDogsbackend.user.controller.dto

import hr.fer.progi.forAllTheDogsbackend.ad.entity.Ad
import hr.fer.progi.forAllTheDogsbackend.user.entity.User
import hr.fer.progi.forAllTheDogsbackend.userType.entity.UserType

// objekt koji se vraća u kontroler nakon uspješne registracije korisnika
data class UserDTO(
    val userId: Long,
    val username: String,
    val email: String,
    val password: String,
    val name: String,
    val telephoneNumber: String,
    val userType: UserType
) {
    constructor(user: User): this (
        user.userId,
        user.username(),
        user.email,
        user.password,
        user.name,
        user.telephoneNumber,
        user.userType
    )

    fun toUser(): User {
        return User(
            userId,
            username,
            email,
            password,
            name,
            telephoneNumber,
            userType
        )
    }
}