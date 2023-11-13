package hr.fer.progi.forAllTheDogsbackend.user.controller

import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.JsonUserDTO
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.LoginUserDTO
import hr.fer.progi.forAllTheDogsbackend.user.service.UserService
import org.springframework.web.bind.annotation.*

@RequestMapping("/user")
@RestController
class UserController(
    private val userService: UserService
) {
    @PostMapping("/register")
    fun addUser(@RequestBody user: JsonUserDTO): String {
        userService.addUser(user)
        return "redirect:localhost:5173/login"
    }

    @PostMapping("/login")
    fun authorizeUser(@RequestBody user: LoginUserDTO): String {
        userService.authorizeUser(user)
        return "redirect:/"
    }

}