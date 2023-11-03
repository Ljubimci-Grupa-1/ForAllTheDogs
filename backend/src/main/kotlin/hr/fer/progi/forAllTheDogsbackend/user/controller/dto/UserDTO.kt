package hr.fer.progi.forAllTheDogsbackend.user.controller.dto

import hr.fer.progi.forAllTheDogsbackend.user.entity.User
import hr.fer.progi.forAllTheDogsbackend.userType.entity.UserType


data class UserDTO(
    val userId: Long,
    val username: String,
    val email: String,
    val password: String,
    val name: String,
    val telephoneNumber: String,
    val userType: UserType

){
    constructor(user: User): this (
        user.userId,
        user.username,
        user.email,
        user.password,
        user.name,
        user.telephoneNumber,
        user.userType
    )
}