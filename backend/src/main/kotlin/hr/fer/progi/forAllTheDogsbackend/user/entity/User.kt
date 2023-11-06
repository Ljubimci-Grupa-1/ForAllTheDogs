package hr.fer.progi.forAllTheDogsbackend.user.entity

import hr.fer.progi.forAllTheDogsbackend.userType.entity.UserType
import jakarta.persistence.*
import org.jetbrains.annotations.NotNull

@Entity
@Table(name = "app_user")
class User(

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "app_user_seq")
    @SequenceGenerator(name = "app_user_seq", sequenceName = "app_user_seq", allocationSize = 1)
    @Column(name = "userid")
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
    @JoinColumn(name = "usertypeid")
    var userType: UserType
)