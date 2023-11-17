package hr.fer.progi.forAllTheDogsbackend.user.repository

import hr.fer.progi.forAllTheDogsbackend.user.entity.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository: JpaRepository<User, Long> {

    fun findByUsername(username: String): User?
    fun findByEmail(email: String): User?
    fun findByTelephoneNumber(telephoneNumber: String): User?
    fun findByName(name: String): User?
}