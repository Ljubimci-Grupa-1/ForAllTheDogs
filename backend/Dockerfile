# Container za izgradnju (build) aplikacije
FROM openjdk:17-alpine AS builder

# Kopiranje izvornog koda u container
COPY gradlew .
COPY build.gradle.kts .
COPY settings.gradle.kts .
COPY src src

RUN chmod +x gradlew

# Pokretanje builda
RUN ./gradlew assemble

# Stvaranje containera u kojem ce se vrtiti aplikacija
FROM openjdk:17-alpine

# Kopiranje izvrsnog JAR-a iz build containera u izvrsni container
COPY --from=builder build/*.jar /app.jar

# Izlaganje porta
EXPOSE 8080

# Naredba kojom se pokrece aplikacija
ENTRYPOINT ["java","-jar","/app.jar"]
