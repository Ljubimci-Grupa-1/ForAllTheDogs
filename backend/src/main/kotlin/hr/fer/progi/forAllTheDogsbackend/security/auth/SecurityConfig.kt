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
        http.csrf { it.disable() }
            .cors {}
            .authorizeHttpRequests {
                it
//                    .requestMatchers("/user/test").hasRole("USER")  // lucija nemoj brisat pliz <3
//                    .requestMatchers("/user/test").hasRole("USER")
//                    .requestMatchers("/user/test").permitAll()
//                    .requestMatchers("/ad/**").permitAll()
                    .requestMatchers("/ad/all").permitAll()
                    .requestMatchers("/ad/all/pageable").permitAll()
                    .requestMatchers("/ad/{id}/messages").permitAll()
                    .requestMatchers("/ad/add").hasAnyRole("SHELTER", "USER")
                    .requestMatchers("/ad/edit/{id}").hasAnyRole("SHELTER", "USER")
                    .requestMatchers("/ad/delete/{id}").hasAnyRole("SHELTER", "USER")
                    //
                    .requestMatchers("/user/register").permitAll()
                    .requestMatchers("/user/login").permitAll()
                    .requestMatchers("/user/shelter/all").permitAll()
                    //
                    .requestMatchers("/color/**").permitAll()
                    .requestMatchers("/species/**").permitAll()
                    .requestMatchers("/county/**").permitAll()
                    .requestMatchers(("/city/**")).permitAll()
                    //
                    .requestMatchers("/message/**").permitAll()
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
