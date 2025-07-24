package com.example.authservice.controller;

import com.example.authservice.model.SignupRequest;
import com.example.authservice.model.SignupResponse;
import com.example.authservice.model.LoginRequest;
import com.example.authservice.model.LoginResponse;
import com.example.authservice.model.User;
import com.example.authservice.service.UserService;
import com.example.authservice.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        try {
            User user = userService.createUser(signupRequest);
            SignupResponse response = new SignupResponse(
                "User registered successfully",
                user.getIdAsString(),
                user.getEmail()
            );
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new SignupResponse(e.getMessage(), null, null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {
            User user = userService.authenticateUser(loginRequest);

            // Generate JWT tokens
            String accessToken = jwtService.generateAccessToken(user.getIdAsString(), user.getEmail());
            String refreshToken = jwtService.generateRefreshToken(user.getIdAsString());

            // Set HTTP-only cookies
            setTokenCookie(response, "accessToken", accessToken, 24 * 60 * 60); // 24 hours
            setTokenCookie(response, "refreshToken", refreshToken, 24 * 60 * 60); // 24 hours

            LoginResponse loginResponse = new LoginResponse(
                "Login successful",
                user.getIdAsString(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName()
            );
            return ResponseEntity.ok(loginResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new LoginResponse(e.getMessage(), null, null, null, null));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        clearTokenCookie(response, "accessToken");
        clearTokenCookie(response, "refreshToken");
        return ResponseEntity.ok(new LoginResponse("Logout successful", null, null, null, null));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@CookieValue(value = "refreshToken", required = false) String refreshToken,
    HttpServletResponse response) {
        try {
            if (refreshToken == null || !jwtService.validateRefreshToken(refreshToken)) {
                return ResponseEntity.badRequest().body(new LoginResponse("Invalid refresh token", null, null, null, null));
            }

            String userId = jwtService.getUserIdFromToken(refreshToken);
            User user = userService.findById(userId);
            if (user == null) {
                return ResponseEntity.badRequest().body(new LoginResponse("User not found", null, null, null, null));
            }

            String newAccessToken = jwtService.generateAccessToken(userId, user.getEmail());
            setTokenCookie(response, "accessToken", newAccessToken, 2 * 60); // 2 minutes

            LoginResponse loginResponse = new LoginResponse(
                "Token refreshed successfully",
                userId,
                user.getEmail(),
                user.getFirstName(),
                user.getLastName()
            );
            return ResponseEntity.ok(loginResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new LoginResponse(e.getMessage(), null, null, null, null));
        }

    }

    private void setTokenCookie(HttpServletResponse response, String name, String token, int maxAgeSeconds) {
        Cookie cookie = new Cookie(name, token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setMaxAge(maxAgeSeconds);
        cookie.setPath("/");
        cookie.setAttribute("SameSite", "lax");
        response.addCookie(cookie);
    }

    private void clearTokenCookie(HttpServletResponse response, String name) {
        Cookie cookie = new Cookie(name, "");
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setAttribute("SameSite", "lax");
        response.addCookie(cookie);
    }
}
