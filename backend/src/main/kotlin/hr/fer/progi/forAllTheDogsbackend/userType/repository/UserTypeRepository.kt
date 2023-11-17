package hr.fer.progi.forAllTheDogsbackend.userType.repository

import hr.fer.progi.forAllTheDogsbackend.userType.entity.UserType
import org.springframework.data.jpa.repository.JpaRepository

interface UserTypeRepository: JpaRepository<UserType, Long> {
    fun findByUserTypeId(id: Long): UserType?
}