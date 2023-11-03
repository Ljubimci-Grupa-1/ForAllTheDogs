package hr.fer.progi.forAllTheDogsbackend.userType.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id

@Entity
class UserType (
    @Id
    @GeneratedValue
    var userTypeId: Long,

    var name: String

)