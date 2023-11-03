package hr.fer.progi.forAllTheDogsbackend.user.service

import hr.fer.progi.forAllTheDogsbackend.exceptionHandler.ExceptionHandler
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.AddUserDTO
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.UserDTO
import hr.fer.progi.forAllTheDogsbackend.user.repository.UserRespository
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.Repository
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRespository
) {
    fun addUser(addUserDTO: AddUserDTO): UserDTO {
        var user = userRepository.findByEmail(addUserDTO.email)
        if(user != null) throw IllegalArgumentException("Korisnik s tim emailom već postoji")
        user = userRepository.findByUsername(addUserDTO.username)
        if(user != null) throw IllegalArgumentException("Korisnik s tim usernameom već postoji")
        user = userRepository.findByTelephoneNumber(addUserDTO.telephoneNumber)
        if(user != null) throw IllegalArgumentException("Broj mobitela već u uporabi")

        if(addUserDTO.userType == "sklonište") {
            user = userRepository.findByName(addUserDTO.name)
            if(user != null) throw IllegalArgumentException("Sklonište ${addUserDTO.name} je već registrirani korisnik")
        }

        return UserDTO(
            userRepository.save(
                addUserDTO.toUser()
            )
        )
    }
}