package hr.fer.progi.forAllTheDogsbackend.exceptionHandler

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest

@ControllerAdvice
class ExceptionHandler {
    @ExceptionHandler(Exception::class)
    private fun handleIllegalArgument(e: Exception, req: WebRequest): ResponseEntity<Map<String, String>> {
        val props = mutableMapOf<String, String>()

        props["message"] = e.message ?: ""
        props["status"] = "400"
        props["error"] = "Bad Request"

        return ResponseEntity(props, HttpStatus.BAD_REQUEST)
    }
}