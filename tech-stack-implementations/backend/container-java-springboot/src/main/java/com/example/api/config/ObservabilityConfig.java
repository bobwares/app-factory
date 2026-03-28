/**
 * App: api
 * Package: com.example.api.config
 * File: ObservabilityConfig.java
 * Version: 0.1.0
 * Turns: 2
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T17:15:00Z
 * Description: Observability configuration for OpenTelemetry and Micrometer
 * Log:
 * 2, 0.1.0, 2026/03/28, 05:15 PM, Claude Opus 4.5
 */
package com.example.api.config;

import io.micrometer.core.aop.TimedAspect;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ObservabilityConfig {

    @Bean
    public TimedAspect timedAspect(MeterRegistry registry) {
        return new TimedAspect(registry);
    }
}
