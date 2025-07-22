package com.example.authservice.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.*;

@Configuration
@ConfigurationProperties(prefix = "jwt")
public class JwtConfig {

    private AccessToken accessToken = new AccessToken();
    private RefreshToken refreshToken = new RefreshToken();
    private Keys keys = new Keys();


    // getters and setters
    public AccessToken getAccessToken() {
        return accessToken;
    }
    public void setAccessToken(AccessToken accessToken) {
        this.accessToken = accessToken;
    }

    public RefreshToken getRefreshToken() {
        return refreshToken;
    }
    public void setRefreshToken(RefreshToken refreshToken) {
        this.refreshToken = refreshToken;
    }

    public Keys getKeys() {
        return keys;
    }
    public void setKeys(Keys keys) {
        this.keys = keys;
    }

    // inner classes
    public static class AccessToken {
        private long expiration;

        public long getExpiration() {
            return expiration;
        }
        public void setExpiration(long expiration) {
            this.expiration = expiration;
        }
    }

    public static class RefreshToken {
        private long expiration;

        public long getExpiration() {
            return expiration;
        }
        public void setExpiration(long expiration) {
            this.expiration = expiration;
        }
    }

    public static class Keys {
        private String privateKeyPath;
        private String publicKeyPath;
        private String privateKey;
        private String publicKey;

        public String getPrivateKeyPath() {
            return privateKeyPath;
        }
        public void setPrivateKeyPath(String privateKeyPath) {
            this.privateKeyPath = privateKeyPath;
        }

        public String getPublicKeyPath() {
            return publicKeyPath;
        }
        public void setPublicKeyPath(String publicKeyPath) {
            this.publicKeyPath = publicKeyPath;
        }

        public String getPrivateKey() {
            return privateKey;
        }
        public void setPrivateKey(String privateKey) {
            this.privateKey = privateKey;
        }

        public String getPublicKey() {
            return publicKey;
        }
        public void setPublicKey(String publicKey) {
            this.publicKey = publicKey;
        }
    }


}
