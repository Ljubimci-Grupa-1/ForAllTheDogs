package hr.fer.progi.forAllTheDogsbackend.security.auth

import hr.fer.progi.forAllTheDogsbackend.user.controller.dto.UserDTO
import io.jsonwebtoken.*
import jakarta.servlet.http.HttpServletRequest
import org.springframework.stereotype.Component
import java.util.*
import java.util.concurrent.TimeUnit

@Component
class JwtUtil {

    private val secretKey = "mysecretkey"
    private val accessTokenValidity: Long = 60 * 60 * 1000

    private val jwtParser: JwtParser = Jwts.parser().setSigningKey(secretKey)

    private val tokenHeader = "Authorization"
    private val tokenPrefix = "Bearer "

    fun createToken(user: UserDTO): String {
        /* kreiramo claims objekt tipa
        {
            "name": "name",
            "email": "email",
            "username": "username",
            "userType": "userTypeId"
            "telephoneNumber": "telephoneNumber"
        }
         */
        val claims = mutableMapOf<String, Any>()
        claims["name"] = user.name
        claims["email"] = user.email
        claims["username"] = user.username
        claims["userType"] = user.userType.userTypeId
        claims["telephoneNumber"] = user.telephoneNumber

        return Jwts.builder()
            .setClaims(claims)
            .setSubject(user.email)
            .setExpiration(Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(accessTokenValidity)))
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .compact()
    }

    private fun parseJwtClaims(token: String) = jwtParser.parseClaimsJws(token).body

    fun resolveClaims(req: HttpServletRequest): Claims? { // služi za dohvat claims objekta iz tokena
        try {
            val token = resolveToken(req)
            return token?.let { parseJwtClaims(it) }
        } catch (ex: ExpiredJwtException) {
            req.setAttribute("expired", ex.message)
            throw ex
        } catch (ex: Exception) {
            req.setAttribute("invalid", ex.message)
            throw ex
        }
    }

    fun resolveToken(request: HttpServletRequest): String? { // služi za dohvat tokena iz headera
        val bearerToken = request.getHeader(tokenHeader)
        return if (bearerToken != null && bearerToken.startsWith(tokenPrefix)) {
            bearerToken.substring(tokenPrefix.length)
        } else null
    }

    fun validateClaims(claims: Claims): Boolean {
        return try {
            claims.expiration.after(Date())
        } catch (e: Exception) {
            throw e
        }
    }

    fun getEmail(claims: Claims) = claims.subject

    fun getRoles(claims: Claims): List<String>? {
        return claims["roles"] as? List<String>
    }
}
