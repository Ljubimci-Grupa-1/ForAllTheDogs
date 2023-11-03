package hr.fer.progi.forAllTheDogsbackend.user.controller.dto

import hr.fer.progi.forAllTheDogsbackend.user.entity.User
import hr.fer.progi.forAllTheDogsbackend.userType.entity.UserType


data class AddUserDTO(
    val username: String,
    val email: String,
    val password: String,
    val name: String,
    val telephoneNumber: String,
    val userType: UserType
){
    fun toUser() = User(
        username = username,
        email = email,
        password = password,
        name = name,
        telephoneNumber = telephoneNumber,
        userType = userType)
}