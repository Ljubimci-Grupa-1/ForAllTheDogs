package hr.fer.progi.forAllTheDogsbackend.userType.entity

import jakarta.persistence.*

@Entity
class UserType (
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_type_seq")
    @SequenceGenerator(name = "user_type_seq", sequenceName = "user_type_seq", allocationSize = 1)
    var userTypeId: Long,

    var name: String

)