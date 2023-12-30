package hr.fer.progi.forAllTheDogsbackend.user.repository

import hr.fer.progi.forAllTheDogsbackend.user.entity.User
import hr.fer.progi.forAllTheDogsbackend.userType.entity.UserType
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface UserRepository: JpaRepository<User, Long> {

    fun findByUsername(username: String): User?

    fun findByEmail(email: String): User?

    fun findByTelephoneNumber(telephoneNumber: String): User?

    fun findByName(name: String): User?

    @Query("SELECT MAX(u.userId) FROM User u")
    fun findMaxUserId(): Long?

    fun findAllByUserType(userType: UserType): List<User>

}