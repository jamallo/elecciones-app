package com.elecciones.backend.auth.servicio;

import com.elecciones.backend.auth.modelo.dto.LoginRequestDTO;
import com.elecciones.backend.auth.modelo.dto.LoginResponseDTO;
import com.elecciones.backend.auth.modelo.dto.RegistroRequestDTO;
import com.elecciones.backend.excepcion.ErrorValidacionExcepcion;
import com.elecciones.backend.seguridad.JwtUtilidad;
import com.elecciones.backend.usuario.modelo.entidad.RolUsuario;
import com.elecciones.backend.usuario.modelo.entidad.Usuario;
import com.elecciones.backend.usuario.repositorio.UsuarioRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServicio {

    private final AuthenticationManager authenticationManager;
    private final JwtUtilidad jwtUtilidad;
    private final UsuarioRepositorio usuarioRepositorio;
    private final PasswordEncoder passwordEncoder;

    public LoginResponseDTO login(LoginRequestDTO request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtUtilidad.generateToken(userDetails);

        Usuario usuario = usuarioRepositorio.findByEmail(request.getEmail())
                .orElseThrow(() -> new ErrorValidacionExcepcion("Usuario no encontrado"));

        return new LoginResponseDTO(token, usuario.getEmail(), usuario.getNombre(), usuario.getRol().name());
    }

    @Transactional
    public LoginResponseDTO registro(RegistroRequestDTO request) {
        if (usuarioRepositorio.existsByEmail(request.getEmail())) {
            throw new ErrorValidacionExcepcion("El email ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setNombre(request.getNombre());
        usuario.setApellidos(request.getApellidos());
        usuario.setRol(RolUsuario.USUARIO);

        usuario = usuarioRepositorio.save(usuario);

        // Auto-login después del registro
        String token = jwtUtilidad.generateToken(usuario);

        return new LoginResponseDTO(token, usuario.getEmail(), usuario.getNombre(), usuario.getRol().name());
    }
}
