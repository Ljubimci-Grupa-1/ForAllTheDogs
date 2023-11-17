# Container za izgradnju (build) aplikacije
FROM openjdk:17-alpine AS builder

# Set up the working directory
WORKDIR /app

# Kopiranje Gradle Wrapper-a
COPY gradlew /app/
COPY gradle /app/gradle
COPY build.gradle.kts /app/
COPY settings.gradle.kts /app/
COPY src /app/src

# Dajemo izvršna prava Gradle Wrapperu
RUN chmod +x /app/gradlew

# Downloading dependencies
RUN /app/gradlew --version

# Pokretanje builda
RUN /app/gradlew assemble

# Stvaranje containera u kojem ce se vrtiti aplikacija
FROM openjdk:17-alpine

# Kopiranje izvrsnog JAR-a iz build containera u izvrsni container
COPY --from=builder /app/build/libs/*.jar /app/app.jar

# Izlaganje porta
EXPOSE 8080

# Naredba kojom se pokrece aplikacija
ENTRYPOINT ["java","-jar","/app/app.jar"]
