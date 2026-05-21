package una.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {
    private final String SECRET = "iiQNXP?eCiT#zY45RbKHhJ6Ny9ag!NSQLy?rznCK";
    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generarToken(String correo, String rol) {
        return Jwts.builder()
                .subject(correo)
                .claim("rol", rol)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 4 * 3600000))
                .signWith(key)
                .compact();
    }
    public String extraerCorreo(String token) {
        return getClaims(token).getSubject();
    }
    public String extraerRol(String token) {
        return getClaims(token).get("rol", String.class);
    }
    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}