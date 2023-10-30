package hr.fer.progi.forAllTheDogsbackend.user.controller.dto

import hr.fer.progi.forAllTheDogsbackend.user.entity.User


data class UserDTO(
    val userId: Long,
    val username: String,
    val email: String,
    val password: String,
    val name: String,
    val telephoneNumber: String,
    val userType: String

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