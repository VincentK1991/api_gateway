package com.example.authservice.service;

import com.example.authservice.config.JwtConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    @Autowired
    private JwtConfig jwtConfig;

    @Autowired
    private ResourceLoader resourceLoader;

    private PrivateKey privateKey;
    private PublicKey publicKey;

    @PostConstruct
    public void init() {
        try {
            loadKeys();
        } catch (Exception e) {
            throw new RuntimeException("Failed to load JWT keys", e);
        }
    }

    private void loadKeys() throws Exception {
        // Try to load from environment variables first (base64 encoded)
        if (jwtConfig.getKeys().getPrivateKey() != null && !jwtConfig.getKeys().getPrivateKey().isEmpty()) {
            loadKeysFromEnvironment();
        } else {
            // Fall back to loading from files
            loadKeysFromFiles();
        }
    }

    private void loadKeysFromEnvironment() throws Exception {
        // Decode base64 encoded keys
        byte[] privateKeyBytes = Base64.getDecoder().decode(jwtConfig.getKeys().getPrivateKey());
        byte[] publicKeyBytes = Base64.getDecoder().decode(jwtConfig.getKeys().getPublicKey());

        // Remove PEM headers and decode
        String privateKeyPem = new String(privateKeyBytes)
            .replace("-----BEGIN PRIVATE KEY-----", "")
            .replace("-----END PRIVATE KEY-----", "")
            .replaceAll("\\s", "");

        String publicKeyPem = new String(publicKeyBytes)
            .replace("-----BEGIN PUBLIC KEY-----", "")
            .replace("-----END PUBLIC KEY-----", "")
            .replaceAll("\\s", "");

        // Create key specs
        PKCS8EncodedKeySpec privateKeySpec = new PKCS8EncodedKeySpec(Base64.getDecoder().decode(privateKeyPem));
        X509EncodedKeySpec publicKeySpec = new X509EncodedKeySpec(Base64.getDecoder().decode(publicKeyPem));

        // Generate keys
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        this.privateKey = keyFactory.generatePrivate(privateKeySpec);
        this.publicKey = keyFactory.generatePublic(publicKeySpec);
    }

    private void loadKeysFromFiles() throws Exception {
        // Load private key
        Resource privateKeyResource = resourceLoader.getResource(jwtConfig.getKeys().getPrivateKeyPath());
        String privateKeyContent = new String(privateKeyResource.getInputStream().readAllBytes())
            .replace("-----BEGIN PRIVATE KEY-----", "")
            .replace("-----END PRIVATE KEY-----", "")
            .replaceAll("\\s", "");

        // Load public key
        Resource publicKeyResource = resourceLoader.getResource(jwtConfig.getKeys().getPublicKeyPath());
        String publicKeyContent = new String(publicKeyResource.getInputStream().readAllBytes())
            .replace("-----BEGIN PUBLIC KEY-----", "")
            .replace("-----END PUBLIC KEY-----", "")
            .replaceAll("\\s", "");

        // Create key specs
        PKCS8EncodedKeySpec privateKeySpec = new PKCS8EncodedKeySpec(Base64.getDecoder().decode(privateKeyContent));
        X509EncodedKeySpec publicKeySpec = new X509EncodedKeySpec(Base64.getDecoder().decode(publicKeyContent));

        // Generate keys
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        this.privateKey = keyFactory.generatePrivate(privateKeySpec);
        this.publicKey = keyFactory.generatePublic(publicKeySpec);
    }

    public String generateAccessToken(String userId, String email) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("type", "access");
        claims.put("email", email);
        return createToken(claims, userId, jwtConfig.getAccessToken().getExpiration());
    }

    public String generateRefreshToken(String userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("type", "refresh");
        return createToken(claims, userId, jwtConfig.getRefreshToken().getExpiration());
    }

    private String createToken(Map<String, Object> claims, String subject, long expiration) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);

        return Jwts.builder()
            .claims(claims)
            .subject(subject)
            .issuedAt(now)
            .expiration(expiryDate)
            .signWith(privateKey)
            .compact();
    }

    public String getUserIdFromToken(String token) {
        Claims claims = getClaimsFromToken(token);
        return claims.getSubject();
    }

    public String getEmailFromToken(String token) {
        Claims claims = getClaimsFromToken(token);
        return claims.get("email", String.class);
    }

    public String getTokenType(String token) {
        Claims claims = getClaimsFromToken(token);
        return claims.get("type", String.class);
    }

    public boolean isTokenExpired(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            return claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return true;
        }
    }

    public boolean validateToken(String token) {
        try {
            getClaimsFromToken(token);
            return !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    public boolean validateAccessToken(String token) {
        try {
            if (!validateToken(token)) {
                return false;
            }
            String tokenType = getTokenType(token);
            return "access".equals(tokenType);
        } catch (Exception e) {
            return false;
        }
    }

    public boolean validateRefreshToken(String token) {
        try {
            if (!validateToken(token)) {
                return false;
            }
            String tokenType = getTokenType(token);
            return "refresh".equals(tokenType);
        } catch (Exception e) {
            return false;
        }
    }

    private Claims getClaimsFromToken(String token) {
        return Jwts.parser()
            .verifyWith(publicKey)
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

}
