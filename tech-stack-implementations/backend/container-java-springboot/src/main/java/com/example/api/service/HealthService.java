/**
 * App: api
 * Package: com.example.api.service
 * File: HealthService.java
 * Version: 0.1.0
 * Turns: 2
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T17:15:00Z
 * Description: Health and info service for API status
 * Log:
 * 2, 0.1.0, 2026/03/28, 05:15 PM, Claude Opus 4.5
 */
package com.example.api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class HealthService {

    @Value("${spring.application.name:api}")
    private String applicationName;

    @Value("${spring.application.version:0.1.0}")
    private String applicationVersion;

    public String ping() {
        return "pong";
    }

    public ServiceInfo getServiceInfo() {
        return new ServiceInfo(
            applicationName,
            applicationVersion,
            Instant.now().toString(),
            Runtime.getRuntime().availableProcessors(),
            Runtime.getRuntime().freeMemory(),
            Runtime.getRuntime().maxMemory()
        );
    }

    public record ServiceInfo(
        String name,
        String version,
        String timestamp,
        int availableProcessors,
        long freeMemory,
        long maxMemory
    ) {}
}
