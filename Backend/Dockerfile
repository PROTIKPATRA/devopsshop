# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /app
# Copy the POM and download dependencies first (optimizes layer caching)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code and build the JAR
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create the production image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create a non-root user for container security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Extract the JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the API port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]