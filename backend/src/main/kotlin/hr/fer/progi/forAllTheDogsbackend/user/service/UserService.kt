package hr.fer.progi.forAllTheDogsbackend.user.service

import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.AddUserDTO
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.JsonUserDTO
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.LoginUserDTO
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.UserDTO
import hr.fer.progi.forAllTheDogsbackend.user.repository.UserRespository
import hr.fer.progi.forAllTheDogsbackend.userType.repository.UserTypeRepository
import org.springframework.stereotype.Service
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

@Service
class UserService(
    private val userRepository: UserRespository,
    private val userTypeRepository: UserTypeRepository
) {
//    fun hashPassword(password: String): String {
//        val encoder = BCryptPasswordEncoder()
//        return encoder.encode(password)
//    }

    fun addUser(jsonUserDTO: JsonUserDTO): UserDTO {
        checkIfUserExists(jsonUserDTO)

        val userType = userTypeRepository.findByUserTypeId(jsonUserDTO.userTypeId)
        val addUserDTO = AddUserDTO(
            jsonUserDTO.username,
            jsonUserDTO.email,
//            hashPassword(jsonUserDTO.password),
            jsonUserDTO.password,
            jsonUserDTO.name,
            jsonUserDTO.telephoneNumber,
            userType!!
        )
        return UserDTO(
            userRepository.save(
                addUserDTO.toUser()
            )
        )
    }

    private fun checkIfUserExists(jsonUserDTO: JsonUserDTO) {
        var user = userRepository.findByEmail(jsonUserDTO.email)
        if(user != null) throw IllegalArgumentException("Korisnik s tim emailom već postoji")
        user = userRepository.findByUsername(jsonUserDTO.username)
        if(user != null) throw IllegalArgumentException("Korisnik s tim usernameom već postoji")
        user = userRepository.findByTelephoneNumber(jsonUserDTO.telephoneNumber)
        if(user != null) throw IllegalArgumentException("Broj mobitela već u uporabi")

        if(jsonUserDTO.userTypeId == 2L) { // Sklonište
            user = userRepository.findByName(jsonUserDTO.name)
            if(user != null) throw IllegalArgumentException("Sklonište ${jsonUserDTO.name} je već registrirani korisnik")
        }
    }

    // Autorizacija podataka unesenih u login formu
    fun authorizeUser(loginUserDTO: LoginUserDTO): UserDTO {
        val user = userRepository.findByEmail(loginUserDTO.email)
            ?: throw IllegalArgumentException("Korisnik s tim emailom ne postoji")
//        if(user.password != hashPassword(loginUserDTO.password)) throw IllegalArgumentException("Pogrešna lozinka!")
        if(user.password != loginUserDTO.password) throw IllegalArgumentException("Pogrešna lozinka!")
        return UserDTO(user)
    }

}