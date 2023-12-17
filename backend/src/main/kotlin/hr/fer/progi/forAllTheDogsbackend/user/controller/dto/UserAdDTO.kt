package hr.fer.progi.forAllTheDogsbackend.user.controller.dto

import hr.fer.progi.forAllTheDogsbackend.user.entity.User

data class UserAdDTO (
    val name: String,
    val email: String,
    val telephoneNumber: String
) {
    constructor(user: User): this (
        user.name,
        user.email,
        user.telephoneNumber
    )
}