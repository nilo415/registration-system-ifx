package com.inflex.registration_system.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Global CORS configuration.
 * Allows the React frontend (running on Vite's default port 5173)
 * to communicate with this Spring Boot backend on port 8080.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Exposes a shared {@link ObjectMapper} bean with pretty-print disabled for production use.
     * Making it explicit avoids "No qualifying bean" errors on injection.
     */
    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper()
                .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                        "http://localhost:5173",   // Vite dev server (primary)
                        "http://localhost:3000"    // fallback (CRA / other tools)
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
