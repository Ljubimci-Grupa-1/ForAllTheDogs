import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter

@Configuration
class CorsConfig {
    @Bean
    fun corsFilter(): CorsFilter {
        val source = UrlBasedCorsConfigurationSource()
        val config = CorsConfiguration()

        // Allow requests from a specific origin during development
        config.allowedOrigins = listOf("http://localhost:5173")

        // Allow common HTTP methods
        config.allowedMethods = listOf("GET", "POST", "PUT", "DELETE")

        // Allow common headers
        config.allowedHeaders = listOf("Content-Type", "Authorization")

        // Allow credentials (e.g., cookies) to be sent with the request
        config.allowCredentials = true

        source.registerCorsConfiguration("/**", config)

        return CorsFilter(source)
    }
}