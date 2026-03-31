package com.elecciones.backend.auth.controlador;

import com.elecciones.backend.auth.modelo.dto.LoginRequestDTO;
import com.elecciones.backend.auth.modelo.dto.LoginResponseDTO;
import com.elecciones.backend.auth.modelo.dto.RegistroRequestDTO;
import com.elecciones.backend.auth.servicio.AuthServicio;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@Tag(name = "Autenticacion", description = "API para login y registro de usuarios")
public class AuthControlador {

    private final AuthServicio authServicio;

    @PostMapping("/login")
    @Operation(summary = "Iniciar sesión")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request) {
        return  ResponseEntity.ok(authServicio.login(request));
    }

    @PostMapping("/registro")
    @Operation(summary = "Registrar nuevo usuario")
    public ResponseEntity<LoginResponseDTO> registro(@RequestBody RegistroRequestDTO request) {
        return ResponseEntity.ok(authServicio.registro(request));
    }
}
