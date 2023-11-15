package hr.fer.progi.forAllTheDogsbackend.security

import com.fasterxml.jackson.databind.ObjectMapper
import hr.fer.progi.forAllTheDogsbackend.security.auth.JwtUtil
import io.jsonwebtoken.Claims
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import java.io.IOException

@Component
class JwtAuthorizationFilter(
    private val jwtUtil: JwtUtil,
    private val mapper: ObjectMapper
) : OncePerRequestFilter() {

    @Throws(ServletException::class, IOException::class)
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val errorDetails = HashMap<String, Any>()

        try {
            val accessToken = jwtUtil.resolveToken(request)
            if (accessToken == null) {
                filterChain.doFilter(request, response)
                return
            }
            println("token : $accessToken")
            val claims = jwtUtil.resolveClaims(request)

            if (claims != null && jwtUtil.validateClaims(claims)) {
                val email = claims.subject
                println("email : $email")
                val authentication = UsernamePasswordAuthenticationToken(email, "", ArrayList())
                SecurityContextHolder.getContext().authentication = authentication
            }

        } catch (e: Exception) {
            errorDetails["message"] = "Authentication Error"
            errorDetails["details"] = "An error occurred: ${e.javaClass.simpleName} - ${e.message}"
            response.status = HttpStatus.FORBIDDEN.value()
            response.contentType = MediaType.APPLICATION_JSON_VALUE

            mapper.writeValue(response.writer, errorDetails)
        }
        filterChain.doFilter(request, response)
    }
}
