package com.elecciones.backend.auth.modelo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {
    private String token;
    private String tipo = "Bearer";
    private String email;
    private String nombre;
    private String rol;

    public LoginResponseDTO(String token, String email, String nombre, String rol) {
        this.token = token;
        this.email = email;
        this.nombre = nombre;
        this.rol = rol;
    }
}
