package com.example.authservice.model;

public class LoginResponse {
    private String message;
    private String userId;
    private String email;
    private String firstName;
    private String lastName;

    public LoginResponse() {}

    public LoginResponse(String message, String userId, String email, String firstName, String lastName) {
        this.message = message;
        this.userId = userId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // getters and setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
}
