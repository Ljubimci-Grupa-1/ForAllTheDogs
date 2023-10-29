package hr.fer.progi.forAllTheDogsbackend.user.entity

import hr.fer.progi.forAllTheDogsbackend.userType.entity.UserType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne
import org.jetbrains.annotations.NotNull

@Entity
class User(

    @Id
    var userId: Long,

    @Column(unique = true)
    @NotNull
    var username: String,

    @Column(unique = true)
    @NotNull
    var email: String,

    @NotNull
    var password: String,

    var name: String,

    @Column(unique = true)
    @NotNull
    var telephoneNumber: String,

    @ManyToOne
    var userType: UserType
)