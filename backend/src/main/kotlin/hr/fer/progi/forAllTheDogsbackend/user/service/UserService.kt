package hr.fer.progi.forAllTheDogsbackend.user.service

import hr.fer.progi.forAllTheDogsbackend.ad.repository.AdRepository
import hr.fer.progi.forAllTheDogsbackend.message.repository.MessageRepository
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.AddUserDTO
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.JsonUserDTO
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.LoginUserDTO
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.UserDTO
import hr.fer.progi.forAllTheDogsbackend.user.entity.User
import hr.fer.progi.forAllTheDogsbackend.user.repository.UserRepository
import hr.fer.progi.forAllTheDogsbackend.userType.repository.UserTypeRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service


@Service
class UserService(
    private val userRepository: UserRepository,
    private val userTypeRepository: UserTypeRepository,
): UserDetailsService {

    fun addUser(jsonUserDTO: JsonUserDTO): UserDTO {
        checkIfUserExists(jsonUserDTO)

        val userType = userTypeRepository.findByUserTypeId(jsonUserDTO.userTypeId)
            ?: throw IllegalArgumentException("UserType with ID ${jsonUserDTO.userTypeId} doesn't exist")

        val addUserDTO = AddUserDTO(
            jsonUserDTO.username,
            jsonUserDTO.email,
            jsonUserDTO.password,
            jsonUserDTO.name,
            jsonUserDTO.telephoneNumber,
            userType
        )

        val maxUserId = userRepository.findMaxUserId() ?: 0L
        val nextUserId = maxUserId + 1
        return UserDTO(
            userRepository.save(
                addUserDTO.toUser(nextUserId)
            )
        )
    }

    fun getAllShelters(): List<UserDTO> {
        val shelterUserType = userTypeRepository.findByUserTypeId(2L)
            ?: throw IllegalArgumentException("Shelter user type doesn't exist")
        return userRepository.findAllByUserType(shelterUserType).map { UserDTO(it) }
    }

    private fun checkIfUserExists(jsonUserDTO: JsonUserDTO) {
        var user = userRepository.findByEmail(jsonUserDTO.email)
        if(user != null) throw IllegalArgumentException("User with this email already exists")
        user = userRepository.findByUsername(jsonUserDTO.username)
        if(user != null) throw IllegalArgumentException("User with this username already exists")
        user = userRepository.findByTelephoneNumber(jsonUserDTO.telephoneNumber)
        if(user != null) throw IllegalArgumentException("User with this telephone number already exists")

        if(jsonUserDTO.userTypeId == 2L) { // Sklonište
            user = userRepository.findByName(jsonUserDTO.name)
            if(user != null) throw IllegalArgumentException("Shelter name ${jsonUserDTO.name} is already in use")
        }
    }

    fun updateUser(updatedDetails: JsonUserDTO): UserDTO {
        val authentication = SecurityContextHolder.getContext().authentication

        var user = userRepository.findByEmail(authentication.name) ?:
            throw IllegalArgumentException("Ne postoji korisnik s emailom ${authentication.name}!")

        user = updateUserDetails(user, updatedDetails)

        return UserDTO(userRepository.save(user))
    }

    // Autorizacija podataka unesenih u login formu
    fun authorizeUser(loginUserDTO: LoginUserDTO): UserDTO {
        val user = userRepository.findByEmail(loginUserDTO.email)
            ?: throw IllegalArgumentException("User with this email doesn't exist")
        return UserDTO(user)
    }

    override fun loadUserByUsername(email: String): UserDetails {
        val user = userRepository.findByEmail(email) ?: throw UsernameNotFoundException("User not found")
        return org.springframework.security.core.userdetails.User(
            user.email,
            user.password,
            user.authorities
        )
    }

    fun updateUserDetails(user: User, updatedDetails: JsonUserDTO): User {
        checkIfUserExists(updatedDetails)
        if(updatedDetails.username != "") user.username = updatedDetails.username
        if(updatedDetails.email != "") user.email = updatedDetails.email
        if(updatedDetails.password != "") user.password = updatedDetails.password
        if(updatedDetails.name != "") user.name = updatedDetails.name
        if(updatedDetails.telephoneNumber != "") user.telephoneNumber = updatedDetails.telephoneNumber
        return user
    }

}