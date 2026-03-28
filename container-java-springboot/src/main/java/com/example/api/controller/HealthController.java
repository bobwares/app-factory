/**
 * App: api
 * Package: com.example.api.controller
 * File: HealthController.java
 * Version: 0.1.0
 * Turns: 2
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T17:15:00Z
 * Description: Sample REST controller demonstrating API patterns
 * Log:
 * 2, 0.1.0, 2026/03/28, 05:15 PM, Claude Opus 4.5
 */
package com.example.api.controller;

import com.example.api.dto.ApiResponse;
import com.example.api.service.HealthService;
import io.micrometer.core.annotation.Timed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class HealthController {

    private static final Logger log = LoggerFactory.getLogger(HealthController.class);

    private final HealthService healthService;

    public HealthController(HealthService healthService) {
        this.healthService = healthService;
    }

    @GetMapping("/ping")
    @Timed(value = "api.ping", description = "Ping endpoint latency")
    public ResponseEntity<ApiResponse<String>> ping() {
        log.info("Ping request received");
        return ResponseEntity.ok(ApiResponse.success(healthService.ping()));
    }

    @GetMapping("/info")
    @Timed(value = "api.info", description = "Info endpoint latency")
    public ResponseEntity<ApiResponse<HealthService.ServiceInfo>> info() {
        log.info("Info request received");
        return ResponseEntity.ok(ApiResponse.success(healthService.getServiceInfo()));
    }
}
