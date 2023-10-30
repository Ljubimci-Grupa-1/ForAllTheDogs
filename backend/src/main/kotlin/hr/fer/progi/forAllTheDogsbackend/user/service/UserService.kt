package hr.fer.progi.forAllTheDogsbackend.user.service

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
        if(user != null) throw IllegalArgumentException("nemože taj email")
        user = userRepository.findByUsername(addUserDTO.username)
        if(user != null) throw IllegalArgumentException("nemože taj username")
        user = userRepository.findByTelephoneNumber(addUserDTO.telephoneNumber)
        if(user != null) throw IllegalArgumentException("nemože taj broj")
        return UserDTO(
            userRepository.save(
                addUserDTO.toUser()
            )
        )
    }
}