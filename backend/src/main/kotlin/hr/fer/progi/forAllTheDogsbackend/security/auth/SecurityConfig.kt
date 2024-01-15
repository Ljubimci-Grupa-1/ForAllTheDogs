package hr.fer.progi.forAllTheDogsbackend.security.auth

import hr.fer.progi.forAllTheDogsbackend.security.JwtAuthorizationFilter
import hr.fer.progi.forAllTheDogsbackend.user.service.UserService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.authentication.session.NullAuthenticatedSessionStrategy

@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val userDetailsService: UserService,
    private val jwtAuthorizationFilter: JwtAuthorizationFilter
    ) {

    @Bean
    fun authenticationManager(http: HttpSecurity, passwordEncoder: BCryptPasswordEncoder): AuthenticationManager {
        val authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder::class.java)
        authenticationManagerBuilder.authenticationProvider(authProvider())
            .userDetailsService(userDetailsService)
        return authenticationManagerBuilder.build()
    }

    @Bean
    fun authProvider(): DaoAuthenticationProvider {
        val authProvider = DaoAuthenticationProvider()
        authProvider.setUserDetailsService(userDetailsService)
        authProvider.setPasswordEncoder(passwordEncoder())
        return authProvider
    }

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() }
            .cors {}
            .authorizeHttpRequests {
                it
                    .requestMatchers("/ad/all").permitAll()
                    .requestMatchers("/ad/all/pageable").permitAll()
                    .requestMatchers("/ad/{id}/messages").permitAll()
                    .requestMatchers("/ad/add").hasAnyRole("SHELTER", "USER", "ADMIN")
                    .requestMatchers("/ad/edit/{id}").hasAnyRole("SHELTER", "USER", "ADMIN")
                    .requestMatchers("/ad/delete/{id}").hasAnyRole("SHELTER", "USER", "ADMIN")
                    .requestMatchers("/user/register").permitAll()
                    .requestMatchers("/user/login").permitAll()
                    .requestMatchers("/user/shelter/all").permitAll()
                    .requestMatchers("/user/delete").hasAnyRole("SHELTER", "USER", "ADMIN")
                    .requestMatchers("/user/edit").hasAnyRole("SHELTER", "USER", "ADMIN")
                    .requestMatchers("/city/add").hasRole("ADMIN")
                    .requestMatchers("/city/all").permitAll()
                    .requestMatchers("/color/add").hasRole("ADMIN")
                    .requestMatchers("/color/all").permitAll()
                    .requestMatchers("/county/add").hasRole("ADMIN")
                    .requestMatchers("/county/all").permitAll()
                    .requestMatchers("/county/{id}").permitAll()
                    .requestMatchers("/message/add").hasAnyRole("SHELTER", "USER", "ADMIN")
                    .requestMatchers("/species/all").permitAll()
                    .requestMatchers("/species/add").hasRole("ADMIN")
                    .anyRequest().authenticated()
            }
            .sessionManagement { session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                session.sessionAuthenticationStrategy(NullAuthenticatedSessionStrategy())
            }
            .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter::class.java)
        return http.build()
    }

    @Bean
    fun passwordEncoder(): BCryptPasswordEncoder {
        return BCryptPasswordEncoder()
    }

}
