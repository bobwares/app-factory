# App: api
# File: Dockerfile
# Version: 0.1.0
# Turns: 2
# Author: AI Coding Agent (Claude Opus 4.5)
# Date: 2026-03-28T17:15:00Z
# Description: Multi-stage Dockerfile for Spring Boot on JVM 21
# Log:
# 2, 0.1.0, 2026/03/28, 05:15 PM, Claude Opus 4.5

# Build stage
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src

# Install Maven and build
RUN apk add --no-cache maven && \
    mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Security: run as non-root user
RUN addgroup -g 1001 appgroup && \
    adduser -u 1001 -G appgroup -D appuser
USER appuser

# Copy JAR from builder
COPY --from=builder /app/target/*.jar app.jar

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# OpenTelemetry Java agent (optional - mount at runtime)
ENV JAVA_TOOL_OPTIONS=""

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
