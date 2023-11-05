package hr.fer.progi.forAllTheDogsbackend.user.service

import hr.fer.progi.forAllTheDogsbackend.exceptionHandler.ExceptionHandler
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.AddUserDTO
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.JsonUserDTO
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.UserDTO
import hr.fer.progi.forAllTheDogsbackend.user.repository.UserRespository
import hr.fer.progi.forAllTheDogsbackend.userType.repository.UserTypeRepository
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.Repository
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRespository,
    private val userTypeRepository: UserTypeRepository
) {
    fun addUser(jsonUserDTO: JsonUserDTO): UserDTO {
        val userType = userTypeRepository.findById(jsonUserDTO.userTypeId)
        val addUserDTO = AddUserDTO(
            jsonUserDTO.username,
            jsonUserDTO.email,
            jsonUserDTO.password,
            jsonUserDTO.name,
            jsonUserDTO.telephoneNumber,
            userType.get()
        )

        checkIfUserExists(addUserDTO)

        return UserDTO(
            userRepository.save(
                addUserDTO.toUser()
            )
        )
    }

    private fun checkIfUserExists(addUserDTO: AddUserDTO) {
        var user = userRepository.findByEmail(addUserDTO.email)
        if(user != null) throw IllegalArgumentException("Korisnik s tim emailom već postoji")
        user = userRepository.findByUsername(addUserDTO.username)
        if(user != null) throw IllegalArgumentException("Korisnik s tim usernameom već postoji")
        user = userRepository.findByTelephoneNumber(addUserDTO.telephoneNumber)
        if(user != null) throw IllegalArgumentException("Broj mobitela već u uporabi")

        if(addUserDTO.userType.name == "Sklonište") {
            user = userRepository.findByName(addUserDTO.name)
            if(user != null) throw IllegalArgumentException("Sklonište ${addUserDTO.name} je već registrirani korisnik")
        }
    }

}