package com.elecciones.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API Elecciones")
                        .version("1.0")
                        .description("API para gestión de información electoral")
                        .contact(new Contact()
                                .name("Soporte")
                                .email("soporte@elecciones.es")));
    }
}
