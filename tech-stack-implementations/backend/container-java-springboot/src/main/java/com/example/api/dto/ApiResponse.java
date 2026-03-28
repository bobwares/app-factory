/**
 * App: api
 * Package: com.example.api.dto
 * File: ApiResponse.java
 * Version: 0.1.0
 * Turns: 2
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T17:15:00Z
 * Description: Generic API response wrapper for consistent response structure
 * Log:
 * 2, 0.1.0, 2026/03/28, 05:15 PM, Claude Opus 4.5
 */
package com.example.api.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse<T>(
    boolean success,
    T data,
    ErrorInfo error,
    String timestamp
) {
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, data, null, Instant.now().toString());
    }

    public static <T> ApiResponse<T> error(String code, String message) {
        return new ApiResponse<>(false, null, new ErrorInfo(code, message), Instant.now().toString());
    }

    public record ErrorInfo(String code, String message) {}
}
