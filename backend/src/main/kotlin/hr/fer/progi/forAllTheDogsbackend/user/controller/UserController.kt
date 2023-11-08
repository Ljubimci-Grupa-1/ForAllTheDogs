package hr.fer.progi.forAllTheDogsbackend.user.controller

import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.JsonUserDTO
import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.LoginUserDTO
import hr.fer.progi.forAllTheDogsbackend.user.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@RequestMapping("/user")
@RestController
class UserController(
    private val userService: UserService
) {

    @GetMapping("/register")
    fun register(): String {
        return "/frontend/src/components/SignUp/SignUpForm.tsx"
    }

    @PostMapping("/register")
    fun addUser(@RequestBody user: JsonUserDTO): String {
        val userCreated = userService.addUser(user)
        return "redirect:localhost:5173/login"
    }

    @GetMapping("/login")
    fun login(): String {
        return "redirect:localhost:5173/home"
    }

    @PostMapping("/login")
    fun authorizeUser(@RequestBody user: LoginUserDTO): String {
        val userAuthorized = userService.authorizeUser(user)
        return "redirect:/"
    }

}