package hr.fer.progi.forAllTheDogsbackend.user.controller

import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.JsonUserDTO
import hr.fer.progi.forAllTheDogsbackend.user.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping

@RequestMapping("/user")
@Controller
class UserController(
    private val userService: UserService
) {

    @PostMapping("/register")
    fun addUser(@RequestBody user: JsonUserDTO): String {
        val userCreated = userService.addUser(user)
        return "redirect:/login"
    }

}