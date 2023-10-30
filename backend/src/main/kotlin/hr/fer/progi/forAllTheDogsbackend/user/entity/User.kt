package hr.fer.progi.forAllTheDogsbackend.user.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.jetbrains.annotations.NotNull

@Entity
@Table(name = "app_user")
class User(

    @Id
    @GeneratedValue
    var userId: Long = 0L,

    @Column(unique = true)
    @NotNull
    var username: String,

    @Column(unique = true)
    @NotNull
    var email: String,

    @NotNull
    var password: String,

    @NotNull
    var name: String,

    @Column(unique = true)
    @NotNull
    var telephoneNumber: String,

    @NotNull
    var userType: String //može biti sklonište ili osoba
)