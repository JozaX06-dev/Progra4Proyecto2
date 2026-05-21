package una.backend.presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import una.backend.logic.Service;
import una.backend.logic.Usuario;
import una.backend.presentation.dto.LoginRequest;
import una.backend.presentation.dto.LoginResponse;
import una.backend.security.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private Service service;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Usuario usuario = service.login(request.getCorreo(), request.getClave());
        if (usuario == null) return ResponseEntity.status(401).body("Credenciales inválidas");
        String rol = service.getTipoUsuario(usuario.getId());
        String nombre = service.getNombreUsuario(usuario.getId(), rol);
        String token = jwtService.generarToken(usuario.getCorreo(), rol);
        return ResponseEntity.ok(new LoginResponse(token, rol, nombre));
    }
}