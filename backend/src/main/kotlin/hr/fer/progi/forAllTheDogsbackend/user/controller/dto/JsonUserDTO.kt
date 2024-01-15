package hr.fer.progi.forAllTheDogsbackend.user.controller.dto

// objekt koji se šalje na backend pri registraciji korisnika
data class JsonUserDTO (
    val username: String,
    val email: String,
    var password: String,
    val name: String,
    val telephoneNumber: String,
    val userTypeId: Long
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is JsonUserDTO) return false

        if (username != other.username) return false
        if (email != other.email) return false
        if (password != other.password) return false
        if (name != other.name) return false
        if (telephoneNumber != other.telephoneNumber) return false
        if (userTypeId != other.userTypeId) return false

        return true
    }

    override fun hashCode(): Int {
        var result = username.hashCode()
        result = 31 * result + email.hashCode()
        result = 31 * result + password.hashCode()
        result = 31 * result + name.hashCode()
        result = 31 * result + telephoneNumber.hashCode()
        result = 31 * result + userTypeId.hashCode()
        return result
    }
}