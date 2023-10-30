package hr.fer.progi.forAllTheDogsbackend.user.repository

import hr.fer.progi.forAllTheDogsbackend.user.entity.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRespository: JpaRepository<User, Long> {

    fun findByUsername(username: String): User?

    fun findByEmail(email: String): User?

    fun findByTelephoneNumber(telephoneNumber: String): User?
}