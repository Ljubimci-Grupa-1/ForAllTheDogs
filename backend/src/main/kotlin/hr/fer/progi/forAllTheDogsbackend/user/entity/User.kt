package hr.fer.progi.forAllTheDogsbackend.user.entity

import hr.fer.progi.forAllTheDogsbackend.userType.entity.UserType
import jakarta.persistence.*
import org.jetbrains.annotations.NotNull

@Entity
@Table(name = "app_user")
class User(

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "table_seq")
    @SequenceGenerator(name = "table_seq", sequenceName = "table_seq", allocationSize = 1)
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

    @ManyToOne
    var userType: UserType
)