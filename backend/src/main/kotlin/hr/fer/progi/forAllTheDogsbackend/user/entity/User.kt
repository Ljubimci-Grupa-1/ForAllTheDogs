package hr.fer.progi.forAllTheDogsbackend.user.entity

import hr.fer.progi.forAllTheDogsbackend.userType.entity.UserType
import jakarta.persistence.*
import org.jetbrains.annotations.NotNull
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

@Entity
@Table(name = "app_user")
class User(

    @Id
    @Column(name = "userid")
    var userId: Long = 0L,

    @Column(unique = true)
    @NotNull
    private var username: String,

    @Column(unique = true)
    @NotNull
    var email: String,

    @NotNull
    private var password: String,

    @NotNull
    var name: String,

    @Column(unique = true)
    @NotNull
    var telephoneNumber: String,

    @ManyToOne
    @JoinColumn(name = "usertypeid")
    var userType: UserType

) : UserDetails {

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        val roleName = when (userType.name) {
            "Osoba" -> "ROLE_USER" // Map "Osoba" UserType to "ROLE_USER"
            "Skloniste" -> "ROLE_SHELTER" // Map "Skloniste" UserType to "ROLE_SHELTER"
            else -> throw IllegalArgumentException("Unknown UserType: ${userType.name}")
        }
        return mutableListOf(SimpleGrantedAuthority(roleName))
    }

    override fun getPassword() = password

    override fun getUsername() = email

    override fun isAccountNonExpired() = true

    override fun isAccountNonLocked() = true

    override fun isCredentialsNonExpired() = true

    override fun isEnabled() = true

    fun username() = username

}