/**
 * App: api
 * Package: com.example.api
 * File: HealthControllerTest.java
 * Version: 0.1.0
 * Turns: 2
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T17:15:00Z
 * Description: Unit tests for HealthController
 * Log:
 * 2, 0.1.0, 2026/03/28, 05:15 PM, Claude Opus 4.5
 */
package com.example.api;

import com.example.api.controller.HealthController;
import com.example.api.service.HealthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(HealthController.class)
class HealthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HealthService healthService;

    @Test
    @WithMockUser
    void ping_returnsSuccess() throws Exception {
        when(healthService.ping()).thenReturn("pong");

        mockMvc.perform(get("/api/v1/ping"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data").value("pong"));
    }

    @Test
    @WithMockUser
    void info_returnsServiceInfo() throws Exception {
        HealthService.ServiceInfo info = new HealthService.ServiceInfo(
            "api", "0.1.0", "2026-03-28T17:15:00Z", 4, 1000000L, 2000000L
        );
        when(healthService.getServiceInfo()).thenReturn(info);

        mockMvc.perform(get("/api/v1/info"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.success").value(true))
            .andExpect(jsonPath("$.data.name").value("api"))
            .andExpect(jsonPath("$.data.version").value("0.1.0"));
    }
}
